import {test, expect} from '@playwright/test';

// Regression test for src/theme/BlogPostPage/Metadata/index.tsx. Twitter/X
// is supposed to fall back to og:title/og:description when its own tags are
// absent, but that fallback isn't reliable across every unfurl path — a
// shared post link was observed showing the site's generic title instead of
// the post's own. Explicit twitter:title/twitter:description tags fix that;
// this locks in that they stay post-specific (not the site-wide default).
test('a post page sets twitter:title/description to its own title, not the site default', async ({page}) => {
  await page.goto('/mcp-is-a-fad/');

  await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute(
    'content',
    'MCP is a Fad',
  );
  const description = await page
    .locator('meta[name="twitter:description"]')
    .getAttribute('content');
  expect(description).toBeTruthy();
  expect(description).not.toContain("Tom Bedor's Blog");
});

test("the homepage keeps the site's own title (no post to attribute it to)", async ({page}) => {
  await page.goto('/');

  await expect(page.locator('meta[name="twitter:title"]')).toHaveCount(0);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    'content',
    "Tom Bedor's Blog",
  );
});
