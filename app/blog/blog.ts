import { rawPosts } from './posts.generated';

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  content: string;
};

// Tags per post, keyed by slug (the filename without its date prefix).
const postTags: Record<string, string[]> = {
  'redis': ['redis', 'caching', 'backend'],
  'do-i-really-understand-authentication': ['authentication', 'jwt', 'backend'],
  'fastapi-and-celery': ['fastapi', 'celery', 'python', 'backend'],
  'a-coding-agent-is-a-context-engine-before-its-an-editor': ['ai agents', 'context engineering', 'llm'],
  'why-tool-permissions-belong-outside-the-model': ['ai agents', 'security', 'llm'],
  'how-a-coding-agent-sees-a-codebase-as-a-graph': ['ai agents', 'knowledge graph', 'static analysis'],
};

const postFilename = /^(\d{4}-\d{2}-\d{2})-(.+)\.md$/;

export function getPosts(): BlogPost[] {
  return Object.entries(rawPosts)
    .flatMap(([filename, source]) => {
      const match = filename.match(postFilename);
      if (!match) return [];

      const [, date, slug] = match;
      const markdown = source.trim();
      const [heading, ...body] = markdown.split(/\r?\n/);
      if (!heading.startsWith('# ')) {
        throw new Error(`Blog post ${filename} must start with an H1 title`);
      }

      return [{ slug, title: heading.slice(2), date, tags: postTags[slug] ?? [], content: body.join('\n').trim() }];
    })
    .sort((a, b) => {
      const dateOrder = b.date.localeCompare(a.date);
      return dateOrder || b.slug.localeCompare(a.slug);
    });
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
