# Dual Publishing to Elroy Blog

This blog is configured to dual-publish content to the Elroy project blog at `../elroy/docs/blog/`.

## How It Works

The `dual-publish.js` script syncs:
- **Blog posts**: From `./blog/` to `../elroy/docs/blog/posts/`
  - Automatically rewrites absolute image paths (`/diagrams/` or `/blog/diagrams/`) to relative paths (`../diagrams/`) for MkDocs compatibility
  - Skips posts marked as `draft: true` or `dualPublish: false`
- **Diagrams**: From `./static/diagrams/` to `../elroy/docs/blog/diagrams/`
- **Social cards**: From `./static/social-cards/` to `../elroy/docs/blog/social-cards/`

Both blogs use Markdown with YAML frontmatter, so no format conversion is needed.

## Usage

Run the dual-publish script using either:

```bash
# Using npm
npm run dual-publish

# Using just
just dual-publish
```

## When to Use

Run the dual-publish script:
- After adding a new blog post
- After updating an existing blog post
- After adding or modifying diagrams
- After changing a post title or regenerating social cards

The script will overwrite files in the Elroy blog, so any changes made there will be lost. This is a one-way sync from this blog to Elroy.

## What Gets Published

- ✅ All `.md` files from `./blog/` (except drafts and excluded posts)
- ✅ All files and subdirectories from `./static/diagrams/`
- ✅ Preserves directory structure for diagrams
- ✅ Generated social cards from `./static/social-cards/`

## Controlling What Gets Published

You can control which posts are dual-published using frontmatter metadata:

### Excluding Drafts

Posts with `draft: true` are automatically skipped:

```yaml
---
title: "Work in Progress"
date: 2025-11-26
draft: true
---
```

### Excluding Specific Posts

To keep a post published on this blog but exclude it from dual-publishing to Elroy, add `dualPublish: false`:

```yaml
---
title: "Blog-Specific Post"
date: 2025-11-26
dualPublish: false
---
```

## Notes

- The script assumes the Elroy project is located at `../elroy/` (sibling directory)
- Image paths are automatically transformed during publishing:
  - In this blog (Docusaurus): Use `/diagrams/...` paths
  - In Elroy blog (MkDocs): Paths are automatically rewritten to relative `../diagrams/...` paths
  - Social card frontmatter is rewritten from `/social-cards/...` to `../social-cards/...`
- The script creates target directories if they don't exist
- This is a one-way sync - changes made directly to the Elroy blog will be overwritten
