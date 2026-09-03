import Image from "next/image";
import type { CSSProperties } from "react";
import type { Project } from "@/data/portfolio";
import { ArrowUpRight } from "./icons";

export function ProjectCard({ project, index, visualLabel }: { project: Project; index: number; visualLabel: string }) {
  const card = (
    <article data-reveal="scale" style={{ "--reveal-delay": `${index * 80}ms` } as CSSProperties} className="project-card group flex flex-col border border-white/10 bg-white/[0.025] p-4 transition duration-300 hover:-translate-y-1 hover:border-white/25 md:p-5">
      <div className="relative mb-5 aspect-[16/10] overflow-hidden bg-[#1b1d19]">
        {project.image ? (
          <>
            <Image src={project.image} alt={project.imageAlt ?? project.title} fill sizes="(min-width: 768px) 50vw, 100vw" loading={project.imageLoading ?? "lazy"} unoptimized={project.imageUnoptimized} className={`object-cover transition duration-500 group-hover:scale-[1.03] ${project.imagePosition === "top" ? "object-top" : "object-center"}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#10110f]/75 via-transparent to-[#10110f]/20" />
          </>
        ) : (
          <div className={`absolute inset-0 ${index % 2 ? "bg-[radial-gradient(circle_at_75%_20%,rgba(139,212,255,.24),transparent_38%),linear-gradient(140deg,#242923,#121411)" : "bg-[radial-gradient(circle_at_25%_25%,rgba(215,255,117,.18),transparent_34%),linear-gradient(140deg,#242923,#121411)"}`} />
        )}
        <div className="absolute left-4 top-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.12em] text-white/55"><span className="h-1.5 w-1.5 rounded-full bg-[#d7ff75]" /> {project.status}</div>
        <div className="absolute inset-x-4 bottom-4 border-t border-white/20 pt-2 text-xs text-white/55">{project.image ? project.title : visualLabel}</div>
      </div>
      <div className="mb-3 flex items-center justify-between gap-4"><p className="text-[10px] font-bold uppercase tracking-[.13em] text-[#d7ff75]">{project.category}</p><span className="text-xs text-white/35">0{index + 1}</span></div>
      <h3 className="text-xl font-medium tracking-[-.035em]">{project.title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-6 text-white/55">{project.description}</p>
      <div className="mt-auto flex items-center justify-between gap-3 pt-6"><div className="flex flex-wrap gap-1.5">{project.technologies.map((tech, techIndex) => <span key={`${tech}-${techIndex}`} className="border border-white/10 px-2 py-1 text-[10px] text-white/45">{tech}</span>)}</div>{project.href ? <span className="rounded-full border border-white/15 p-2 text-white/45 transition group-hover:bg-[#d7ff75] group-hover:text-[#10110f]"><ArrowUpRight className="h-4 w-4" /></span> : <span className="text-[10px] uppercase tracking-[.1em] text-white/25">Portfolio</span>}</div>
    </article>
  );

  return project.href ? <a href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title}`}>{card}</a> : card;
}
