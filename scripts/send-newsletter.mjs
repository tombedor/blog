#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import {pathToFileURL} from 'node:url';

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, 'blog');
const DOCUSAURUS_CONFIG_PATH = path.join(ROOT, 'docusaurus.config.ts');
const ENV_PATH = path.join(ROOT, '.env');

function usage() {
  console.error(`Usage:
  node scripts/send-newsletter.mjs test <post>
  node scripts/send-newsletter.mjs send <post>
  node scripts/send-newsletter.mjs send-before <post> <date>

Arguments:
  <post>     Blog post path, filename, or slug (for example: approaches-to-agent-memory)
  <date>     ISO date (YYYY-MM-DD) — send only to subscribers who joined before this date

Required environment:
  LISTMONK_URL
  LISTMONK_API_USER
  LISTMONK_API_TOKEN
  For "test": LISTMONK_TEST_LIST_ID or LISTMONK_TEST_LIST_UUID
  For "send"/"send-before": LISTMONK_PROD_LIST_ID or LISTMONK_PROD_LIST_UUID

Optional environment:
  LISTMONK_TEST_EMAILS Default test recipients for "test" mode
  SITE_URL             Defaults to the Docusaurus site URL or https://tombedor.dev

Optional frontmatter:
  newsletter: truncate  Send only the content before {/* truncate */}.
                        Omit this field to send the full post.

Campaigns are created as drafts and must be started from Listmonk after review.
`);
}

function parseArgs(argv) {
  const [mode, postArg, dateArg] = argv;
  if (!mode || !postArg || !['test', 'send', 'send-before'].includes(mode)) {
    usage();
    process.exit(1);
  }
  if (mode === 'send-before') {
    if (!dateArg || !/^\d{4}-\d{2}-\d{2}$/.test(dateArg)) {
      console.error('send-before requires a date argument in YYYY-MM-DD format');
      usage();
      process.exit(1);
    }
  }
  return {mode, postArg, beforeDate: dateArg || null};
}

async function readFileIfExists(filePath) {
  try {
    return await fs.readFile(filePath, 'utf8');
  } catch {
    return null;
  }
}

async function loadDotEnv() {
  const envContent = await readFileIfExists(ENV_PATH);
  if (!envContent) {
    return;
  }

  for (const rawLine of envContent.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) {
      continue;
    }

    const normalized = line.startsWith('export ') ? line.slice(7).trim() : line;
    const idx = normalized.indexOf('=');
    if (idx === -1) {
      continue;
    }

    const key = normalized.slice(0, idx).trim();
    if (!key || process.env[key] !== undefined) {
      continue;
    }

    let value = normalized.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    process.env[key] = value;
  }
}

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    throw new Error('Post is missing frontmatter');
  }

  const [, rawFrontmatter, body] = match;
  const frontmatter = {};

  for (const rawLine of rawFrontmatter.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) {
      continue;
    }
    const idx = line.indexOf(':');
    if (idx === -1) {
      continue;
    }
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (value === 'true') {
      frontmatter[key] = true;
    } else if (value === 'false') {
      frontmatter[key] = false;
    } else {
      frontmatter[key] = value;
    }
  }

  return {frontmatter, body};
}

async function resolvePostPath(postArg) {
  const candidates = [];

  if (path.isAbsolute(postArg)) {
    candidates.push(postArg);
  } else {
    candidates.push(path.join(ROOT, postArg));
    candidates.push(path.join(BLOG_DIR, postArg));
    candidates.push(path.join(BLOG_DIR, `${postArg}.md`));
    candidates.push(path.join(BLOG_DIR, `${postArg}.mdx`));
  }

  for (const candidate of candidates) {
    try {
      const stat = await fs.stat(candidate);
      if (stat.isFile()) {
        return candidate;
      }
    } catch {
      // Ignore and continue.
    }
  }

  throw new Error(`Could not find post: ${postArg}`);
}

function getNewsletterMode(frontmatter) {
  const mode = String(frontmatter.newsletter || 'full').trim().toLowerCase();
  if (!['full', 'truncate'].includes(mode)) {
    throw new Error(`Unsupported newsletter frontmatter value: ${frontmatter.newsletter}`);
  }
  return mode;
}

export function getNewsletterMarkdown(markdown, newsletterMode) {
  if (newsletterMode !== 'truncate') {
    return markdown;
  }

  const parts = markdown.split(/(?:<!--\s*truncate\s*-->|\{\/\*\s*truncate\s*\*\/\})/i);
  if (parts.length < 2) {
    throw new Error('Post has newsletter: truncate but no {/* truncate */} marker');
  }

  return parts[0];
}

