"use client";

import React, { useEffect } from "react";
import { ProjectItem } from "@/data/content";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#0D0D12] border border-[#F2EFE8]/15 rounded-xl p-6 sm:p-8 shadow-2xl text-[#F2EFE8] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-[#F2EFE8]/10 pb-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-mono-code text-xs uppercase tracking-wider text-[#7CE3B5]">
                {project.category}
              </span>
              {project.isTodo && (
                <span className="font-mono-code text-[10px] px-2 py-0.5 rounded border border-amber-400/40 text-amber-300 bg-amber-950/30">
                  Under Implementation
                </span>
              )}
            </div>
            <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold tracking-tight">
              {project.title}
            </h2>
            <p className="text-sm font-mono-code text-[#F2EFE8]/60 mt-1">
              {project.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#F2EFE8]/5 hover:bg-[#F2EFE8]/10 text-[#F2EFE8]/70 hover:text-[#F2EFE8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#7CE3B5]"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-6">
          {/* Problem */}
          <div>
            <h3 className="font-mono-code text-xs uppercase tracking-wider text-[#F2EFE8]/50 mb-1.5">
              Problem &amp; Challenge
            </h3>
            <p className="text-sm sm:text-base text-[#F2EFE8]/85 leading-relaxed">
              {project.problem}
            </p>
          </div>

          {/* Approach */}
          <div>
            <h3 className="font-mono-code text-xs uppercase tracking-wider text-[#F2EFE8]/50 mb-1.5">
              Technical Approach &amp; Architecture
            </h3>
            <p className="text-sm sm:text-base text-[#F2EFE8]/85 leading-relaxed">
              {project.approach}
            </p>
          </div>

          {/* Result / Outcome */}
          <div>
            <h3 className="font-mono-code text-xs uppercase tracking-wider text-[#7CE3B5] mb-1.5">
              Measurable Outcome &amp; Value
            </h3>
            <p className="text-sm sm:text-base text-[#F2EFE8]/85 leading-relaxed">
              {project.result}
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="font-mono-code text-xs uppercase tracking-wider text-[#F2EFE8]/50 mb-2">
              Technologies &amp; Frameworks
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono-code text-xs px-2.5 py-1 rounded bg-[#F2EFE8]/5 border border-[#F2EFE8]/10 text-[#F2EFE8]/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Action */}
          <div className="pt-4 border-t border-[#F2EFE8]/10 flex items-center justify-between">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono-code text-xs px-4 py-2 rounded-lg bg-[#7CE3B5] text-[#0A0A0C] font-semibold hover:bg-[#7CE3B5]/90 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7CE3B5]"
              >
                <span>View on GitHub &rarr;</span>
              </a>
            )}
            <button
              onClick={onClose}
              className="font-mono-code text-xs text-[#F2EFE8]/60 hover:text-[#F2EFE8] transition-colors"
            >
              Back to Overview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
