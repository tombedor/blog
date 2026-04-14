set shell := ["zsh", "-c"]
set dotenv-load := true

# Builds the production bundle
build:
	npm run build

# Starts the development server
serve:
	pnpm start

# Creates a new blog post with frontmatter and diagram directory
new-post title:
	./scripts/new-post.sh "{{title}}"

# Deploys the site to GitHub Pages
deploy:
	./scripts/check-new-posts.sh && GIT_USER=tombedor npm run deploy

# Builds ../elroy docs and publishes them to the DigitalOcean host managed by infrastructure/terraform
deploy-elroy-docs HOST="" PORT="22" USER="root" DEST_PATH="/opt/analytics/elroy-docs":
	#!/usr/bin/env bash
	set -euo pipefail

	if [ ! -d ../elroy ]; then
		echo "Expected sibling elroy repo at ../elroy"
		exit 1
	fi

	host="{{HOST}}"
	if [ -z "$host" ]; then
		host="${HOST_IP:-}"
	fi
	if [ -z "$host" ]; then
		host="$(terraform -chdir=infrastructure/terraform output -raw reserved_ip 2>/dev/null || terraform -chdir=infrastructure/terraform output -raw droplet_ip)"
	fi
	host="$(printf '%s' "$host" | tr -d '\r\n[:space:]')"
	if [ -z "$host" ]; then
		echo "No host configured. Set HOST, HOST_IP in .env, or terraform outputs."
		exit 1
	fi

	echo "Building Elroy docs from ../elroy"
	(
		cd ../elroy
		just docs-build
	)

	echo "Publishing docs to $host:{{DEST_PATH}}"
	tar -C ../elroy/site -czf - . | ssh -p "{{PORT}}" "{{USER}}@$host" "
		set -euo pipefail
		DEST_PATH='{{DEST_PATH}}'
		TMP_PATH=\"\${DEST_PATH}.incoming\"
		rm -rf \"\$TMP_PATH\"
		mkdir -p \"\$TMP_PATH\" \"\$DEST_PATH\"
		tar -xzf - -C \"\$TMP_PATH\"
		find \"\$DEST_PATH\" -mindepth 1 -maxdepth 1 -exec rm -rf {} +
		cp -a \"\$TMP_PATH\"/. \"\$DEST_PATH\"/
		rm -rf \"\$TMP_PATH\"
	"

	echo "Elroy docs deployed to $host:{{DEST_PATH}}"

# Preview the deployed Elroy docs over the droplet IP using the Host header Caddy expects
preview-elroy-docs HOST="" REQUEST_PATH="/" SHOW_HEADERS="false":
	#!/usr/bin/env bash
	set -euo pipefail

	host="{{HOST}}"
	if [ -z "$host" ]; then
		host="${HOST_IP:-}"
	fi
	if [ -z "$host" ]; then
		host="$(terraform -chdir=infrastructure/terraform output -raw reserved_ip 2>/dev/null || terraform -chdir=infrastructure/terraform output -raw droplet_ip)"
	fi
	host="$(printf '%s' "$host" | tr -d '\r\n[:space:]')"
	if [ -z "$host" ]; then
		echo "No host configured. Set HOST, HOST_IP in .env, or terraform outputs."
		exit 1
	fi

	path="{{REQUEST_PATH}}"
	if [ -z "$path" ]; then
		path="/"
	fi

	if [ "{{SHOW_HEADERS}}" = "true" ]; then
		curl -k -i --resolve "elroy.bot:443:$host" "https://elroy.bot$path"
	else
		curl -k -L --resolve "elroy.bot:443:$host" "https://elroy.bot$path"
	fi

# Dual publish blog posts to elroy project
dual-publish:
	npm run dual-publish

# Export all excalidraw diagrams to PNG
export-diagrams:
	./scripts/excalidraw-export.sh -r static/diagrams

# Send a test newsletter for a specific post to the configured test list
newsletter-test post:
	node ./scripts/send-newsletter.mjs test "{{post}}"

# Send a newsletter for a specific post to subscribers
newsletter-send post:
	node ./scripts/send-newsletter.mjs send "{{post}}"
