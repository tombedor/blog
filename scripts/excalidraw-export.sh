#!/bin/bash

# Excalidraw Export Wrapper
# Exports .excalidraw files to PNG using excalidraw-brute-export-cli
#
# Usage:
#   excalidraw-export <file.excalidraw>        # Export single file
#   excalidraw-export <folder>                 # Export all files in folder
#   excalidraw-export -r <folder>              # Export recursively

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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
    exit 1
fi

# Parse arguments
RECURSIVE=false
TARGET=""

if [ "$1" = "-r" ]; then
    RECURSIVE=true
    TARGET="$2"
    if [ -z "$TARGET" ]; then
        echo -e "${RED}Error: -r flag requires a directory path${NC}"
        exit 1
    fi
else
    TARGET="$1"
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

# Export each file
SUCCESS_COUNT=0
FAIL_COUNT=0

for INPUT_FILE in "${FILES[@]}"; do
    # Generate output filename (replace .excalidraw with .png)
    OUTPUT_FILE="${INPUT_FILE%.excalidraw}.png"

    echo -e "${BLUE}Exporting: $INPUT_FILE -> $OUTPUT_FILE${NC}"

    # Call excalidraw-brute-export-cli
    if excalidraw-brute-export-cli \
        --input "$INPUT_FILE" \
        --output "$OUTPUT_FILE" \
        --format png \
        --scale 2 \
        2>&1 | grep -v "Warning:" | grep -v "deprecated"; then
        echo -e "${GREEN}✓ Exported: $OUTPUT_FILE${NC}"
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
    echo -e "${GREEN}Successfully exported all ${SUCCESS_COUNT} file(s)${NC}"
else
    echo -e "Exported: ${GREEN}${SUCCESS_COUNT}${NC} | Failed: ${RED}${FAIL_COUNT}${NC}"
fi
