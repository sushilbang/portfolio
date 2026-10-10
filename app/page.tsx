import Link from 'next/link';
import { ArrowUpRight, ChevronDown, Github, Linkedin, Twitter, Mail } from 'lucide-react';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/sushilbang', icon: Github },
  { name: 'Twitter', href: 'https://x.com/bang_sushil17', icon: Twitter },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/sushil-bang-9b0327284/', icon: Linkedin },
  { name: 'Email', href: 'mailto:sushilbang17@gmail.com', icon: Mail },
];

const featuredProjects = [
  {
    title: 'code-agent',
    description: 'a desktop coding agent with a local file explorer, monaco editor, persistent chats, streamed responses, and approval-gated file tools.',
    href: 'https://github.com/sushilbang/code-agent',
    tags: ['TypeScript', 'Electron', 'React', 'Monaco'],
  },
  {
    title: 'pod',
    description: 'turns pdfs into podcasts. upload a document, extract key content, and listen to it spoken aloud.',
    href: 'https://pod.sushilbang.xyz/',
    tags: ['FastAPI', 'Celery', 'Redis', 'AWS'],
  },
  {
    title: 'neuralpost',
    description: 'ai-powered blog studio. whisper an idea and watch a post come alive with live preview streaming.',
    href: 'https://neuralpost.sushilbang.xyz/',
    tags: ['Next.js', 'TypeScript', 'Firebase', 'Groq API'],
  },
  {
    title: 'devlogr',
    description: 'a tiny cli buddy for developers who forget what they did yesterday. log progress straight from the terminal.',
    href: 'https://github.com/sushilbang/devlogr',
    tags: ['Rust'],
  },
];

const experience = [
  {
    role: 'AI Engineer Intern',
    company: 'SailPoint',
    companyUrl: 'https://www.sailpoint.com/',
    period: 'Apr 6, 2026 – Present',
    description: 'Building agents with Google ADK for business process diagrams, job capability research, and Salesforce stage validation. Prototyped an Atlan semantic context layer to improve agent answer accuracy.',
    technologies: ['Google ADK', 'MCP', 'GCP', 'Atlan'],
    details: [
      'Built a Google ADK business process agent that converts business requirement documents into structured JSON for Lucid MCP diagram tools, cutting diagram creation time by about 50% with about 90% diagram accuracy.',
      'Developed a job capabilities agent that researches role changes across domains, maps progression between individual contributor levels, generates PowerPoint, Excel, and Word artifacts, and uploads them to SharePoint.',
      'Built a Salesforce stage validation agent with custom APIs to flag opportunities in the wrong stage by comparing opportunity fields against a stakeholder-defined validation matrix.',
      'Prototyped an Atlan semantic context layer that improved agent answer accuracy by about 40% in evaluations while shorter instructions reduced tokens per query; worked with Agent Engine, Rovo MCP, BigQuery, and other GCP services.',
    ],
  },
  {
    role: 'Contributor',
    company: 'Wisk',
    companyUrl: 'https://wisk.cc',
    period: 'Jul 2025 – Jan 2026',
    description: 'Built an event-driven state layer, improved IndexedDB save reliability, and contributed collaboration and editor UI features.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    details: [
      'Designed an event-driven state layer with timestamped changes and a path-based resolver for block creation, reordering, patching, deletion, and document restore.',
      'Serialized IndexedDB saves through a queue, retained changes arriving during a save, and rolled back in-memory state after failed writes.',
      'Refactored collaboration handlers to process eight event groups, including block patches, order changes, configuration, and plugin data, before applying remote updates.',
      'Delivered nine merged pull requests covering desktop and mobile drag and drop, block duplicate and delete menus, responsive controls, Markdown plugin descriptions, and update checks with offline handling.',
    ],
  },
];

const skills = [
  'JavaScript',
  'TypeScript',
  'Python',
  'React',
  'Next.js',
  'Node.js',
  'FastAPI',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'Docker',
  'AWS',
  'Git',
];

