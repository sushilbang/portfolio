import type { ReactElement, ReactNode } from 'react';
import type { Components } from 'react-markdown';
import { Mermaid } from './mermaid';
import { LabelPropagationDemo, QueryExpansionDemo } from './graph-demos';

// Interactive demos a post can embed with a fenced block, for example:
//   ```demo
//   label-propagation
//   ```
const demos: Record<string, () => ReactElement> = {
  'label-propagation': LabelPropagationDemo,
  'query-expansion': QueryExpansionDemo,
};

const text = (children: ReactNode) => String(children ?? '').replace(/\n$/, '');
const isMermaid = (className?: string) => /\blanguage-mermaid\b/.test(className ?? '');
const isDemo = (className?: string) => /\blanguage-demo\b/.test(className ?? '');

export const blogComponents: Components = {
  // Blocks we render ourselves must not sit inside the <pre> that Markdown adds.
  pre({ children, node: _node, ...props }) {
    const child = (Array.isArray(children) ? children[0] : children) as ReactElement<{ className?: string }> | undefined;
    const className = child?.props?.className;
    return isMermaid(className) || isDemo(className) ? <>{children}</> : <pre {...props}>{children}</pre>;
  },
  code({ className, children, node: _node, ...props }) {
    if (isMermaid(className)) return <Mermaid chart={text(children)} />;
    if (isDemo(className)) {
      const Demo = demos[text(children).trim()];
      if (Demo) return <Demo />;
    }
    return <code className={className} {...props}>{children}</code>;
  },
};
