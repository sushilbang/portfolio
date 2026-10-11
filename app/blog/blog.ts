import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  content: string;
};

const postsDirectory = path.join(process.cwd(), 'app', 'blog', 'posts');
const postFilename = /^(\d{4}-\d{2}-\d{2})-(.+)\.md$/;

export function getPosts(): BlogPost[] {
  return readdirSync(postsDirectory)
    .flatMap((filename) => {
      const match = filename.match(postFilename);
      if (!match) return [];

      const [, date, slug] = match;
      const markdown = readFileSync(path.join(postsDirectory, filename), 'utf8').trim();
      const [heading, ...body] = markdown.split(/\r?\n/);
      if (!heading.startsWith('# ')) {
        throw new Error(`Blog post ${filename} must start with an H1 title`);
      }

      return [{ slug, title: heading.slice(2), date, content: body.join('\n').trim() }];
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): BlogPost | undefined {
  return getPosts().find((post) => post.slug === slug);
}

export function formatPostDate(date: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));
}
