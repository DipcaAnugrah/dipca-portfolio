"use client";

import { useEffect, useRef, useState } from "react";
import { Appearance } from "./icons";

type Theme = "normal" | "color";

export function ThemeModeButton({ theme, locale, onThemeChange }: { theme: Theme; locale: "en" | "id"; onThemeChange: (theme: Theme) => void }) {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout> | undefined;
    let animationFrame = 0;

    const scheduleHide = (delay = 4200) => {
      if (hideTimer) clearTimeout(hideTimer);
      hideTimer = setTimeout(() => setVisible(false), delay);
    };

    const handleScroll = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollY.current;

        if (Math.abs(delta) > 6) {
          if (delta < 0) {
            setVisible(true);
            scheduleHide(3600);
          } else if (currentScrollY > 96) {
            setVisible(false);
            if (hideTimer) clearTimeout(hideTimer);
          }
        }

        lastScrollY.current = currentScrollY;
        animationFrame = 0;
      });
    };

    lastScrollY.current = window.scrollY;
    scheduleHide();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (hideTimer) clearTimeout(hideTimer);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  const targetTheme: Theme = theme === "normal" ? "color" : "normal";
  const activeLabel = theme === "normal" ? "Normal" : "Colorful";
  const targetLabel = targetTheme === "normal" ? "Normal" : "Colorful";
  const tooltip = locale === "id" ? `Beralih ke ${targetLabel} Mode` : `Switch to ${targetLabel} Mode`;

  return (
    <div className="floating-theme-control" data-visible={visible} data-target={targetTheme}>
      <button
        type="button"
        className="floating-theme-button"
        onClick={() => {
          setVisible(true);
          onThemeChange(targetTheme);
        }}
        aria-label={tooltip}
        aria-pressed={theme === "color"}
      >
        <Appearance className="floating-theme-icon" />
        <span className="floating-theme-label">{activeLabel}</span>
        <span className="floating-theme-state" aria-hidden="true" />
      </button>
      <span className="floating-theme-tooltip" role="tooltip">{tooltip}</span>
    </div>
  );
}
