"use client";

import React from "react";
import { siteContent } from "@/data/content";

export const ImpactSection: React.FC = () => {
  const { impact } = siteContent;

  return (
    <section
      id="impact"
      aria-label="Impact and Quantitative Metrics"
      className="relative min-h-screen w-full flex flex-col justify-center py-16 px-4 sm:px-8 lg:px-12 z-20 pointer-events-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-center my-auto">
        {/* Left Column (Desktop: 4 cols) */}
        <div className="lg:col-span-4 flex flex-col justify-center space-y-6 text-left z-20">
          <div className="wcag-scrim p-6 -ml-4 rounded-xl">
            <span className="font-mono-code text-xs uppercase tracking-widest text-[#3D5AFE] font-semibold">
              {impact.sectionTag}
            </span>
            <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold tracking-tight text-[#F2EFE8] leading-tight mt-2.5">
              {impact.headline}
            </h2>
            <p className="text-sm sm:text-base text-[#F2EFE8]/75 mt-4 leading-relaxed">
              {impact.subheadline}
            </p>
          </div>

          {/* Mini Performance telemetry card */}
          <div className="glass-card p-5 rounded-xl border-l-2 border-l-[#3D5AFE]">
            <div className="flex items-center justify-between text-xs font-mono-code text-[#F2EFE8]/50 pb-2 border-b border-[#F2EFE8]/10">
              <span>SYSTEM PERFORMANCE</span>
              <span className="text-[#3D5AFE]">OPTIMIZED</span>
            </div>
            <div className="mt-3 text-xs text-[#F2EFE8]/80 space-y-1.5 font-mono-code">
              <p>&gt; Analytical engine latency stabilized</p>
              <p>&gt; Real-time pipeline validation</p>
              <p>&gt; High-fidelity executive reporting</p>
            </div>
          </div>
        </div>

        {/* Center Space for Sticky Avatar (Desktop: 4 cols) */}
        <div className="hidden lg:block lg:col-span-4 h-[65vh] pointer-events-none" />

        {/* Right Column (Desktop: 4 cols) */}
        <div className="lg:col-span-4 flex flex-col justify-center space-y-4 z-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
            {impact.stats.map((stat) => (
              <div
                key={stat.label}
                className="glass-card p-5 rounded-xl transition-all hover:translate-x-1"
              >
                <div className="flex items-baseline justify-between">
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono-code text-[#F2EFE8]">
                    {stat.value}
                  </div>
                  <span className="text-[10px] font-mono-code uppercase px-2 py-0.5 rounded bg-[#3D5AFE]/10 border border-[#3D5AFE]/30 text-[#3D5AFE]">
                    Verified
                  </span>
                </div>
                <h3 className="font-semibold text-sm text-[#F2EFE8] mt-2">
                  {stat.label}
                </h3>
                <p className="text-xs text-[#F2EFE8]/60 mt-1 leading-normal font-normal">
                  {stat.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Illustrative Label tag */}
          <div className="text-right">
            <span className="text-[10px] font-mono-code text-[#F2EFE8]/35 uppercase tracking-widest">
              Live visual feedback labeled &bull; {impact.illustrativeChartLabel}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
