import { ArrowUpRight } from 'lucide-react';
import { ProjectDetailsDrawer } from '@/components/project-details-drawer';

const projects = {
  built: [
    {
      title: 'code-agent',
      description: 'a desktop coding-agent workspace with a local file explorer, monaco editor, persistent chats, streamed openai responses, and approval-gated file tools.',
      href: 'https://github.com/sushilbang/code-agent',
      technologies: ['TypeScript', 'Electron', 'React', 'Monaco'],
      details: [
        'Combines a local file explorer and Monaco editor with resizable, collapsible explorer and agent panes inside an Electron desktop app.',
        'Streams OpenAI Responses with Markdown rendering, expandable tool activity, model selection, and optional reasoning summaries.',
        'Supports bounded file and Git inspection, workspace commands, and approval-gated file changes with contextual unified diffs.',
        'Protects API keys with Electron safeStorage and keeps chats, permissions, context settings, and project memory on the local machine.',
      ],
    },
    {
      title: 'pod',
      description: 'an electron desktop app that turns text-based pdfs into two-voice podcasts and saves the generated mp3 and script directly to a folder you choose.',
      href: 'https://github.com/sushilbang/pod',
      technologies: ['Electron', 'TypeScript', 'Python', 'ElevenLabs'],
      details: [
        'Uses Gemini, OpenAI, or Anthropic to write the podcast script, with ElevenLabs generating the two distinct voices.',
        'Runs without an account, database, Redis, server, or cloud storage; generated MP3 and script files stay in the selected output folder.',
        'Stores provider keys with Electron\'s operating-system-backed encrypted storage and only sends the selected provider key during generation.',
        'Bundles its Python worker into the Windows installer, includes ffmpeg, and limits extracted input to 40,000 characters to bound API usage.',
      ],
    },
    {
      title: 'claude-tts',
      description: 'a cli tool that turns claude responses or any piped text into natural speech while keeping the original text visible in the terminal.',
      href: 'https://github.com/sushilbang/claude-tts',
      technologies: ['JavaScript', 'Node.js', 'Groq', 'Edge TTS'],
      details: [
        'Passes stdin through to stdout, then cleans the text for speech and plays generated audio in the background with ffplay.',
        'Sends complex formatting such as code blocks, lists, and headings to Groq with Qwen3-32B for a speakable script; simple text uses direct cleanup.',
        'Generates audio with Microsoft Edge TTS and supports custom voices, dry runs, and saving audio without playback.',
        'Can run as a Claude Code Stop hook so responses are spoken automatically after each turn.',
      ],
    },
    {
      title: 'zerohunger',
      description: 'a simple app to stop food waste. list surplus meals, connect with nearby ngos or people in need, and donate with a tap. built for latrobe tigc and backed with 27,000 inr in funding.',
      href: 'https://github.com/sushilbang/zero-hunger',
      technologies: ['React Native', 'Expo', 'Firebase'],
      details: [
        'Built as an Expo and React Native app for tracking food inventory and turning surplus items into donations.',
        'Includes donation, inventory, expiry-alert, recipe, profile, onboarding, and camera-scanner experiences.',
        'Uses Firebase authentication and Firestore with protected routes, email verification, and persisted user sessions.',
        'Supports background tasks and notifications so users can act on expiring food before it becomes waste.',
      ],
    },
    {
      title: 'devlogr',
      description: 'a tiny cli buddy for developers who forget what they did yesterday. log your progress straight from the terminal, no context-switching needed. built in rust because speed matters when you\'re in the zone.',
      href: 'https://github.com/sushilbang/devlogr',
      technologies: ['Rust'],
      details: [
        'Adds timestamped development notes from the terminal with a simple devlogr add command.',
        'Lists the complete project history with devlogr list, making standups and progress recaps easier to write.',
        'Stores entries in a .devlog.json file in the current directory, so each project keeps an independent log.',
        'Ships as a lightweight Rust CLI that can be installed directly through Cargo.',
      ],
    },
    {
      title: 'shodhak',
      description: 'a typescript research-agent backend that searches scholarly sources, analyzes papers, and builds cited literature reviews with an openai-powered agent loop.',
      href: 'https://github.com/sushilbang/shodhak',
      technologies: ['TypeScript', 'Express', 'PostgreSQL', 'OpenAI'],
      details: [
        'Searches arXiv, Crossref, OpenAlex, PubMed, and Semantic Scholar through a shared paper-provider interface.',
        'Combines query refinement and expansion with embeddings, reranking, extraction, knowledge storage, and context compression.',
        'Provides agent tools for search, paper analysis, context, and knowledge workflows, exposed through an Express API.',
        'Includes dedicated retrieval, generation, citation, fact, race, and deep-research benchmarks alongside Vitest coverage.',
      ],
    },
  ],
  contributed: [
    {
      title: 'wisk',
      description: 'an offline-first, plugin-based document editor built with vanilla javascript and web components, with block editing, collaboration, sync, and rich content tools.',
      href: 'https://github.com/sohzm/wisk',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      contributionPeriod: 'Jul 2025 – Jan 2026',
      details: [
        'Designed an event-driven state layer with timestamped changes and a path-based resolver for block creation, reordering, patching, deletion, and document restore.',
        'Serialized IndexedDB saves through a queue, retained changes arriving during a save, and rolled back in-memory state after failed writes.',
        'Refactored collaboration handlers to process eight event groups, including block patches, order changes, configuration, and plugin data, before applying remote updates.',
        'Delivered contributions covering desktop and mobile drag and drop, block duplicate and delete menus, responsive controls, Markdown plugin descriptions, and update checks with offline handling.',
      ],
    },
  ],
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      {/* Header */}
      <section className="pb-12 border-b border-border">
        <h1 className="mb-2 text-2xl font-bold tracking-tight sm:text-3xl">
          Work
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
            <div key={project.title}>
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5"
              >
                <h3 className="text-sm font-medium transition-colors group-hover:text-primary">
                  {project.title}
                </h3>
                <ArrowUpRight
                  size={14}
                  className="text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                />
              </a>
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
              <ProjectDetailsDrawer {...project} />
            </div>
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
            <div key={project.title}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5"
                  >
                    <h3 className="text-sm font-medium transition-colors group-hover:text-primary">
                      {project.title}
                    </h3>
                    <ArrowUpRight
                      size={14}
                      className="text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                    />
                  </a>
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    Contributor · {project.contributionPeriod}
                  </p>
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
                  <ProjectDetailsDrawer {...project} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
