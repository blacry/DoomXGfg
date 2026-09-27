"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollStore } from "@/lib/scrollProgress";

export default function FogOverlay() {
  const fogRef1 = useRef<HTMLDivElement>(null);
  const fogRef2 = useRef<HTMLDivElement>(null);
  const firefliesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = useScrollStore.subscribe((state) => {
      const p = state.progress;
      
      // Parallax effect based on scroll progress (0 to 1)
      if (fogRef1.current) {
        fogRef1.current.style.transform = `translateY(${p * -150}px)`;
      }
      if (fogRef2.current) {
        fogRef2.current.style.transform = `translateY(${p * -300}px)`;
      }
      if (firefliesRef.current) {
        firefliesRef.current.style.transform = `translateY(${p * -450}px)`;
      }
    });
    return () => unsubscribe();
  }, []);

  // Fireflies generation
  const [fireflies, setFireflies] = useState<{ id: number, x: number, y: number, size: number, duration: number, delay: number, drift: number }[]>([]);
  useEffect(() => {
    const flies = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // vw
      y: Math.random() * 200, // vh (spread over a taller area for parallax)
      size: Math.random() * 3 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * -5, // negative delay so they start animated
      drift: Math.random() * 40 - 20
    }));
    setFireflies(flies);
  }, []);

  return (
    // z-15 puts it exactly between SceneCanvas (z-10) and DOM content (z-20)
    <div className="fixed inset-0 z-[15] pointer-events-none overflow-hidden">
      


      {/* Fog Layer 1 (Slow) */}
      <div 
        ref={fogRef1}
        className="absolute inset-0 w-full h-[150%] -top-[25%] opacity-40 mix-blend-screen"
        style={{
          background: 'radial-gradient(ellipse at 50% 80%, rgba(16,185,129,0.3) 0%, transparent 60%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Fog Layer 2 (Faster) */}
      <div 
        ref={fogRef2}
        className="absolute inset-0 w-full h-[150%] -top-[25%] opacity-30 mix-blend-screen"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(4,47,46,0.8) 50%, transparent 100%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Fireflies Layer */}
      <div ref={firefliesRef} className="absolute inset-0 w-full h-[200%] -top-[50%]">
        {fireflies.map((ff) => (
          <div
            key={ff.id}
            className="absolute rounded-full bg-emerald-400 shadow-[0_0_10px_3px_rgba(16,185,129,0.8)]"
            style={{
              left: `${ff.x}%`,
              top: `${ff.y}%`,
              width: `${ff.size}px`,
              height: `${ff.size}px`,
              animation: `firefly-blink ${ff.duration}s infinite alternate, firefly-drift ${ff.duration * 2}s infinite alternate`,
              animationDelay: `${ff.delay}s, ${ff.delay}s`,
              '--drift-x': `${ff.drift}px`,
              '--drift-y': `${-ff.drift}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>
      
      {/* Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes firefly-blink {
          0% { opacity: 0.1; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes firefly-drift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(var(--drift-x), var(--drift-y)); }
        }
      `}} />
    </div>
  );
}
