import test from 'node:test';
import assert from 'node:assert/strict';
import {getNewsletterMarkdown, sanitizePostBody} from './send-newsletter.mjs';

test('truncated newsletters support strict MDX markers', () => {
  const markdown = 'Opening paragraph.\n\n{/* truncate */}\n\nRemaining article.';
  assert.equal(getNewsletterMarkdown(markdown, 'truncate'), 'Opening paragraph.\n\n');
});

test('newsletter sanitization removes MDX and legacy HTML comments', () => {
  const markdown = [
    'Opening paragraph.',
    '',
    '{/* editorial note */}',
    '<!-- legacy note -->',
    '',
    '[Internal link](/subscribe/)',
  ].join('\n');

  assert.equal(
    sanitizePostBody(markdown, 'https://tombedor.dev'),
    'Opening paragraph.\n\n[Internal link](https://tombedor.dev/subscribe/)',
  );
});

test('newsletter sanitization renders SourceExcerpt as labeled fenced code', () => {
  const markdown = [
    '<SourceExcerpt',
    '  label="AGENTS.md"',
    '  href="https://github.com/tombedor/blog/blob/example/AGENTS.md">',
    '{`## Content Editing Policy',
    '',
    '**The writing must come from the author.**',
    '- Leave the body empty`}',
    '</SourceExcerpt>',
  ].join('\n');

  assert.equal(
    sanitizePostBody(markdown, 'https://tombedor.dev'),
    [
      '**[AGENTS.md](https://github.com/tombedor/blog/blob/example/AGENTS.md)**',
      '',
      '```text',
      '## Content Editing Policy',
      '',
      '**The writing must come from the author.**',
      '- Leave the body empty',
      '```',
    ].join('\n'),
  );
});

test('newsletter sanitization renders EditDiff as labeled blockquotes', () => {
  const markdown = [
    '<EditDiff',
    '  label="Rejected Codex suggestion"',
    '  beforeLabel="My version"',
    '  afterLabel="AI suggestion"',
    '  before={<>This is <mark>my wording</mark>.</>}',
    '  after={<>This is <mark>AI wording</mark>.</>}',
    '/>',
  ].join('\n');

  assert.equal(
    sanitizePostBody(markdown, 'https://tombedor.dev'),
    [
      '**Rejected Codex suggestion**',
      '',
      '> **My version:** This is **my wording**.',
      '>',
      '> **AI suggestion:** This is **AI wording**.',
    ].join('\n'),
  );
});
