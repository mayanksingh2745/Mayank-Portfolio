"use client";

import React from "react";
import { siteContent } from "@/data/content";

export const ExperienceSection: React.FC = () => {
  const { experience } = siteContent;
  const flipRobo = experience.roles.find((r) => r.company.includes("Flip Robo"))!;
  const hireQuotient = experience.roles.find((r) =>
    r.company.includes("HireQuotient")
  )!;

  return (
    <section
      id="experience"
      aria-label="Work Experience and Track Record"
      className="relative min-h-screen w-full flex flex-col justify-center py-16 px-4 sm:px-8 lg:px-12 z-20 pointer-events-auto"
    >
      {/* Section Header */}
      <div className="w-full text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <span className="font-mono-code text-xs uppercase tracking-widest text-[#FF5B2E] font-semibold">
          {experience.sectionTag}
        </span>
        <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold tracking-tight text-[#F2EFE8] mt-2">
          {experience.title}
        </h2>
        <p className="text-xs sm:text-sm font-mono-code text-[#F2EFE8]/60 mt-2">
          {experience.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-start my-auto">
        {/* Left Column (Desktop: 4 cols): Flip Robo Technologies (Progression) */}
        <div className="lg:col-span-4 flex flex-col space-y-4 z-20">
          <div className="glass-card p-6 rounded-xl border-l-2 border-l-[#FF5B2E]">
            {/* Header / Progression badge */}
            <div className="flex items-center justify-between pb-3 border-b border-[#F2EFE8]/10">
              <div>
                <span className="font-mono-code text-[11px] text-[#FF5B2E] uppercase tracking-wider block font-semibold">
                  Career Progression
                </span>
                <h3 className="text-xl font-bold text-[#F2EFE8]">
                  {flipRobo.company}
                </h3>
              </div>
              <span className="text-[11px] font-mono-code text-[#F2EFE8]/50">
                {flipRobo.location}
              </span>
            </div>

            {/* Roles timeline */}
            <div className="mt-3.5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#F2EFE8]">
                  {flipRobo.role}
                </span>
                <span className="text-[11px] font-mono-code text-[#D9B36A]">
                  {flipRobo.period}
                </span>
              </div>
              <p className="text-[11px] font-mono-code text-[#F2EFE8]/50">
                &uarr; Promoted from {flipRobo.promotionPreviousRole}
              </p>
            </div>

            {/* Real bullets */}
            <ul className="mt-4 space-y-2.5 text-xs text-[#F2EFE8]/80 leading-relaxed list-disc list-outside pl-4 font-normal">
              {flipRobo.bullets.map((b, idx) => (
                <li key={idx} className="marker:text-[#FF5B2E]">
                  {b}
                </li>
              ))}
            </ul>

            {/* Tech stack */}
            <div className="mt-5 pt-3 border-t border-[#F2EFE8]/10 flex flex-wrap gap-1.5">
              {flipRobo.techStack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono-code text-[10px] px-2 py-0.5 rounded bg-[#F2EFE8]/5 border border-[#F2EFE8]/10 text-[#F2EFE8]/70"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Center Space for Sticky Avatar (Desktop: 4 cols) */}
        <div className="hidden lg:block lg:col-span-4 h-[65vh] pointer-events-none" />

        {/* Right Column (Desktop: 4 cols): HireQuotient */}
        <div className="lg:col-span-4 flex flex-col space-y-4 z-20">
          <div className="glass-card p-6 rounded-xl border-l-2 border-l-[#7CE3B5]">
            <div className="flex items-center justify-between pb-3 border-b border-[#F2EFE8]/10">
              <div>
                <span className="font-mono-code text-[11px] text-[#7CE3B5] uppercase tracking-wider block font-semibold">
                  Current Role
                </span>
                <h3 className="text-xl font-bold text-[#F2EFE8]">
                  {hireQuotient.company}
                </h3>
              </div>
              <span className="text-[11px] font-mono-code text-[#F2EFE8]/50">
                {hireQuotient.location}
              </span>
            </div>

            <div className="mt-3.5 flex items-center justify-between">
              <span className="text-sm font-semibold text-[#F2EFE8]">
                {hireQuotient.role}
              </span>
              <span className="text-[11px] font-mono-code text-[#7CE3B5]">
                {hireQuotient.period}
              </span>
            </div>

            <ul className="mt-4 space-y-2.5 text-xs text-[#F2EFE8]/80 leading-relaxed list-disc list-outside pl-4 font-normal">
              {hireQuotient.bullets.map((b, idx) => (
                <li key={idx} className="marker:text-[#7CE3B5]">
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-5 pt-3 border-t border-[#F2EFE8]/10 flex flex-wrap gap-1.5">
              {hireQuotient.techStack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono-code text-[10px] px-2 py-0.5 rounded bg-[#F2EFE8]/5 border border-[#F2EFE8]/10 text-[#F2EFE8]/70"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Live Log Terminal snippet */}
          <div className="glass-card p-4 rounded-xl font-mono-code text-[11px] bg-[#0A0A0C]/90">
            <div className="text-[#FF5B2E] pb-1.5 border-b border-[#F2EFE8]/10 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF5B2E] animate-ping" />
              <span>{experience.terminalSnippet.command}</span>
            </div>
            <div className="space-y-1 text-[#F2EFE8]/70 text-[10px]">
              {experience.terminalSnippet.lines.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
