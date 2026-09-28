"use client";

import React, { useEffect, useState } from "react";
import { siteContent } from "@/data/content";

interface PosterBackgroundProps {
  activeSectionIndex: number;
  scrollProgress: number; // 0 to 1 overall progress
  reducedEffects: boolean;
}

export const PosterBackground: React.FC<PosterBackgroundProps> = ({
  activeSectionIndex,
  scrollProgress,
  reducedEffects,
}) => {
  const currentSec = siteContent.sectionConfig[activeSectionIndex] || siteContent.sectionConfig[0];
  const [heroWordIndex, setHeroWordIndex] = useState(0);

  // For hero section, cycle "AI" / "DATA" / "ML"
  useEffect(() => {
    if (activeSectionIndex !== 0) return;
    const interval = setInterval(() => {
      setHeroWordIndex((prev) => (prev + 1) % 3);
    }, 2400);
    return () => clearInterval(interval);
  }, [activeSectionIndex]);

  // Determine current giant word
  let giantWord = "";
  if (Array.isArray(currentSec.giantWord)) {
    giantWord = currentSec.giantWord[heroWordIndex] || currentSec.giantWord[0];
  } else {
    giantWord = currentSec.giantWord;
  }

  // Parallax translation for the giant word based on scroll
  const wordTranslateX = reducedEffects ? 0 : (scrollProgress * 200 - 100);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* 1. Base dark background */}
      <div className="absolute inset-0 bg-[#0A0A0C]" />

      {/* 2. Venetian Blinds diagonal sweep */}
      {!reducedEffects && (
        <div className="absolute inset-0 poster-blinds opacity-80" />
      )}

      {/* 3. Soft Vignette */}
      <div className="absolute inset-0 poster-vignette opacity-90" />

      {/* 4. Film Grain */}
      <div className="absolute inset-0 poster-grain" />

      {/* 5. HALO: Large glowing circle behind the head */}
      <div
        className="absolute left-1/2 top-[32%] lg:top-[36%] -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-1000 ease-out"
        style={{
          width: "min(68vw, 540px)",
          height: "min(68vw, 540px)",
        }}
      >
        {/* Soft Outer Glow */}
        <div
          className={`w-full h-full rounded-full transition-all duration-1000 ease-out ${
            reducedEffects ? "" : "halo-glow-circle"
          }`}
          style={{
            background: `radial-gradient(circle, ${currentSec.haloColor}55 0%, ${currentSec.haloColor}22 55%, transparent 75%)`,
            filter: "blur(60px)",
          }}
        />

        {/* Inner intense core */}
        <div
          className="absolute inset-[18%] rounded-full transition-all duration-1000 ease-out opacity-85"
          style={{
            background: `radial-gradient(circle, ${currentSec.haloColor}88 0%, ${currentSec.haloColor}33 50%, transparent 80%)`,
            filter: "blur(32px)",
          }}
        />

        {/* Edge dust particles (subtle cinematic specks) */}
        {!reducedEffects && (
          <div className="absolute inset-0 pointer-events-none opacity-40">
            <span
              className="absolute top-1/4 left-1/5 w-1 h-1 rounded-full bg-white/70 animate-ping"
              style={{ animationDuration: "4s" }}
            />
            <span
              className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse"
              style={{ animationDuration: "5s" }}
            />
            <span
              className="absolute top-1/2 right-1/6 w-1 h-1 rounded-full bg-white/50 animate-ping"
              style={{ animationDuration: "6s" }}
            />
          </div>
        )}
      </div>

      {/* 6. GIANT WORD: 22vw - 28vw heavy typographic background layer */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="relative w-full text-center flex items-center justify-center transition-transform duration-700 ease-out"
          style={{
            transform: `translateX(${wordTranslateX * 0.25}px)`,
          }}
        >
          <span
            key={`${currentSec.id}-${giantWord}`}
            className="giant-word-style text-[22vw] lg:text-[26vw] transition-all duration-700 font-extrabold uppercase tracking-tighter"
            style={{
              color: `${currentSec.haloColor}14`, // Subtle tint matching section
              textShadow: `0 0 100px ${currentSec.haloColor}10`,
            }}
          >
            {giantWord}
          </span>
        </div>
      </div>
    </div>
  );
};
