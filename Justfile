set shell := ["zsh", "-c"]

# Builds the production bundle
build:
	npm run build

# Serves the production build locally
serve:
	npm run serve

# Deploys the site to GitHub Pages
deploy:
	GIT_USER=tombedor npm run deploy
