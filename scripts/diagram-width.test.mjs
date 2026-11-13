import test from 'node:test';
import assert from 'node:assert/strict';
import {recommendedDiagramWidth} from './diagram-width.mjs';

function scene(width, fontSize, image = false, height = 100) {
  return {
    elements: [
      {type: 'rectangle', x: 0, y: 0, width, height},
      {type: 'text', x: 10, y: 10, width: 50, height: 25, fontSize},
      ...(image ? [{type: 'image', x: 0, y: 0, width, height}] : []),
    ],
  };
}

test('responsive diagram width targets readable desktop text', () => {
  assert.equal(recommendedDiagramWidth(scene(480, 20)), 500);
  assert.equal(recommendedDiagramWidth(scene(824, 20)), 560);
});

test('screenshots retain a useful minimum width', () => {
  assert.equal(recommendedDiagramWidth(scene(617, 28, true, 640)), 560);
});

test('wide screenshots can fill the desktop column without becoming tall', () => {
  assert.equal(recommendedDiagramWidth(scene(735, 28, true, 421)), 720);
});

test('tall diagrams do not dominate the desktop viewport', () => {
  assert.equal(recommendedDiagramWidth(scene(500, 20, false, 800)), 420);
});
