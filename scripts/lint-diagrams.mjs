#!/usr/bin/env node
// Lints Excalidraw diagrams for mobile legibility.
//
// For every diagram PNG referenced from a post (with a sibling .excalidraw
// source), estimates how large its text renders on a phone and how much the
// scene is shrunk to fit the column.
//
//   error:   any text renders below --min-text-px (default 12) on mobile
//   warning: scene is wider than --max-scene-width (default 600), so
//            Excalidraw's default font sizes end up too small on mobile
//
// Usage:
//   node scripts/lint-diagrams.mjs                 # diagrams referenced by posts
//   node scripts/lint-diagrams.mjs --all           # also unreferenced diagrams
//   node scripts/lint-diagrams.mjs a.excalidraw    # specific files
//   options: --min-text-px N --max-scene-width N --column-width N --strict
//
// Exits 1 on errors (or on warnings with --strict). Text inside embedded
// images (screenshots) is not measured.

import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// 390px phone viewport minus Docusaurus' 1rem container padding per side.
export const DEFAULT_COLUMN_WIDTH = 358;
export const DEFAULT_MIN_TEXT_PX = 12;
export const DEFAULT_MAX_SCENE_WIDTH = 600;
// Matches scripts/excalidraw-export.sh output: 2x scale, 10px padding per side.
const EXPORT_SCALE = 2;
const EXPORT_PADDING = 10;

export function sceneBounds(elements) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  const add = (x, y) => {
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  };
  for (const el of elements) {
    if (Array.isArray(el.points) && el.points.length > 0) {
      for (const [px, py] of el.points) add(el.x + px, el.y + py);
    } else {
      add(el.x, el.y);
      add(el.x + el.width, el.y + el.height);
    }
  }
  if (minX === Infinity) return {width: 0, height: 0};
  return {width: maxX - minX, height: maxY - minY};
}

// CSS width the image occupies on mobile, before the column cap is applied.
export function displayWidth({sceneWidth, columnWidth, widthPercent, maxWidthPx}) {
  const naturalCssWidth = (sceneWidth + 2 * EXPORT_PADDING) * EXPORT_SCALE;
  let width = Math.min(columnWidth, naturalCssWidth);
  if (widthPercent != null) width = Math.min(width, (columnWidth * widthPercent) / 100);
  if (maxWidthPx != null) width = Math.min(width, maxWidthPx);
  return width;
}

export function renderedPx(fontSize, sceneWidth, width) {
  return (fontSize * width) / (sceneWidth + 2 * EXPORT_PADDING);
}

