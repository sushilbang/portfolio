'use client';

import * as React from 'react';
import { flushSync } from 'react-dom';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

type DocumentWithViewTransition = Document & {
  startViewTransition?: (update: () => void) => {
    finished: Promise<void>;
  };
};

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const transitionInProgress = React.useRef(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="rounded-md p-2 transition-colors hover:bg-muted"
        aria-label="Toggle theme"
      >
        <div className="h-4 w-4" />
      </button>
    );
  }

  const isDark = resolvedTheme === 'dark';

  const toggleTheme = () => {
    if (transitionInProgress.current) return;

    const nextTheme = isDark ? 'light' : 'dark';
    const viewTransitionDocument = document as DocumentWithViewTransition;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!viewTransitionDocument.startViewTransition || reduceMotion) {
      setTheme(nextTheme);
      return;
    }

    transitionInProgress.current = true;
    const transition = viewTransitionDocument.startViewTransition(() => {
      flushSync(() => setTheme(nextTheme));
    });

    transition.finished.finally(() => {
      transitionInProgress.current = false;
    });
  };

  return (
    <button
      onClick={toggleTheme}
      className="rounded-md p-2 transition-colors hover:bg-muted"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      {isDark ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}
