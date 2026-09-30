"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Navbar } from "@/components/navbar";
import { ArrowUpRight } from "@/components/icons";
import { ProjectStory } from "@/components/project-story";
import { ThemeModeButton } from "@/components/theme-mode-button";
import { indonesianProjects, projects, services, technologyGroups } from "@/data/portfolio";

const workflow = ["Requirements", "Planning", "Development", "AI assistance", "Testing", "Debugging", "Refinement", "Final product"];

const contactLinks = [
  { label: "Email", value: "dipcaanugrah26@gmail.com", href: "mailto:dipcaanugrah26@gmail.com" },
  { label: "WhatsApp", value: "0857 1552 1667", href: "https://wa.me/6285715521667" },
  { label: "GitHub", value: "@DipcaAnugrah", href: "https://github.com/DipcaAnugrah" },
  { label: "LinkedIn", value: "Dipca Anugrah", href: "https://www.linkedin.com/in/dipca-anugrah-2bbb90261" },
];

const indonesianServices = [
  { number: "01", title: "Pengembangan Web", description: "Website, landing page, dashboard, dan aplikasi web kustom yang dibuat untuk tujuan yang jelas.", tags: ["Website", "Dashboard", "Aplikasi web"] },
  { number: "02", title: "Pengembangan Aplikasi & Sistem", description: "Sistem manajemen kustom, alat internal, aplikasi CRUD, dan sistem bisnis yang praktis.", tags: ["Alat internal", "Sistem", "Alur kerja"] },
  { number: "03", title: "Otomasi & AI", description: "OCR, pemrosesan dokumen, alur otomasi, dan solusi berbantuan AI untuk pekerjaan berulang.", tags: ["OCR", "Otomasi", "Alur AI"] },
  { number: "04", title: "Proyek Teknis", description: "Sistem riset, proyek teknis akademik, prototipe, dan alat digital kustom.", tags: ["Riset", "Prototipe", "Alat kustom"] },
];

