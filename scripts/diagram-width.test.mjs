import test from 'node:test';
import assert from 'node:assert/strict';
import {recommendedDiagramWidth} from './diagram-width.mjs';

function scene(width, fontSize, image = false) {
  return {
    elements: [
      {type: 'rectangle', x: 0, y: 0, width, height: 100},
      {type: 'text', x: 10, y: 10, width: 50, height: 25, fontSize},
      ...(image ? [{type: 'image', x: 0, y: 0, width, height: 100}] : []),
    ],
  };
}

test('responsive diagram width targets readable desktop text', () => {
  assert.equal(recommendedDiagramWidth(scene(480, 20)), 500);
  assert.equal(recommendedDiagramWidth(scene(824, 20)), 720);
});

test('screenshots retain a useful minimum width', () => {
  assert.equal(recommendedDiagramWidth(scene(617, 28, true)), 560);
});
