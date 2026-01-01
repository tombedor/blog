set shell := ["zsh", "-c"]

# Builds the production bundle
build:
	npm run build

# Starts the development server
serve:
	pnpm start

# Deploys the site to GitHub Pages
deploy:
	GIT_USER=tombedor npm run deploy

# Dual publish blog posts to elroy project
dual-publish:
	npm run dual-publish

# Export all excalidraw diagrams to PNG
export-diagrams:
	./scripts/excalidraw-export.sh -r static/diagrams
