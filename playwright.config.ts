import {defineConfig} from '@playwright/test';

// A different port from scripts/screenshot-pages.mjs's default (3400) so
// the two don't collide if both happen to be running at once.
const PORT = process.env.TEST_PORT || '3410';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    // Set CHROMIUM_PATH to point at an existing Chromium/Chrome binary in
    // environments where `npx playwright install chromium` hasn't been run
    // (or isn't possible) and Playwright's own managed browser isn't at the
    // path this Playwright version expects.
    launchOptions: process.env.CHROMIUM_PATH
      ? {executablePath: process.env.CHROMIUM_PATH}
      : undefined,
  },
  webServer: {
    // `npm test` runs `npm run build` first (see package.json's `pretest`),
    // so this only needs to serve the already-built production bundle.
    command: `node_modules/.bin/docusaurus serve --port ${PORT} --no-open`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
