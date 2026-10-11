import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Markdown from 'react-markdown';
import { formatPostDate, getPost, getPosts } from '../blog';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.content.split('\n\n')[0],
  };
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <Link
        href="/blog"
        className="group mb-12 inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
        All posts
      </Link>

      <header className="border-b border-border pb-10">
        <time dateTime={post.date} className="text-xs text-muted-foreground">
          {formatPostDate(post.date)}
        </time>
        <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
          {post.title}
        </h1>
      </header>

      <div className="blog-prose pt-10">
        <Markdown>{post.content}</Markdown>
      </div>
    </article>
  );
}
