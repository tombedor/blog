#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INFRA_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
APP_DIR="/opt/analytics"
DEFAULT_MOUNT_POINT="/mnt/blog-data"
POSTGRES_DATA_DIR="postgres"
OVERRIDE_FILE="docker-compose.override.yml"
PREFLIGHT_ONLY=false

usage() {
    cat <<'EOF'
Usage: migrate-postgres-to-volume.sh [--preflight] [--host HOST]

Interactively migrate the production PostgreSQL data directory from its Docker
named volume to an already attached and mounted DigitalOcean Block Storage
volume.

Options:
  --preflight  Validate the host, mount, source data, and required commands only.
  --host HOST  Override HOST_IP and Terraform output host discovery.
  -h, --help   Show this help.

The script does not create, attach, format, or mount a DigitalOcean volume.
EOF
}

die() {
    echo "Error: $*" >&2
    exit 1
}

require_typed_confirmation() {
    local expected="$1"
    local prompt="$2"
    local reply
    read -r -p "$prompt Type '$expected' to continue: " reply
    [[ "$reply" == "$expected" ]] || die "Confirmation did not match; migration cancelled."
}

resolve_host() {
    if [[ -n "${HOST_OVERRIDE:-}" ]]; then
        printf '%s' "$HOST_OVERRIDE"
        return
    fi

    if [[ -n "${HOST_IP:-}" ]]; then
        printf '%s' "$HOST_IP"
        return
    fi

    terraform -chdir="$INFRA_DIR/terraform" output -raw reserved_ip 2>/dev/null ||
        terraform -chdir="$INFRA_DIR/terraform" output -raw droplet_ip
}

ssh_run() {
    ssh -o BatchMode=yes "root@$HOST" "$@"
}

HOST_OVERRIDE=""
while [[ $# -gt 0 ]]; do
    case "$1" in
        --preflight)
            PREFLIGHT_ONLY=true
            shift
            ;;
        --host)
            [[ $# -ge 2 ]] || die "--host requires a value"
            HOST_OVERRIDE="$2"
            shift 2
            ;;
        -h|--help)
            usage
            exit 0
            ;;
        *)
            die "Unknown argument: $1"
            ;;
    esac
done

[[ -t 0 ]] || die "This script requires an interactive terminal."

HOST="$(resolve_host | tr -d '\r\n[:space:]')"
[[ -n "$HOST" ]] || die "No host found. Set HOST_IP, pass --host, or restore Terraform outputs."

