#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
SRC_DIR="$ROOT_DIR/data"
DST_DIR="$ROOT_DIR/static/data"

mkdir -p "$DST_DIR"
rsync -a --delete "$SRC_DIR/" "$DST_DIR/"
