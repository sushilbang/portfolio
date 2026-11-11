'use client';

import { useEffect, useMemo, useState } from 'react';
import { Pause, Play, RotateCcw, StepForward } from 'lucide-react';
import { FILES, FILE_EDGES, SYMBOLS, SYMBOL_EDGES, propagationFrames } from './graph-data';

const PALETTE = ['#818cf8', '#34d399', '#fbbf24', '#f472b6', '#38bdf8', '#fb923c', '#a3e635', '#c084fc', '#2dd4bf', '#f87171', '#facc15', '#94a3b8'];
const prefersReducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const btn =
  'inline-flex items-center gap-1.5 rounded-md border border-border bg-muted px-2.5 py-1.5 text-xs transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-40';

function Shell({ title, caption, children, controls, note }: { title: string; caption: string; children: React.ReactNode; controls: React.ReactNode; note: string }) {
  return (
    <figure className="my-8 rounded-lg border border-border bg-card p-4">
      <figcaption className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <span className="text-sm font-semibold">{title}</span>
        <span className="text-xs text-muted-foreground" aria-live="polite">{caption}</span>
      </figcaption>
      {children}
      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">{controls}</div>
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{note}</p>
    </figure>
  );
}

/* ---------- weighted label propagation ---------- */
export function LabelPropagationDemo() {
  const frames = useMemo(() => propagationFrames(FILES, FILE_EDGES), []);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const last = frames.length - 1;
  const frame = frames[step];

  useEffect(() => {
    if (!playing) return;
    if (step >= last) { setPlaying(false); return; }
    const timer = setTimeout(() => setStep(step + 1), 450);
    return () => clearTimeout(timer);
  }, [playing, step, last]);

  const toggle = () => {
    if (prefersReducedMotion()) { setStep(last); return; }
    if (playing) { setPlaying(false); return; }
    if (step >= last) setStep(0);
    setPlaying(true);
  };

  const index = new Map(FILES.map((n, i) => [n.id, i]));
  const communities = new Set(frame.labels).size;

  return (
    <Shell
      title="label propagation, one file at a time"
      caption={step === 0 ? 'every file starts as its own community' : `round ${frame.round}, ${communities} ${communities === 1 ? 'community' : 'communities'}`}
      note="thicker edges carry more weight (extends 1.5, imports and calls 1, uses 0.5). a file adopts a neighbour’s label only when that label has strictly more total weight around it than its current one. the ringed file is the one being updated."
      controls={
        <>
          <button className={btn} onClick={toggle}>
            {playing ? <Pause size={13} /> : <Play size={13} />}
            {playing ? 'pause' : step >= last ? 'replay' : 'play'}
          </button>
          <button className={btn} onClick={() => { setPlaying(false); setStep(Math.min(last, step + 1)); }} disabled={step >= last}>
            <StepForward size={13} />step
          </button>
          <button className={btn} onClick={() => { setPlaying(false); setStep(0); }}>
            <RotateCcw size={13} />reset
          </button>
          <input
            type="range" min={0} max={last} value={step} aria-label="step"
            onChange={(e) => { setPlaying(false); setStep(Number(e.target.value)); }}
            className="min-w-32 flex-1 accent-current"
          />
        </>
      }
    >
      <svg viewBox="30 0 800 215" className="h-auto w-full" role="img" aria-label="twelve files linked by imports and calls, recoloured as label propagation converges on three communities">
        {FILE_EDGES.map((edge, i) => {
          const a = FILES[index.get(edge.a)!];
          const b = FILES[index.get(edge.b)!];
          const same = frame.labels[index.get(edge.a)!] === frame.labels[index.get(edge.b)!];
          return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="currentColor" strokeOpacity={same ? 0.55 : 0.18} strokeWidth={0.8 + edge.w * 1.1} />;
        })}
        {FILES.map((node, i) => (
          <g key={node.id}>
            {frame.moved === i && <circle cx={node.x} cy={node.y} r={19} fill="none" stroke="currentColor" strokeOpacity={0.6} strokeDasharray="3 3" />}
            <circle cx={node.x} cy={node.y} r={12} fill={PALETTE[frame.labels[i] % PALETTE.length]} style={{ transition: 'fill 300ms' }} />
            <text x={node.x} y={node.y + 28} textAnchor="middle" className="fill-muted-foreground" fontSize="13" stroke="var(--card)" strokeWidth={4} paintOrder="stroke">{node.label}</text>
          </g>
        ))}
      </svg>
    </Shell>
  );
}

