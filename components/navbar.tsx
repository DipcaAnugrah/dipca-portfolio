"use client";

import { useEffect, useState } from "react";
import { Menu } from "./icons";
import { LanguageToggle } from "./language-toggle";

type Locale = "en" | "id";
const navigationTargets = ["#about", "#work", "#process", "#contact"];

export function Navbar({ locale, onLocaleChange, labels }: { locale: Locale; onLocaleChange: (locale: Locale) => void; labels: { about: string; work: string; process: string; contact: string; letsTalk: string; toggle: string } }) {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const links = [{ href: "#about", label: labels.about }, { href: "#work", label: labels.work }, { href: "#process", label: labels.process }, { href: "#contact", label: labels.contact }];

  useEffect(() => {
    const updateProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      document.documentElement.style.setProperty("--scroll-progress", String(Math.min(1, Math.max(0, progress))));
    };
    const sections = navigationTargets
      .map((target) => document.querySelector<HTMLElement>(target))
      .filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveSection(`#${visible[0].target.id}`);
      },
      { rootMargin: "-28% 0px -62%", threshold: 0 },
    );

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    sections.forEach((section) => observer.observe(section));
    return () => {
      window.removeEventListener("scroll", updateProgress);
      observer.disconnect();
    };
  }, []);

  return (
    <header className="site-navbar sticky top-0 z-50 border-b border-white/10 bg-[#10110f]/90 backdrop-blur-md">
      <div className="scroll-progress" aria-hidden="true" />
      <nav className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4 md:px-12" aria-label="Main navigation">
        <a href="#top" className="brand-lockup" aria-label="Dipca Anugrah, top of page"><span className="brand-monogram">DA<span>.</span></span><span className="brand-caption">Digital<br />workshop</span></a>
        <div className="hidden items-center gap-5 md:flex">
          {links.map((link) => <a key={link.href} href={link.href} onClick={() => setActiveSection(link.href)} className={`nav-link text-xs text-white/60 ${activeSection === link.href ? "is-active" : ""}`}>{link.label}</a>)}
          <LanguageToggle locale={locale} onChange={onLocaleChange} />
          <a href="#contact" className="nav-cta button-primary rounded-full bg-[#78aaff] px-4 py-2 text-xs font-bold" style={{ color: "#ffffff" }}>{labels.letsTalk}</a>
        </div>
        <div className="flex items-center gap-2 md:hidden"><LanguageToggle locale={locale} onChange={onLocaleChange} /><button type="button" onClick={() => setOpen(!open)} aria-label={labels.toggle} aria-expanded={open} className="icon-button"><Menu className="h-5 w-5" /></button></div>
      </nav>
      {open && <div className="border-t border-white/10 px-6 pb-5 md:hidden">
        <div className="flex flex-col gap-4 pt-5">
          {links.map((link) => <a key={link.href} href={link.href} onClick={() => { setActiveSection(link.href); setOpen(false); }} className={`nav-link w-fit text-sm text-white/70 ${activeSection === link.href ? "is-active" : ""}`}>{link.label}</a>)}
        </div>
      </div>}
    </header>
  );
}