function HeroName() {
  const lines = ["Dipca", "Anugrah."];
  return (
    <h1 className="display hero-name text-[clamp(3.7rem,9.5vw,8.4rem)] leading-[.83]" aria-label="Dipca Anugrah">
      {lines.map((line, lineIndex) => (
        <span key={line} className={`hero-name-line ${lineIndex === 1 ? "text-[#78aaff]" : ""}`}>
          {Array.from(line).map((character, characterIndex) => (
            <span
              key={`${character}-${characterIndex}`}
              className="hero-character"
              style={{ "--character-delay": `${220 + (lineIndex * line.length + characterIndex) * 42}ms` } as CSSProperties}
            >
              {character}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return <div data-reveal className="mb-12 grid gap-5 md:grid-cols-12 md:items-end"><p className="eyebrow md:col-span-3">{eyebrow}</p><div className="md:col-span-8"><h2 className="display max-w-3xl text-4xl leading-[.93] md:text-6xl">{title}</h2>{description && <p className="body-copy mt-5 max-w-xl text-sm leading-6 text-white/55">{description}</p>}</div></div>;
}

export default function Home() {
  const [locale, setLocale] = useState<"en" | "id">("id");
  const [theme, setTheme] = useState<"normal" | "color">("normal");
  const themeInitialized = useRef(false);
  const isIndonesian = locale === "id";
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
  const copy = isIndonesian ? {
    nav: { about: "Tentang", work: "Proyek", process: "Proses", contact: "Kontak", letsTalk: "Mari bicara", toggle: "Buka navigasi" },
    heroEyebrow: "Catatan dari studio digital saya · Indonesia", heroIntro: "Saya mengurai masalah digital yang rumit, lalu membentuknya menjadi website, sistem, otomasi, dan alat yang benar-benar berguna.", viewWork: "Lihat proyek", getInTouch: "Hubungi saya", solver: "Pemecah masalah digital", developer: "Developer berbantuan AI", heroPortraitAlt: "Potret Dipca Anugrah mengenakan jas hitam dengan detail wajah manusia dan AI", humanLabel: "Keputusan manusia", aiLabel: "Kecepatan AI", portraitNote: "Ya, itu saya — dengan sedikit sentuhan AI.", fieldNote: "Saya tidak menjual kode. Saya membantu membentuk solusi.", marquee: ["Website", "Sistem", "Otomasi", "AI-assisted", "Eksperimen teknis"],
    aboutEyebrow: "01 · Perkenalan", aboutTitle: "Saya membangun solusi digital yang disesuaikan dengan kebutuhan,", aboutEmphasis: "bukan sekadar website.", aboutOne: "Pekerjaan saya dapat mencakup website, aplikasi dan sistem, otomasi, pengembangan berbantuan AI, serta proyek teknis atau berbasis riset.", aboutTwo: "Setiap proyek dimulai dari memahami kebutuhan sebenarnya, lalu membentuk solusi yang tepat, jelas, dan praktis.", aboutLater: "Cerita yang lebih lengkap akan ditambahkan nanti.", portraitAlt: "Potret Dipca Anugrah di depan dinding batu gelap dan papan nama kafe bercahaya", portraitMeta: "Berbasis di Indonesia",
    servicesEyebrow: "02 · Yang saya kerjakan", servicesTitle: "Masalah yang berbeda, dirancang dengan matang.", servicesDescription: "Ini adalah kategori awal, bukan kotak yang kaku. Kategorinya dapat berubah seiring perkembangan karya.",
    workEyebrow: "03 · Proyek pilihan", workTitle: "Proyek nyata yang dibangun untuk digunakan.", workDescription: "Tiga karya unggulan yang saya rancang, kembangkan, uji, dan sempurnakan dari kebutuhan nyata.", workNote: "Lihat koleksi proyek yang lebih lengkap di halaman Proyek.", visualLabel: "Visual proyek mendatang", moreProjects: { category: "Koleksi lengkap", title: "Lihat proyek lainnya", description: "Jelajahi karya, eksperimen, dan solusi digital lainnya dalam satu halaman khusus.", actionLabel: "Buka halaman proyek" },
    processEyebrow: "04 · Cara saya bekerja", processTitle: "AI adalah bagian dari alur kerja saya, bukan pengganti tanggung jawab saya.", processDescription: "Saya menggunakan alat seperti ChatGPT, Claude, OpenAI Codex, dan Antigravity untuk mengeksplorasi pendekatan, menghasilkan dan menyempurnakan kode, debugging, dokumentasi, serta riset. Saya tetap bertanggung jawab atas arah, keputusan, evaluasi, pengujian, debugging, dan produk akhir.",
    stackEyebrow: "05 · Tech stack", stackTitle: "Alat dipilih sesuai kebutuhan pekerjaan.", stackDescription: "Daftar awal yang dapat diedit; menggambarkan teknologi dalam alur kerja tanpa mengklaim tingkat keahlian tertentu.",
    otherEyebrow: "06 · Karya lainnya", otherTitle: "Cara lain untuk berkontribusi.", otherDescription: "Ruang fleksibel untuk proyek freelance, bantuan akademik atau teknis, riset, pekerjaan klien kustom, dan proyek digital lainnya. Detail akan ditambahkan dengan konteks yang nyata.", otherItems: ["Pengalaman proyek", "Bantuan teknis", "Riset & prototipe"], otherNote: "Detail akan ditambahkan.",
    contactEyebrow: "07 · Kontak", contactTitle: "Punya masalah yang layak dipecahkan?", contactDescription: "Mari bicarakan proyeknya, konteks di sekitarnya, dan apakah saya orang yang tepat untuk membantu membentuknya.", footer: "Dibuat dengan teliti & alat berbantuan AI"
  } : {
    nav: { about: "About", work: "Work", process: "Process", contact: "Contact", letsTalk: "Let’s talk", toggle: "Toggle navigation" },
    heroEyebrow: "Notes from my digital workshop · Indonesia", heroIntro: "I untangle messy digital problems, then shape them into websites, systems, automations, and tools that are genuinely useful.", viewWork: "View selected work", getInTouch: "Get in touch", solver: "Digital problem solver", developer: "AI-assisted developer", heroPortraitAlt: "Portrait of Dipca Anugrah in a black suit with human and AI facial details", humanLabel: "Human judgment", aiLabel: "AI speed", portraitNote: "Yes, that’s me — with a little AI treatment.", fieldNote: "I do not sell code. I help shape solutions.", marquee: ["Websites", "Systems", "Automation", "AI-assisted", "Technical experiments"],
    aboutEyebrow: "01 · Introduction", aboutTitle: "I build digital solutions shaped around the actual need,", aboutEmphasis: "not just websites.", aboutOne: "My work can include websites, applications and systems, automation, AI-assisted development, and technical or research-focused projects.", aboutTwo: "Each project starts with understanding the actual need, then shaping a solution that is appropriate, clear, and practical.", aboutLater: "A longer story belongs here later.", portraitAlt: "Portrait of Dipca Anugrah in front of a dark stone wall and illuminated café sign", portraitMeta: "Based in Indonesia",
    servicesEyebrow: "02 · What I do", servicesTitle: "Different problems, thoughtfully shaped.", servicesDescription: "These are starting categories, not rigid boxes. They can be changed as the work evolves.",
    workEyebrow: "03 · Selected works", workTitle: "Real projects, built to be used.", workDescription: "Three featured works that I shaped, developed, tested, and refined around real needs.", workNote: "See the broader collection on the Projects page.", visualLabel: "Future project visual", moreProjects: { category: "Complete collection", title: "See more projects", description: "Explore more work, experiments, and digital solutions on a dedicated page.", actionLabel: "Open projects page" },
    processEyebrow: "04 · How I work", processTitle: "AI is part of my workflow, not a replacement for my responsibility.", processDescription: "I use tools such as ChatGPT, Claude, OpenAI Codex, and Antigravity to explore approaches, generate and refine code, debug, document, and research. I remain responsible for the direction, decisions, evaluation, testing, debugging, and final product.",
    stackEyebrow: "05 · Tech stack", stackTitle: "Tools chosen for the job at hand.", stackDescription: "An editable starting stack; it describes technologies in the workflow without making claims about fixed expertise levels.",
    otherEyebrow: "06 · Other work", otherTitle: "More ways to contribute.", otherDescription: "A flexible space for freelance projects, academic or technical assistance, research, custom client work, and other digital projects. Details will be added with real context.", otherItems: ["Project experience", "Technical assistance", "Research & prototypes"], otherNote: "Details to be added.",
    contactEyebrow: "07 · Contact", contactTitle: "Have a problem worth solving?", contactDescription: "Let’s talk about the project, the context around it, and whether I’m the right person to help shape it.", footer: "Built with care & AI-assisted tools"
  };
  const displayedServices = isIndonesian ? indonesianServices : services;
  const displayedProjects = isIndonesian ? indonesianProjects : projects;
  const featuredProjects = displayedProjects.filter((project) => project.featured);
  return (
    <main id="top" className="overflow-x-clip">
      <Navbar locale={locale} onLocaleChange={setLocale} labels={copy.nav} />
      <ThemeModeButton theme={theme} locale={locale} onThemeChange={setTheme} />

      <section className="hero-section grid-bg relative min-h-[calc(100svh-65px)] border-b border-white/10">
        <div className="hero-glow absolute inset-0" />
        <div className="hero-orbit absolute right-[7%] top-[18%] hidden h-44 w-44 rounded-full border border-[#ff78b7]/25 lg:block" aria-hidden="true" />
        <div className="relative mx-auto flex min-h-[calc(100svh-65px)] max-w-[1280px] flex-col justify-between px-6 py-8 md:px-12 md:py-12">
          <div className="reveal flex items-center justify-between gap-6">
            <p className="eyebrow">{copy.heroEyebrow}</p>
            <span className="workshop-mark hidden sm:block">DA / DIGITAL WORKSHOP</span>
          </div>
          <div className="relative py-16 md:py-24">
            <div className="relative z-10 max-w-5xl lg:max-w-[70%]">
              <p className="body-copy reveal-delay mb-5 max-w-md text-sm leading-6 text-white/60">{copy.heroIntro}</p>
              <HeroName />
              <div className="reveal-delay mt-10 flex flex-wrap items-center gap-3"><a href="#work" className="button-primary inline-flex items-center gap-2 rounded-full bg-[#78aaff] px-5 py-3 text-sm font-bold" style={{ color: "#ffffff" }}>{copy.viewWork} <ArrowUpRight className="button-arrow h-4 w-4" /></a><a href="#contact" className="button-secondary rounded-full border border-white/20 px-5 py-3 text-sm">{copy.getInTouch}</a></div>
              <p className="field-note reveal-delay mt-8 max-w-xs">{copy.fieldNote}</p>
            </div>

            <div className="reveal-delay relative -mx-6 -mt-4 h-[31rem] overflow-hidden sm:mx-0 lg:absolute lg:bottom-[-2.5rem] lg:right-[-1rem] lg:mt-0 lg:h-[min(82vh,51rem)] lg:w-[min(48vw,37rem)] lg:overflow-visible" aria-label={copy.heroPortraitAlt} role="img">
              <div className="absolute right-[4%] top-[23%] h-px w-[42%] bg-[#ff78b7]/70" />
              <div className="hero-beacon absolute right-[4%] top-[23%] h-2 w-2 -translate-y-1/2 rounded-full bg-[#ff78b7]" />
              <div className="absolute bottom-[16%] left-[7%] h-px w-[33%] bg-[#78aaff]/55" />
              <Image
                src="/profile/dipca-anugrah-ai-hero-fixed.webp"
                alt=""
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 48vw"
                className="object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,.35)] lg:-translate-y-16"
              />
              <div className="portrait-note absolute right-5 top-[23%] hidden max-w-36 -rotate-3 lg:block">{copy.portraitNote}</div>
              <div className="absolute bottom-5 left-6 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.14em] text-white/55 lg:bottom-[12%]">
                <span>{copy.humanLabel}</span><span className="h-px w-7 bg-[#ff78b7]" /><span className="text-[#78aaff]">{copy.aiLabel}</span>
              </div>
            </div>
          </div>
          <div className="flex items-end justify-between border-t border-white/10 pt-4 text-[10px] font-bold uppercase tracking-[.14em] text-white/40"><span>{copy.solver}</span><span>{copy.developer}</span></div>
        </div>
      </section>

      <div className="marquee-band" aria-label={copy.marquee.join(", ")}>
        <div className="marquee-track">
          {[...copy.marquee, ...copy.marquee].map((item, index) => <span key={`${item}-${index}`}>{item}<b aria-hidden="true">✦</b></span>)}
        </div>
      </div>

      <section id="about" className="section-shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <p data-reveal className="eyebrow lg:col-span-3">{copy.aboutEyebrow}</p>
          <div data-reveal className="lg:col-span-5" style={{ "--reveal-delay": "80ms" } as CSSProperties}>
            <p className="display max-w-4xl text-4xl leading-[.98] md:text-5xl xl:text-6xl">{copy.aboutTitle} <em className="text-[#ff78b7]">{copy.aboutEmphasis}</em></p>
            <div className="mt-9 grid gap-5 text-sm leading-7 text-white/60 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <p className="body-copy">{copy.aboutOne}</p>
              <p className="body-copy">{copy.aboutTwo} <span className="text-white/35">{copy.aboutLater}</span></p>
            </div>
          </div>
          <figure data-reveal="scale" className="about-portrait group image-sheen relative overflow-hidden border border-white/10 bg-[#151714] lg:col-span-4" style={{ "--reveal-delay": "150ms" } as CSSProperties}>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/profile/dipca-anugrah-portrait.webp"
                alt={copy.portraitAlt}
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 34vw"
                className="object-cover saturate-[.86] transition duration-700 ease-out group-hover:scale-[1.015] group-hover:saturate-100"
                style={{ objectPosition: "50% 58%" }}
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#10110f]/90 to-transparent" />
              <span className="absolute right-0 top-0 h-16 w-[3px] bg-[#78aaff]" aria-hidden="true" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 text-[10px] font-bold uppercase tracking-[.12em]">
                <span>Dipca Anugrah</span>
                <span className="text-right text-white/50">{copy.portraitMeta}</span>
              </figcaption>
            </div>
          </figure>
        </div>
      </section>

      <section id="services" className="services-section border-y border-white/10 bg-[#11131c]"><div className="section-shell"><SectionHeading eyebrow={copy.servicesEyebrow} title={copy.servicesTitle} description={copy.servicesDescription} /><div className="grid border-l border-t border-white/10 md:grid-cols-2">{displayedServices.map((service, index) => <article data-reveal data-index={service.number} key={service.number} className="service-card min-h-60 border-b border-r border-white/10 p-6 md:p-8" style={{ "--reveal-delay": `${index * 70}ms` } as CSSProperties}><div className="flex justify-between"><span className="text-xs text-white/35">{service.number}</span><span className="service-dot h-2 w-2 rounded-full bg-[#78aaff]" /></div><h3 className="mt-12 text-2xl tracking-[-.04em]">{service.title}</h3><p className="body-copy mt-3 max-w-md text-sm leading-6 text-white/55">{service.description}</p><div className="mt-6 flex flex-wrap gap-2">{service.tags.map(tag => <span key={tag} className="text-[10px] uppercase tracking-[.1em] text-white/35">{tag}</span>)}</div></article>)}</div></div></section>

      <section id="work" className="section-shell work-section"><SectionHeading eyebrow={copy.workEyebrow} title={copy.workTitle} description={copy.workDescription} /><ProjectStory projects={featuredProjects} moreProjects={copy.moreProjects} visualLabel={copy.visualLabel} locale={locale} /><p className="body-copy work-note mt-5 text-xs text-white/35">{copy.workNote}</p></section>

      <section id="process" className="process-section border-y border-white/10 text-white"><div className="section-shell"><div data-reveal className="grid gap-8 md:grid-cols-12"><p className="text-[.68rem] font-bold uppercase tracking-[.16em] text-[#ff78b7] md:col-span-3">{copy.processEyebrow}</p><div className="md:col-span-8"><h2 className="display max-w-4xl text-5xl leading-[.9] md:text-7xl">{copy.processTitle}</h2><p className="body-copy mt-7 max-w-2xl text-sm leading-7 text-white/60">{copy.processDescription}</p></div></div><ol className="process-grid mt-16 grid border-l border-t border-white/15 sm:grid-cols-2 lg:grid-cols-4">{(isIndonesian ? ["Kebutuhan", "Perencanaan", "Pengembangan", "Bantuan AI", "Pengujian", "Debugging", "Penyempurnaan", "Produk akhir"] : workflow).map((step, index) => <li data-reveal key={step} className="process-step flex min-h-28 flex-col justify-between border-b border-r border-white/15 p-4" style={{ "--reveal-delay": `${(index % 4) * 55}ms` } as CSSProperties}><span className="text-xs text-white/40">0{index + 1}</span><span className="text-lg tracking-[-.03em]">{step}</span></li>)}</ol></div></section>

      <section id="stack" className="section-shell"><SectionHeading eyebrow={copy.stackEyebrow} title={copy.stackTitle} description={copy.stackDescription} /><div className="border-t border-white/10">{technologyGroups.map((group, index) => <div data-reveal key={group.label} className="stack-row grid gap-5 border-b border-white/10 py-6 md:grid-cols-12 md:items-center" style={{ "--reveal-delay": `${index * 45}ms` } as CSSProperties}><span className="text-xs text-white/35 md:col-span-3">0{index + 1} / {isIndonesian ? ["Frontend", "Mobile", "Backend / Basis data", "AI / Otomasi", "Alat"][index] : group.label}</span><div className="flex flex-wrap gap-2 md:col-span-8">{group.items.map(item => <span key={item} className="tech-chip border border-white/15 px-3 py-2 text-sm text-white/70">{item}</span>)}</div></div>)}</div></section>

      <section id="other-work" className="other-work-section border-y border-white/10 bg-[#11131c]"><div className="section-shell"><SectionHeading eyebrow={copy.otherEyebrow} title={copy.otherTitle} description={copy.otherDescription} /><div className="grid gap-px bg-white/10 md:grid-cols-3">{copy.otherItems.map((item, index) => <div data-reveal key={item} className="other-card min-h-40 bg-[#11131c] p-6" style={{ "--reveal-delay": `${index * 80}ms` } as CSSProperties}><span className="text-xs text-[#ff78b7]">0{index + 1}</span><p className="mt-12 text-lg tracking-[-.03em]">{item}</p><p className="body-copy mt-2 text-xs text-white/40">{copy.otherNote}</p></div>)}</div></div></section>

      <section id="contact" className="section-shell"><div className="grid gap-12 md:grid-cols-12"><div data-reveal className="md:col-span-8"><p className="eyebrow">{copy.contactEyebrow}</p><h2 className="display mt-7 max-w-4xl text-5xl leading-[.88] md:text-8xl">{copy.contactTitle}</h2><p className="body-copy mt-7 max-w-md text-sm leading-7 text-white/55">{copy.contactDescription}</p></div><div data-reveal="right" className="self-end md:col-span-4" style={{ "--reveal-delay": "120ms" } as CSSProperties}><div className="border-t border-white/10">{contactLinks.map(link => <a key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined} className="contact-link group flex items-center justify-between gap-4 border-b border-white/10 py-4"><span className="shrink-0 text-xs text-white/40">{link.label}</span><span className="flex min-w-0 items-center gap-2 text-right text-sm text-white/75"><span className="break-all">{link.value}</span><ArrowUpRight className="h-4 w-4 shrink-0" /></span></a>)}</div></div></div></section>

      <footer className="border-t border-white/10 px-6 py-6 md:px-12"><div className="mx-auto flex max-w-[1280px] flex-col justify-between gap-2 text-[10px] uppercase tracking-[.12em] text-white/35 sm:flex-row"><span>© {new Date().getFullYear()} Dipca Anugrah</span><span>{copy.footer}</span></div></footer>
    </main>
  );
}
