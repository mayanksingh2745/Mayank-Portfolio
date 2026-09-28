"use client";

import React, { useState } from "react";
import { siteContent, ProjectItem } from "@/data/content";
import { ProjectModal } from "@/components/ProjectModal";

export const ProjectsSection: React.FC = () => {
  const { projects } = siteContent;
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Split cards left and right
  const leftProjects = projects.items.slice(0, 2);
  const rightProjects = projects.items.slice(2, 4);

  return (
    <section
      id="projects"
      aria-label="Engineered Systems and Projects"
      className="relative min-h-screen w-full flex flex-col justify-center py-16 px-4 sm:px-8 lg:px-12 z-20 pointer-events-auto"
    >
      {/* Header */}
      <div className="w-full text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <span className="font-mono-code text-xs uppercase tracking-widest text-[#7CE3B5] font-semibold">
          {projects.sectionTag}
        </span>
        <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold tracking-tight text-[#F2EFE8] mt-2">
          {projects.title}
        </h2>
        <p className="text-xs sm:text-sm font-mono-code text-[#F2EFE8]/60 mt-2">
          {projects.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-start my-auto">
        {/* Left Column (Desktop: 4 cols) - Production Projects (ValueTrack + Edge AI) */}
        <div className="lg:col-span-4 flex flex-col space-y-4 z-20">
          {leftProjects.map((p) => (
            <div
              key={p.id}
              onClick={() => setSelectedProject(p)}
              className="glass-card p-6 rounded-xl cursor-pointer hover:border-[#7CE3B5]/50 group transition-all"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#F2EFE8]/10 mb-3">
                <span className="text-[10px] font-mono-code uppercase tracking-wider text-[#7CE3B5]">
                  {p.category}
                </span>
                <span className="text-xs font-mono-code text-[#F2EFE8]/40 group-hover:text-[#7CE3B5] transition-colors">
                  Details &rarr;
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#F2EFE8] group-hover:text-[#7CE3B5] transition-colors">
                {p.title}
              </h3>
              <p className="text-xs font-mono-code text-[#F2EFE8]/60 mt-1">
                {p.tagline}
              </p>
              <p className="text-xs text-[#F2EFE8]/80 mt-3 line-clamp-2 leading-relaxed font-normal">
                {p.problem}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.stack.map((t) => (
                  <span
                    key={t}
                    className="font-mono-code text-[10px] px-2 py-0.5 rounded bg-[#F2EFE8]/5 border border-[#F2EFE8]/10 text-[#F2EFE8]/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Center Space for Sticky Avatar (Desktop: 4 cols) */}
        <div className="hidden lg:block lg:col-span-4 h-[65vh] pointer-events-none" />

        {/* Right Column (Desktop: 4 cols) - GenAI / RAG / TODO Projects */}
        <div className="lg:col-span-4 flex flex-col space-y-4 z-20">
          {rightProjects.map((p) => (
            <div
              key={p.id}
              onClick={() => setSelectedProject(p)}
              className="glass-card p-6 rounded-xl cursor-pointer border-dashed border-[#F2EFE8]/25 hover:border-amber-400/50 group transition-all"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#F2EFE8]/10 mb-3">
                <span className="text-[10px] font-mono-code uppercase tracking-wider text-amber-400">
                  {p.category}
                </span>
                <span className="text-[10px] font-mono-code px-2 py-0.5 rounded border border-amber-400/40 text-amber-300 bg-amber-950/20">
                  TODO: Under Implementation
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#F2EFE8] group-hover:text-amber-400 transition-colors">
                {p.title}
              </h3>
              <p className="text-xs font-mono-code text-[#F2EFE8]/60 mt-1">
                {p.tagline}
              </p>
              <p className="text-xs text-[#F2EFE8]/80 mt-3 line-clamp-2 leading-relaxed font-normal">
                {p.problem}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.stack.map((t) => (
                  <span
                    key={t}
                    className="font-mono-code text-[10px] px-2 py-0.5 rounded bg-[#F2EFE8]/5 border border-[#F2EFE8]/10 text-[#F2EFE8]/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal View */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
