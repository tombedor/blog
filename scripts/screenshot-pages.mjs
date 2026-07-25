#!/usr/bin/env node
//
// Builds the production bundle, serves it locally, and screenshots every
// page (desktop + mobile) for visual/design review. Run via `just
// screenshots` or `npm run screenshots`. Output goes to screenshots/
// (gitignored) as <slug>-<viewport>.png.
//
// Requires a Chromium binary Playwright can find: either run
// `npx playwright install chromium` once, or set CHROMIUM_PATH to an
// existing Chromium/Chrome executable (useful in sandboxes/CI that already
// ship a browser under a path Playwright's own version doesn't expect).

import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdirSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, 'blog');
const OUT_DIR = path.join(ROOT, 'screenshots');
const PORT = process.env.SCREENSHOT_PORT || 3400;
const BASE_URL = `http://localhost:${PORT}`;

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
];

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: 'inherit' });
    child.on('exit', (code) =>
      code === 0 ? resolve() : reject(new Error(`${cmd} ${args.join(' ')} exited with code ${code}`))
    );
  });
}

function blogPostSlugs() {
  return readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
    .filter((f) => {
      const contents = readFileSync(path.join(BLOG_DIR, f), 'utf8');
      const frontmatter = contents.split('---')[1] ?? '';
      return !/^draft:\s*true\s*$/m.test(frontmatter);
    })
    .map((f) => f.replace(/\.mdx?$/, ''));
}

async function waitForServer(url, timeoutMs = 60000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // server not up yet
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Server at ${url} did not become ready within ${timeoutMs}ms`);
}

// Full-page screenshots capture the DOM as laid out at scroll position 0,
// which means images below the fold that use native lazy-loading haven't
// started fetching yet. Scroll through the page first so everything is
// loaded before we capture.
async function triggerLazyLoad(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let scrolled = 0;
      const step = 400;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        scrolled += step;
        if (scrolled >= document.body.scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 80);
    });
  });
  await page.waitForTimeout(300);
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });

  console.log('Building production bundle...');
  await run('npm', ['run', 'build']);

  console.log(`Starting local server on port ${PORT}...`);
  // Spawn the local binary directly (not via `npx`/`npm run`) so server.kill()
  // below actually terminates the server process instead of an npx wrapper
  // that leaves the real server running as an orphan.
  const docusaurusBin = path.join(ROOT, 'node_modules', '.bin', 'docusaurus');
  const server = spawn(docusaurusBin, ['serve', '--port', String(PORT), '--no-open'], {
    stdio: 'inherit',
  });

  let exitCode = 0;
  try {
    await waitForServer(`${BASE_URL}/`);

    const pages = [
      { slug: '', name: 'home' },
      { slug: 'about', name: 'about' },
      { slug: 'subscribe', name: 'subscribe' },
      ...blogPostSlugs().map((slug) => ({ slug, name: slug })),
    ];

    const browser = await chromium.launch(
      process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}
    );
    let ok = 0;
    let fail = 0;

    for (const viewport of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
      });
      const page = await context.newPage();
      // The site loads a third-party analytics script in production. Block
      // it here so screenshotting doesn't send fake pageviews and doesn't
      // hang waiting on a request that a sandboxed/offline dev machine can't
      // complete.
      await page.route('https://analytics.tombedor.dev/**', (route) => route.abort());

      for (const p of pages) {
        const url = `${BASE_URL}/${p.slug ? p.slug + '/' : ''}`;
        const outFile = path.join(OUT_DIR, `${p.name}-${viewport.name}.png`);
        try {
          await page.goto(url, { waitUntil: 'load', timeout: 30000 });
          await triggerLazyLoad(page);
          await page.screenshot({ path: outFile, fullPage: true });
          console.log(`  ok    ${p.name} (${viewport.name})`);
          ok++;
        } catch (err) {
          console.log(`  FAIL  ${p.name} (${viewport.name}): ${err.message}`);
          fail++;
        }
      }

      await context.close();
    }

    await browser.close();
    console.log(`\nDone: ${ok} captured, ${fail} failed. Output: ${path.relative(ROOT, OUT_DIR)}/`);
    exitCode = fail > 0 ? 1 : 0;
  } finally {
    server.kill();
  }

  process.exit(exitCode);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
