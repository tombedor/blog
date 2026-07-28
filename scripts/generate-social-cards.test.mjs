import test from 'node:test';
import assert from 'node:assert/strict';
import {escapeXml, wrapTitle} from './generate-social-cards.mjs';

test('social card titles wrap within the supported title area', () => {
  const result = wrapTitle('The Arguments Against Open Source AI are Very Bad');

  assert.ok(result.lines.length >= 2);
  assert.ok(result.lines.length <= 4);
  assert.ok(result.fontSize >= 42);
});

test('social card titles escape SVG markup', () => {
  assert.equal(escapeXml('AI & <Agents>'), 'AI &amp; &lt;Agents&gt;');
});
