"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight } from "./icons";
import { LanguageToggle } from "./language-toggle";

export type NavbarLanguage = "en" | "id";

type NavbarProps = {
  lang: NavbarLanguage;
  onLangChange: (lang: NavbarLanguage) => void;
  rootLinks?: boolean;
};

type IndicatorStyle = { left: number; width: number; visible: boolean };

const navigation = {
  id: {
    links: [
      { id: "tentang", label: "Tentang" },
      { id: "proyek", label: "Proyek" },
      { id: "proses", label: "Proses" },
      { id: "kontak", label: "Kontak" },
    ],
    cta: "Mari Bicara",
    navigation: "Navigasi utama",
    open: "Buka menu navigasi",
    close: "Tutup menu navigasi",
  },
  en: {
    links: [
      { id: "tentang", label: "About" },
      { id: "proyek", label: "Projects" },
      { id: "proses", label: "Process" },
      { id: "kontak", label: "Contact" },
    ],
    cta: "Let's Talk",
    navigation: "Main navigation",
    open: "Open navigation menu",
    close: "Close navigation menu",
  },
} as const;

export function Navbar({ lang, onLangChange, rootLinks = false }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [indicator, setIndicator] = useState<IndicatorStyle>({ left: 0, width: 0, visible: false });
  const lastScrollY = useRef(0);
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const copy = navigation[lang];

  const hrefFor = (id: string) => rootLinks ? `/#${id}` : `#${id}`;
  const contactHref = hrefFor("kontak");

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      setCompact(currentY > 24);
      if (!open && currentY > 160 && delta > 5) setHidden(true);
      if (delta < -4 || currentY <= 160) setHidden(false);
      lastScrollY.current = currentY;

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? currentY / maxScroll : 0;
      document.documentElement.style.setProperty("--scroll-progress", String(Math.min(1, Math.max(0, progress))));
    };

    // Coalesce scroll events into one update per frame to keep scrolling smooth.
    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [open]);

  useEffect(() => {
    if (rootLinks) return;
    const sections = copy.links
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-22% 0px -58%", threshold: [0, 0.08, 0.25, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [copy.links, rootLinks]);

  useEffect(() => {
    const updateIndicator = () => {
      const index = copy.links.findIndex(({ id }) => id === activeSection);
      const container = linksContainerRef.current;
      const link = index >= 0 ? linkRefs.current[index] : null;
      if (!container || !link) {
        setIndicator((current) => ({ ...current, visible: false }));
        return;
      }
      setIndicator({ left: link.offsetLeft, width: link.offsetWidth, visible: true });
    };

    const frame = window.requestAnimationFrame(updateIndicator);
    window.addEventListener("resize", updateIndicator);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateIndicator);
    };
  }, [activeSection, compact, copy.links, lang]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (open) {
      document.body.style.overflow = "hidden";
      setHidden(false);
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= 860) setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [open]);

  const closeMobileMenu = (id: string) => {
    setActiveSection(id);
    setOpen(false);
  };

  return (
    <header className={`site-navbar ${compact ? "is-compact" : "is-at-top"} ${hidden ? "is-hidden" : ""} ${open ? "is-menu-open" : ""}`}>
      <nav className="site-navbar-shell" aria-label={copy.navigation}>
        <div className="scroll-progress" aria-hidden="true" />
        <a href={rootLinks ? "/" : "#top"} className="brand-lockup" aria-label="Dipca Anugrah, top of page">
          <span className="brand-monogram">DA<span>.</span></span>
          <span className="brand-caption">Digital<br />Workshop</span>
        </a>

        <div className="navbar-desktop">
          <div ref={linksContainerRef} className="navbar-links">
            {copy.links.map((link, index) => (
              <a
                key={link.id}
                ref={(node) => { linkRefs.current[index] = node; }}
                href={hrefFor(link.id)}
                onClick={() => setActiveSection(link.id)}
                className={`navbar-link ${activeSection === link.id ? "is-active" : ""}`}
                aria-current={activeSection === link.id ? "location" : undefined}
              >
                {link.label}
              </a>
            ))}
            <span
              className="navbar-active-indicator"
              style={{ width: indicator.width, transform: `translate3d(${indicator.left}px,0,0)`, opacity: indicator.visible ? 1 : 0 }}
              aria-hidden="true"
            />
          </div>
          <LanguageToggle lang={lang} onLangChange={onLangChange} />
          <a href={contactHref} className="navbar-cta">
            <ArrowUpRight className="navbar-cta-arrow" />
            <span>{copy.cta}</span>
          </a>
        </div>

        <button
          type="button"
          className={`navbar-hamburger ${open ? "is-open" : ""}`}
          onClick={() => setOpen((current) => !current)}
          aria-label={open ? copy.close : copy.open}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          <span /><span />
        </button>
      </nav>

      <div id="mobile-navigation" className={`navbar-overlay ${open ? "is-open" : ""}`} aria-hidden={!open} inert={!open}>
        <div className="navbar-overlay-links">
          {copy.links.map((link, index) => (
            <a
              key={link.id}
              href={hrefFor(link.id)}
              className="navbar-overlay-link"
              style={{ "--nav-item-index": index } as CSSProperties}
              onClick={() => closeMobileMenu(link.id)}
              aria-current={activeSection === link.id ? "location" : undefined}
              tabIndex={open ? 0 : -1}
            >
              <span>0{index + 1}</span>{link.label}
            </a>
          ))}
        </div>
        <div className="navbar-overlay-footer">
          <LanguageToggle lang={lang} onLangChange={onLangChange} />
          <a href={contactHref} className="navbar-cta" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
            <ArrowUpRight className="navbar-cta-arrow" />
            <span>{copy.cta}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
