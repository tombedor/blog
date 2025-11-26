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
