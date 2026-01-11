'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { blogs } from './blog';

export default function BlogPage() {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case 'h':
          router.push('/');
          break;
        case 'p':
          router.push('/projects');
          break;
        case 'b':
          router.push('/blog');
          break;
        case 'g':
          window.open('https://github.com/sushilbang', '_blank');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

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
          {blogs.map((blog, idx) => (
            <a
              key={idx}
              href={blog.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4"
            >
              <h3 className="text-sm group-hover:text-primary transition-colors">
                {blog.title}
              </h3>
              <div className="flex items-center gap-2 flex-shrink-0">
                <time className="text-xs text-muted-foreground">
                  {new Date(blog.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </time>
                <ArrowUpRight
                  size={12}
                  className="text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                />
              </div>
            </a>
          ))}
        </div>

        {/* Empty State */}
        {blogs.length === 0 && (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">No blog posts yet.</p>
          </div>
        )}
      </section>
    </div>
  );
}
