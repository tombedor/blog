import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import type {Root, Nodes} from 'mdast';
import type {Plugin} from 'unified';
import {recommendedDiagramWidth} from './diagram-width.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function visit(node: Nodes, callback: (node: Nodes) => void) {
  callback(node);
  if ('children' in node) {
    for (const child of node.children) visit(child, callback);
  }
}

const responsiveDiagrams: Plugin<[], Root> = () => (tree) => {
  visit(tree, (node) => {
    if (node.type !== 'image' || !node.url.startsWith('/diagrams/') || !node.url.endsWith('.png')) {
      return;
    }

    const sourcePath = path.join(
      ROOT,
      'static',
      node.url.replace(/^\//, '').replace(/\.png$/, '.excalidraw'),
    );
    if (!fs.existsSync(sourcePath)) {
      return;
    }

    const scene = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
    const width = recommendedDiagramWidth(scene);
    if (!width) {
      return;
    }

    Object.assign(node, {
      type: 'mdxJsxTextElement',
      name: 'ResponsiveDiagram',
      attributes: [
        {type: 'mdxJsxAttribute', name: 'src', value: node.url},
        {type: 'mdxJsxAttribute', name: 'alt', value: node.alt ?? ''},
        {type: 'mdxJsxAttribute', name: 'width', value: String(width)},
      ],
      children: [],
    });
  });
};

export default responsiveDiagrams;
