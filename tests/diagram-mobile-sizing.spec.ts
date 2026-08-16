import {test, expect} from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

// Catches diagrams that render too small to read on a phone. The usual
// cause: an inline `style={{width: '50%'}}` on an <img>, sized to look
// right in a wide desktop column, that also shrinks the image on a
// narrow mobile viewport where 50% is a lot less room.
const BLOG_DIR = path.join(__dirname, '..', 'blog');
const MOBILE_WIDTH = 390;
const MOBILE_HEIGHT = 844;
// Below this fraction of the viewport, diagram labels/text get too small
// to read. Calibrated against real posts: legitimately full-width diagrams
// render at ~90%+ ; posts with a fixed-percentage inline style were found
// rendering at 46-55%.
const MIN_WIDTH_FRACTION = 0.65;

function publishedSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
    .filter((f) => {
      const contents = fs.readFileSync(path.join(BLOG_DIR, f), 'utf8');
      const frontmatter = contents.split('---')[1] ?? '';
      return !/^draft:\s*true\s*$/m.test(frontmatter);
    })
    .map((f) => f.replace(/\.mdx?$/, ''));
}

// Force lazy-loaded images below the fold to load before measuring them.
async function loadAllImages(page: import('@playwright/test').Page) {
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let total = 0;
      const step = 400;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        total += step;
        if (total >= document.body.scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 20);
    });
  });
}

test.use({viewport: {width: MOBILE_WIDTH, height: MOBILE_HEIGHT}});

for (const slug of publishedSlugs()) {
  test(`diagrams in "${slug}" are legible on a mobile viewport`, async ({page}) => {
    await page.goto(`/${slug}/`);
    await loadAllImages(page);

    const images = page.locator('img[src*="/diagrams/"]');
    const count = await images.count();
    const minWidth = MOBILE_WIDTH * MIN_WIDTH_FRACTION;

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const src = await img.getAttribute('src');
      const box = await img.boundingBox();
      expect(box, `${src} has no bounding box (not visible?)`).not.toBeNull();

      const pct = ((box!.width / MOBILE_WIDTH) * 100).toFixed(0);
      expect(
        box!.width,
        `${src} renders at ${box!.width.toFixed(0)}px wide (${pct}% of the ${MOBILE_WIDTH}px ` +
          `viewport) — below the ${(MIN_WIDTH_FRACTION * 100).toFixed(0)}% minimum. Likely an inline ` +
          `style with a fixed percentage width (e.g. style={{width:'50%'}}) sized for a wide desktop ` +
          `column that doesn't account for mobile.`,
      ).toBeGreaterThanOrEqual(minWidth);
    }
  });
}
