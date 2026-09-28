"use client";

import React from "react";
import { siteContent } from "@/data/content";

interface ProgressRailProps {
  activeSectionIndex: number;
  onSelectSection: (index: number) => void;
}

export const ProgressRail: React.FC<ProgressRailProps> = ({
  activeSectionIndex,
  onSelectSection,
}) => {
  return (
    <nav
      aria-label="Section navigation rail"
      className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3 py-4 px-2"
    >
      <div className="flex flex-col gap-2.5">
        {siteContent.sectionConfig.map((sec, idx) => {
          const isActive = idx === activeSectionIndex;
          return (
            <button
              key={sec.id}
              onClick={() => onSelectSection(idx)}
              className="group flex items-center gap-3 text-left focus:outline-none"
              aria-label={`Go to section ${sec.number}: ${sec.label}`}
              aria-current={isActive ? "step" : undefined}
            >
              {/* Rail Line / Dot indicator */}
              <div className="relative flex items-center justify-center">
                <span
                  className={`h-2.5 transition-all duration-300 rounded-full ${
                    isActive
                      ? "w-7 bg-[#F2EFE8]"
                      : "w-2 bg-[#F2EFE8]/25 group-hover:bg-[#F2EFE8]/60"
                  }`}
                  style={{
                    backgroundColor: isActive ? sec.haloColor : undefined,
                  }}
                />
              </div>

              {/* Number and Label */}
              <div
                className={`font-mono-code text-[11px] uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                  isActive
                    ? "opacity-100 font-semibold translate-x-1"
                    : "opacity-35 group-hover:opacity-75"
                }`}
                style={{
                  color: isActive ? sec.haloColor : "var(--text-ice)",
                }}
              >
                <span>{sec.number}</span>
                <span className="hidden xl:inline text-[10px] text-[#F2EFE8]/60">
                  {sec.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
