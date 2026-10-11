import Link from 'next/link';
import { ArrowUpRight, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { ExperienceDetailsDrawer } from '@/components/experience-details-drawer';

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
    description: 'an electron desktop app that turns text-based pdfs into two-voice podcasts and saves the generated mp3 and script locally.',
    href: 'https://github.com/sushilbang/pod',
    tags: ['Electron', 'TypeScript', 'Python', 'ElevenLabs'],
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
                <ExperienceDetailsDrawer {...exp} />
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="border-b border-border">
        <section className="mx-auto max-w-3xl px-6 py-12">
          <div className="mb-6 flex justify-between">
            <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Featured Work</h2>
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
        <div className="flex justify-end">
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
