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
research/           # Research briefs and source notes organized by post name
  {post-name}/      # Each blog post has its own research directory
    brief.md        # Main research brief (claims, fact-checks, counterarguments)
    {source}.md     # Individual source notes
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

## Writing Style

These patterns are consistent across published posts and should inform suggestions and feedback:

**Tone**
- Opinionated but self-aware — the author states strong positions while explicitly acknowledging when reasoning is based on limited evidence or intuition ("my evidence is, as I should have stated, _vibes_")
- Conversational-professional: first-person grounded in personal experience, but posts are idea-centric, not author-centric
- Meta-commentary is welcome; acknowledging the limits of an argument is part of the style

**Structure**
- Posts typically follow one of a few patterns: Problem→Analysis→Solution, Conceptual Framework→Examples, Advice by stage, or Narrative/Reflection
- Length: 1,000–3,000 words; tightly scoped
- `<!-- truncate -->` tag belongs ~100–200 words in, after an opening hook or framing paragraph
- Sections use H2 headers; H3 used only for nested subsections in longer posts

**Prose vs. lists**
- Prose for argument, analysis, and explanation
- Bulleted/numbered lists for categorical or comparative information (pros/cons, steps, options)

**Footnotes**
- Used heavily (3–6 per post) for asides, caveats, humor, and definitions that would interrupt the main argument
- Preferred over inline parentheticals when the aside is more than a few words

**Diagrams**
- Most published posts include 2–4 diagrams that illustrate core concepts — they are central content, not decoration
- When suggesting structure for a new post, consider where diagrams would carry the argument

## Reviews

When asked to review a post, be sure to examine any images linked from the post. Evaluate them as part of the content, and keep in mind they will appear within the text

## Content Editing Policy

**The writing must come from the author.** Claude can help with suggestions but should not edit blog post files with content unless explicitly instructed.

When creating new blog posts:
- Create the file with frontmatter (title, date, draft: true)
- Leave the body empty or with minimal placeholders (section headers only)
- Do NOT write any actual content, paragraphs, or prose into the file

When asked for feedback or content suggestions:
- CAN write suggested content, paragraphs, or prose in the chat response
- CAN propose specific edits and revisions
- Do NOT edit the actual blog post file with content unless explicitly told to do so
- The author will review suggestions and incorporate them manually

## Dual Publishing

This blog is configured to dual-publish content to the Elroy project blog at `../elroy/docs/blog/`. Use `just dual-publish` or `npm run dual-publish` to sync blog posts and diagrams to the Elroy project. See `DUAL-PUBLISH.md` for details.

## Research

Research for blog posts is stored in `research/{post-name}/`. The directory name matches the blog post slug (e.g., research for `open-source-models.mdx` goes in `research/open-source-models/`).

Each post's research directory contains:
- `brief.md` — the main research brief: fact-checks of post claims, source summaries, and counterarguments
- Individual source files (e.g., `hn-thread.md`, `paper-notes.md`) — detailed notes on specific sources

When asked to do research for a post:
- Update or create `research/{post-name}/brief.md` with findings
- Add separate source files for substantial individual sources
- Maintain a sources section in `brief.md` linking to source files
- Do NOT edit the actual blog post file — research output goes only in `research/`

Research briefs should be ONE PAGE.
Research briefs should be information-dense and scan-friendly: prefer claim/evidence/source bullets over narrative prose.
Put nuance and extended caveats in source-note files, not in the brief.
Research briefs should be dry research memos, not post outlines: organize by research topic or by claim being supported/refuted.
In `brief.md`, put links directly under the relevant topic/claim heading instead of collecting advice about how to use the material in the post.
When sources contain especially useful wording, capture short pull quotes in the brief where possible for later reuse.

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
