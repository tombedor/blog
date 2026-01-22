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
static/
  diagrams/        # Excalidraw diagrams organized by post name
    {post-name}/   # Each blog post has its own diagram directory
docusaurus.config.ts  # Main Docusaurus configuration
scripts/
  excalidraw-export.sh  # Export excalidraw files to PNG
```

## Key Configuration

- **Blog-first setup**: Blog is served at the site root (`/`), docs feature is disabled
- **Content**: All blog posts are markdown files in the `blog/` directory
- **Styling**: Custom CSS in `src/css/custom.css`, uses Prism themes for syntax highlighting
- **GitHub Pages**: Configured with `trailingSlash: true` for proper routing

## Content Editing Policy

When asked for feedback on blog post structure or content, Claude should provide suggestions and feedback only. Do NOT make direct edits to blog posts unless explicitly approved. The content should come from the author - Claude can propose specific edits, but must wait for approval before making changes to blog content.

## Dual Publishing

This blog is configured to dual-publish content to the Elroy project blog at `../elroy/docs/blog/`. Use `just dual-publish` or `npm run dual-publish` to sync blog posts and diagrams to the Elroy project. See `DUAL-PUBLISH.md` for details.

## Diagrams

Blog diagrams are created with Excalidraw and stored in `static/diagrams/{post-name}/`. The directory structure follows blog post slugs (e.g., diagrams for `ai-is-a-floor-raiser.md` go in `static/diagrams/ai-is-a-floor-raiser/`).

Diagrams are exported to PNG using `scripts/excalidraw-export.sh`, which uses hash-based caching to skip unchanged files. The export process:
1. Computes SHA-256 hash of each `.excalidraw` file
2. Stores hashes in `static/diagrams/.diagram_hashes/` (gitignored)
3. Skips export if the file hash hasn't changed
4. Supports `-f` flag to force re-export all files

## Available Commands

See the `Justfile` for common development and deployment commands:

- `just build` - Build the production bundle
- `just serve` - Serve the production build locally
- `just deploy` - Deploy to GitHub Pages
- `just dual-publish` - Sync blog posts to Elroy project
- `just export-diagrams` - Export all excalidraw diagrams to PNG (with caching)

You can also use npm scripts directly:
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run typecheck` - Run TypeScript type checking
- `npm run dual-publish` - Sync blog posts to Elroy project

Diagram export script usage:
- `./scripts/excalidraw-export.sh -r static/diagrams` - Export all diagrams (skips unchanged)
- `./scripts/excalidraw-export.sh -f -r static/diagrams` - Force re-export all diagrams
- `./scripts/excalidraw-export.sh <file.excalidraw>` - Export single file
