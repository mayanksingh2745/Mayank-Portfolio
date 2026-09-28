"use client";

import React from "react";
import { siteContent } from "@/data/content";

export const AboutSection: React.FC = () => {
  const { about } = siteContent;

  return (
    <section
      id="about"
      aria-label="About Mayank Singh"
      className="relative min-h-screen w-full flex flex-col justify-center py-16 px-4 sm:px-8 lg:px-12 z-20 pointer-events-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-center my-auto">
        {/* Left Column (Desktop: 4 cols): Story & Systems Engineering discipline */}
        <div className="lg:col-span-4 flex flex-col space-y-4 z-20">
          <div className="wcag-scrim p-6 -ml-4 rounded-xl">
            <span className="font-mono-code text-xs uppercase tracking-widest text-[#8B5CFF] font-semibold">
              {about.sectionTag}
            </span>
            <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold tracking-tight text-[#F2EFE8] mt-2.5">
              {about.title}
            </h2>
            <div className="mt-5 space-y-4 text-xs sm:text-sm text-[#F2EFE8]/80 leading-relaxed font-normal">
              {about.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Center Space for Sticky Avatar (Desktop: 4 cols) */}
        <div className="hidden lg:block lg:col-span-4 h-[65vh] pointer-events-none" />

        {/* Right Column (Desktop: 4 cols): Writing & Systems Philosophy */}
        <div className="lg:col-span-4 flex flex-col space-y-6 z-20">
          {/* LinkedIn Writing Highlight Card */}
          <div className="glass-card p-6 rounded-xl border-l-2 border-l-[#8B5CFF]">
            <span className="font-mono-code text-[11px] uppercase tracking-wider text-[#8B5CFF] block mb-2 font-semibold">
              Public Knowledge Sharing
            </span>
            <h3 className="text-lg font-bold text-[#F2EFE8]">
              Writing on Real-World Machine Learning
            </h3>
            <p className="text-xs sm:text-sm text-[#F2EFE8]/75 mt-2.5 leading-relaxed font-normal">
              {about.linkedinNote.text}
            </p>
            <div className="mt-5">
              <a
                href={about.linkedinNote.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono-code text-xs px-4 py-2 rounded-lg bg-[#8B5CFF]/20 border border-[#8B5CFF]/40 text-[#F2EFE8] hover:bg-[#8B5CFF]/35 transition-all"
              >
                <span>{about.linkedinNote.cta}</span>
                <span className="text-xs">&rarr;</span>
              </a>
            </div>
          </div>

          {/* Core Philosophy Manifesto */}
          <div className="glass-card p-5 rounded-xl space-y-3 font-mono-code text-xs">
            <span className="text-[#F2EFE8]/40 uppercase tracking-widest text-[10px] block">
              OPERATING_PRINCIPLES
            </span>
            <div className="text-[#F2EFE8]/85 space-y-2 text-[11px]">
              <p>&bull; Clean tables beat complicated loss functions.</p>
              <p>&bull; An unmonitored model in production is technical debt.</p>
              <p>&bull; Latency is a product feature, not just an infra metric.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
