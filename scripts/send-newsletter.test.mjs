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

test('newsletter sanitization renders EditDiff with email-safe colors', () => {
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
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:0;">',
      '  <tr>',
      '    <td style="background:#ffebe9;border-left:4px solid #cf222e;border-radius:6px;padding:12px 14px;color:#24292f;"><strong style="color:#a40e26;">My version:</strong> This is <strong>my wording</strong>.</td>',
      '  </tr>',
      '  <tr><td height="8" style="font-size:0;line-height:0;">&nbsp;</td></tr>',
      '  <tr>',
      '    <td style="background:#dafbe1;border-left:4px solid #1a7f37;border-radius:6px;padding:12px 14px;color:#24292f;"><strong style="color:#116329;">AI suggestion:</strong> This is <strong>AI wording</strong>.</td>',
      '  </tr>',
      '</table>',
    ].join('\n'),
  );
});
