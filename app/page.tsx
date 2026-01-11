'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ArrowUpRight, Github, Linkedin, Twitter, Mail, FileText } from 'lucide-react';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/sushilbang', icon: Github },
  { name: 'Twitter', href: 'https://x.com/bang_sushil17', icon: Twitter },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/sushil-bang-9b0327284/', icon: Linkedin },
  { name: 'Email', href: 'mailto:sushilbang17@gmail.com', icon: Mail },
];

const featuredProjects = [
  {
    title: 'POD',
    description: 'Turns PDFs into podcasts. Upload a document, extract key content, and listen to it spoken aloud.',
    href: 'https://pod.sushilbang.xyz/',
    tags: ['FastAPI', 'Celery', 'Redis', 'AWS'],
  },
  {
    title: 'NeuralPost',
    description: 'AI-powered blog studio. Whisper an idea and watch a post come alive with live preview streaming.',
    href: 'https://neuralpost.sushilbang.xyz/',
    tags: ['Next.js', 'TypeScript', 'Firebase', 'Groq API'],
  },
  {
    title: 'ZeroHunger',
    description: 'Mobile app to prevent food waste by connecting surplus meals with NGOs and people in need.',
    href: 'https://github.com/sushilbang/ZeroHunger',
    tags: ['React Native', 'Expo', 'Firebase'],
  },
];

const experience = [
  {
    role: 'Contributor',
    company: 'Wisk',
    companyUrl: 'https://wisk.cc',
    period: 'Present',
    description: 'Contributing to a lightweight, plugin-powered document editor.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
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
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const key = e.key.toLowerCase();

      if (key === 'h') router.push('/');
      if (key === 'p') router.push('/projects');
      if (key === 'b') router.push('/blog');
      if (key === 'g') window.open('https://github.com/sushilbang', '_blank', 'noopener');
      if (key === 't') window.open('https://x.com/bang_sushil17', '_blank', 'noopener');
      if (key === 'l') window.open('https://www.linkedin.com/in/sushil-bang-9b0327284/', '_blank', 'noopener');
    };

    window.addEventListener('keydown', handleKeyDown, { passive: true });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

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
            <a href="https://drive.google.com/file/d/1ejKPEj_43_RReGmoNJnN5-74hqMazuJv/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
              <FileText size={14} />
              <span>Resume</span>
            </a>
          </div>
        </section>
      </div>

      <div className="border-b border-border">
        <section className="mx-auto max-w-3xl px-6 py-12">
          <blockquote className="text-sm italic leading-relaxed">
            “If you're good with computers, if you're good at basic mathematics, if you're good at writing, if you're good at speaking, and if you like reading, you're set for life.”
          </blockquote>
          <p className="text-right italic mt-3 text-xs text-muted-foreground/70">— Naval Ravikant</p>
        </section>
      </div>

      <div className="border-b border-border">
        <section className="mx-auto max-w-3xl px-6 py-12">
          <h2 className="mb-6 text-xs font-medium uppercase tracking-wider text-muted-foreground">Experience</h2>
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
            </div>
          ))}
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
          <h2 className="mb-6 text-xs font-medium uppercase tracking-wider text-muted-foreground">Keyboard Shortcuts</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              ['H', 'Home'],
              ['P', 'Projects'],
              ['B', 'Blog'],
              ['G', 'GitHub'],
              ['T', 'Twitter'],
              ['L', 'LinkedIn'],
            ].map(([key, label]) => (
              <div key={key} className="flex items-center gap-2">
                <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                  {key}
                </kbd>
                <span className="text-xs">{label}</span>
              </div>
            ))}
          </div>
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
