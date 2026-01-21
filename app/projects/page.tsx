'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

const projects = {
  built: [
    {
      title: 'POD',
      description: 'POD turns dusty PDFs into lively, bite-sized podcasts. Upload a document and it pulls out the gold, writes a smooth script, and speaks it aloud in clear, distinct voices. Perfect for anyone who\'d rather listen than read.',
      href: 'https://pod.sushilbang.xyz/',
      technologies: ['FastAPI', 'Celery', 'Redis', 'Supabase', 'AWS'],
    },
    {
      title: 'NeuralPost',
      description: 'Your pocket-sized blog studio. Just whisper an idea and watch a stunning post come alive in seconds: crisp words and a live preview streaming as it writes. All your posts chill in a searchable library. Switch vibes in a click from cozy chai-theme to neon nights or clean minimal.',
      href: 'https://neuralpost.sushilbang.xyz/',
      technologies: ['Next.js', 'TypeScript', 'React', 'Firebase', 'Firestore', 'Groq API', 'Tailwind CSS'],
    },
    {
      title: 'ZeroHunger',
      description: 'A simple app to stop food waste. List surplus meals, connect with nearby NGOs or people in need, and donate with a tap. Built for LaTrobe TIGC and backed with 27,000 INR in funding.',
      href: 'https://github.com/sushilbang/ZeroHunger',
      technologies: ['React Native', 'Expo', 'Firebase'],
    },
    {
      title: 'devlogr',
      description: 'A tiny CLI buddy for developers who forget what they did yesterday. Log your progress straight from the terminal, no context-switching needed. Built in Rust because speed matters when you\'re in the zone.',
      href: 'https://github.com/sushilbang/devlogr',
      technologies: ['Rust'],
    },
    {
      title: 'shodhak',
      description: 'My shot at building a research agent that actually digs deep. Feed it a topic and watch it hunt down insights, connect dots, and surface what matters. Think of it as a curious assistant that never gets tired of reading.',
      href: 'https://github.com/sushilbang/shodhak',
      technologies: ['TypeScript'],
    },
  ],
  contributed: [
    {
      title: 'Wisk',
      description: 'A lightweight, plugin-powered document editor built with pure vanilla JavaScript. Clean, fast, and made for tinkerers. I contributed drag-and-drop mobile support, fixed key handlers, and improved various UI components.',
      href: 'https://wisk.cc',
      technologies: ['HTML', 'CSS', 'JavaScript'],
    },
  ],
};

export default function ProjectsPage() {
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
          Projects
        </h1>
        <p className="text-sm text-muted-foreground">
          A collection of things I&apos;ve built and contributed to.
        </p>
      </section>

      {/* Built Projects */}
      <section className="py-12 border-b border-border">
        <h2 className="mb-6 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Built
        </h2>
        <div className="space-y-6">
          {projects.built.map((project) => (
            <a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h3 className="text-sm font-medium group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowUpRight
                  size={14}
                  className="flex-shrink-0 mt-0.5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Contributed Projects */}
      <section className="pt-12">
        <h2 className="mb-6 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Contributed To
        </h2>
        <div className="space-y-6">
          {projects.contributed.map((project) => (
            <a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h3 className="text-sm font-medium group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowUpRight
                  size={14}
                  className="flex-shrink-0 mt-0.5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                />
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