export default function Home() {
  return (
    <div className="py-16 sm:py-20">
      <div className="border-b border-border">
        <section className="mx-auto max-w-3xl px-6 pb-12">
          <h1 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">Sushil Bang</h1>
          <p className="mb-6 text-sm leading-relaxed">
            I enjoy building things that live on the internet. Currently focused on contributing to open source and crafting side projects that solve real problems.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            {socialLinks.map((link) => (
              <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
                <link.icon size={14} />
                <span>{link.name}</span>
              </a>
            ))}
          </div>
        </section>
      </div>

      <div className="border-b border-border">
        <section className="mx-auto max-w-3xl px-6 py-12">
          <blockquote className="text-sm italic leading-relaxed">
            “If you&apos;re good with computers, if you&apos;re good at basic mathematics, if you&apos;re good at writing, if you&apos;re good at speaking, and if you like reading, you&apos;re set for life.”
          </blockquote>
          <p className="text-right italic mt-3 text-xs text-muted-foreground/70">— Naval Ravikant</p>
        </section>
      </div>

      <div className="border-b border-border">
        <section className="mx-auto max-w-3xl px-6 py-12">
          <h2 className="mb-6 text-xs font-medium uppercase tracking-wider text-muted-foreground">Experience</h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.company}>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <div className="text-sm">
                    <span className="font-medium">{exp.role}</span>
                    <span className="text-muted-foreground"> at </span>
                    <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">
                      {exp.company}
                    </a>
                  </div>
                  <span className="text-xs text-muted-foreground">{exp.period}</span>
                </div>
                <p className="mt-1.5 text-xs">{exp.description}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {exp.technologies.map((tech) => (
                    <span key={tech} className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
                <details className="group mt-3">
                  <summary className="flex w-fit cursor-pointer list-none items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground [&::-webkit-details-marker]:hidden">
                    More info
                    <ChevronDown size={13} className="transition-transform group-open:rotate-180" />
                  </summary>
                  <ul className="mt-3 space-y-2 border-l border-border pl-4 text-xs leading-relaxed text-muted-foreground">
                    {exp.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </details>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="border-b border-border">
        <section className="mx-auto max-w-3xl px-6 py-12">
          <div className="mb-6 flex justify-between">
            <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Featured Projects</h2>
            <Link href="/projects" className="flex items-center gap-1 text-xs text-muted-foreground">
              View all <ArrowUpRight size={12} />
            </Link>
          </div>

          <div className="space-y-4">
            {featuredProjects.map((project) => (
              <a key={project.title} href={project.href} target="_blank" rel="noopener noreferrer" className="group block">
                <h3 className="text-sm font-medium group-hover:text-primary">{project.title}</h3>
                <p className="mt-1 text-xs">{project.description}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>

      <div className="border-b border-border">
        <section className="mx-auto max-w-3xl px-6 py-12">
          <h2 className="mb-6 text-xs font-medium uppercase tracking-wider text-muted-foreground">Skills</h2>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill) => (
              <span key={skill} className="rounded-full border border-border px-2.5 py-1 text-xs">
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>

      <div className="border-b border-border">
        <section className="mx-auto max-w-3xl px-6 py-12">
          <h2 className="mb-6 text-xs font-medium uppercase tracking-wider text-muted-foreground">Contact</h2>
          <p className="mb-3 text-sm">Have a project, opportunity, or idea you&apos;d like to discuss?</p>
          <a
            href="mailto:sushilbang17@gmail.com"
            className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
          >
            <Mail size={15} />
            sushilbang17@gmail.com
          </a>
        </section>
      </div>

      <footer className="mx-auto max-w-3xl px-6 pt-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          <p className="text-xs">
            Design inspired by <a href="https://chanhdai.com" target="_blank" className="underline">chanhdai.com</a>
          </p>
          <div className="flex gap-3">
            {socialLinks.slice(0, 3).map((link) => (
              <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer">
                <link.icon size={16} className="text-muted-foreground" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
