"use client";

import React from "react";
import { siteContent } from "@/data/content";

export const CredentialsSection: React.FC = () => {
  const { credentials } = siteContent;

  const leftCredentials = credentials.items.slice(0, 3);
  const rightCredentials = credentials.items.slice(3);

  return (
    <section
      id="credentials"
      aria-label="Credentials, Job Simulations, and Education"
      className="relative min-h-screen w-full flex flex-col justify-center py-16 px-4 sm:px-8 lg:px-12 z-20 pointer-events-auto"
    >
      {/* Header */}
      <div className="w-full text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <span className="font-mono-code text-xs uppercase tracking-widest text-[#D9B36A] font-semibold">
          {credentials.sectionTag}
        </span>
        <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold tracking-tight text-[#F2EFE8] mt-2">
          {credentials.title}
        </h2>
        <p className="text-xs sm:text-sm font-mono-code text-[#F2EFE8]/60 mt-2">
          {credentials.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-start my-auto">
        {/* Left Column (Desktop: 4 cols): Simulations & Specialization */}
        <div className="lg:col-span-4 flex flex-col space-y-4 z-20">
          {leftCredentials.map((item) => (
            <div
              key={item.title}
              className="glass-card p-5 rounded-xl border-l-2 border-l-[#D9B36A]"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#F2EFE8]/10 mb-2">
                <span className="text-[10px] font-mono-code uppercase tracking-wider text-[#D9B36A]">
                  {item.issuer}
                </span>
                <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-[#D9B36A]/10 border border-[#D9B36A]/25 text-[#D9B36A]">
                  {item.type}
                </span>
              </div>
              <h3 className="text-base font-bold text-[#F2EFE8]">
                {item.title}
              </h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.skillsLearned.map((s) => (
                  <span
                    key={s}
                    className="font-mono-code text-[10px] px-2 py-0.5 rounded bg-[#F2EFE8]/5 border border-[#F2EFE8]/10 text-[#F2EFE8]/70"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Center Space for Sticky Avatar (Desktop: 4 cols) */}
        <div className="hidden lg:block lg:col-span-4 h-[65vh] pointer-events-none" />

        {/* Right Column (Desktop: 4 cols): Remaining Simulations & Education line */}
        <div className="lg:col-span-4 flex flex-col space-y-4 z-20">
          {rightCredentials.map((item) => (
            <div
              key={item.title}
              className="glass-card p-5 rounded-xl border-l-2 border-l-[#D9B36A]"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#F2EFE8]/10 mb-2">
                <span className="text-[10px] font-mono-code uppercase tracking-wider text-[#D9B36A]">
                  {item.issuer}
                </span>
                <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-[#D9B36A]/10 border border-[#D9B36A]/25 text-[#D9B36A]">
                  {item.type}
                </span>
              </div>
              <h3 className="text-base font-bold text-[#F2EFE8]">
                {item.title}
              </h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.skillsLearned.map((s) => (
                  <span
                    key={s}
                    className="font-mono-code text-[10px] px-2 py-0.5 rounded bg-[#F2EFE8]/5 border border-[#F2EFE8]/10 text-[#F2EFE8]/70"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Education: Only appears here as one small low-emphasis line */}
          <div className="glass-card p-4 rounded-xl border border-[#F2EFE8]/10 bg-[#0A0A0C]/80 mt-2">
            <span className="text-[10px] font-mono-code uppercase tracking-widest text-[#F2EFE8]/40 block mb-1">
              ACADEMIC BACKGROUND (LOW EMPHASIS)
            </span>
            <p className="text-xs text-[#F2EFE8]/80 font-medium">
              {credentials.education.degree}
            </p>
            <p className="text-[11px] font-mono-code text-[#F2EFE8]/55 mt-0.5">
              {credentials.education.institution} &bull; {credentials.education.period}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
