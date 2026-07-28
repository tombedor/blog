import {readFile, readdir, rm, mkdir, writeFile} from 'node:fs/promises';
import {fileURLToPath, pathToFileURL} from 'node:url';
import path from 'node:path';
import matter from 'gray-matter';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BLOG_DIR = path.join(ROOT, 'blog');
const OUTPUT_DIR = path.join(ROOT, 'static', 'social-cards');
const TEMPLATE = path.join(ROOT, 'static', 'img', 'social-card.jpg');
const CARD_WIDTH = 1200;
const CARD_HEIGHT = 630;
const TEXT_X = 520;
const TEXT_WIDTH = 620;
const TITLE_TOP = 100;
const TITLE_HEIGHT = 330;

function characterWidth(character) {
  if (character === ' ') return 0.28;
  if (/[ilI1.,'’]/.test(character)) return 0.3;
  if (/[MW@]/.test(character)) return 0.9;
  if (/[A-Z]/.test(character)) return 0.68;
  return 0.55;
}

function textWidth(text, fontSize) {
  return [...text].reduce((width, character) => width + characterWidth(character), 0) * fontSize;
}

function linesAtSize(title, fontSize) {
  const words = title.split(/\s+/);
  const lines = [];
  let line = '';

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && textWidth(candidate, fontSize) > TEXT_WIDTH) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }

  if (line) lines.push(line);
  return lines;
}

export function wrapTitle(title) {
  for (let fontSize = 66; fontSize >= 42; fontSize -= 2) {
    const lines = linesAtSize(title, fontSize);
    const lineHeight = Math.round(fontSize * 1.08);
    if (lines.length <= 4 && lines.length * lineHeight <= TITLE_HEIGHT) {
      return {fontSize, lineHeight, lines};
    }
  }

  throw new Error(`Post title is too long for a social card: ${title}`);
}

export function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function cardSvg(title) {
  const {fontSize, lineHeight, lines} = wrapTitle(title);
  const contentHeight = lines.length * lineHeight;
  const firstBaseline = TITLE_TOP + (TITLE_HEIGHT - contentHeight) / 2 + fontSize * 0.82;
  const titleLines = lines
    .map((line, index) => `<text x="${TEXT_X}" y="${firstBaseline + index * lineHeight}">${escapeXml(line)}</text>`)
    .join('');

  return Buffer.from(`
    <svg width="${CARD_WIDTH}" height="${CARD_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <style>
        .title { fill: #17161d; font-family: Arial, Helvetica, sans-serif; font-size: ${fontSize}px; font-weight: 700; }
        .author { fill: #4b4b55; font-family: Arial, Helvetica, sans-serif; font-size: 30px; }
        .domain { fill: #0882bd; font-family: Arial, Helvetica, sans-serif; font-size: 30px; }
      </style>
      <g class="title">${titleLines}</g>
      <text class="author" x="525" y="520">Tom Bedor</text>
      <text class="domain" x="525" y="570">tombedor.dev</text>
    </svg>
  `);
}

async function renderCard(title, leftPanel) {
  return sharp({
    create: {
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      channels: 4,
      background: {r: 247, g: 246, b: 254, alpha: 1},
    },
  })
    .composite([
      {input: leftPanel, left: 0, top: 0},
      {input: cardSvg(title), left: 0, top: 0},
    ])
    .png()
    .toBuffer();
}

export async function generateSocialCards({check = false} = {}) {
  const leftPanel = await sharp(TEMPLATE)
    .extract({left: 0, top: 0, width: 451, height: CARD_HEIGHT})
    .png()
    .toBuffer();
  const files = (await readdir(BLOG_DIR)).filter((file) => /\.mdx?$/.test(file));

  if (!check) {
    await rm(OUTPUT_DIR, {recursive: true, force: true});
    await mkdir(OUTPUT_DIR, {recursive: true});
  }

  let generated = 0;
  const expectedFiles = new Set();
  const staleFiles = [];
  for (const file of files) {
    const sourcePath = path.join(BLOG_DIR, file);
    const {data} = matter.read(sourcePath);
    if (data.draft === true) continue;
    if (typeof data.title !== 'string' || !data.title.trim()) {
      throw new Error(`Published post is missing a title: ${file}`);
    }

    const slug = path.basename(file, path.extname(file));
    const expectedImage = `/social-cards/${slug}.png`;
    if (data.image !== expectedImage) {
      throw new Error(`${file} must set image: ${expectedImage}`);
    }

    const outputFile = `${slug}.png`;
    const outputPath = path.join(OUTPUT_DIR, outputFile);
    const expected = await renderCard(data.title.trim(), leftPanel);
    expectedFiles.add(outputFile);

    if (check) {
      const actual = await readFile(outputPath).catch(() => null);
      if (!actual?.equals(expected)) staleFiles.push(outputFile);
    } else {
      await writeFile(outputPath, expected);
    }
    generated += 1;
  }

  if (check) {
    const existingFiles = await readdir(OUTPUT_DIR).catch(() => []);
    const extraFiles = existingFiles.filter((file) => file.endsWith('.png') && !expectedFiles.has(file));
    if (staleFiles.length || extraFiles.length) {
      const details = [
        ...staleFiles.map((file) => `missing or stale: ${file}`),
        ...extraFiles.map((file) => `unexpected: ${file}`),
      ].join('\n');
      throw new Error(`Social cards are not up to date. Run npm run generate:social-cards.\n${details}`);
    }
    console.log(`Verified ${generated} social cards are up to date.`);
  } else {
    console.log(`Generated ${generated} social cards in ${path.relative(ROOT, OUTPUT_DIR)}/`);
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  await generateSocialCards({check: process.argv.includes('--check')});
}
