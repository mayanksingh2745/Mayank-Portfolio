"use client";

import React, { useEffect, useState } from "react";
import { siteContent } from "@/data/content";

interface HeroSectionProps {
  onViewProjects: () => void;
  reducedEffects: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onViewProjects,
  reducedEffects,
}) => {
  const { hero } = siteContent;
  const [roleIndex, setRoleIndex] = useState(0);

  // Rotating role title every 2.8s
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % hero.rotatingRoles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [hero.rotatingRoles.length]);

  return (
    <section
      id="hero"
      aria-label="Introduction & Overview"
      className="relative min-h-screen w-full flex flex-col justify-between py-8 px-4 sm:px-8 lg:px-12 z-20 pointer-events-auto"
    >
      {/* Top Thin Pill Ribbon: small caps separated by dots */}
      <div className="w-full flex justify-center pt-2 sm:pt-4">
        <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-1.5 rounded-full bg-[#121217]/80 border border-[#F2EFE8]/12 text-[10px] sm:text-xs font-mono-code uppercase tracking-wider text-[#F2EFE8]/80 backdrop-blur-md shadow-lg text-center max-w-[95vw] overflow-x-auto whitespace-nowrap">
          {hero.pillRibbon.map((item, idx) => (
            <React.Fragment key={item}>
              <span className="text-[#D9B36A] font-semibold">{item}</span>
              {idx < hero.pillRibbon.length - 1 && (
                <span className="text-[#F2EFE8]/30">•</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main 3-Column Layout Row (Desktop: Left details, Center Avatar space, Right details) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto w-full items-center">
        {/* Left Column (Desktop: 4 cols) */}
        <div className="lg:col-span-4 flex flex-col justify-center space-y-6 sm:space-y-8 text-left z-20">
          <div className="wcag-scrim p-4 sm:p-6 -ml-4 rounded-xl">
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tighter text-[#F2EFE8] leading-[0.95]">
              {hero.name}
            </h1>
            <p className="font-mono-code text-xs sm:text-sm text-[#D9B36A] tracking-wider mt-2.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D9B36A] animate-ping" />
              <span>{hero.location}</span>
            </p>
          </div>

          {/* Left Lower: Chips for GitHub, LinkedIn, Email */}
          <div className="wcag-scrim p-4 -ml-4 rounded-xl">
            <p className="font-mono-code text-[11px] uppercase tracking-wider text-[#F2EFE8]/45 mb-2.5">
              Verified Profiles
            </p>
            <div className="flex flex-wrap gap-2.5">
              {hero.socials.map((soc) => (
                <a
                  key={soc.label}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-chip px-3 py-1.5 rounded-lg text-xs font-mono-code text-[#F2EFE8]/85 hover:text-[#D9B36A] hover:border-[#D9B36A]/40 flex items-center gap-2"
                >
                  <span className="text-[10px] text-[#F2EFE8]/40">↗</span>
                  <span>{soc.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Center Space for Sticky Avatar (Desktop: 4 cols - Empty so avatar is completely visible) */}
        <div className="hidden lg:block lg:col-span-4 h-[65vh] pointer-events-none" />

        {/* Right Column (Desktop: 4 cols) */}
        <div className="lg:col-span-4 flex flex-col justify-center space-y-6 sm:space-y-8 text-left lg:text-right z-20">
          {/* Right Upper: Tagline and Open to AI companies pill */}
          <div className="wcag-scrim p-4 sm:p-6 -mr-4 rounded-xl flex flex-col items-start lg:items-end">
            <p className="text-xl sm:text-2xl xl:text-3xl font-bold tracking-tight text-[#F2EFE8] leading-tight max-w-md">
              &ldquo;{hero.tagline}&rdquo;
            </p>
            <div className="mt-3.5 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7CE3B5]/10 border border-[#7CE3B5]/30 text-[11px] font-mono-code text-[#7CE3B5]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7CE3B5] animate-pulse" />
              <span>{hero.badge}</span>
            </div>
          </div>

          {/* Right Lower: Big two-line label and rotating mono role */}
          <div className="wcag-scrim p-4 sm:p-6 -mr-4 rounded-xl flex flex-col items-start lg:items-end">
            <div className="font-mono-code text-[11px] uppercase tracking-wider text-[#F2EFE8]/45 mb-1.5">
              Focus Discipline
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F2EFE8] leading-snug">
              {hero.titles[0]}
              <span className="block text-[#D9B36A]">{hero.titles[1]}</span>
            </div>
            <div className="mt-2.5 font-mono-code text-xs text-[#F2EFE8]/70 flex items-center gap-1.5">
              <span className="text-[#D9B36A]">&gt;</span>
              <span className="border-b border-[#D9B36A]/50 pb-0.5">
                {hero.rotatingRoles[roleIndex]}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Strip: Summary + CTA */}
      <div className="w-full pt-4 pb-2 z-20">
        <div className="wcag-scrim p-4 sm:p-5 rounded-xl max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#F2EFE8]/10 bg-[#0A0A0C]/80 backdrop-blur-md">
          <p className="text-xs sm:text-sm text-[#F2EFE8]/80 leading-relaxed text-center sm:text-left max-w-2xl font-normal">
            {hero.summary}
          </p>
          <button
            onClick={onViewProjects}
            className="whitespace-nowrap px-5 py-2.5 rounded-lg bg-[#D9B36A] text-[#0A0A0C] font-semibold text-xs sm:text-sm font-mono-code hover:bg-[#D9B36A]/90 transition-all shadow-lg hover:shadow-[#D9B36A]/20 focus:outline-none focus:ring-2 focus:ring-[#D9B36A] focus:ring-offset-2 focus:ring-offset-[#0A0A0C]"
          >
            {hero.ctaText} &darr;
          </button>
        </div>
      </div>
    </section>
  );
};
