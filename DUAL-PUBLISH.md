# Dual Publishing to Elroy Blog

This blog is configured to dual-publish content to the Elroy project blog at `../elroy/docs/blog/`.

## How It Works

The `dual-publish.js` script syncs:
- **Blog posts**: From `./blog/` to `../elroy/docs/blog/posts/`
- **Diagrams**: From `./static/diagrams/` to `../elroy/docs/blog/diagrams/`

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

The script will overwrite files in the Elroy blog, so any changes made there will be lost. This is a one-way sync from this blog to Elroy.

## What Gets Published

- ✅ All `.md` files from `./blog/`
- ✅ All files and subdirectories from `./static/diagrams/`
- ✅ Preserves directory structure for diagrams

## Notes

- The script assumes the Elroy project is located at `../elroy/` (sibling directory)
- Image references using `/diagrams/...` paths will work correctly in both blogs
- The script creates target directories if they don't exist