/* ---------- graph_query expansion ---------- */
const HOP_COLORS = ['#818cf8', '#34d399', '#fbbf24', '#f472b6'];

export function QueryExpansionDemo() {
  const [depth, setDepth] = useState(1);
  const [limit, setLimit] = useState(12);
  const seed = 'prepare';

  const { hop, shown } = useMemo(() => {
    const adjacency = new Map<string, { other: string; inferred: boolean }[]>();
    for (const e of SYMBOL_EDGES) {
      adjacency.set(e.a, [...(adjacency.get(e.a) ?? []), { other: e.b, inferred: !!e.inferred }]);
      adjacency.set(e.b, [...(adjacency.get(e.b) ?? []), { other: e.a, inferred: !!e.inferred }]);
    }
    const hop = new Map<string, number>([[seed, 0]]);
    let frontier = [seed];
    for (let level = 1; level <= depth && frontier.length && hop.size < limit; level++) {
      const next: string[] = [];
      for (const id of frontier) {
        // extracted links are followed before inferred ones, as in graph_query
        const options = [...(adjacency.get(id) ?? [])].sort((x, y) => Number(x.inferred) - Number(y.inferred));
        for (const { other } of options) {
          if (hop.has(other) || hop.size >= limit) continue;
          hop.set(other, level);
          next.push(other);
        }
      }
      frontier = next;
    }
    return { hop, shown: SYMBOL_EDGES.filter((e) => hop.has(e.a) && hop.has(e.b)) };
  }, [depth, limit]);

  const byId = new Map(SYMBOLS.map((n) => [n.id, n]));

  return (
    <Shell
      title="graph_query around ToolRegistry.prepare"
      caption={`${hop.size} of ${SYMBOLS.length} symbols returned, ${shown.length} relationships`}
      note="solid links are extracted from source, dashed links are inferred. colour is the number of hops from the match. the agent receives only the highlighted neighbourhood, with a file and line for each symbol, instead of the rest of the repository."
      controls={
        <>
          <label className="flex items-center gap-2">
            depth
            <input type="range" min={1} max={3} value={depth} onChange={(e) => setDepth(Number(e.target.value))} className="accent-current" />
            <span className="w-3 tabular-nums">{depth}</span>
          </label>
          <label className="flex items-center gap-2">
            limit
            <input type="range" min={3} max={12} value={limit} onChange={(e) => setLimit(Number(e.target.value))} className="accent-current" />
            <span className="w-5 tabular-nums">{limit}</span>
          </label>
        </>
      }
    >
      <svg viewBox="40 0 820 245" className="h-auto w-full" role="img" aria-label="a symbol graph; symbols within the chosen number of hops of ToolRegistry.prepare are highlighted">
        {SYMBOL_EDGES.map((e, i) => {
          const a = byId.get(e.a)!;
          const b = byId.get(e.b)!;
          const on = hop.has(e.a) && hop.has(e.b);
          return (
            <line
              key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="currentColor"
              strokeOpacity={on ? 0.6 : 0.12} strokeWidth={on ? 1.6 : 1}
              strokeDasharray={e.inferred ? '5 4' : undefined} style={{ transition: 'stroke-opacity 250ms' }}
            />
          );
        })}
        {SYMBOLS.map((n) => {
          const h = hop.get(n.id);
          const on = h !== undefined;
          return (
            <g key={n.id}>
              <circle
                cx={n.x} cy={n.y} r={on ? 12 : 9}
                fill={on ? HOP_COLORS[h]! : 'currentColor'} fillOpacity={on ? 1 : 0.12}
                stroke={n.id === seed ? 'currentColor' : 'none'} strokeWidth={2} style={{ transition: 'all 250ms' }}
              />
              <text x={n.x} y={n.y + 27} textAnchor="middle" fontSize="13" stroke="var(--card)" strokeWidth={4} paintOrder="stroke" className={on ? 'fill-foreground' : 'fill-muted-foreground'} fillOpacity={on ? 1 : 0.55}>
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>
    </Shell>
  );
}
