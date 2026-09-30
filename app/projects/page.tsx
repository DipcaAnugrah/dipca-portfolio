"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { Navbar } from "@/components/navbar";
import { ProjectCard } from "@/components/project-card";
import { ThemeModeButton } from "@/components/theme-mode-button";
import { indonesianProjects, projects } from "@/data/portfolio";

export default function ProjectsPage() {
  const [locale, setLocale] = useState<"en" | "id">("id");
  const [theme, setTheme] = useState<"normal" | "color">("normal");
  const themeInitialized = useRef(false);
  const isIndonesian = locale === "id";
  const copy = isIndonesian ? {
    nav: { about: "Tentang", work: "Proyek", process: "Proses", contact: "Kontak", letsTalk: "Mari bicara", toggle: "Buka navigasi" },
    eyebrow: "Koleksi lengkap · Proyek", title: "Karya yang saya bangun untuk memecahkan masalah.", description: "Kumpulan website, aplikasi, sistem, proyek teknis, dan eksperimen digital. Detail setiap proyek akan terus dilengkapi seiring perkembangannya.", back: "Kembali ke beranda", visualLabel: "Visual proyek",
  } : {
    nav: { about: "About", work: "Work", process: "Process", contact: "Contact", letsTalk: "Let’s talk", toggle: "Toggle navigation" },
    eyebrow: "Complete collection · Projects", title: "Work I build to solve real problems.", description: "A collection of websites, applications, systems, technical projects, and digital experiments. More context will be added to each project over time.", back: "Back to home", visualLabel: "Project visual",
  };

  useEffect(() => { document.documentElement.lang = locale; }, [locale]);
  useEffect(() => {
    if (!themeInitialized.current) {
      themeInitialized.current = true;
      const savedTheme = window.localStorage.getItem("portfolio-theme");
      if (savedTheme === "normal" || savedTheme === "color") setTheme(savedTheme);
      return;
    }
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
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
  }, []);

  const displayedProjects = isIndonesian ? indonesianProjects : projects;

  return (
    <main id="top" className="min-h-screen overflow-x-clip">
      <Navbar locale={locale} onLocaleChange={setLocale} labels={copy.nav} rootLinks />
      <ThemeModeButton theme={theme} locale={locale} onThemeChange={setTheme} />
      <section className="section-shell project-catalog-shell pt-28 md:pt-36">
        <div data-reveal className="mb-14 grid gap-6 md:grid-cols-12 md:items-end">
          <p className="eyebrow md:col-span-3">{copy.eyebrow}</p>
          <div className="md:col-span-8">
            <h1 className="display max-w-4xl text-5xl leading-[.91] md:text-7xl">{copy.title}</h1>
            <p className="body-copy mt-6 max-w-2xl text-sm leading-6 text-white/55">{copy.description}</p>
            <div className="mt-8">
              <Link href="/" className="button-secondary inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm">{copy.back} <ArrowUpRight className="h-4 w-4 rotate-[-90deg]" /></Link>
            </div>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {displayedProjects.map((project, index) => <ProjectCard key={`${project.title}-${index}`} project={project} index={index} visualLabel={copy.visualLabel} />)}
        </div>
      </section>
    </main>
  );
}
