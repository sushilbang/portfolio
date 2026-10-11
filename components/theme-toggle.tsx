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

type WindowWithWebkitAudio = Window & {
  webkitAudioContext?: typeof AudioContext;
};

function playThemeChangeSound(nextTheme: 'light' | 'dark') {
  try {
    const AudioContextClass = window.AudioContext
      ?? (window as WindowWithWebkitAudio).webkitAudioContext;

    if (!AudioContextClass) return;

    const audioContext = new AudioContextClass();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const now = audioContext.currentTime;
    const startFrequency = nextTheme === 'light' ? 420 : 620;
    const endFrequency = nextTheme === 'light' ? 720 : 340;

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(startFrequency, now);
    oscillator.frequency.exponentialRampToValueAtTime(endFrequency, now + 0.12);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.07, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.15);
    oscillator.addEventListener('ended', () => void audioContext.close(), { once: true });
  } catch {
    // Theme switching should still work if audio is unavailable or blocked.
  }
}

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

    playThemeChangeSound(nextTheme);

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
