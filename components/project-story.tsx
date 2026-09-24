"use client";

import Image from "next/image";
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
  visualLabel: string;
  locale: "id" | "en";
};

export function ProjectStory({ projects, visualLabel, locale }: ProjectStoryProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 900px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateActiveProject = () => {
      frameRef.current = null;
      const wrapper = wrapperRef.current;
      const stage = stageRef.current;
      if (!wrapper || !stage || !desktop.matches || reducedMotion.matches) return;

      const stickyTop = 64;
      const rect = wrapper.getBoundingClientRect();
      const travel = Math.max(1, wrapper.offsetHeight - stage.offsetHeight);
      const progress = Math.min(1, Math.max(0, (stickyTop - rect.top) / travel));
      const nextIndex = Math.min(projects.length - 1, Math.floor(progress * projects.length));
      setActiveIndex((current) => current === nextIndex ? current : nextIndex);
    };

    const scheduleUpdate = () => {
      if (frameRef.current === null) frameRef.current = window.requestAnimationFrame(updateActiveProject);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    desktop.addEventListener("change", scheduleUpdate);
    reducedMotion.addEventListener("change", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      desktop.removeEventListener("change", scheduleUpdate);
      reducedMotion.removeEventListener("change", scheduleUpdate);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, [projects.length]);

  const palette = projectPalettes[activeIndex % projectPalettes.length];
  const storyStyle = {
    "--project-count": projects.length,
    "--story-accent": palette.accent,
    "--story-accent-rgb": palette.rgb,
    "--story-background": palette.background,
    "--story-height": `calc(100svh + ${Math.max(0, projects.length - 1) * 72}svh)`,
  } as CSSProperties;

  return (
    <>
      <div ref={wrapperRef} className="project-story" style={storyStyle}>
        <div ref={stageRef} className="project-story-stage">
          <div className="project-story-list" aria-label={locale === "id" ? "Daftar proyek" : "Project list"}>
            {projects.map((project, index) => {
              const isActive = index === activeIndex;
              return (
                <article
                  key={`${project.title}-${index}`}
                  className="project-story-point"
                  data-active={isActive}
                  aria-current={isActive ? "step" : undefined}
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
                </article>
              );
            })}
          </div>

          <div className="project-story-visual" aria-live="off">
            <div className="project-story-progress" aria-hidden="true">
              <span style={{ transform: `scaleX(${(activeIndex + 1) / projects.length})` }} />
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
                        sizes="(min-width: 900px) 48vw, 100vw"
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
            <span className="project-story-counter" aria-hidden="true">{String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
          </div>
        </div>
      </div>

      <div className="project-story-mobile">
        {projects.map((project, index) => <ProjectCard key={`${project.title}-mobile`} project={project} index={index} visualLabel={visualLabel} />)}
      </div>
    </>
  );
}
