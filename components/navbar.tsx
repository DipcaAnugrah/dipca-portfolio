"use client";

import { useState } from "react";
import { Menu } from "./icons";
import { LanguageToggle } from "./language-toggle";

type Locale = "en" | "id";

export function Navbar({ locale, onLocaleChange, labels }: { locale: Locale; onLocaleChange: (locale: Locale) => void; labels: { about: string; work: string; process: string; contact: string; letsTalk: string; toggle: string } }) {
  const [open, setOpen] = useState(false);
  const links = [{ href: "#about", label: labels.about }, { href: "#work", label: labels.work }, { href: "#process", label: labels.process }, { href: "#contact", label: labels.contact }];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#10110f]/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4 md:px-12" aria-label="Main navigation">
        <a href="#top" className="text-sm font-bold tracking-[-.04em]" aria-label="Dipca Anugrah, top of page">DA<span className="text-[#d7ff75]">.</span></a>
        <div className="hidden items-center gap-5 md:flex">
          {links.map((link) => <a key={link.href} href={link.href} className="text-xs text-white/60 transition hover:text-white">{link.label}</a>)}
          <LanguageToggle locale={locale} onChange={onLocaleChange} />
          <a href="#contact" className="rounded-full bg-[#d7ff75] px-4 py-2 text-xs font-bold transition hover:bg-white" style={{ color: "#000000" }}>{labels.letsTalk}</a>
        </div>
        <div className="flex items-center gap-3 md:hidden"><LanguageToggle locale={locale} onChange={onLocaleChange} /><button type="button" onClick={() => setOpen(!open)} aria-label={labels.toggle} aria-expanded={open}><Menu className="h-5 w-5" /></button></div>
      </nav>
      {open && <div className="border-t border-white/10 px-6 pb-5 md:hidden">
        <div className="flex flex-col gap-4 pt-5">
          {links.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-sm text-white/70">{link.label}</a>)}
        </div>
      </div>}
    </header>
  );
}
