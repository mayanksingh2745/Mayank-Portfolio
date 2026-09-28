"use client";

import React, { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { siteContent } from "@/data/content";
import { PosterBackground } from "@/components/PosterBackground";
import { AvatarStage } from "@/components/AvatarStage";
import { ProgressRail } from "@/components/ProgressRail";
import { ReduceEffectsToggle } from "@/components/ReduceEffectsToggle";

import { HeroSection } from "@/components/Sections/HeroSection";
import { ImpactSection } from "@/components/Sections/ImpactSection";
import { ExperienceSection } from "@/components/Sections/ExperienceSection";
import { ProjectsSection } from "@/components/Sections/ProjectsSection";
import { SkillsSection } from "@/components/Sections/SkillsSection";
import { AboutSection } from "@/components/Sections/AboutSection";
import { CredentialsSection } from "@/components/Sections/CredentialsSection";
import { ContactSection } from "@/components/Sections/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [reducedEffects, setReducedEffects] = useState(false);

  const lenisRef = useRef<Lenis | null>(null);

  // Check system prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mediaQuery.matches) {
        setReducedEffects(true);
      }
    }
  }, []);

  // Initialize Lenis + GSAP ScrollTrigger
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis for buttery cinematic scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reducedEffects,
    });
    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on("scroll", (e) => {
      ScrollTrigger.update();
      if (e.progress !== undefined) {
        setScrollProgress(e.progress);
      }
    });

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Set up ScrollTriggers for each section
    const sectionElements = siteContent.sectionConfig.map((sec) =>
      document.getElementById(sec.id)
    );

    const triggers: ScrollTrigger[] = [];

    sectionElements.forEach((el, index) => {
      if (!el) return;
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveSectionIndex(index),
        onEnterBack: () => setActiveSectionIndex(index),
      });
      triggers.push(st);
    });

    return () => {
      triggers.forEach((t) => t.kill());
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, [reducedEffects]);

  // Smooth scroll handler
  const scrollToSection = (index: number) => {
    const sec = siteContent.sectionConfig[index];
    if (!sec) return;
    const el = document.getElementById(sec.id);
    if (el) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, { duration: 1.4 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
      setActiveSectionIndex(index);
    }
  };

  const handleBackToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 2.0 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setActiveSectionIndex(0);
  };

  return (
    <main className="relative min-h-screen bg-[#0A0A0C] text-[#F2EFE8] selection:bg-[#D9B36A] selection:text-[#0A0A0C]">
      {/* POSTER LAYER 1 & 2 & 3: Background, Vignette, Blinds, Halo, Giant Word */}
      <PosterBackground
        activeSectionIndex={activeSectionIndex}
        scrollProgress={scrollProgress}
        reducedEffects={reducedEffects}
      />

      {/* POSTER LAYER 4: Sticky Centered Avatar Stage */}
      <AvatarStage
        activeSectionIndex={activeSectionIndex}
        reducedEffects={reducedEffects}
      />

      {/* Fixed UI Overlays: Progress Rail (01 to 08) & Reduced Effects Toggle */}
      <ProgressRail
        activeSectionIndex={activeSectionIndex}
        onSelectSection={scrollToSection}
      />

      <ReduceEffectsToggle
        reducedEffects={reducedEffects}
        onToggle={setReducedEffects}
      />

      {/* POSTER LAYER 5: Foreground Scrolling Content Sections */}
      <div className="relative z-20 flex flex-col w-full">
        <HeroSection
          onViewProjects={() => scrollToSection(3)}
          reducedEffects={reducedEffects}
        />
        <ImpactSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <AboutSection />
        <CredentialsSection />
        <ContactSection />
        <Footer onBackToTop={handleBackToTop} />
      </div>
    </main>
  );
}
