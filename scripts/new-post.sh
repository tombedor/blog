#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if title is provided
if [ -z "$1" ]; then
    echo "${RED}Error: Post title is required${NC}"
    echo "Usage: just new-post \"Post Title\""
    exit 1
fi

TITLE="$1"

# Generate slug from title (lowercase, replace spaces with hyphens, remove special chars)
SLUG=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9 -]//g' | sed -E 's/ +/-/g')

# Get current date in YYYY-MM-DD format
DATE=$(date +%Y-%m-%d)

# Define file paths
POST_FILE="blog/${SLUG}.md"
DIAGRAM_DIR="static/diagrams/${SLUG}"

# Check if post already exists
if [ -f "$POST_FILE" ]; then
    echo "${RED}Error: Post already exists at $POST_FILE${NC}"
    exit 1
fi

# Create the blog post with frontmatter
cat > "$POST_FILE" << EOF
---
title: $TITLE
date: $DATE
draft: true
---

EOF

# Create diagram directory
mkdir -p "$DIAGRAM_DIR"

echo "${GREEN}✓ Created new blog post:${NC}"
echo "  File: $POST_FILE"
echo "  Diagrams: $DIAGRAM_DIR/"
echo ""
echo "Edit your post at: $POST_FILE"
