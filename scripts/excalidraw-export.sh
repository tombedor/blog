#!/bin/bash

# Excalidraw Export Wrapper
# Exports .excalidraw files to PNG using excalidraw-brute-export-cli
# Uses hash-based caching to skip exports when files haven't changed
#
# Usage:
#   excalidraw-export <file.excalidraw>        # Export single file
#   excalidraw-export <folder>                 # Export all files in folder
#   excalidraw-export -r <folder>              # Export recursively
#   excalidraw-export -f <folder>              # Force export (ignore cache)

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

# Hash cache directory
HASH_DIR="static/diagrams/.diagram_hashes"

# Check if excalidraw-brute-export-cli is installed
if ! command -v excalidraw-brute-export-cli &> /dev/null; then
    echo -e "${RED}Error: excalidraw-brute-export-cli is not installed${NC}"
    echo "Install it with: npm install -g excalidraw-brute-export-cli"
    exit 1
fi

# Show usage if no arguments
if [ $# -eq 0 ]; then
    echo "Usage:"
    echo "  excalidraw-export <file.excalidraw>  # Export single file"
    echo "  excalidraw-export <folder>           # Export all files in folder"
    echo "  excalidraw-export -r <folder>        # Export recursively"
    echo "  excalidraw-export -f <folder>        # Force export (ignore cache)"
    exit 1
fi

# Parse arguments
RECURSIVE=false
FORCE=false
TARGET=""

# Parse flags
while [[ $# -gt 0 ]]; do
    case "$1" in
        -r)
            RECURSIVE=true
            shift
            ;;
        -f)
            FORCE=true
            shift
            ;;
        *)
            TARGET="$1"
            shift
            ;;
    esac
done

if [ -z "$TARGET" ]; then
    echo -e "${RED}Error: No target path specified${NC}"
    exit 1
fi

# Check if target exists
if [ ! -e "$TARGET" ]; then
    echo -e "${RED}Error: Path does not exist: $TARGET${NC}"
    exit 1
fi

# Find all .excalidraw files
FILES=()

if [ -f "$TARGET" ]; then
    # Single file
    if [[ "$TARGET" != *.excalidraw ]]; then
        echo -e "${RED}Error: File must have .excalidraw extension${NC}"
        exit 1
    fi
    FILES=("$TARGET")
elif [ -d "$TARGET" ]; then
    # Directory - find files
    if [ "$RECURSIVE" = true ]; then
        while IFS= read -r -d '' file; do
            FILES+=("$file")
        done < <(find "$TARGET" -type f -name "*.excalidraw" -print0)
    else
        while IFS= read -r -d '' file; do
            FILES+=("$file")
        done < <(find "$TARGET" -maxdepth 1 -type f -name "*.excalidraw" -print0)
    fi

    if [ ${#FILES[@]} -eq 0 ]; then
        echo "No .excalidraw files found"
        exit 0
    fi

    echo -e "${BLUE}Found ${#FILES[@]} file(s) to export${NC}"
else
    echo -e "${RED}Error: Invalid path${NC}"
    exit 1
fi

# Create hash directory if it doesn't exist
mkdir -p "$HASH_DIR"

# Function to compute file hash
compute_hash() {
    shasum -a 256 "$1" | awk '{print $1}'
}

# Function to get hash file path for an excalidraw file
get_hash_file() {
    local input_file="$1"
    # Replace slashes with underscores and remove leading ./
    local hash_filename=$(echo "$input_file" | sed 's|^\./||' | sed 's|/|__|g')
    echo "$HASH_DIR/${hash_filename}.hash"
}

# Function to check if export is needed
needs_export() {
    local input_file="$1"
    local hash_file=$(get_hash_file "$input_file")

    # Force export if -f flag is set
    if [ "$FORCE" = true ]; then
        return 0
    fi

    # Export if hash file doesn't exist
    if [ ! -f "$hash_file" ]; then
        return 0
    fi

    # Export if current hash differs from stored hash
    local current_hash=$(compute_hash "$input_file")
    local stored_hash=$(cat "$hash_file")

    if [ "$current_hash" != "$stored_hash" ]; then
        return 0
    fi

    # No export needed
    return 1
}

# Function to save hash
save_hash() {
    local input_file="$1"
    local hash_file=$(get_hash_file "$input_file")
    local current_hash=$(compute_hash "$input_file")
    echo "$current_hash" > "$hash_file"
}

# Function to update markdown files with image links
update_markdown_links() {
    local diagram_file="$1"

    # Extract post slug and diagram name from path
    # e.g., static/diagrams/ai-threatens-privacy/pick-0.excalidraw
    # -> post_slug: ai-threatens-privacy, diagram_name: pick-0
    if [[ "$diagram_file" =~ static/diagrams/([^/]+)/([^/]+)\.excalidraw ]]; then
        local post_slug="${BASH_REMATCH[1]}"
        local diagram_name="${BASH_REMATCH[2]}"
        local blog_file="blog/${post_slug}.md"

        # Check if blog post exists
        if [ ! -f "$blog_file" ]; then
            return
        fi

        # Create the image markdown
        local image_link="![${diagram_name}](/diagrams/${post_slug}/${diagram_name}.png)"
        local comment_pattern="<!-- ${diagram_name} -->"

        # Check if comment exists in the file
        if grep -q "$comment_pattern" "$blog_file"; then
            # Replace comment with image link
            sed -i '' "s|${comment_pattern}|${image_link}|g" "$blog_file"
            echo -e "${GREEN}  ↳ Updated link in $blog_file${NC}"
        fi
    fi
}

# Export each file
SUCCESS_COUNT=0
FAIL_COUNT=0
SKIP_COUNT=0

for INPUT_FILE in "${FILES[@]}"; do
    # Generate output filename (replace .excalidraw with .png)
    OUTPUT_FILE="${INPUT_FILE%.excalidraw}.png"

    # Check if export is needed
    if ! needs_export "$INPUT_FILE"; then
        echo -e "${YELLOW}⊘ Skipped (unchanged): $INPUT_FILE${NC}"
        ((SKIP_COUNT++))
        continue
    fi

    echo -e "${BLUE}Exporting: $INPUT_FILE -> $OUTPUT_FILE${NC}"

    # Call excalidraw-brute-export-cli
    if excalidraw-brute-export-cli \
        --input "$INPUT_FILE" \
        --output "$OUTPUT_FILE" \
        --format png \
        --scale 2 \
        2>&1 | grep -v "Warning:" | grep -v "deprecated"; then
        echo -e "${GREEN}✓ Exported: $OUTPUT_FILE${NC}"
        save_hash "$INPUT_FILE"
        update_markdown_links "$INPUT_FILE"
        ((SUCCESS_COUNT++))
    else
        echo -e "${RED}✗ Failed to export: $INPUT_FILE${NC}"
        ((FAIL_COUNT++))
    fi
    echo ""
done

# Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $FAIL_COUNT -eq 0 ]; then
    if [ $SKIP_COUNT -gt 0 ]; then
        echo -e "${GREEN}Exported: ${SUCCESS_COUNT}${NC} | ${YELLOW}Skipped: ${SKIP_COUNT}${NC} | Total: $((SUCCESS_COUNT + SKIP_COUNT))"
    else
        echo -e "${GREEN}Successfully exported all ${SUCCESS_COUNT} file(s)${NC}"
    fi
else
    echo -e "Exported: ${GREEN}${SUCCESS_COUNT}${NC} | ${YELLOW}Skipped: ${SKIP_COUNT}${NC} | Failed: ${RED}${FAIL_COUNT}${NC}"
fi
