"use client";

import React from "react";
import { siteContent } from "@/data/content";

export const SkillsSection: React.FC = () => {
  const { skills } = siteContent;

  const leftCategories = skills.categories.slice(0, 2);
  const rightCategories = skills.categories.slice(2, 4);

  return (
    <section
      id="skills"
      aria-label="Technical Skills and Stack"
      className="relative min-h-screen w-full flex flex-col justify-center py-16 px-4 sm:px-8 lg:px-12 z-20 pointer-events-auto"
    >
      {/* Header */}
      <div className="w-full text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <span className="font-mono-code text-xs uppercase tracking-widest text-[#FFD84A] font-semibold">
          {skills.sectionTag}
        </span>
        <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold tracking-tight text-[#F2EFE8] mt-2">
          {skills.title}
        </h2>
        <p className="text-xs sm:text-sm font-mono-code text-[#F2EFE8]/60 mt-2">
          {skills.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-start my-auto">
        {/* Left Column (Desktop: 4 cols): ML & Analytics */}
        <div className="lg:col-span-4 flex flex-col space-y-6 z-20">
          {leftCategories.map((cat) => (
            <div
              key={cat.category}
              className="glass-card p-6 rounded-xl border-l-2"
              style={{ borderLeftColor: cat.color }}
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#F2EFE8]/10 mb-4">
                <h3 className="font-mono-code text-xs uppercase tracking-wider text-[#F2EFE8] font-bold">
                  {cat.category}
                </h3>
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.skills.map((s) => (
                  <span
                    key={s.name}
                    className={`font-mono-code text-xs px-3 py-1.5 rounded-lg border transition-all ${
                      s.highlight
                        ? "bg-[#F2EFE8]/10 border-[#F2EFE8]/25 text-[#F2EFE8] font-medium"
                        : "bg-[#F2EFE8]/5 border-[#F2EFE8]/10 text-[#F2EFE8]/75"
                    }`}
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Center Space for Sticky Avatar (Desktop: 4 cols) */}
        <div className="hidden lg:block lg:col-span-4 h-[65vh] pointer-events-none" />

        {/* Right Column (Desktop: 4 cols): Cloud/Eng & Tools */}
        <div className="lg:col-span-4 flex flex-col space-y-6 z-20">
          {rightCategories.map((cat) => (
            <div
              key={cat.category}
              className="glass-card p-6 rounded-xl border-l-2"
              style={{ borderLeftColor: cat.color }}
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#F2EFE8]/10 mb-4">
                <h3 className="font-mono-code text-xs uppercase tracking-wider text-[#F2EFE8] font-bold">
                  {cat.category}
                </h3>
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.skills.map((s) => (
                  <span
                    key={s.name}
                    className={`font-mono-code text-xs px-3 py-1.5 rounded-lg border transition-all ${
                      s.highlight
                        ? "bg-[#F2EFE8]/10 border-[#F2EFE8]/25 text-[#F2EFE8] font-medium"
                        : "bg-[#F2EFE8]/5 border-[#F2EFE8]/10 text-[#F2EFE8]/75"
                    }`}
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Book / Theory Synthesis Notes Card */}
          <div className="glass-card p-4 rounded-xl font-mono-code text-[11px] bg-[#0A0A0C]/90">
            <span className="text-[#FFD84A] block pb-1 border-b border-[#F2EFE8]/10 mb-2">
              FOUNDATIONAL_PRINCIPLES.MD
            </span>
            <div className="space-y-1 text-[#F2EFE8]/60 text-[10px]">
              {skills.bookNotes.map((note, idx) => (
                <p key={idx}>{note}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