export function sanitizePostBody(markdown, siteUrl, {newsletterMode = 'full'} = {}) {
  const newsletterMarkdown = getNewsletterMarkdown(markdown, newsletterMode);
  const sanitized = normalizeMdxImageTags(
    normalizeEditDiffComponents(normalizeSourceExcerptComponents(newsletterMarkdown)),
  )
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
    .split(/\r?\n/)
    .filter((line) => {
      const trimmed = line.trim();
      if (!trimmed) {
        return true;
      }
      if (trimmed.startsWith('import ') || trimmed.startsWith('export ')) {
        return false;
      }
      return true;
    })
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/(!?\[[^\]]*]\()\/(?!\/)/g, `$1${siteUrl}/`)
    .replace(/(<img[^>]*\ssrc=["'])\/(?!\/)/g, `$1${siteUrl}/`)
    .replace(/(<a[^>]*\shref=["'])\/(?!\/)/g, `$1${siteUrl}/`)
    .trim();

  return normalizeFootnotes(sanitized);
}

function normalizeSourceExcerptComponents(markdown) {
  return markdown.replace(
    /<SourceExcerpt\b([\s\S]*?)>\s*\{`([\s\S]*?)`\}\s*<\/SourceExcerpt>/g,
    (_match, attributes, excerpt) => {
      const label = getStringAttribute(attributes, 'label') || 'Source excerpt';
      const href = getStringAttribute(attributes, 'href');
      const fenceLength = Math.max(
        3,
        ...Array.from(excerpt.matchAll(/`+/g), (match) => match[0].length + 1),
      );
      const fence = '`'.repeat(fenceLength);

      return `${formatComponentLabel(label, href)}\n\n${fence}text\n${excerpt.trim()}\n${fence}`;
    },
  );
}

function normalizeEditDiffComponents(markdown) {
  return markdown.replace(/<EditDiff\b([\s\S]*?)^\s*\/>/gm, (_match, attributes) => {
    const label = getStringAttribute(attributes, 'label') || 'Suggested edit';
    const href = getStringAttribute(attributes, 'href');
    const beforeLabel = getStringAttribute(attributes, 'beforeLabel') || 'Before';
    const afterLabel = getStringAttribute(attributes, 'afterLabel') || 'After';
    const before = getJsxFragmentAttribute(attributes, 'before');
    const after = getJsxFragmentAttribute(attributes, 'after');

    if (!before || !after) {
      return _match;
    }

    return [
      formatComponentLabel(label, href),
      '',
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:0;">',
      '  <tr>',
      `    <td style="background:#ffebe9;border-left:4px solid #cf222e;border-radius:6px;padding:12px 14px;color:#24292f;"><strong style="color:#a40e26;">${escapeHtml(beforeLabel)}:</strong> ${normalizeJsxFragmentToHtml(before)}</td>`,
      '  </tr>',
      '  <tr><td height="8" style="font-size:0;line-height:0;">&nbsp;</td></tr>',
      '  <tr>',
      `    <td style="background:#dafbe1;border-left:4px solid #1a7f37;border-radius:6px;padding:12px 14px;color:#24292f;"><strong style="color:#116329;">${escapeHtml(afterLabel)}:</strong> ${normalizeJsxFragmentToHtml(after)}</td>`,
      '  </tr>',
      '</table>',
    ].join('\n');
  });
}

function getStringAttribute(attributes, name) {
  const match = attributes.match(new RegExp(`\\b${name}=(['"])([\\s\\S]*?)\\1`));
  return match?.[2];
}

function getJsxFragmentAttribute(attributes, name) {
  const match = attributes.match(
    new RegExp(`\\b${name}=\\{<>([\\s\\S]*?)<\\/>\\}`),
  );
  return match?.[1];
}

function normalizeJsxFragmentToHtml(fragment) {
  const strongOpen = '__EDIT_DIFF_STRONG_OPEN__';
  const strongClose = '__EDIT_DIFF_STRONG_CLOSE__';
  const lineBreak = '__EDIT_DIFF_LINE_BREAK__';

  const text = fragment
    .replace(/<mark>/g, strongOpen)
    .replace(/<\/mark>/g, strongClose)
    .replace(/<br\s*\/?>/g, lineBreak)
    .replace(/<[^>]+>/g, '')
    .trim();

  return escapeHtml(text)
    .replaceAll(strongOpen, '<strong>')
    .replaceAll(strongClose, '</strong>')
    .replaceAll(lineBreak, '<br>');
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatComponentLabel(label, href) {
  return href ? `**[${label}](${href})**` : `**${label}**`;
}

function normalizeMdxImageTags(markdown) {
  return markdown.replace(/<img\b[^>]*>/g, (tag) => {
    let normalized = tag;

    normalized = normalized.replace(/style=\{\{([^}]*)\}\}/g, (_match, styleBody) => {
      const declarations = styleBody
        .split(',')
        .map((part) => part.trim())
        .filter(Boolean)
        .map((part) => {
          const idx = part.indexOf(':');
          if (idx === -1) {
            return null;
          }

          const rawKey = part.slice(0, idx).trim();
          let rawValue = part.slice(idx + 1).trim();
          if (!rawKey || !rawValue) {
            return null;
          }

          rawValue = rawValue.replace(/^['"]|['"]$/g, '');
          const cssKey = rawKey.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
          return `${cssKey}:${rawValue};`;
        })
        .filter(Boolean)
        .join(' ');

      return declarations ? `style="${declarations}"` : '';
    });

    return normalized.replace(/\s*\/>$/, '>');
  });
}

function normalizeFootnotes(markdown) {
  const lines = markdown.split(/\r?\n/);
  const bodyLines = [];
  const footnotes = new Map();

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const match = line.match(/^\[\^([^\]]+)\]:\s*(.*)$/);
    if (!match) {
      bodyLines.push(line);
      continue;
    }

    const [, label, firstLine] = match;
    const parts = [firstLine.trim()];

    for (let j = i + 1; j < lines.length; j += 1) {
      const continuation = lines[j];
      if (/^( {2,}|\t)/.test(continuation)) {
        parts.push(continuation.trim());
        i = j;
        continue;
      }
      break;
    }

    footnotes.set(label, parts.join(' ').trim());
  }

  if (footnotes.size === 0) {
    return markdown;
  }

  const order = [];
  const seen = new Set();
  const body = bodyLines
    .join('\n')
    .replace(/\[\^([^\]]+)\]/g, (_match, label) => {
      if (footnotes.has(label) && !seen.has(label)) {
        seen.add(label);
        order.push(label);
      }
      return footnotes.has(label) ? `[${label}]` : _match;
    })
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  if (order.length === 0) {
    return body;
  }

  const notes = order
    .map((label) => `${label}. ${footnotes.get(label)}`)
    .join('\n');

  return `${body}\n\n## Notes\n\n${notes}`;
}

async function getSiteUrl() {
  if (process.env.SITE_URL) {
    return process.env.SITE_URL.replace(/\/+$/, '');
  }

  const config = await readFileIfExists(DOCUSAURUS_CONFIG_PATH);
  if (config) {
    const match = config.match(/url:\s*'([^']+)'/);
    if (match) {
      return match[1].replace(/\/+$/, '');
    }
  }

  return 'https://tombedor.dev';
}

function buildPostUrl(siteUrl, slug, utmParams) {
  const url = `${siteUrl}/${slug.replace(/^\/+|\/+$/g, '')}/`;
  if (!utmParams) {
    return url;
  }
  const query = new URLSearchParams(utmParams).toString();
  return `${url}?${query}`;
}

function buildReadMoreCta(postUrl) {
  return `---

**[Continue reading at tombedor.dev](${postUrl})**`;
}

function buildCampaignBody({title, body, postUrl, newsletterMode = 'full'}) {
  const cta = newsletterMode === 'truncate' ? `\n\n${buildReadMoreCta(postUrl)}` : '';
  const readOnline = newsletterMode === 'truncate' ? '' : `\n\n[Read online instead](${postUrl})`;

  return `# ${title}

${readOnline}

${body}${cta}`;
}

function buildAltBody({title, body, postUrl, newsletterMode = 'full'}) {
  const cta = newsletterMode === 'truncate' ? `\n\nContinue reading at tombedor.dev: ${postUrl}` : '';
  const readOnline = newsletterMode === 'truncate' ? '' : `\n\nRead online instead: ${postUrl}`;

  return `${title}

${readOnline}

${body}${cta}`;
}

function getAuthHeaders() {
  const user = process.env.LISTMONK_API_USER;
  const token = process.env.LISTMONK_API_TOKEN;

  if (!user || !token) {
    throw new Error('LISTMONK_API_USER and LISTMONK_API_TOKEN are required');
  }

  const basic = Buffer.from(`${user}:${token}`).toString('base64');
  return {
    Authorization: `Basic ${basic}`,
    'Content-Type': 'application/json',
  };
}

async function requestJson(url, options = {}) {
  const response = await fetch(url, options);
  const text = await response.text();
  let payload = null;

  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = text;
    }
  }

  if (!response.ok) {
    const message =
      typeof payload === 'object' && payload && 'message' in payload
        ? payload.message
        : text || `HTTP ${response.status}`;
    throw new Error(`Listmonk API error (${response.status}): ${message}`);
  }

  return payload;
}

function getListEnv(mode) {
  if (mode === 'test') {
    return {
      id: process.env.LISTMONK_TEST_LIST_ID,
      uuid: process.env.LISTMONK_TEST_LIST_UUID,
      label: 'LISTMONK_TEST_LIST_ID or LISTMONK_TEST_LIST_UUID',
    };
  }

  return {
    id: process.env.LISTMONK_PROD_LIST_ID,
    uuid: process.env.LISTMONK_PROD_LIST_UUID,
    label: 'LISTMONK_PROD_LIST_ID or LISTMONK_PROD_LIST_UUID',
  };
}

async function resolveListId(baseUrl, headers, mode) {
  const listEnv = getListEnv(mode);

  if (listEnv.id) {
    const value = Number(listEnv.id);
    if (!Number.isInteger(value)) {
      throw new Error(`${listEnv.label.split(' or ')[0]} must be an integer`);
    }
    return value;
  }

  const listUuid = listEnv.uuid;
  if (!listUuid) {
    throw new Error(`Set ${listEnv.label}`);
  }

  const listsResponse = await requestJson(
    `${baseUrl}/api/lists?status=active&per_page=all`,
    {
      method: 'GET',
      headers,
    },
  );

  const results = listsResponse?.data?.results;
  if (!Array.isArray(results)) {
    throw new Error('Unexpected /api/lists response from Listmonk');
  }

  const matching = results.find((list) => list.uuid === listUuid);
  if (matching) {
    return matching.id;
  }

  throw new Error(`Could not find a Listmonk list matching ${listEnv.label.split(' or ')[1]}=${listUuid}`);
}

async function main() {
  await loadDotEnv();
  const {mode, postArg, beforeDate} = parseArgs(process.argv.slice(2));
  const rawListmonkUrl = process.env.LISTMONK_URL;
  if (!rawListmonkUrl) {
    throw new Error('LISTMONK_URL is required');
  }
  const baseUrl = rawListmonkUrl.replace(/\/+$/, '');
  const headers = getAuthHeaders();
  const postPath = await resolvePostPath(postArg);
  const postContent = await fs.readFile(postPath, 'utf8');
  const {frontmatter, body} = parseFrontmatter(postContent);

  if (!frontmatter.title) {
    throw new Error(`Missing title in frontmatter for ${postPath}`);
  }

  if ((mode === 'send' || mode === 'send-before') && frontmatter.draft === true) {
    throw new Error('Refusing to send a subscriber newsletter for a draft post');
  }

  const slug = String(frontmatter.slug || path.basename(postPath).replace(/\.(md|mdx)$/, ''));
  const siteUrl = await getSiteUrl();
  // Tags click-throughs so Umami can attribute the resulting site visit to
  // this newsletter campaign (Umami parses utm_* params automatically —
  // no site-side changes needed to pick these up).
  const postUrl = buildPostUrl(siteUrl, slug, {
    utm_source: 'newsletter',
    utm_medium: 'email',
    utm_campaign: slug,
  });
  const newsletterMode = getNewsletterMode(frontmatter);
  const newsletterBody = sanitizePostBody(body, siteUrl, {newsletterMode});
  if (!newsletterBody) {
    throw new Error('Could not derive newsletter body from post');
  }
  const effectiveMode = mode === 'send-before' ? 'send' : mode;
  const listId = await resolveListId(baseUrl, headers, effectiveMode);

  const campaignPayload = {
    name: `Blog post: ${frontmatter.title}`,
    subject: String(frontmatter.title),
    lists: [listId],
    type: 'regular',
    content_type: 'markdown',
    body: buildCampaignBody({
      title: String(frontmatter.title),
      body: newsletterBody,
      postUrl,
      newsletterMode,
    }),
    altbody: buildAltBody({
      title: String(frontmatter.title),
      body: newsletterBody,
      postUrl,
      newsletterMode,
    }),
    messenger: 'email',
    tags: ['blog-post', slug],
    ...(beforeDate && {query: `subscribers.created_at < '${beforeDate} 00:00:00'`}),
  };

  const created = await requestJson(`${baseUrl}/api/campaigns`, {
    method: 'POST',
    headers,
    body: JSON.stringify(campaignPayload),
  });

  const campaignId = created?.data?.id;
  if (!campaignId) {
    throw new Error('Listmonk did not return a campaign ID');
  }

  if (mode === 'test') {
    console.log(`Created draft test-list newsletter for "${frontmatter.title}" (campaign ${campaignId}).`);
    return;
  }

  if (mode === 'send-before') {
    console.log(`Created draft subscriber newsletter for "${frontmatter.title}" (campaign ${campaignId}), filtered to subscribers before ${beforeDate}.`);
  } else {
    console.log(`Created draft subscriber newsletter for "${frontmatter.title}" (campaign ${campaignId}).`);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}
