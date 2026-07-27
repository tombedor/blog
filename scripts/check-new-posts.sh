#!/bin/bash

RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m'

if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${RED}Error: Not in a git repository${NC}"
    exit 1
fi

if ! git rev-parse --verify gh-pages > /dev/null 2>&1; then
    echo -e "${YELLOW}Warning: gh-pages branch not found. Cannot detect new posts.${NC}"
    echo "Proceeding with deployment..."
    exit 0
fi

# Blog post source files tracked in git
CURRENT_POSTS=$(git ls-files 'blog/*.md' 'blog/*.mdx' 2>/dev/null | sort)

# gh-pages stores built HTML, not markdown. Each post is deployed as
# <slug>/index.html at the root. Collect those slugs to detect what's live.
DEPLOYED_SLUGS=$(git ls-tree -r --name-only gh-pages 2>/dev/null \
    | grep -E '^[^/]+/index\.html$' \
    | sed 's|/index\.html$||' \
    | sort)

# Find posts whose slug is not yet deployed
NEW_POSTS=""
while IFS= read -r post; do
    [ -z "$post" ] && continue
    filename=$(basename "$post")
    slug="${filename%.*}"
    # Respect custom slug: frontmatter if present
    fm_slug=$(grep -m1 "^slug:" "$post" 2>/dev/null | sed 's/^slug:[[:space:]]*//' | tr -d '"'"'")
    [ -n "$fm_slug" ] && slug="$fm_slug"
    if ! echo "$DEPLOYED_SLUGS" | grep -qx "$slug"; then
        NEW_POSTS="${NEW_POSTS}${post}"$'\n'
    fi
done <<< "$CURRENT_POSTS"

if [ -z "$NEW_POSTS" ]; then
    echo -e "${GREEN}No new blog posts detected.${NC}"
    exit 0
fi

# Filter out drafts
POSTS_TO_PUBLISH=""
while IFS= read -r post; do
    [ -z "$post" ] && continue
    if ! grep -q "^draft: true" "$post" 2>/dev/null; then
        POSTS_TO_PUBLISH="${POSTS_TO_PUBLISH}  - ${post}"$'\n'
    fi
done <<< "$NEW_POSTS"

if [ -z "$POSTS_TO_PUBLISH" ]; then
    echo -e "${GREEN}No new posts to publish (all new posts are drafts).${NC}"
    exit 0
fi

echo -e "${YELLOW}⚠️  WARNING: New blog posts will be published!${NC}"
echo ""
echo "The following posts will go live:"
printf '%s' "$POSTS_TO_PUBLISH"
echo ""

read -p "Do you want to proceed with deployment? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${RED}Deployment cancelled.${NC}"
    exit 1
fi

echo -e "${GREEN}Proceeding with deployment...${NC}"
exit 0
