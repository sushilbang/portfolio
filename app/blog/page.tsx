'use client'

import { blogs } from './blog';

export default function Blog() {
    return (
        <div className="pt-16 sm:pt-24 pb-16 mx-auto max-w-4xl px-4 sm:px-8">
            <div className="mb-12">
                <h1 className="text-3xl sm:text-4xl font-bold mb-2" style={{ letterSpacing: '-0.02em' }}>
                    Blog
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                    Thoughts on software, startups, and everything in between
                </p>
            </div>

            <div className="space-y-4">
                {blogs.map((blog, idx) => (
                    <a
                        key={idx}
                        href={blog.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block py-4 border-b border-border last:border-b-0 hover:bg-muted/30 dark:hover:bg-muted/10 transition-colors duration-200 px-2 -mx-2"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <p className="text-base text-foreground group-hover:text-primary transition-colors duration-200">
                                {blog.title}
                            </p>
                            <p className="text-sm text-muted-foreground whitespace-nowrap flex-shrink-0">
                                {new Date(blog.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
}