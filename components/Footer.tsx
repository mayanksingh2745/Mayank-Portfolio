"use client";

import React from "react";

interface FooterProps {
  onBackToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onBackToTop }) => {
  return (
    <footer className="relative w-full py-8 border-t border-[#F2EFE8]/10 bg-[#0A0A0C]/90 backdrop-blur-md z-30 pointer-events-auto">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-code text-xs text-[#F2EFE8]/60">
        <div className="flex items-center gap-3">
          <span className="text-[#D9B36A] font-semibold">Mayank Singh</span>
          <span>&bull;</span>
          <span>AI Systems &amp; Applied ML</span>
        </div>

        <button
          onClick={onBackToTop}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F2EFE8]/5 hover:bg-[#F2EFE8]/10 text-[#F2EFE8]/80 hover:text-[#D9B36A] border border-[#F2EFE8]/10 transition-colors focus:outline-none focus:ring-1 focus:ring-[#D9B36A]"
        >
          <span>&uarr; Back to Top (Rewind)</span>
        </button>
      </div>
    </footer>
  );
};
