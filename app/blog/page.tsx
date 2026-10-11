import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { formatPostDate, getPosts } from './blog';

export default function BlogPage() {
  const posts = getPosts();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      {/* Header */}
      <section className="pb-12 border-b border-border">
        <h1 className="mb-2 text-2xl font-bold tracking-tight sm:text-3xl">
          Blog
        </h1>
        <p className="text-sm text-muted-foreground">
          Thoughts on software, engineering, and everything in between.
        </p>
      </section>

      {/* Blog Posts */}
      <section className="pt-12">
        <h2 className="mb-6 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Posts
        </h2>
        <div className="space-y-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex items-center justify-between gap-4"
            >
              <h3 className="text-sm group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <div className="flex items-center gap-2 flex-shrink-0">
                <time dateTime={post.date} className="text-xs text-muted-foreground">
                  {formatPostDate(post.date)}
                </time>
                <ArrowRight
                  size={12}
                  className="text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
                />
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">No blog posts yet.</p>
          </div>
        )}
      </section>
    </div>
  );
}
