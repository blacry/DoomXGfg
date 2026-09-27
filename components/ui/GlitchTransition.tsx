"use client";

import { useEffect, useState } from "react";
import { useScrollStore } from "@/lib/scrollProgress";

export default function GlitchTransition() {
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchIntensity, setGlitchIntensity] = useState(0);

  useEffect(() => {
    let lastSection = -1;
    const unsubscribe = useScrollStore.subscribe((state) => {
      // Trigger glitch when crossing section boundaries roughly.
      // We'll estimate this by scroll progress crossing 0.2, 0.4, 0.6, 0.8
      const currentSection = Math.floor(state.progress * 5);
      if (currentSection !== lastSection && lastSection !== -1) {
        // Trigger glitch
        setIsGlitching(true);
        setGlitchIntensity(Math.random() * 0.5 + 0.5); // 0.5 to 1.0 intensity
        
        // Random duration between 200ms and 500ms
        setTimeout(() => {
          setIsGlitching(false);
        }, Math.random() * 300 + 200);
      }
      lastSection = currentSection;
    });

    return () => unsubscribe();
  }, []);

  if (!isGlitching) return null;

  return (
    <div 
      className="fixed inset-0 z-[1000] pointer-events-none mix-blend-difference opacity-50"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        animation: 'glitch-flash 0.1s infinite',
        opacity: glitchIntensity * 0.8
      }}
    >
      {/* Scanline overlay for glitch */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.2)_1px,transparent_1px)] bg-[size:100%_4px] opacity-30 animate-[scan_2s_linear_infinite]" />
      <div className="absolute inset-0 bg-emerald-500/10 mix-blend-color" />
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes glitch-flash {
          0% { opacity: ${glitchIntensity * 0.8}; transform: scale(1) translate(0); }
          25% { opacity: ${glitchIntensity * 0.4}; transform: scale(1.02) translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px); }
          50% { opacity: ${glitchIntensity * 0.9}; transform: scale(0.98) translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px); filter: invert(1); }
          75% { opacity: ${glitchIntensity * 0.5}; transform: scale(1.01) translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px); filter: invert(0) hue-rotate(90deg); }
          100% { opacity: ${glitchIntensity * 0.7}; transform: scale(1) translate(0); }
        }
      `}} />
    </div>
  );
}
