#!/usr/bin/env bash
set -euo pipefail

## Setup script for DigitalOcean App Platform services (Umami analytics + Listmonk email)
## Prerequisites: doctl CLI authenticated (doctl auth init)

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_SPEC="$SCRIPT_DIR/app-spec.yaml"

# --- Configuration ---
UMAMI_DOMAIN="${UMAMI_DOMAIN:-analytics.tombedor.dev}"
LISTMONK_DOMAIN="${LISTMONK_DOMAIN:-mail.tombedor.dev}"

echo "=== Blog Services Setup (DigitalOcean App Platform) ==="
echo ""
echo "This will deploy:"
echo "  - Umami analytics  -> $UMAMI_DOMAIN"
echo "  - Listmonk email   -> $LISTMONK_DOMAIN"
echo "  - Shared PostgreSQL dev database"
echo ""

# Check doctl is available and authenticated
if ! command -v doctl &>/dev/null; then
    echo "ERROR: doctl CLI not found. Install it:"
    echo "  brew install doctl    # macOS"
    echo "  snap install doctl    # Linux"
    echo "  https://docs.digitalocean.com/reference/doctl/how-to/install/"
    exit 1
fi

if ! doctl account get &>/dev/null; then
    echo "ERROR: doctl not authenticated. Run: doctl auth init"
    exit 1
fi

echo "doctl authenticated as: $(doctl account get --format Email --no-header)"
echo ""

# Generate secrets
APP_SECRET=$(openssl rand -hex 32)
ADMIN_PASSWORD=$(openssl rand -base64 16 | tr -d '=/+' | head -c 20)

# Create a working copy of the app spec with secrets filled in
TEMP_SPEC=$(mktemp)
trap "rm -f $TEMP_SPEC" EXIT

sed \
    -e "s/REPLACE_WITH_RANDOM_SECRET/$APP_SECRET/" \
    -e "s/REPLACE_WITH_ADMIN_PASSWORD/$ADMIN_PASSWORD/" \
    "$APP_SPEC" > "$TEMP_SPEC"

echo "Creating app on DigitalOcean App Platform..."
APP_ID=$(doctl apps create --spec "$TEMP_SPEC" --format ID --no-header 2>&1)

if [ $? -ne 0 ]; then
    echo "ERROR: Failed to create app: $APP_ID"
    exit 1
fi

echo ""
echo "=== App created successfully ==="
echo ""
echo "App ID: $APP_ID"
echo ""
echo "Listmonk admin credentials (SAVE THESE):"
echo "  Username: admin"
echo "  Password: $ADMIN_PASSWORD"
echo ""
echo "=== MANUAL STEPS REQUIRED ==="
echo ""
echo "1. Wait for the initial deployment to complete:"
echo "   doctl apps list"
echo "   doctl apps get $APP_ID"
echo ""
echo "2. Get the default app URLs:"
echo "   doctl apps get $APP_ID --format DefaultIngress"
echo ""
echo "3. Initialize the Listmonk database (run once after first deploy):"
echo "   Open the Listmonk URL and it should auto-initialize on first run."
echo "   If not, you may need to run the --install flag manually via console."
echo ""
echo "4. Configure custom domains in the DO console:"
echo "   https://cloud.digitalocean.com/apps/$APP_ID/settings"
echo "   - Add $UMAMI_DOMAIN for the umami service"
echo "   - Add $LISTMONK_DOMAIN for the listmonk service"
echo ""
echo "5. Add DNS CNAME records (in your DNS provider):"
echo "   $UMAMI_DOMAIN    -> CNAME to the umami app URL"
echo "   $LISTMONK_DOMAIN -> CNAME to the listmonk app URL"
echo ""
echo "6. Set up Umami:"
echo "   a. Open https://$UMAMI_DOMAIN and log in (default: admin/umami)"
echo "   b. CHANGE THE DEFAULT PASSWORD immediately"
echo "   c. Go to Settings > Websites > Add website"
echo "   d. Add 'tombedor.dev' as a website"
echo "   e. Copy the Website ID (UUID) for the tracking script"
echo "   f. Update UMAMI_WEBSITE_ID in docusaurus.config.ts"
echo ""
echo "7. Set up Listmonk:"
echo "   a. Open https://$LISTMONK_DOMAIN and log in with credentials above"
echo "   b. Go to Settings and configure:"
echo "      - Site name, admin email"
echo "      - SMTP settings for sending emails (see SETUP.md for options)"
echo "   c. Create a mailing list (e.g., 'Blog Updates')"
echo "   d. Note the list UUID for the subscription form"
echo "   e. Update LISTMONK_URL and LISTMONK_LIST_UUID in the blog config"
echo ""
echo "8. Configure SMTP for Listmonk (pick one):"
echo "   - Mailgun: sign up at mailgun.com, verify domain, get SMTP credentials"
echo "   - Amazon SES: set up in AWS console, verify domain"
echo "   - Resend: sign up at resend.com, verify domain, use SMTP relay"
echo "   - Postmark: sign up at postmarkapp.com"
echo ""
echo "Done! See infra/SETUP.md for detailed instructions."
