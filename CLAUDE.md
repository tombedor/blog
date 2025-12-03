# Blog Architecture

This is a personal blog built with [Docusaurus](https://docusaurus.io/) v3.9.1, deployed to GitHub Pages at [tombedor.dev](https://tombedor.dev).

## Tech Stack

- **Framework**: Docusaurus 3.9.1 (static site generator)
- **Language**: TypeScript 5.6
- **Runtime**: React 19
- **Deployment**: GitHub Pages
- **Build Tool**: npm

## Project Structure

```
blog/               # Blog posts (Markdown/MDX files)
src/
  components/       # Custom React components
  css/             # Custom CSS styles
  pages/           # Custom pages
  theme/           # Theme customizations
static/            # Static assets (images, favicon, etc.)
docusaurus.config.ts  # Main Docusaurus configuration
```

## Key Configuration

- **Blog-first setup**: Blog is served at the site root (`/`), docs feature is disabled
- **Content**: All blog posts are markdown files in the `blog/` directory
- **Styling**: Custom CSS in `src/css/custom.css`, uses Prism themes for syntax highlighting
- **GitHub Pages**: Configured with `trailingSlash: true` for proper routing

## Dual Publishing

This blog is configured to dual-publish content to the Elroy project blog at `../elroy/docs/blog/`. Use `just dual-publish` or `npm run dual-publish` to sync blog posts and diagrams to the Elroy project. See `DUAL-PUBLISH.md` for details.

## Available Commands

See the `Justfile` for common development and deployment commands:

- `just build` - Build the production bundle
- `just serve` - Serve the production build locally
- `just deploy` - Deploy to GitHub Pages
- `just dual-publish` - Sync blog posts to Elroy project

You can also use npm scripts directly:
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run typecheck` - Run TypeScript type checking
- `npm run dual-publish` - Sync blog posts to Elroy project
