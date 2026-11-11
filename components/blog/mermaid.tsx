'use client';

import { useEffect, useId, useState } from 'react';
import { useTheme } from 'next-themes';

const light = {
  background: 'transparent', primaryColor: '#f5f5f5', primaryTextColor: '#0a0a0a', primaryBorderColor: '#a3a3a3',
  lineColor: '#737373', secondaryColor: '#fafafa', tertiaryColor: '#ffffff', noteBkgColor: '#f5f5f5',
  noteTextColor: '#0a0a0a', actorBkg: '#f5f5f5', actorBorder: '#a3a3a3', actorTextColor: '#0a0a0a',
  signalColor: '#737373', signalTextColor: '#0a0a0a',
};
const dark = {
  background: 'transparent', primaryColor: '#262626', primaryTextColor: '#fafafa', primaryBorderColor: '#525252',
  lineColor: '#a3a3a3', secondaryColor: '#171717', tertiaryColor: '#171717', noteBkgColor: '#262626',
  noteTextColor: '#fafafa', actorBkg: '#262626', actorBorder: '#525252', actorTextColor: '#fafafa',
  signalColor: '#a3a3a3', signalTextColor: '#fafafa',
};

// Renders a ```mermaid fence in the browser. Mermaid is loaded lazily, so posts
// without diagrams never download it, and the diagram re-renders on theme change.
export function Mermaid({ chart }: { chart: string }) {
  const { resolvedTheme } = useTheme();
  const id = `mmd-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const [svg, setSvg] = useState('');
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { default: mermaid } = await import('mermaid');
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          theme: 'base',
          fontFamily: 'inherit',
          themeVariables: resolvedTheme === 'dark' ? dark : light,
        });
        const result = await mermaid.render(id, chart);
        if (!cancelled) { setSvg(result.svg); setFailed(false); }
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();
    return () => { cancelled = true; };
  }, [chart, id, resolvedTheme]);

  if (failed) {
    return (
      <pre className="overflow-x-auto rounded-lg border border-border bg-muted p-4 text-xs">
        <code>{chart}</code>
      </pre>
    );
  }
  if (!svg) {
    return (
      <div className="my-8 flex min-h-24 items-center justify-center rounded-lg border border-border bg-card p-4 text-xs text-muted-foreground">
        rendering diagram…
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label="diagram"
      className="my-8 flex justify-center overflow-x-auto rounded-lg border border-border bg-card p-4 [&_svg]:h-auto [&_svg]:max-w-full"
      // Generated from the post's own source with securityLevel "strict".
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
