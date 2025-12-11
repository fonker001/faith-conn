"use client";

import React, { useEffect, useCallback } from 'react';

// ThemeProvider: ensures the saved theme is applied on mount across the app
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const applyStoredTheme = useCallback(() => {
    try {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
      const root = document.documentElement;
      if (!stored || stored === 'system') {
        // follow system preference
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.classList.toggle('dark', !!prefersDark);
      } else if (stored === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    } catch (err) {
      // ignore errors; default to no dark class
      console.warn('ThemeProvider: failed to apply stored theme', err);
    }
  }, []);

  useEffect(() => {
    applyStoredTheme();

    function onStorage(e: StorageEvent) {
      if (e.key === 'theme') applyStoredTheme();
    }

    function onCustom(e: Event) {
      const detail = (e as CustomEvent).detail;
      if (detail && detail.theme) applyStoredTheme();
    }

    window.addEventListener('storage', onStorage);
    window.addEventListener('theme-change', onCustom as EventListener);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('theme-change', onCustom as EventListener);
    };
  }, [applyStoredTheme]);

  return <>{children}</>;
}
