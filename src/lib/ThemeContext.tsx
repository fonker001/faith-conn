import { Moon, Sun } from "lucide-react";
import React, { useEffect, useState, useCallback } from "react";

// ThemeContext toggle — supports 'light', 'dark' and 'system' (prefers-color-scheme)
const ThemeContext = () => {
  // internal state: 'light' | 'dark' | 'system'
  const [theme, setTheme] = useState<"light" | "dark" | "system">(() => {
    if (typeof window === "undefined" || !window.localStorage) return "system";
    const stored = localStorage.getItem("theme");
    if (!stored || stored === "system") return "system";
    return stored === "dark" ? "dark" : "light";
  });

  // compute whether we are currently in dark mode (taking 'system' into account)
  const isDark = (() => {
    if (theme === "system") {
      if (typeof window === "undefined") return false;
      return (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    }
    return theme === "dark";
  })();

  const applyTheme = useCallback((t: "light" | "dark" | "system") => {
    const root = document.documentElement;
    if (t === "system") {
      // system: toggle based on media
      const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", prefersDark);
      localStorage.setItem("theme", "system");
    } else if (t === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    // notify other parts of the app
    window.dispatchEvent(
      new CustomEvent("theme-change", { detail: { theme: t } })
    );
  }, []);

  // sync: apply theme when internal `theme` changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  // listen to storage changes and custom 'theme-change' events to stay in sync
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === "theme") {
        const val = e.newValue;
        if (!val || val === "system") setTheme("system");
        else setTheme(val === "dark" ? "dark" : "light");
      }
    }

    function onCustom(e: Event) {
      // custom event payload
      const detail = (e as CustomEvent).detail;
      if (detail && detail.theme) {
        const val = detail.theme;
        if (!val || val === "system") setTheme("system");
        else setTheme(val === "dark" ? "dark" : "light");
      }
    }

    window.addEventListener("storage", onStorage);
    window.addEventListener("theme-change", onCustom as EventListener);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("theme-change", onCustom as EventListener);
    };
  }, []);

  // Toggle behavior: switch between light and dark only.
  // If the current state is 'system', resolve it to the user's preference
  // and toggle to the opposite (so the first click from system sets a concrete choice).
  const toggle = () => {
    setTheme((prev) => {
      if (prev === "system") {
        const prefersDark =
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches;
        return prefersDark ? "light" : "dark";
      }
      return prev === "light" ? "dark" : "light";
    });
  };

  return (
    <button
      aria-pressed={isDark}
      onClick={toggle}
      className={`relative inline-flex items-center p-1 rounded-full transition-colors duration-200 focus:outline-none cursor-pointer ${
        isDark ? "bg-gray-700" : "bg-gray-200"
      }`}
      style={{ width: 56, height: 32 }}
      title={`Theme: ${theme}. Click to toggle between light and dark (initially follows system)`}
    >
      {/* Sliding knob */}
      <span
        className={`absolute top-1 left-1 w-7 h-7 rounded-full shadow transform transition-transform duration-200 flex items-center justify-center ${
          isDark
            ? "translate-x-[24px] bg-gray-900 text-white"
            : "translate-x-0 bg-white text-gray-800"
        }`}
      >
        {isDark ? <Moon size={16} /> : <Sun size={16} />}
      </span>
    </button>
  );
};

export default ThemeContext;