// Finds diagram PNG references in post source, skipping MDX comments.
export function findDiagramRefs(source) {
  const refs = [];
  const pattern =
    /(\{\/\*[\s\S]*?\*\/\})|!\[[^\]]*\]\((\/diagrams\/[^)\s]+\.png)\)|<img\s[^>]*?src="(\/diagrams\/[^"]+\.png)"([^>]*)>/g;
  for (const match of source.matchAll(pattern)) {
    if (match[1]) continue;
    const url = match[2] ?? match[3];
    const attrs = match[4] ?? '';
    const widthPercent = attrs.match(/[{\s,]width:\s*['"](\d+(?:\.\d+)?)%['"]/);
    const maxWidthPx = attrs.match(/maxWidth:\s*['"](\d+(?:\.\d+)?)px['"]/);
    refs.push({
      url,
      widthPercent: widthPercent ? Number(widthPercent[1]) : null,
      maxWidthPx: maxWidthPx ? Number(maxWidthPx[1]) : null,
    });
  }
  return refs;
}

export function lintScene(scene, {columnWidth, minTextPx, maxSceneWidth, widthPercent = null, maxWidthPx = null}) {
  const elements = (scene.elements ?? []).filter((el) => !el.isDeleted);
  const {width: sceneWidth} = sceneBounds(elements);
  const width = displayWidth({sceneWidth, columnWidth, widthPercent, maxWidthPx});
  const issues = [];

  const texts = elements.filter((el) => el.type === 'text' && el.fontSize);
  const small = texts
    .map((el) => ({el, px: renderedPx(el.fontSize, sceneWidth, width)}))
    .filter(({px}) => px < minTextPx)
    .sort((a, b) => a.px - b.px);
  if (small.length > 0) {
    const neededFont = Math.ceil((minTextPx * (sceneWidth + 2 * EXPORT_PADDING)) / width);
    const sample = small
      .slice(0, 3)
      .map(({el, px}) => `"${truncate(el.text)}" ${px.toFixed(1)}px`)
      .join(', ');
    issues.push({
      level: 'error',
      message:
        `${small.length}/${texts.length} text elements render below ${minTextPx}px on mobile ` +
        `(smallest: ${sample}). Need fontSize >= ${neededFont} at this scene width.`,
    });
  }

  if (sceneWidth > maxSceneWidth) {
    issues.push({
      level: 'warning',
      message:
        `scene is ${Math.round(sceneWidth)} wide (max ${maxSceneWidth}); ` +
        `shown at ${(width / (sceneWidth + 2 * EXPORT_PADDING)).toFixed(2)}x on mobile.`,
    });
  }
  return issues;
}

function truncate(text = '') {
  const flat = text.replace(/\s+/g, ' ').trim();
  return flat.length > 24 ? `${flat.slice(0, 23)}…` : flat;
}

function parseArgs(argv) {
  const opts = {
    all: false,
    strict: false,
    files: [],
    columnWidth: DEFAULT_COLUMN_WIDTH,
    minTextPx: DEFAULT_MIN_TEXT_PX,
    maxSceneWidth: DEFAULT_MAX_SCENE_WIDTH,
  };
  const numeric = {'--min-text-px': 'minTextPx', '--max-scene-width': 'maxSceneWidth', '--column-width': 'columnWidth'};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--all') opts.all = true;
    else if (arg === '--strict') opts.strict = true;
    else if (numeric[arg]) opts[numeric[arg]] = Number(argv[++i]);
    else if (arg.startsWith('--')) throw new Error(`Unknown option: ${arg}`);
    else opts.files.push(path.resolve(arg));
  }
  return opts;
}

function collectTargets(opts) {
  // Map of .excalidraw path -> list of {post, widthPercent, maxWidthPx}
  const targets = new Map();
  const add = (file, usage) => {
    if (!targets.has(file)) targets.set(file, []);
    if (usage) targets.get(file).push(usage);
  };

  if (opts.files.length > 0) {
    for (const file of opts.files) add(file, null);
    return targets;
  }

  const blogDir = path.join(ROOT, 'blog');
  for (const name of fs.readdirSync(blogDir).sort()) {
    if (!/\.mdx?$/.test(name)) continue;
    const source = fs.readFileSync(path.join(blogDir, name), 'utf8');
    for (const ref of findDiagramRefs(source)) {
      const file = path.join(ROOT, 'static', ref.url.replace(/\.png$/, '.excalidraw'));
      if (fs.existsSync(file)) add(file, {post: name, ...ref});
    }
  }

  if (opts.all) {
    const walk = (dir) => {
      for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
        if (entry.name.startsWith('.')) continue;
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(full);
        else if (entry.name.endsWith('.excalidraw')) add(full, null);
      }
    };
    walk(path.join(ROOT, 'static', 'diagrams'));
  }
  return targets;
}

export function main(argv = process.argv.slice(2)) {
  const opts = parseArgs(argv);
  const targets = collectTargets(opts);
  let errors = 0;
  let warnings = 0;
  let clean = 0;

  for (const [file, usages] of [...targets].sort(([a], [b]) => a.localeCompare(b))) {
    const scene = JSON.parse(fs.readFileSync(file, 'utf8'));
    // Lint against the most constrained placement the diagram appears in.
    const placements = usages.length > 0 ? usages : [{}];
    let worst = null;
    for (const usage of placements) {
      const issues = lintScene(scene, {...opts, ...usage});
      if (!worst || issues.length > worst.issues.length) worst = {issues, usage};
    }
    const rel = path.relative(ROOT, file);
    if (worst.issues.length === 0) {
      clean++;
      continue;
    }
    const where = worst.usage.post ? ` (in blog/${worst.usage.post})` : '';
    console.log(`${rel}${where}`);
    for (const issue of worst.issues) {
      console.log(`  ${issue.level}: ${issue.message}`);
      if (issue.level === 'error') errors++;
      else warnings++;
    }
  }

  console.log(
    `\n${targets.size} diagrams checked at ${opts.columnWidth}px mobile column: ` +
      `${clean} clean, ${errors} errors, ${warnings} warnings.`,
  );
  return errors > 0 || (opts.strict && warnings > 0) ? 1 : 0;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  process.exitCode = main();
}
