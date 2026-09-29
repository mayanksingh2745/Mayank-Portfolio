"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { siteContent } from "@/data/content";

interface AvatarStageProps {
  activeSectionIndex: number;
  reducedEffects: boolean;
}

const POSE_KEYS = [
  "pose-portrait",
  "pose-laptop",
  "pose-experience",
  "pose-projects",
  "pose-reading",
  "pose-present",
  "pose-about",
  "pose-wave",
] as const;

type PoseKey = (typeof POSE_KEYS)[number];

export const AvatarStage: React.FC<AvatarStageProps> = ({
  activeSectionIndex,
  reducedEffects,
}) => {
  const currentSec =
    siteContent.sectionConfig[activeSectionIndex] ||
    siteContent.sectionConfig[0];
  const activePoseKey = currentSec.poseKey as PoseKey;

  // Mouse tilt tracking
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedEffects) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Normalized between -1 and 1
      const normX = (e.clientX / innerWidth - 0.5) * 2;
      const normY = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x: normX, y: normY });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [reducedEffects]);

  // Section-specific tilt adjustments (e.g. About section has a 4-6deg tilt)
  const isAboutSection = currentSec.id === "about";
  const baseTilt = isAboutSection ? 5 : 0;
  const tiltX = reducedEffects ? baseTilt : baseTilt + mousePos.y * -4;
  const tiltY = reducedEffects ? 0 : mousePos.x * 5;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-10 flex items-end justify-center overflow-hidden"
    >
      {/* Center Avatar Anchor Container */}
      <div
        className="relative w-full max-w-[460px] md:max-w-[560px] lg:max-w-[640px] xl:max-w-[700px] h-[52vh] sm:h-[62vh] md:h-[75vh] lg:h-[86vh] flex items-end justify-center transition-transform duration-300 ease-out avatar-bottom-mask"
        style={{
          transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
        }}
      >
        {/* Layer 4: AVATAR CUTOUT STACK */}
        <div
          className={`relative w-full h-full flex items-end justify-center ${
            reducedEffects ? "" : "avatar-breathe"
          }`}
        >
          {POSE_KEYS.map((key) => {
            const isActive = key === activePoseKey;
            return (
              <div
                key={key}
                className={`absolute inset-x-0 bottom-0 top-0 flex items-end justify-center transition-all duration-700 ease-in-out ${
                  isActive
                    ? "opacity-100 scale-100 z-10"
                    : "opacity-0 scale-[0.98] pointer-events-none z-0"
                }`}
                style={{
                  filter: isActive
                    ? `drop-shadow(0 0 24px ${currentSec.haloColor}33) drop-shadow(0 15px 35px rgba(0, 0, 0, 0.75))`
                    : "none",
                }}
              >
                <div className="relative w-full h-full flex items-end justify-center">
                  <Image
                    src={`/avatar/${key}.webp?v=projects_v2`}
                    alt="Mayank Singh"
                    width={1050}
                    height={1400}
                    priority={key === "pose-portrait" || key === "pose-projects"}
                    unoptimized
                    className="w-auto h-full max-h-full object-contain object-bottom select-none pointer-events-none"
                    sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 42vw"
                  />
                </div>
              </div>
            );
          })}

          {/* Interactive Props Overlay */}

          {/* 1. Live Glowing Chart on Laptop (Impact Section) */}
          {activePoseKey === "pose-laptop" && currentSec.id === "impact" && (
            <div
              className="absolute left-[36%] bottom-[16%] md:bottom-[20%] w-[120px] md:w-[155px] p-2.5 rounded-md bg-[#0A0A0C]/90 border border-[#3D5AFE]/40 backdrop-blur-md shadow-[0_0_20px_rgba(61,90,254,0.4)] z-20 pointer-events-auto transition-all animate-pulse"
              style={{ animationDuration: "3s" }}
            >
              <div className="flex items-center justify-between border-b border-[#3D5AFE]/20 pb-1 mb-1.5">
                <span className="text-[8px] font-mono-code text-[#3D5AFE] uppercase tracking-wider">
                  Latency Target
                </span>
                <span className="text-[7px] font-mono-code text-[#F2EFE8]/40 uppercase">
                  illustrative
                </span>
              </div>
              <div className="flex items-end gap-1.5 h-8 pt-1">
                <div className="flex-1 bg-[#3D5AFE]/40 h-[45%] rounded-t-sm" />
                <div className="flex-1 bg-[#3D5AFE]/60 h-[70%] rounded-t-sm" />
                <div className="flex-1 bg-[#3D5AFE]/80 h-[35%] rounded-t-sm" />
                <div className="flex-1 bg-[#3D5AFE] h-[95%] rounded-t-sm" />
              </div>
              <div className="flex justify-between text-[8px] font-mono-code text-[#F2EFE8]/70 mt-1">
                <span>-40% ms</span>
                <span className="text-[#3D5AFE]">98.4% hit</span>
              </div>
            </div>
          )}

          {/* 2. Terminal Look / Floating HUD (Experience Section) */}
          {currentSec.id === "experience" && (
              <div
                className="absolute left-[35%] bottom-[15%] md:bottom-[19%] w-[130px] md:w-[170px] p-2 rounded bg-[#0A0A0C]/95 border border-[#FF5B2E]/40 backdrop-blur-md shadow-[0_0_20px_rgba(255,91,46,0.3)] z-20 pointer-events-auto"
              >
                <div className="flex items-center gap-1 border-b border-[#FF5B2E]/20 pb-1 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF5B2E]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
                  <span className="text-[8px] font-mono-code text-[#F2EFE8]/50 ml-1">
                    psql: production
                  </span>
                </div>
                <div className="text-[8px] font-mono-code text-[#F2EFE8]/80 leading-relaxed">
                  <p className="text-[#FF5B2E]">$ EXPLAIN ANALYZE</p>
                  <p className="text-emerald-400">&gt; Index Scan (btree)</p>
                  <p className="text-[#F2EFE8]/50">&gt; 340ms &rarr; 204ms</p>
                </div>
              </div>
            )}

          {/* 3. Open Book Notes (Skills Section) */}
          {activePoseKey === "pose-reading" && (
            <div
              className="absolute left-[24%] bottom-[24%] md:bottom-[28%] w-[130px] md:w-[160px] p-2 rounded bg-[#0A0A0C]/90 border border-[#FFD84A]/30 backdrop-blur-md shadow-[0_0_15px_rgba(255,216,74,0.25)] z-20 pointer-events-auto"
            >
              <div className="text-[8px] font-mono-code text-[#FFD84A] border-b border-[#FFD84A]/20 pb-0.5 mb-1 flex items-center justify-between">
                <span>NOTES.PY</span>
                <span className="text-[7px] text-[#F2EFE8]/50">PAG. 142</span>
              </div>
              <p className="text-[8px] font-mono-code text-[#F2EFE8]/75 leading-tight">
                L_reg = &lambda; &sum; ||w||&sup2;
              </p>
              <p className="text-[7px] font-mono-code text-[#F2EFE8]/50 mt-1">
                // Gradient boosted trees + cross validation
              </p>
            </div>
          )}

          {/* 4. Subtle Halo Rim Tint Light */}
          <div
            className="absolute inset-0 pointer-events-none transition-colors duration-700 mix-blend-screen opacity-20"
            style={{
              background: `radial-gradient(circle at 50% 65%, ${currentSec.haloColor} 0%, transparent 60%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
