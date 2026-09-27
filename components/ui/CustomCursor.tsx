"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const crossRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Touch device — skip
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const isClickable =
        t.tagName === "BUTTON" || t.tagName === "A" ||
        t.closest("button") || t.closest("a") ||
        t.classList.contains("cursor-pointer") ||
        getComputedStyle(t).cursor === "pointer";
      setHovering(!!isClickable);
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    // RAF loop — dot follows exactly, ring lags behind
    let raf: number;
    const tick = () => {
      const { x, y } = posRef.current;

      // Dot — instant
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
      }
      // Crosshair — instant
      if (crossRef.current) {
        crossRef.current.style.transform = `translate(${x - 20}px, ${y - 20}px)`;
      }
      // Ring — lerp for smooth trailing
      ringPos.current.x += (x - ringPos.current.x) * 0.12;
      ringPos.current.y += (y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 24}px, ${ringPos.current.y - 24}px)`;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf);
    };
  }, [visible]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

  const opacity = visible ? 1 : 0;
  const transition = "opacity 0.2s";

  return (
    <>
      {/* Center dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full"
        style={{
          width: 8, height: 8,
          backgroundColor: hovering ? "#34d399" : "#10b981",
          boxShadow: `0 0 ${hovering ? 12 : 6}px ${hovering ? "#34d399" : "#10b981"}`,
          opacity,
          transition,
          transform: "translate(-200px, -200px)",
          scale: clicking ? "0.6" : "1",
        }}
      />

      {/* Crosshair — 4 lines emanating from center */}
      <div
        ref={crossRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000]"
        style={{
          width: 40, height: 40,
          opacity: hovering ? 0 : opacity * 0.85,
          transition,
          transform: "translate(-200px, -200px)",
        }}
      >
        {/* Top */}
        <div className="absolute" style={{ width: 1, height: 8, background: "#10b981", left: "50%", top: 0, transform: "translateX(-50%)", boxShadow: "0 0 4px #10b981" }} />
        {/* Bottom */}
        <div className="absolute" style={{ width: 1, height: 8, background: "#10b981", left: "50%", bottom: 0, transform: "translateX(-50%)", boxShadow: "0 0 4px #10b981" }} />
        {/* Left */}
        <div className="absolute" style={{ height: 1, width: 8, background: "#10b981", top: "50%", left: 0, transform: "translateY(-50%)", boxShadow: "0 0 4px #10b981" }} />
        {/* Right */}
        <div className="absolute" style={{ height: 1, width: 8, background: "#10b981", top: "50%", right: 0, transform: "translateY(-50%)", boxShadow: "0 0 4px #10b981" }} />
      </div>

      {/* Outer ring — lagging, morphs to targeting reticle on hover */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000]"
        style={{
          width: 48, height: 48,
          opacity,
          transition,
          transform: "translate(-200px, -200px)",
        }}
      >
        {hovering ? (
          // Targeting reticle: 4 corner brackets
          <>
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-emerald-400" style={{ boxShadow: "0 0 6px rgba(52,211,153,0.6)" }} />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-emerald-400" style={{ boxShadow: "0 0 6px rgba(52,211,153,0.6)" }} />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-emerald-400" style={{ boxShadow: "0 0 6px rgba(52,211,153,0.6)" }} />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-emerald-400" style={{ boxShadow: "0 0 6px rgba(52,211,153,0.6)" }} />
          </>
        ) : (
          // Normal state: circle
          <div className="absolute inset-0 rounded-full border border-emerald-500/60"
            style={{
              boxShadow: "0 0 8px rgba(16,185,129,0.3), inset 0 0 8px rgba(16,185,129,0.05)",
              transform: clicking ? "scale(0.8)" : "scale(1)",
              transition: "transform 0.1s",
            }}
          />
        )}
      </div>
    </>
  );
}
