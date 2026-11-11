// Small hand-made graphs for the code-graph post demos. The label propagation here
// mirrors the weighted algorithm in the Code Agent harness (src/electron/graph/build.ts).

export type Point = { x: number; y: number };
export type DemoNode = { id: string; label: string } & Point;
export type DemoEdge = { a: string; b: string; w: number; inferred?: boolean };

export const FILES: DemoNode[] = [
  { id: 'runner', label: 'runner.ts', x: 90, y: 70 },
  { id: 'registry', label: 'registry.ts', x: 200, y: 40 },
  { id: 'subagents', label: 'subagents.ts', x: 190, y: 130 },
  { id: 'memory', label: 'memory.ts', x: 70, y: 160 },
  { id: 'types', label: 'types.ts', x: 360, y: 60 },
  { id: 'fs', label: 'filesystem.ts', x: 470, y: 40 },
  { id: 'search', label: 'search.ts', x: 480, y: 130 },
  { id: 'shell', label: 'shell.ts', x: 360, y: 150 },
  { id: 'app', label: 'App.tsx', x: 650, y: 70 },
  { id: 'models', label: 'models.ts', x: 760, y: 40 },
  { id: 'composer', label: 'Composer.tsx', x: 770, y: 130 },
  { id: 'chat', label: 'Chat.tsx', x: 640, y: 160 }
];

export const FILE_EDGES: DemoEdge[] = [
  { a: 'runner', b: 'registry', w: 1 }, { a: 'runner', b: 'subagents', w: 1 }, { a: 'runner', b: 'memory', w: 1 },
  { a: 'subagents', b: 'registry', w: 1 }, { a: 'subagents', b: 'memory', w: 0.5 }, { a: 'registry', b: 'memory', w: 0.5 },
  { a: 'registry', b: 'types', w: 1.5 }, { a: 'types', b: 'fs', w: 1 }, { a: 'types', b: 'search', w: 1 }, { a: 'types', b: 'shell', w: 1 },
  { a: 'fs', b: 'search', w: 1 }, { a: 'search', b: 'shell', w: 0.5 }, { a: 'fs', b: 'shell', w: 0.5 },
  { a: 'app', b: 'models', w: 1 }, { a: 'app', b: 'composer', w: 1 }, { a: 'app', b: 'chat', w: 1 },
  { a: 'composer', b: 'models', w: 1 }, { a: 'composer', b: 'chat', w: 0.5 }, { a: 'models', b: 'chat', w: 0.5 },
  { a: 'subagents', b: 'shell', w: 0.4 }, { a: 'shell', b: 'chat', w: 0.4 }
];

export type Frame = { labels: number[]; moved: number; round: number; changed: boolean };

// Asynchronous weighted label propagation, visiting nodes in order and updating in place.
// A node adopts a neighbour label only when it carries strictly more weight than its current one.
export function propagationFrames(nodes: DemoNode[], edges: DemoEdge[], maxRounds = 30): Frame[] {
  const index = new Map(nodes.map((node, i) => [node.id, i]));
  const weights: Map<number, number>[] = nodes.map(() => new Map());
  for (const { a, b, w } of edges) {
    const i = index.get(a)!, j = index.get(b)!;
    weights[i].set(j, (weights[i].get(j) ?? 0) + w);
    weights[j].set(i, (weights[j].get(i) ?? 0) + w);
  }
  const labels = nodes.map((_, i) => i);
  const frames: Frame[] = [{ labels: [...labels], moved: -1, round: 0, changed: false }];
  for (let round = 1; round <= maxRounds; round++) {
    let any = false;
    for (let i = 0; i < nodes.length; i++) {
      const tally = new Map<number, number>();
      for (const [n, w] of weights[i]) tally.set(labels[n], (tally.get(labels[n]) ?? 0) + w);
      let best = labels[i];
      let bestWeight = tally.get(best) ?? 0;
      for (const [candidate, weight] of [...tally].sort((x, y) => x[0] - y[0])) {
        if (weight > bestWeight + 1e-9) { best = candidate; bestWeight = weight; }
      }
      const changed = best !== labels[i];
      if (changed) { labels[i] = best; any = true; }
      frames.push({ labels: [...labels], moved: i, round, changed });
    }
    if (!any) break;
  }
  return frames;
}

// ---- query expansion demo ----
export type SymbolKind = 'function' | 'class' | 'method' | 'interface';
export type SymbolNode = DemoNode & { kind: SymbolKind };

export const SYMBOLS: SymbolNode[] = [
  { id: 'runAgent', label: 'runAgent', kind: 'function', x: 90, y: 100 },
  { id: 'prepare', label: 'ToolRegistry.prepare', kind: 'method', x: 330, y: 100 },
  { id: 'registry', label: 'ToolRegistry', kind: 'class', x: 330, y: 30 },
  { id: 'validate', label: 'validateArguments', kind: 'function', x: 560, y: 40 },
  { id: 'agentTool', label: 'AgentTool', kind: 'interface', x: 560, y: 120 },
  { id: 'investigate', label: 'investigate', kind: 'function', x: 90, y: 20 },
  { id: 'budget', label: 'SubAgentBudget', kind: 'interface', x: 90, y: 190 },
  { id: 'apply', label: 'applyMutation', kind: 'function', x: 780, y: 120 },
  { id: 'readFile', label: 'readFileTool', kind: 'function', x: 780, y: 40 },
  { id: 'resolve', label: 'resolveWorkspacePath', kind: 'function', x: 780, y: 200 },
  { id: 'approval', label: 'requestWriteApproval', kind: 'function', x: 560, y: 200 },
  { id: 'store', label: 'LocalStore', kind: 'class', x: 330, y: 190 }
];

export const SYMBOL_EDGES: { a: string; b: string; rel: string; inferred?: boolean }[] = [
  { a: 'runAgent', b: 'prepare', rel: 'calls' }, { a: 'registry', b: 'prepare', rel: 'contains' },
  { a: 'prepare', b: 'validate', rel: 'calls' }, { a: 'prepare', b: 'agentTool', rel: 'uses' },
  { a: 'investigate', b: 'prepare', rel: 'calls' }, { a: 'runAgent', b: 'investigate', rel: 'calls' },
  { a: 'investigate', b: 'budget', rel: 'uses' }, { a: 'agentTool', b: 'apply', rel: 'implements' },
  { a: 'agentTool', b: 'readFile', rel: 'implements' }, { a: 'apply', b: 'resolve', rel: 'calls' },
  { a: 'readFile', b: 'resolve', rel: 'calls' }, { a: 'apply', b: 'approval', rel: 'calls', inferred: true },
  { a: 'approval', b: 'store', rel: 'calls', inferred: true }, { a: 'runAgent', b: 'store', rel: 'uses', inferred: true }
];
