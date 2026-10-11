import { ArrowUpRight } from 'lucide-react';

const projects = {
  built: [
    {
      title: 'code-agent',
      description: 'a desktop coding-agent harness with a local file explorer, monaco editor, persistent chats, streamed openai responses api output, and approval-gated file tools with reviewable diffs and workspace protection.',
      href: 'https://github.com/sushilbang/code-agent',
      technologies: ['TypeScript', 'Electron', 'React', 'Monaco'],
    },
    {
      title: 'pod',
      description: 'pod turns dusty pdfs into lively, bite-sized podcasts. upload a document and it pulls out the gold, writes a smooth script, and speaks it aloud in clear, distinct voices. perfect for anyone who\'d rather listen than read.',
      href: 'https://github.com/sushilbang/pod',
      technologies: ['FastAPI', 'Celery', 'Redis', 'Supabase', 'AWS'],
    },
    {
      title: 'zerohunger',
      description: 'a simple app to stop food waste. list surplus meals, connect with nearby ngos or people in need, and donate with a tap. built for latrobe tigc and backed with 27,000 inr in funding.',
      href: 'https://github.com/sushilbang/ZeroHunger',
      technologies: ['React Native', 'Expo', 'Firebase'],
    },
    {
      title: 'devlogr',
      description: 'a tiny cli buddy for developers who forget what they did yesterday. log your progress straight from the terminal, no context-switching needed. built in rust because speed matters when you\'re in the zone.',
      href: 'https://github.com/sushilbang/devlogr',
      technologies: ['Rust'],
    },
    {
      title: 'shodhak',
      description: 'my shot at building a research agent that actually digs deep. feed it a topic and watch it hunt down insights, connect dots, and surface what matters. think of it as a curious assistant that never gets tired of reading.',
      href: 'https://github.com/sushilbang/shodhak',
      technologies: ['TypeScript'],
    },
  ],
  contributed: [
    {
      title: 'wisk',
      description: 'a lightweight, plugin-powered document editor built with pure vanilla javascript. clean, fast, and made for tinkerers. i contributed drag-and-drop mobile support, fixed key handlers, and improved various ui components.',
      href: 'https://wisk.cc',
      technologies: ['HTML', 'CSS', 'JavaScript'],
    },
  ],
};

export default function ProjectsPage() {
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
