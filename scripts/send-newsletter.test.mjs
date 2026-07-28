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
