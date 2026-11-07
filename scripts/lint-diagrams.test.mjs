import test from 'node:test';
import assert from 'node:assert/strict';
import {findDiagramRefs, lintScene, renderedPx, sceneBounds} from './lint-diagrams.mjs';

const opts = {columnWidth: 358, minTextPx: 12, maxSceneWidth: 600};

function scene(width, fontSize) {
  return {
    elements: [
      {type: 'rectangle', x: 0, y: 0, width, height: 100},
      {type: 'text', x: 10, y: 10, width: 50, height: 25, fontSize, text: 'label'},
      {type: 'rectangle', x: 0, y: 0, width: 5000, height: 5000, isDeleted: true},
    ],
  };
}

test('scene bounds include line and arrow points', () => {
  const bounds = sceneBounds([
    {type: 'rectangle', x: 0, y: 0, width: 100, height: 50},
    {type: 'arrow', x: 50, y: 10, width: 0, height: 0, points: [[0, 0], [250, 90]]},
  ]);
  assert.deepEqual(bounds, {width: 300, height: 100});
});

test('rendered size scales font by display width over exported width', () => {
  assert.equal(renderedPx(20, 338, 358), 20);
  assert.equal(renderedPx(20, 696, 358), 10);
});

test('narrow scenes with default fonts pass', () => {
  assert.deepEqual(lintScene(scene(400, 20), opts), []);
});

test('wide scenes with small fonts error and warn', () => {
  const issues = lintScene(scene(1600, 20), opts);
  assert.deepEqual(issues.map((i) => i.level), ['error', 'warning']);
  assert.match(issues[0].message, /fontSize >= 55/);
});

test('wide scenes with large fonts only warn', () => {
  const issues = lintScene(scene(1000, 40), opts);
  assert.deepEqual(issues.map((i) => i.level), ['warning']);
});

test('css width constraints shrink the display width', () => {
  assert.deepEqual(lintScene(scene(300, 13), opts), []);
  assert.equal(lintScene(scene(300, 13), {...opts, widthPercent: 80})[0].level, 'error');
  assert.equal(lintScene(scene(300, 13), {...opts, maxWidthPx: 250})[0].level, 'error');
});

test('diagram refs parse markdown and img tags and skip comments', () => {
  const refs = findDiagramRefs(`
![a](/diagrams/post/a.png)
{/* ![b](/diagrams/post/b.png) */}
<img src="/diagrams/post/c.png" alt="c" style={{width:'80%', display:'block'}} />
<img src="/diagrams/post/d.png" alt="d" style={{maxWidth:'420px', width:'100%'}} />
`);
  assert.deepEqual(refs, [
    {url: '/diagrams/post/a.png', widthPercent: null, maxWidthPx: null},
    {url: '/diagrams/post/c.png', widthPercent: 80, maxWidthPx: null},
    {url: '/diagrams/post/d.png', widthPercent: 100, maxWidthPx: 420},
  ]);
});
