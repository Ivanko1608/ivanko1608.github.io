// Smoke test for the built site: every route exists and carries the SEO basics.
import { existsSync, readFileSync } from 'node:fs';

const ROUTES: Record<string, { title: RegExp; jsonLd?: string }> = {
  'index.html':          { title: /Senior Backend Engineer/, jsonLd: '"Person"' },
  'content/index.html':  { title: /content/i },
  'blog/index.html':     { title: /Blog/ },
  'terminal/index.html': { title: /Terminal/ },
};
const FILES = ['ivan-kramarenko-cv.pdf', 'og.png', 'robots.txt', 'rss.xml', 'sitemap-index.xml'];

const errors: string[] = [];
const check = (ok: boolean, msg: string) => { if (!ok) errors.push(msg); };

for (const [route, want] of Object.entries(ROUTES)) {
  const path = `dist/${route}`;
  if (!existsSync(path)) { errors.push(`${route}: missing`); continue; }
  const html = readFileSync(path, 'utf8');
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
  check(want.title.test(title), `${route}: title "${title}" does not match ${want.title}`);
  check(title.length <= 65, `${route}: title is ${title.length} chars (max 65)`);
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '';
  check(desc.length >= 70 && desc.length <= 170, `${route}: description is ${desc.length} chars`);
  check(/<link rel="canonical" href="https:\/\/ivanko1608\.github\.io\//.test(html), `${route}: no canonical`);
  check(html.includes('property="og:image"'), `${route}: no og:image`);
  if (route !== 'terminal/index.html')
    check((html.match(/<h1[\s>]/g) ?? []).length === 1, `${route}: expected exactly one <h1>`);
  if (want.jsonLd) check(html.includes(want.jsonLd), `${route}: no ${want.jsonLd} JSON-LD`);
}

for (const f of FILES) check(existsSync(`dist/${f}`), `${f}: missing`);

if (errors.length) {
  console.error(`dist check failed:\n  ${errors.join('\n  ')}`);
  process.exit(1);
}
console.log(`dist check passed: ${Object.keys(ROUTES).length} routes, ${FILES.length} files`);
