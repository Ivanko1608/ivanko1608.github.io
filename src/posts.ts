import { getCollection } from 'astro:content';

// Published posts, newest first. Drafts show up only in `astro dev`.
export async function getPosts() {
  const posts = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export const postUrl = (id: string) => `/blog/${id}/`;

export const fmtDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: '2-digit' });