read -r -p "Mounted volume path on $HOST [$DEFAULT_MOUNT_POINT]: " MOUNT_POINT
MOUNT_POINT="${MOUNT_POINT:-$DEFAULT_MOUNT_POINT}"
[[ "$MOUNT_POINT" == /* ]] || die "Mount point must be an absolute path."
[[ "$MOUNT_POINT" != "/" ]] || die "Refusing to use / as the mount point."
[[ "$MOUNT_POINT" =~ ^/[A-Za-z0-9._/-]+$ ]] ||
    die "Mount point may contain only letters, numbers, dots, underscores, dashes, and slashes."

DEST_DIR="${MOUNT_POINT%/}/$POSTGRES_DATA_DIR"

echo
echo "Migration target"
echo "  Host:        $HOST"
echo "  Application: $APP_DIR"
echo "  Mount point: $MOUNT_POINT"
echo "  PostgreSQL:  $DEST_DIR"
echo

echo "Running remote preflight checks..."
PREFLIGHT_OUTPUT="$(
    ssh_run bash -s -- "$APP_DIR" "$MOUNT_POINT" "$DEST_DIR" "$OVERRIDE_FILE" <<'REMOTE'
set -euo pipefail

app_dir="$1"
mount_point="$2"
dest_dir="$3"
override_file="$4"

for command in docker rsync gzip mountpoint findmnt df du awk sed grep find sort cmp seq; do
    command -v "$command" >/dev/null || {
        echo "Missing required command: $command" >&2
        exit 1
    }
done

cd "$app_dir"
docker compose version >/dev/null
mountpoint -q "$mount_point" || {
    echo "$mount_point is not a mounted filesystem." >&2
    exit 1
}
findmnt -n -o OPTIONS "$mount_point" | grep -Eq '(^|,)rw(,|$)' || {
    echo "$mount_point is not mounted read-write." >&2
    exit 1
}
grep -Fq "$mount_point" /etc/fstab || {
    echo "$mount_point is not present in /etc/fstab; configure persistent mounting first." >&2
    exit 1
}

pg="$(docker ps -q --filter label=com.docker.compose.service=postgres | head -1)"
[[ -n "$pg" ]] || {
    echo "No running PostgreSQL Compose service found." >&2
    exit 1
}

source_dir="$(
    docker inspect "$pg" \
        --format '{{range .Mounts}}{{if eq .Destination "/var/lib/postgresql/data"}}{{.Source}}{{end}}{{end}}'
)"
[[ -n "$source_dir" && -d "$source_dir" ]] || {
    echo "Could not locate the current PostgreSQL data directory." >&2
    exit 1
}

source_mount_type="$(
    docker inspect "$pg" \
        --format '{{range .Mounts}}{{if eq .Destination "/var/lib/postgresql/data"}}{{.Type}}{{end}}{{end}}'
)"
[[ "$source_mount_type" == "volume" ]] || {
    echo "PostgreSQL is already using mount type '$source_mount_type', not a Docker volume." >&2
    exit 1
}

if [[ -e "$dest_dir" ]] && find "$dest_dir" -mindepth 1 -print -quit | grep -q .; then
    echo "Destination already exists and is not empty: $dest_dir" >&2
    exit 1
fi

if [[ -e "$app_dir/$override_file" ]]; then
    echo "An existing $app_dir/$override_file must be reviewed manually before migration." >&2
    exit 1
fi

source_bytes="$(du -sb "$source_dir" | awk '{print $1}')"
available_bytes="$(df -PB1 "$mount_point" | awk 'NR==2 {print $4}')"
[[ "$available_bytes" -gt "$source_bytes" ]] || {
    echo "The target volume does not have enough free space." >&2
    exit 1
}

database_list="$(docker exec "$pg" psql -U postgres -d postgres -Atc \
    "SELECT string_agg(datname, ', ' ORDER BY datname) FROM pg_database WHERE datistemplate = false;")"

printf 'PostgreSQL container: %s\n' "$(docker inspect "$pg" --format '{{.Name}}' | sed 's#^/##')"
printf 'Current mount type:  %s\n' "$source_mount_type"
printf 'Current data path:   %s\n' "$source_dir"
printf 'Current data size:   %s\n' "$(du -sh "$source_dir" | awk '{print $1}')"
printf 'Target filesystem:   %s\n' "$(findmnt -n -o SOURCE,FSTYPE "$mount_point")"
printf 'Target free space:   %s\n' "$(df -h "$mount_point" | awk 'NR==2 {print $4}')"
printf 'Databases:           %s\n' "$database_list"
REMOTE
)"
printf '%s\n' "$PREFLIGHT_OUTPUT"

if [[ "$PREFLIGHT_ONLY" == true ]]; then
    echo
    echo "Preflight passed. No changes were made."
    exit 0
fi

echo
echo "The migration will:"
echo "  1. Create a compressed pg_dumpall backup under $APP_DIR/backups."
echo "  2. Stop PostgreSQL, Umami, and Listmonk."
echo "  3. Copy PostgreSQL data to $DEST_DIR."
echo "  4. Install $APP_DIR/$OVERRIDE_FILE with a bind mount."
echo "  5. Recreate PostgreSQL, verify it, then restart Umami and Listmonk."
echo
echo "The blog and Elroy docs remain online, but analytics and newsletters will"
echo "be unavailable during the copy and restart."
echo

require_typed_confirmation "MIGRATE POSTGRES" "This begins the maintenance window."

REMOTE_SCRIPT="/tmp/migrate-postgres-to-volume-$$.sh"
cleanup_remote_script() {
    ssh_run "rm -f '$REMOTE_SCRIPT'" >/dev/null 2>&1 || true
}
trap cleanup_remote_script EXIT

ssh_run "cat > '$REMOTE_SCRIPT' && chmod 700 '$REMOTE_SCRIPT'" <<'REMOTE'
#!/usr/bin/env bash
set -euo pipefail

app_dir="$1"
mount_point="$2"
dest_dir="$3"
override_file="$4"
timestamp="$(date -u +%Y%m%dT%H%M%SZ)"
backup_dir="$app_dir/backups"
override_path="$app_dir/$override_file"
override_backup=""
services_stopped=false
override_installed=false

confirm_checkpoint() {
    local prompt="$1"
    local reply

    echo
    read -r -p "$prompt [y/N] " reply
    [[ "$reply" =~ ^[Yy]$ ]] || {
        echo "Migration cancelled at checkpoint." >&2
        return 1
    }
}

rollback() {
    local exit_code=$?
    trap - ERR
    echo
    echo "Migration failed. Attempting rollback..."

    cd "$app_dir"
    if [[ "$override_installed" == true ]]; then
        rm -f "$override_path"
        if [[ -n "$override_backup" && -f "$override_backup" ]]; then
            mv "$override_backup" "$override_path"
        fi
    fi

    if [[ "$services_stopped" == true ]]; then
        docker compose up -d --force-recreate postgres || true
        docker compose up -d umami listmonk || true
    fi

    echo "Rollback attempt finished. Inspect 'docker compose ps' and service logs."
    exit "$exit_code"
}
trap rollback ERR

cd "$app_dir"
pg="$(docker ps -q --filter label=com.docker.compose.service=postgres | head -1)"
[[ -n "$pg" ]]
source_dir="$(
    docker inspect "$pg" \
        --format '{{range .Mounts}}{{if eq .Destination "/var/lib/postgresql/data"}}{{.Source}}{{end}}{{end}}'
)"

mkdir -p "$backup_dir"
backup_path="$backup_dir/postgres-before-volume-$timestamp.sql.gz"
echo "Creating logical backup: $backup_path"
docker exec "$pg" pg_dumpall -U postgres | gzip -9 > "$backup_path"
gzip -t "$backup_path"
test -s "$backup_path"
confirm_checkpoint "Backup verified at $backup_path. Stop services and begin the data copy?"

echo "Stopping Listmonk, Umami, and PostgreSQL..."
docker compose stop listmonk umami postgres
services_stopped=true

echo "Copying PostgreSQL data to $dest_dir..."
mkdir -p "$dest_dir"
rsync -aHAX --numeric-ids --delete "$source_dir/" "$dest_dir/"

source_manifest="$(mktemp)"
dest_manifest="$(mktemp)"
trap 'rm -f "$source_manifest" "$dest_manifest"' EXIT
(
    cd "$source_dir"
    find . -xdev -type f -printf '%P %s\n' | sort
) > "$source_manifest"
(
    cd "$dest_dir"
    find . -xdev -type f -printf '%P %s\n' | sort
) > "$dest_manifest"
cmp "$source_manifest" "$dest_manifest"
rm -f "$source_manifest" "$dest_manifest"
trap - EXIT
confirm_checkpoint "Data copy verified. Install the Compose override and start PostgreSQL from block storage?"

cat > "$override_path" <<EOF
services:
  postgres:
    volumes:
      - $dest_dir:/var/lib/postgresql/data
EOF
override_installed=true

echo "Validating merged Compose configuration..."
docker compose config >/dev/null

echo "Recreating PostgreSQL with the block-storage bind mount..."
docker compose up -d --force-recreate postgres

pg="$(docker ps -q --filter label=com.docker.compose.service=postgres | head -1)"
for attempt in $(seq 1 30); do
    health="$(docker inspect "$pg" --format '{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}')"
    if [[ "$health" == "healthy" ]]; then
        break
    fi
    if [[ "$attempt" -eq 30 ]]; then
        echo "PostgreSQL did not become healthy." >&2
        docker compose logs --tail=100 postgres >&2
        exit 1
    fi
    sleep 2
done

actual_source="$(
    docker inspect "$pg" \
        --format '{{range .Mounts}}{{if eq .Destination "/var/lib/postgresql/data"}}{{.Source}}{{end}}{{end}}'
)"
[[ "$actual_source" == "$dest_dir" ]] || {
    echo "PostgreSQL started with unexpected data source: $actual_source" >&2
    exit 1
}

docker exec "$pg" psql -U postgres -d listmonk -Atc "SELECT 1;" >/dev/null
docker exec "$pg" psql -U postgres -d umami -Atc "SELECT 1;" >/dev/null
confirm_checkpoint "PostgreSQL is healthy and both databases respond. Restart Umami and Listmonk?"

echo "Starting Umami and Listmonk..."
docker compose up -d umami listmonk

docker compose ps
trap - ERR

echo
echo "Migration completed."
echo "Logical backup: $backup_path"
echo "Original Docker data remains at: $source_dir"
echo "Do not remove the original Docker volume until production has been verified."
REMOTE

ssh -tt -o BatchMode=yes "root@$HOST" "$REMOTE_SCRIPT" \
    "$APP_DIR" "$MOUNT_POINT" "$DEST_DIR" "$OVERRIDE_FILE"
