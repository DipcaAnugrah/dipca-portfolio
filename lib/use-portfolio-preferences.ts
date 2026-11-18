"use client";

import { useCallback, useEffect, useState } from "react";

export type Locale = "en" | "id";
export type Theme = "normal" | "color";

const THEME_KEY = "portfolio-theme";
const LOCALE_KEY = "portfolio-locale";

function readStorage(key: string) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Storage can be unavailable (private mode, blocked cookies); the UI still works.
  }
}

/**
 * Runs before React hydrates (see app/layout.tsx) so the saved theme and language
 * are applied on first paint instead of flashing the defaults.
 */
export const preferencesBootScript = `(function(){try{var d=document.documentElement;var t=localStorage.getItem("${THEME_KEY}");d.dataset.theme=t==="color"?"color":"normal";var l=localStorage.getItem("${LOCALE_KEY}");if(l==="en"||l==="id")d.lang=l;}catch(e){}})();`;

/** Locale and theme shared by every page, persisted across visits and page changes. */
export function usePortfolioPreferences() {
  const [locale, setLocaleState] = useState<Locale>("id");
  const [theme, setThemeState] = useState<Theme>("normal");

  useEffect(() => {
    const root = document.documentElement;
    const savedTheme = readStorage(THEME_KEY);
    const savedLocale = readStorage(LOCALE_KEY);
    const initialTheme: Theme = savedTheme === "color" ? "color" : "normal";
    root.dataset.theme = initialTheme;
    setThemeState(initialTheme);
    if (savedLocale === "en" || savedLocale === "id") {
      root.lang = savedLocale;
      setLocaleState(savedLocale);
    } else {
      root.lang = "id";
    }
  }, []);

  const setLocale = useCallback((next: Locale) => {
    document.documentElement.lang = next;
    writeStorage(LOCALE_KEY, next);
    setLocaleState(next);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    document.documentElement.dataset.theme = next;
    writeStorage(THEME_KEY, next);
    setThemeState(next);
  }, []);

  return { locale, setLocale, theme, setTheme };
}

/**
 * Fades in `[data-reveal]` elements as they enter the viewport. Re-scans whenever
 * `rescanKey` changes so elements that React re-mounts (e.g. after a language
 * switch) are observed too instead of staying invisible.
 */
export function useReveal(rescanKey: unknown) {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { rootMargin: "0px 0px -8%", threshold: 0.08 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [rescanKey]);
}
