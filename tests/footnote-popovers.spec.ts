import {test, expect} from '@playwright/test';

// Exercises src/theme/BlogPostItem/footnotePopovers.ts against a real post.
// Uses advice-for-new-grads, which has 4 footnotes today — if that post's
// footnotes are ever removed, point this at a different post with 2+
// footnotes rather than deleting the test.
const POST_PATH = '/advice-for-new-grads/';
// metadata.permalink (what tracking events use as `slug`) has no trailing
// slash, unlike the page path used for navigation.
const POST_SLUG = '/advice-for-new-grads';
const REF_SELECTOR = 'a[data-footnote-ref="true"]';

test.beforeEach(async ({page}) => {
  // Stub window.umami so tracking calls can be asserted on without hitting
  // the real (and in some environments unreachable) analytics endpoint.
  await page.addInitScript(() => {
    (window as unknown as {__tracked: unknown[]}).__tracked = [];
    Object.defineProperty(window, 'umami', {
      configurable: true,
      get() {
        return {
          track: (name: string, data: unknown) =>
            (window as unknown as {__tracked: unknown[]}).__tracked.push({name, data}),
        };
      },
      set() {},
    });
  });
  await page.goto(POST_PATH);
});

test('clicking a footnote reference shows a popover without navigating', async ({page}) => {
  const refs = page.locator(REF_SELECTOR);
  await expect(refs).toHaveCount(4);

  const urlBefore = page.url();
  await refs.nth(0).click();

  await expect(page.locator('.footnote-popover')).toBeVisible();
  await expect(page).toHaveURL(urlBefore);
});

test('clicking the same reference again closes it', async ({page}) => {
  const ref = page.locator(REF_SELECTOR).nth(0);

  await ref.click();
  await expect(page.locator('.footnote-popover')).toBeVisible();

  await ref.click();
  await expect(page.locator('.footnote-popover')).toHaveCount(0);
});

test('clicking a different reference switches to it', async ({page}) => {
  const refs = page.locator(REF_SELECTOR);

  await refs.nth(0).click();
  await expect(page.locator('.footnote-popover')).toBeVisible();

  await refs.nth(1).click();
  await expect(page.locator('.footnote-popover')).toHaveCount(1);
  await expect(refs.nth(0)).toHaveAttribute('aria-expanded', 'false');
  await expect(refs.nth(1)).toHaveAttribute('aria-expanded', 'true');
});

test('clicking elsewhere on the page dismisses it', async ({page}) => {
  await page.locator(REF_SELECTOR).nth(0).click();
  await expect(page.locator('.footnote-popover')).toBeVisible();

  await page.mouse.click(10, 10);
  await expect(page.locator('.footnote-popover')).toHaveCount(0);
});

test('Escape dismisses it', async ({page}) => {
  await page.locator(REF_SELECTOR).nth(0).click();
  await expect(page.locator('.footnote-popover')).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(page.locator('.footnote-popover')).toHaveCount(0);
});

test('switching to a reference further down the post survives scroll-into-view', async ({page}) => {
  // Regression test. An earlier version closed the popover on every
  // window 'scroll' event on the theory its position would go stale.
  // Playwright's auto-scroll-into-view when clicking an off-screen
  // reference fires a real 'scroll' event immediately *after* the click
  // completes, which tore down the popover the click had just opened.
  // The fix was to drop the scroll-close behavior entirely: the popover is
  // positioned in document coordinates, so it was never actually going
  // stale on scroll in the first place.
  const refs = page.locator(REF_SELECTOR);

  await refs.nth(0).click();
  await expect(page.locator('.footnote-popover')).toBeVisible();

  await refs.nth(3).click(); // further down the post — requires scrolling
  await expect(page.locator('.footnote-popover')).toBeVisible();
  await expect(refs.nth(3)).toHaveAttribute('aria-expanded', 'true');
});

async function getTrackedFootnoteClicks(page: import('@playwright/test').Page) {
  const tracked = await page.evaluate(
    () => (window as unknown as {__tracked: {name: string; data: unknown}[]}).__tracked,
  );
  return tracked.filter((event) => event.name === 'footnote-click');
}

test('opening a footnote tracks a footnote-click event with slug and footnote number', async ({page}) => {
  const refs = page.locator(REF_SELECTOR);
  await refs.nth(1).click();
  await expect(page.locator('.footnote-popover')).toBeVisible();

  expect(await getTrackedFootnoteClicks(page)).toEqual([
    {name: 'footnote-click', data: {slug: POST_SLUG, footnote: '2'}},
  ]);
});

test('toggling a footnote closed does not track another event', async ({page}) => {
  const ref = page.locator(REF_SELECTOR).nth(0);
  await ref.click();
  await ref.click(); // close
  await expect(page.locator('.footnote-popover')).toHaveCount(0);

  expect(await getTrackedFootnoteClicks(page)).toHaveLength(1); // only the initial open
});

test('the footnotes list at the bottom of the post is visually hidden by default', async ({page}) => {
  // footnotePopovers.ts still reads its content (see openPopover), so this
  // checks that it's hidden, not absent.
  const footnotes = page.locator('.footnotes');
  await expect(footnotes).toHaveCount(1);
  const box = await footnotes.boundingBox();
  expect(box?.width).toBeLessThanOrEqual(1);
  expect(box?.height).toBeLessThanOrEqual(1);
});
