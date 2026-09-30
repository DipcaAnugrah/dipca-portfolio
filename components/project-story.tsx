"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Project } from "@/data/portfolio";
import { ArrowUpRight } from "./icons";
import { ProjectCard } from "./project-card";

const projectPalettes = [
  { accent: "#78aaff", rgb: "120, 170, 255", background: "#101a2d" },
  { accent: "#ff78b7", rgb: "255, 120, 183", background: "#261522" },
  { accent: "#a88bff", rgb: "168, 139, 255", background: "#19162b" },
  { accent: "#ff8ca9", rgb: "255, 140, 169", background: "#29171f" },
];

type ProjectStoryProps = {
  projects: Project[];
  moreProjects?: { category: string; title: string; description: string; actionLabel: string };
  visualLabel: string;
  locale: "id" | "en";
};

export function ProjectStory({ projects, moreProjects, visualLabel, locale }: ProjectStoryProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const wheelTimerRef = useRef<number | null>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const storyItemCount = projects.length + (moreProjects ? 1 : 0);

  const selectProject = (index: number) => {
    activeIndexRef.current = index;
    setActiveIndex(index);
  };

  useEffect(() => {
    return () => { if (wheelTimerRef.current !== null) window.clearTimeout(wheelTimerRef.current); };
  }, []);

  useEffect(() => {
    const visual = visualRef.current;
    if (!visual) return;

    const handleVisualWheel = (event: WheelEvent) => {
      if (!window.matchMedia("(min-width: 768px)").matches || Math.abs(event.deltaY) < 10) return;
      const activeImage = visual.querySelector<HTMLElement>(".project-story-figure[data-state='active'] .project-story-image, .project-story-figure[data-state='active'] .project-story-more-visual");
      if (!activeImage?.contains(event.target as Node)) return;

      // Only the actual project image is its own navigator, never the full visual panel.
      event.preventDefault();
      if (wheelTimerRef.current !== null) return;

      const direction = event.deltaY > 0 ? 1 : -1;
      const nextIndex = Math.min(storyItemCount - 1, Math.max(0, activeIndexRef.current + direction));
      if (nextIndex === activeIndexRef.current) return;

      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
      wheelTimerRef.current = window.setTimeout(() => { wheelTimerRef.current = null; }, 420);
    };

    visual.addEventListener("wheel", handleVisualWheel, { passive: false });
    return () => visual.removeEventListener("wheel", handleVisualWheel);
  }, [storyItemCount]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const forwardPageScroll = (event: WheelEvent) => {
      if (!window.matchMedia("(min-width: 768px)").matches) return;
      const activeImage = visualRef.current?.querySelector<HTMLElement>(".project-story-figure[data-state='active'] .project-story-image, .project-story-figure[data-state='active'] .project-story-more-visual");
      if (activeImage?.contains(event.target as Node)) return;

      // Everything except the image itself retains normal page scrolling.
      event.preventDefault();
      window.scrollBy({ top: event.deltaY, left: event.deltaX, behavior: "auto" });
    };

    stage.addEventListener("wheel", forwardPageScroll, { passive: false });
    return () => stage.removeEventListener("wheel", forwardPageScroll);
  }, []);

  const palette = projectPalettes[activeIndex % projectPalettes.length];
  const storyStyle = {
    "--project-count": storyItemCount,
    "--story-accent": palette.accent,
    "--story-accent-rgb": palette.rgb,
    "--story-background": palette.background,
  } as CSSProperties;

  return (
    <>
      <div className="project-story" style={storyStyle}>
        <div ref={stageRef} className="project-story-stage">
          <div className="project-story-list" aria-label={locale === "id" ? "Daftar proyek" : "Project list"}>
            {projects.map((project, index) => {
              const isActive = index === activeIndex;
              return (
                <article
                  key={`${project.title}-${index}`}
                  className="project-story-point"
                  data-active={isActive}
                >
                  <span className="project-story-number">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="project-story-category">{project.category}</p>
                    <h3 className="project-title project-story-title">{project.title}</h3>
                    <div className="project-story-details">
                      <p className="body-copy">{project.description}</p>
                      <div className="project-story-tech">
                        {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="project-story-point-action"
                    aria-pressed={isActive}
                    aria-label={`${locale === "id" ? "Lihat proyek" : "View project"} ${project.title}`}
                    onClick={() => selectProject(index)}
                  />
                </article>
              );
            })}
            {moreProjects && (() => {
              const index = projects.length;
              const isActive = index === activeIndex;
              return (
                <article className="project-story-point project-story-more-point" data-active={isActive}>
                  <span className="project-story-number">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="project-story-category">{moreProjects.category}</p>
                    <h3 className="project-title project-story-title">{moreProjects.title}</h3>
                    <div className="project-story-details"><p className="body-copy">{moreProjects.description}</p><span className="project-story-more-link">{moreProjects.actionLabel} <ArrowUpRight className="h-4 w-4" /></span></div>
                  </div>
                  <Link className="project-story-point-action" href="/projects" aria-label={moreProjects.actionLabel}><span className="sr-only">{moreProjects.actionLabel}</span></Link>
                </article>
              );
            })()}
          </div>

          <div ref={visualRef} className="project-story-visual" aria-live="off">
            <div className="project-story-progress" aria-hidden="true">
              <span style={{ transform: `scaleX(${(activeIndex + 1) / storyItemCount})` }} />
            </div>
            {projects.map((project, index) => {
              const isActive = index === activeIndex;
              const state = index < activeIndex ? "before" : index > activeIndex ? "after" : "active";
              const visual = (
                <figure className="project-story-figure" data-state={state} aria-hidden={!isActive}>
                  <div className="project-story-image">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.imageAlt ?? project.title}
                        fill
                        sizes="(min-width: 768px) 48vw, 100vw"
                        loading={project.imageLoading ?? "lazy"}
                        unoptimized={project.imageUnoptimized}
                        className={project.imagePosition === "top" ? "object-cover object-top" : "object-cover object-center"}
                      />
                    ) : <div className="project-story-placeholder">{visualLabel}</div>}
                    <div className="project-story-image-overlay" />
                  </div>
                  <figcaption>
                    <div>
                      <span>{project.status}</span>
                      <strong>{project.title}</strong>
                    </div>
                    {project.href && <span className="project-story-link-label">{locale === "id" ? "Buka proyek" : "Visit project"} <ArrowUpRight className="h-4 w-4" /></span>}
                  </figcaption>
                </figure>
              );

              return project.href ? (
                <a
                  key={`${project.title}-visual`}
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-story-visual-link"
                  data-active={isActive}
                  tabIndex={isActive ? 0 : -1}
                  aria-hidden={!isActive}
                  aria-label={`${locale === "id" ? "Buka" : "Open"} ${project.title}`}
                >
                  {visual}
                </a>
              ) : <div key={`${project.title}-visual`} className="project-story-visual-link" data-active={isActive}>{visual}</div>;
            })}
            {moreProjects && (() => {
              const index = projects.length;
              const isActive = index === activeIndex;
              const state = index < activeIndex ? "before" : index > activeIndex ? "after" : "active";
              return <Link href="/projects" className="project-story-visual-link" data-active={isActive} tabIndex={isActive ? 0 : -1} aria-hidden={!isActive} aria-label={moreProjects.actionLabel}>
                <figure className="project-story-figure project-story-more-figure" data-state={state} aria-hidden={!isActive}>
                  <div className="project-story-more-visual"><span className="project-story-number">{String(index + 1).padStart(2, "0")}</span><p>{moreProjects.category}</p><strong>{moreProjects.title}</strong><span className="project-story-more-link">{moreProjects.actionLabel} <ArrowUpRight className="h-5 w-5" /></span></div>
                </figure>
              </Link>;
            })()}
            <span className="project-story-counter" aria-hidden="true">{String(activeIndex + 1).padStart(2, "0")} / {String(storyItemCount).padStart(2, "0")}</span>
            <span className="project-story-scroll-hint" aria-hidden="true">{locale === "id" ? "Scroll pada gambar untuk mengganti proyek" : "Scroll on the image to switch projects"}</span>
          </div>
        </div>
      </div>

      <div className="project-story-mobile">
        {projects.map((project, index) => <ProjectCard key={`${project.title}-mobile`} project={project} index={index} visualLabel={visualLabel} />)}
        {moreProjects && <Link href="/projects" className="project-story-mobile-cta"><span>0{storyItemCount}</span><div><p>{moreProjects.category}</p><strong>{moreProjects.title}</strong><small>{moreProjects.actionLabel} <ArrowUpRight className="h-4 w-4" /></small></div></Link>}
      </div>
    </>
  );
}
