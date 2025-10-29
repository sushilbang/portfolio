'use client'

import { work } from './work';
import { Accordion } from '@/components/ui/accordion';

export default function ProofOfWorkPage() {
  const builtProjects = work.filter(project => project.type === 'built');
  const contributedProjects = work.filter(project => project.type === 'contributed');

  return (
    <div className="pt-16 sm:pt-24 pb-16 mx-auto max-w-4xl px-4 sm:px-8">
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2" style={{ letterSpacing: '-0.02em' }}>
          Proof of Work
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Projects and work I&apos;ve built and contributed to
        </p>
      </div>

      {builtProjects.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6" style={{ letterSpacing: '-0.02em' }}>
            Built
          </h2>
          <Accordion items={builtProjects} />
        </div>
      )}

      {contributedProjects.length > 0 && (
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-6" style={{ letterSpacing: '-0.02em' }}>
            Contributed To
          </h2>
          <Accordion items={contributedProjects} />
        </div>
      )}
    </div>
  );
}
