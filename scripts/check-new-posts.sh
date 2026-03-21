#!/bin/bash

# Colors for output
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "${RED}Error: Not in a git repository${NC}"
    exit 1
fi

# Check if gh-pages branch exists
if ! git rev-parse --verify gh-pages > /dev/null 2>&1; then
    echo "${YELLOW}Warning: gh-pages branch not found. Cannot detect new posts.${NC}"
    echo "Proceeding with deployment..."
    exit 0
fi

# Get current branch name
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Get list of blog posts in current branch
CURRENT_POSTS=$(git ls-files 'blog/*.md' 'blog/*.mdx' 2>/dev/null | sort)

# Get list of blog posts in gh-pages branch
DEPLOYED_POSTS=$(git ls-tree -r --name-only gh-pages blog/ 2>/dev/null | grep -E '\.(md|mdx)$' | sort)

# Find new posts (in current but not in deployed)
NEW_POSTS=$(comm -23 <(echo "$CURRENT_POSTS") <(echo "$DEPLOYED_POSTS"))

if [ -z "$NEW_POSTS" ]; then
    echo "${GREEN}No new blog posts detected.${NC}"
    exit 0
fi

# Check which new posts will actually be published (not drafts)
POSTS_TO_PUBLISH=""
while IFS= read -r post; do
    if [ -f "$post" ] && ! grep -q "^draft: true" "$post" 2>/dev/null; then
        POSTS_TO_PUBLISH="${POSTS_TO_PUBLISH}${post}\n"
    fi
done <<< "$NEW_POSTS"

# If no new posts will be published, proceed silently
if [ -z "$POSTS_TO_PUBLISH" ]; then
    echo "${GREEN}No new posts to publish (all new posts are drafts).${NC}"
    exit 0
fi

# Display posts that will be published
echo "${YELLOW}⚠️  WARNING: New blog posts will be published!${NC}"
echo ""
echo "The following posts will go live:"
echo -e "$POSTS_TO_PUBLISH" | while read -r post; do
    [ -z "$post" ] && continue
    echo "  - $post"
done
echo ""

# Ask for confirmation
read -p "Do you want to proceed with deployment? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "${RED}Deployment cancelled.${NC}"
    exit 1
fi

echo "${GREEN}Proceeding with deployment...${NC}"
exit 0
