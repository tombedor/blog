#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, 'blog');
const SIGNUP_COMPONENT_PATH = path.join(ROOT, 'src', 'components', 'NewsletterSignup.tsx');
const DOCUSAURUS_CONFIG_PATH = path.join(ROOT, 'docusaurus.config.ts');

function usage() {
  console.error(`Usage:
  node scripts/send-newsletter.mjs test <post> [emails]
  node scripts/send-newsletter.mjs send <post>

Arguments:
  <post>     Blog post path, filename, or slug (for example: approaches-to-agent-memory)
  [emails]   Comma-separated test recipient emails. Falls back to LISTMONK_TEST_EMAILS.

Required environment:
  LISTMONK_API_USER
  LISTMONK_API_TOKEN

Optional environment:
  LISTMONK_URL         Defaults to https://newsletter.tombedor.dev
  LISTMONK_LIST_ID     Numeric Listmonk list ID to send to
  LISTMONK_LIST_UUID   List UUID to resolve to an ID
  LISTMONK_TEST_EMAILS Default test recipients for "test" mode
  SITE_URL             Defaults to the Docusaurus site URL or https://tombedor.dev
`);
}

function parseArgs(argv) {
  const [mode, postArg, emailsArg] = argv;
  if (!mode || !postArg || !['test', 'send'].includes(mode)) {
    usage();
    process.exit(1);
  }
  return {mode, postArg, emailsArg};
}

async function readFileIfExists(filePath) {
  try {
    return await fs.readFile(filePath, 'utf8');
  } catch {
    return null;
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

function sanitizeExcerpt(markdown) {
  return markdown
    .split(/\r?\n/)
    .filter((line) => {
      const trimmed = line.trim();
      if (!trimmed) {
        return true;
      }
      if (trimmed.startsWith('import ') || trimmed.startsWith('export ')) {
        return false;
      }
      if (trimmed.startsWith('![') || trimmed.startsWith('<img')) {
        return false;
      }
      return true;
    })
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function buildExcerpt(body) {
  const [beforeTruncate] = body.split('<!-- truncate -->');
  const source = beforeTruncate.trim() ? beforeTruncate : body;
  const cleaned = sanitizeExcerpt(source);

  if (!cleaned) {
    throw new Error('Could not derive newsletter excerpt from post body');
  }

  return cleaned;
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

function buildPostUrl(siteUrl, slug) {
  return `${siteUrl}/${slug.replace(/^\/+|\/+$/g, '')}/`;
}

function buildCampaignBody({title, excerpt, postUrl}) {
  return `# ${title}

${excerpt}

[Read the full post](${postUrl})`;
}

function buildAltBody({title, excerpt, postUrl}) {
  return `${title}

${excerpt}

Read the full post: ${postUrl}`;
}

async function getDefaultListUuid() {
  if (process.env.LISTMONK_LIST_UUID) {
    return process.env.LISTMONK_LIST_UUID;
  }

  const signupComponent = await readFileIfExists(SIGNUP_COMPONENT_PATH);
  if (!signupComponent) {
    return null;
  }

  const match = signupComponent.match(/const LIST_UUID = '([^']+)'/);
  return match ? match[1] : null;
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

async function resolveListId(baseUrl, headers) {
  if (process.env.LISTMONK_LIST_ID) {
    const value = Number(process.env.LISTMONK_LIST_ID);
    if (!Number.isInteger(value)) {
      throw new Error('LISTMONK_LIST_ID must be an integer');
    }
    return value;
  }

  const listUuid = await getDefaultListUuid();
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

  if (listUuid) {
    const matching = results.find((list) => list.uuid === listUuid);
    if (matching) {
      return matching.id;
    }
  }

  const publicLists = results.filter((list) => list.type === 'public');
  if (publicLists.length === 1) {
    return publicLists[0].id;
  }

  throw new Error(
    'Could not resolve newsletter list ID automatically. Set LISTMONK_LIST_ID or LISTMONK_LIST_UUID.',
  );
}

function parseEmails(rawEmails) {
  return (rawEmails || '')
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean);
}

async function main() {
  const {mode, postArg, emailsArg} = parseArgs(process.argv.slice(2));
  const baseUrl = (process.env.LISTMONK_URL || 'https://newsletter.tombedor.dev').replace(/\/+$/, '');
  const headers = getAuthHeaders();
  const postPath = await resolvePostPath(postArg);
  const postContent = await fs.readFile(postPath, 'utf8');
  const {frontmatter, body} = parseFrontmatter(postContent);

  if (!frontmatter.title) {
    throw new Error(`Missing title in frontmatter for ${postPath}`);
  }

  if (mode === 'send' && frontmatter.draft === true) {
    throw new Error('Refusing to send a subscriber newsletter for a draft post');
  }

  const slug = String(frontmatter.slug || path.basename(postPath).replace(/\.(md|mdx)$/, ''));
  const siteUrl = await getSiteUrl();
  const postUrl = buildPostUrl(siteUrl, slug);
  const excerpt = buildExcerpt(body);
  const listId = await resolveListId(baseUrl, headers);

  const campaignPayload = {
    name: `Blog post: ${frontmatter.title}`,
    subject: String(frontmatter.title),
    lists: [listId],
    type: 'regular',
    content_type: 'markdown',
    body: buildCampaignBody({title: String(frontmatter.title), excerpt, postUrl}),
    altbody: buildAltBody({title: String(frontmatter.title), excerpt, postUrl}),
    messenger: 'email',
    tags: ['blog-post', slug],
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
    const emails = parseEmails(emailsArg || process.env.LISTMONK_TEST_EMAILS);
    if (emails.length === 0) {
      throw new Error('Provide test recipient emails as an argument or via LISTMONK_TEST_EMAILS');
    }

    await requestJson(`${baseUrl}/api/campaigns/${campaignId}/test`, {
      method: 'POST',
      headers,
      body: JSON.stringify({subscribers: emails}),
    });

    console.log(
      `Sent test newsletter for "${frontmatter.title}" to ${emails.join(', ')} (campaign ${campaignId}).`,
    );
    return;
  }

  await requestJson(`${baseUrl}/api/campaigns/${campaignId}/status`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({status: 'running'}),
  });

  console.log(`Started subscriber newsletter for "${frontmatter.title}" (campaign ${campaignId}).`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
