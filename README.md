# Ivan Kramarenko — Portfolio

Personal portfolio site, built with [Astro](https://astro.build). Pages are static HTML; the terminal is a React island.

| Route        | What it is                                                     |
|--------------|----------------------------------------------------------------|
| `/`          | Hiring page: pitch, case studies, experience, contact          |
| `/content/`  | Freedom-TLS video series, latest blog posts, security writeups |
| `/blog/`     | Blog (Markdown posts), with RSS at `/rss.xml`                  |
| `/terminal/` | Terminal version of the site for developers                    |

## Stack

- Astro + React 19 (terminal island) + TypeScript
- Plain CSS: design tokens in `src/styles/tokens.css`
- `@react-pdf/renderer` for the CV PDF, built at build time
- Deployed via GitHub Actions to GitHub Pages

## Running locally

```bash
pnpm install
pnpm dev        # dev server, shows draft posts
pnpm build      # CV PDF, static site, then a dist smoke check
pnpm preview    # serve dist/
pnpm test       # vitest (terminal)
```

## Content

- **Site copy**: `src/data.ts`. Everything on the hiring and content pages, and in the CV PDF, comes from there.
- **Blog posts**: Markdown in `src/content/posts/`. The filename becomes the URL slug. Frontmatter: `title`, `description`, `date`, optional `tags` and `draft: true`. Drafts show only in `pnpm dev`.
- **CV PDF**: generated from `src/lib/ResumePdf.tsx` into `public/ivan-kramarenko-cv.pdf` on every build (not committed).
- **Link-preview image**: `public/og.png`. Regenerate it with `pnpm tsx scripts/build-og.ts` after changing the headline or stats.

## Forking

All site copy lives in `src/data.ts`. If you want to use this as a base for your own portfolio, that's the main file you need to touch.

Licensed under [CC BY-NC 4.0](LICENSE) — free to adapt for non-commercial use with attribution.
