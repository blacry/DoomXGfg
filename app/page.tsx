"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollStore } from "@/lib/scrollProgress";

import Hero from "@/components/sections/Hero";
import Reveal from "@/components/sections/Reveal";
import Decree from "@/components/sections/Decree";
import Trials from "@/components/sections/Trials";
import Timeline from "@/components/sections/Timeline";
import RegisterCTA from "@/components/sections/RegisterCTA";
import Footer from "@/components/sections/Footer";

import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { AudioController } from "@/components/ui/AudioController";
import FogOverlay from "@/components/ui/FogOverlay";

// Lazy load the Canvas to prevent SSR issues with Three.js
const SceneCanvas = dynamic(() => import("@/components/scene/SceneCanvas"), { ssr: false });

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const setProgress = useScrollStore((state) => state.setProgress);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (containerRef.current) {
      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          setProgress(self.progress);
        },
      });

      return () => {
        st.kill();
      };
    }
  }, [setProgress]);

  return (
    <main ref={containerRef} className="relative w-full min-h-screen">
      <LoadingScreen />
      <AudioController />
      
      {/* Logos in top right */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 pointer-events-auto">
        <img 
          src="/logos.png" 
          alt="Partner Logos" 
          className="h-8 sm:h-12 md:h-16 w-auto object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]" 
        />
      </div>

      {/* Hero section goes behind the Canvas */}
      <div className="relative z-0 w-full pointer-events-none">
        <div className="pointer-events-auto selection:bg-zinc-700 selection:text-white">
          <Hero />
        </div>
      </div>

      <div className="relative z-10">
        <SceneCanvas />
      </div>
      
      <FogOverlay />

      {/* Film grain noise overlay — gives premium editorial feel */}
      <div
        className="fixed inset-0 z-[25] pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />
      
      {/* Rest of the DOM Content goes in front of the Canvas so overlays work */}
      <div className="relative z-20 w-full pointer-events-none">
        <div className="pointer-events-auto selection:bg-zinc-700 selection:text-white">
          <Reveal />
          <Decree />
          <Trials />
          <Timeline />
          <RegisterCTA />
          <Footer />
        </div>
      </div>
    </main>
  );
}
