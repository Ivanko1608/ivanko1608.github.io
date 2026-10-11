// One-off: renders public/og.png (1200×630 link-preview image).
// Run with `pnpm tsx scripts/build-og.ts` after changing the headline.
import { Resvg } from '@resvg/resvg-js';
import { mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { hero, stats } from '../src/data';

const FONTS = {
  'syne-800.ttf':  'https://cdn.jsdelivr.net/fontsource/fonts/syne@latest/latin-800-normal.ttf',
  'mono-400.ttf':  'https://cdn.jsdelivr.net/fontsource/fonts/jetbrains-mono@latest/latin-400-normal.ttf',
  'mono-700.ttf':  'https://cdn.jsdelivr.net/fontsource/fonts/jetbrains-mono@latest/latin-700-normal.ttf',
};

const dir = await mkdtemp(join(tmpdir(), 'og-fonts-'));
const fontFiles = await Promise.all(
  Object.entries(FONTS).map(async ([name, url]) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${url}: ${res.status}`);
    const path = join(dir, name);
    await writeFile(path, Buffer.from(await res.arrayBuffer()));
    return path;
  }),
);

const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const [first, last] = hero.name.split(' ');
// Short labels: the full ones from data.ts don't fit 270px columns
const OG_LABELS = ['years in backends', 'deploys, was 2 days', 'conversions / day', 'of 200+ CTF teams'];
const statsSvg = stats
  .map((s, i) => `
    <text x="${80 + i * 270}" y="540" font-family="Syne" font-weight="800" font-size="44" fill="#E4E6ED">${esc(s.value)}</text>
    <text x="${80 + i * 270}" y="572" font-family="JetBrains Mono" font-size="15" fill="#6B7280">${esc(OG_LABELS[i] ?? s.label)}</text>`)
  .join('');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow" cx="85%" cy="10%" r="70%">
      <stop offset="0" stop-color="#E8491D" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#E8491D" stop-opacity="0"/>
    </radialGradient>
    <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="1" fill="#1E2333"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="#0A0B0E"/>
  <rect width="1200" height="630" fill="url(#dots)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="0" y="0" width="1200" height="6" fill="#E8491D"/>

  <text x="80" y="110" font-family="JetBrains Mono" font-size="20" fill="#E8491D" letter-spacing="3">${esc(hero.jobTitle.toUpperCase())}</text>
  <text x="80" y="205" font-family="Syne" font-weight="800" font-size="72" fill="#E4E6ED">${esc(first)} <tspan fill="#E8491D">${esc(last)}</tspan></text>
  <text x="80" y="290" font-family="JetBrains Mono" font-weight="700" font-size="30" fill="#E4E6ED">Backends that stay up in production.</text>
  <text x="80" y="335" font-family="JetBrains Mono" font-weight="700" font-size="30" fill="#F5A623">In Rust, Go and Node.js.</text>
  <text x="80" y="400" font-family="JetBrains Mono" font-size="20" fill="#6B7280">EU remote · CET · ivanko1608.github.io</text>

  <line x1="80" y1="470" x2="1120" y2="470" stroke="#E8491D" stroke-opacity="0.25"/>
  ${statsSvg}
</svg>`;

const png = new Resvg(svg, {
  font: { fontFiles, loadSystemFonts: false, defaultFontFamily: 'JetBrains Mono' },
}).render().asPng();

const out = new URL('../public/og.png', import.meta.url).pathname;
await writeFile(out, png);
console.log(`OG image written to ${out} (${png.length} bytes)`);
