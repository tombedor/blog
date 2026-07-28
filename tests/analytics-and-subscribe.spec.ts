import {expect, test, type Page} from '@playwright/test';

type TrackedEvent = {name: string; data?: Record<string, unknown>};

async function installAnalyticsStub(page: Page) {
  await page.addInitScript(() => {
    (window as unknown as {__tracked: TrackedEvent[]}).__tracked = [];
    Object.defineProperty(window, 'umami', {
      configurable: true,
      get() {
        return {
          track: (name: string, data?: Record<string, unknown>) =>
            (window as unknown as {__tracked: TrackedEvent[]}).__tracked.push({name, data}),
        };
      },
      set() {},
    });
  });
}

async function tracked(page: Page, name: string): Promise<TrackedEvent[]> {
  return page.evaluate(
    (eventName) =>
      (window as unknown as {__tracked: TrackedEvent[]}).__tracked.filter(
        (event) => event.name === eventName,
      ),
    name,
  );
}

test('analytics is restricted to the production hostname', async ({page}) => {
  await page.goto('/');
  const tracker = page.locator('script[src="https://analytics.tombedor.dev/script.js"]');
  await expect(tracker).toHaveAttribute('data-domains', 'tombedor.dev');
});

test('subscribe form exposes an accessible, attributed success funnel', async ({page}) => {
  await installAnalyticsStub(page);
  let requestBody: unknown;
  await page.route('https://newsletter.tombedor.dev/api/public/subscription', async (route) => {
    requestBody = route.request().postDataJSON();
    await route.fulfill({status: 200, contentType: 'application/json', body: '{"data":true}'});
  });

  await page.goto('/subscribe/');
  const input = page.getByLabel('Get new posts by email');
  await expect(input).toBeVisible();
  await expect.poll(async () => tracked(page, 'email-subscribe-view')).toEqual([
    {name: 'email-subscribe-view', data: {placement: 'subscribe-page'}},
  ]);

  await input.fill('reader@example.com');
  await page.getByRole('button', {name: 'Subscribe'}).click();
  await expect(page.getByRole('status')).toHaveText('You\'re subscribed!');
  expect(requestBody).toEqual({
    email: 'reader@example.com',
    list_uuids: ['0e2a0310-73c6-4ad5-97e8-75611a164bc7'],
  });
  expect(await tracked(page, 'email-subscribe-attempt')).toEqual([
    {name: 'email-subscribe-attempt', data: {placement: 'subscribe-page'}},
  ]);
  expect(await tracked(page, 'email-subscribe')).toEqual([
    {name: 'email-subscribe', data: {placement: 'subscribe-page'}},
  ]);
});

test('subscribe failures are visible and attributed', async ({page}) => {
  await installAnalyticsStub(page);
  await page.route('https://newsletter.tombedor.dev/api/public/subscription', (route) =>
    route.fulfill({status: 503, contentType: 'application/json', body: '{}'}),
  );

  await page.goto('/subscribe/');
  await page.getByLabel('Get new posts by email').fill('reader@example.com');
  await page.getByRole('button', {name: 'Subscribe'}).click();

  await expect(page.getByRole('alert')).toContainText('Something went wrong');
  expect(await tracked(page, 'email-subscribe-error')).toEqual([
    {name: 'email-subscribe-error', data: {placement: 'subscribe-page', status: 503}},
  ]);
});

test('post suggestions count impressions only when visible', async ({page}) => {
  await installAnalyticsStub(page);
  await page.goto('/advice-for-new-grads/');
  await page.waitForTimeout(300);
  expect(await tracked(page, 'post-suggestion-shown')).toEqual([]);

  await page.getByText('More posts', {exact: true}).scrollIntoViewIfNeeded();
  await expect.poll(async () => tracked(page, 'post-suggestion-shown')).toHaveLength(3);
});

test('read depth records all thresholds by the end of a post', async ({page}) => {
  await installAnalyticsStub(page);
  await page.goto('/advice-for-new-grads/');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect.poll(async () => tracked(page, 'post-read')).toEqual([
    {name: 'post-read', data: {percent: 25, slug: '/advice-for-new-grads'}},
    {name: 'post-read', data: {percent: 50, slug: '/advice-for-new-grads'}},
    {name: 'post-read', data: {percent: 75, slug: '/advice-for-new-grads'}},
    {name: 'post-read', data: {percent: 100, slug: '/advice-for-new-grads'}},
  ]);
});

test('site metadata is descriptive and the starter route is absent', async ({page}) => {
  await page.goto('/');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    'Thoughts on software, AI, and building things',
  );

  await page.goto('/ai-threatens-privacy/');
  await expect(page.locator('article header .avatar')).toBeHidden();
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    'https://tombedor.dev/social-cards/ai-threatens-privacy.png',
  );

  const response = await page.goto('/markdown-page/');
  expect(response?.status()).toBe(404);
});
