import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts, postUrl } from '../posts';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title:       'Ivan Kramarenko — Blog',
    description: 'Notes on backend engineering and Rust.',
    site:        context.site!,
    items: posts.map((post) => ({
      title:       post.data.title,
      description: post.data.description,
      pubDate:     post.data.date,
      link:        postUrl(post.id),
    })),
  });
}
