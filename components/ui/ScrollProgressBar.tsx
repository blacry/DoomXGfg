"use client";

import { useEffect, useRef } from "react";

export function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    const tick = () => {
      const scrolled = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      const progress = total > 0 ? Math.min(scrolled / total, 1) : 0;
      const pct = `${(progress * 100).toFixed(2)}%`;

      if (barRef.current) barRef.current.style.width = pct;
      if (glowRef.current) glowRef.current.style.width = pct;

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none h-[2px]">
      {/* Track */}
      <div className="absolute inset-0 bg-emerald-950/40" />
      {/* Glow blur layer */}
      <div
        ref={glowRef}
        className="absolute top-0 left-0 h-[6px] -mt-[2px]"
        style={{
          width: "0%",
          background: "linear-gradient(90deg, transparent, #10b981, #34d399)",
          filter: "blur(4px)",
          opacity: 0.7,
        }}
      />
      {/* Main bar */}
      <div
        ref={barRef}
        className="absolute top-0 left-0 h-full"
        style={{
          width: "0%",
          background: "linear-gradient(90deg, #065f46, #10b981, #34d399, #6ee7b7)",
          boxShadow: "0 0 8px rgba(16,185,129,0.9), 0 0 20px rgba(16,185,129,0.4)",
          transition: "width 0.05s linear",
        }}
      />
      {/* Leading edge spark */}
      <div
        ref={undefined}
        className="absolute top-0 h-[2px] w-3"
        style={{
          background: "white",
          filter: "blur(2px)",
          // positioned by JS — handled via bar width
          right: `calc(100% - ${0}%)`,
        }}
      />
    </div>
  );
}
