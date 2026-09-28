"use client";

import React, { useEffect, useState } from "react";

interface ReduceEffectsToggleProps {
  reducedEffects: boolean;
  onToggle: (val: boolean) => void;
}

export const ReduceEffectsToggle: React.FC<ReduceEffectsToggleProps> = ({
  reducedEffects,
  onToggle,
}) => {
  return (
    <button
      onClick={() => onToggle(!reducedEffects)}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-3 py-1.5 text-xs font-mono-code rounded-full bg-[#121217]/90 border border-[#F2EFE8]/15 hover:border-[#D9B36A]/50 text-[#F2EFE8]/80 hover:text-[#F2EFE8] backdrop-blur-md transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-[#D9B36A]"
      title="Toggle reduced motion / simple static posters"
      aria-pressed={reducedEffects}
    >
      <span
        className={`w-2 h-2 rounded-full transition-colors ${
          reducedEffects ? "bg-[#7CE3B5]" : "bg-[#F2EFE8]/40"
        }`}
      />
      <span>{reducedEffects ? "Effects: Reduced" : "Effects: Full"}</span>
    </button>
  );
};
