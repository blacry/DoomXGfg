"use client";

import { useEffect, useRef, useState } from "react";

// ─── Smoke puff definitions ────────────────────────────────────────────────
// Each puff has a base position, size, drift animation, and parallax depth
const SMOKE_PUFFS = [
  // [left%, top-in-300vh%, width-vw, height-vh, opacity, blur, depth, animDur, animDelay]
  // depth: 1=slow/far, 3=fast/near
  { l: 5,  t: 8,   w: 35, h: 40, op: 0.55, bl: 50, depth: 1, dur: 18, del: 0    },
  { l: 60, t: 12,  w: 30, h: 35, op: 0.45, bl: 60, depth: 1, dur: 22, del: -6   },
  { l: 30, t: 25,  w: 45, h: 45, op: 0.50, bl: 45, depth: 2, dur: 16, del: -3   },
  { l: 75, t: 30,  w: 40, h: 50, op: 0.60, bl: 55, depth: 2, dur: 20, del: -10  },
  { l: 10, t: 45,  w: 50, h: 55, op: 0.65, bl: 40, depth: 2, dur: 14, del: -2   },
  { l: 55, t: 50,  w: 35, h: 40, op: 0.45, bl: 65, depth: 1, dur: 24, del: -8   },
  { l: 80, t: 55,  w: 40, h: 45, op: 0.55, bl: 50, depth: 3, dur: 12, del: -4   },
  { l: 20, t: 62,  w: 55, h: 50, op: 0.70, bl: 35, depth: 3, dur: 15, del: -7   },
  { l: 65, t: 68,  w: 40, h: 45, op: 0.50, bl: 55, depth: 2, dur: 19, del: -11  },
  { l: 0,  t: 72,  w: 35, h: 40, op: 0.60, bl: 45, depth: 1, dur: 21, del: -5   },
  { l: 40, t: 78,  w: 50, h: 55, op: 0.65, bl: 40, depth: 3, dur: 13, del: -9   },
  { l: 70, t: 82,  w: 45, h: 50, op: 0.55, bl: 50, depth: 2, dur: 17, del: -1   },
  { l: 15, t: 88,  w: 55, h: 60, op: 0.70, bl: 35, depth: 3, dur: 11, del: -6   },
  { l: 50, t: 92,  w: 40, h: 45, op: 0.50, bl: 60, depth: 1, dur: 23, del: -13  },
  { l: 85, t: 95,  w: 35, h: 40, op: 0.60, bl: 45, depth: 2, dur: 16, del: -3   },
  // Extra thin wisps
  { l: 25, t: 35,  w: 20, h: 60, op: 0.35, bl: 70, depth: 1, dur: 25, del: -15  },
  { l: 70, t: 42,  w: 18, h: 65, op: 0.30, bl: 75, depth: 1, dur: 28, del: -20  },
  { l: 45, t: 60,  w: 22, h: 70, op: 0.40, bl: 65, depth: 2, dur: 20, del: -12  },
];

// ─── Firefly seed ──────────────────────────────────────────────────────────
const FIREFLY_COUNT = 160;

interface Firefly {
  id: number; x: number; y: number; size: number;
  blinkDur: number; driftDur: number; delay: number;
  blinkV: number; driftV: number; depth: number; color: string;
}

const COLORS = [
  "rgba(16,185,129,",   // emerald
  "rgba(52,211,153,",   // lighter emerald
  "rgba(110,231,183,",  // mint
  "rgba(6,182,212,",    // cyan (rare)
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function FogOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const smokeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const scrollY = useRef(0);
  const [fireflies, setFireflies] = useState<Firefly[]>([]);

  // ── Single RAF loop — scroll + mouse → parallax ───────────────────────────
  useEffect(() => {
    const onScroll = () => { scrollY.current = window.scrollY; };
    const onMouse = (e: MouseEvent) => {
      mouseX.current = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY.current = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse, { passive: true });

    const totalH = document.body.scrollHeight - window.innerHeight || 1;

    let raf: number;
    const tick = () => {
      const progress = Math.min(scrollY.current / totalH, 1);

      smokeRefs.current.forEach((el, i) => {
        if (!el) return;
        const puff = SMOKE_PUFFS[i];
        // Scroll parallax: near puffs (depth 3) move faster
        const scrollShift = progress * puff.depth * 220;
        // Mouse parallax: subtle horizontal + vertical nudge
        const mx = mouseX.current * puff.depth * 22;
        const my = mouseY.current * puff.depth * 12;
        el.style.transform = `translate(${mx}px, ${-scrollShift + my}px)`;
      });

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
      cancelAnimationFrame(raf);
    };
  }, []);

  // ── Firefly generation ─────────────────────────────────────────────────────
  useEffect(() => {
    const flies: Firefly[] = Array.from({ length: FIREFLY_COUNT }).map((_, i) => {
      const depth = 0.25 + Math.random() * 0.75;
      const rand = Math.random();
      const colorIdx = rand < 0.04 ? 3 : rand < 0.25 ? 2 : rand < 0.5 ? 1 : 0;
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 300,
        size: depth * 4 + 0.5,
        blinkDur: 1.5 + Math.random() * 3.5,
        driftDur: 5 + Math.random() * 10,
        delay: -(Math.random() * 12),
        blinkV: i % 4,
        driftV: i % 6,
        depth,
        color: COLORS[colorIdx],
      };
    });
    setFireflies(flies);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[15] pointer-events-none overflow-hidden">

      {/* ── Smoke puffs ──────────────────────────────────────────────── */}
      {SMOKE_PUFFS.map((puff, i) => (
        <div
          key={i}
          ref={(el) => { smokeRefs.current[i] = el; }}
          className="absolute will-change-transform"
          style={{
            left: `${puff.l}%`,
            // spread puffs over the full 300vh equivalent in fixed space
            top: `calc(${puff.t}% - 100vh)`,
            width: `${puff.w}vw`,
            height: `${puff.h}vh`,
            opacity: puff.op,
            filter: `blur(${puff.bl}px)`,
            background: "radial-gradient(ellipse at center, rgba(16,185,129,0.55) 0%, rgba(4,120,87,0.25) 40%, transparent 70%)",
            animation: `smoke-drift-${i % 6} ${puff.dur}s ${puff.del}s infinite alternate ease-in-out`,
            mixBlendMode: "screen",
          }}
        />
      ))}

      {/* ── Fireflies ────────────────────────────────────────────────── */}
      <div className="absolute inset-0 w-full" style={{ height: "300vh", top: "-100vh" }}>
        {fireflies.map((ff) => {
          const glowSize = ff.size * 4;
          return (
            <div
              key={ff.id}
              className="absolute rounded-full"
              style={{
                left: `${ff.x}%`,
                top: `${ff.y / 3}%`,
                width: `${ff.size}px`,
                height: `${ff.size}px`,
                backgroundColor: `${ff.color}1)`,
                boxShadow: `0 0 ${glowSize}px ${glowSize / 2}px ${ff.color}0.7)`,
                opacity: ff.depth,
                animation: [
                  `ff-blink-${ff.blinkV} ${ff.blinkDur}s ${ff.delay}s infinite alternate ease-in-out`,
                  `ff-drift-${ff.driftV} ${ff.driftDur}s ${ff.delay * 0.5}s infinite alternate ease-in-out`,
                ].join(", "),
              }}
            />
          );
        })}
      </div>

      {/* ── All keyframes ─────────────────────────────────────────────── */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Smoke puff drifts — 6 patterns for organic variation */
        @keyframes smoke-drift-0 {
          0%   { transform: translate(0px,  0px) scale(1);    opacity: var(--op, 0.55); }
          50%  { transform: translate(30px, -20px) scale(1.1); }
          100% { transform: translate(-15px, 10px) scale(0.95); }
        }
        @keyframes smoke-drift-1 {
          0%   { transform: translate(0px, 0px) scale(1); }
          40%  { transform: translate(-25px, -15px) scale(1.05); }
          100% { transform: translate(20px, 25px) scale(1.1); }
        }
        @keyframes smoke-drift-2 {
          0%   { transform: translate(0px, 0px) scale(1); }
          33%  { transform: translate(18px, -30px) scale(1.08); }
          66%  { transform: translate(-20px, -10px) scale(0.95); }
          100% { transform: translate(5px, 20px) scale(1.03); }
        }
        @keyframes smoke-drift-3 {
          0%   { transform: translate(0px, 0px) scale(1); }
          50%  { transform: translate(-35px, 15px) scale(1.12); }
          100% { transform: translate(25px, -20px) scale(0.92); }
        }
        @keyframes smoke-drift-4 {
          0%   { transform: translate(0px, 0px) scale(1); }
          25%  { transform: translate(20px, 30px) scale(1.06); }
          75%  { transform: translate(-10px, -25px) scale(0.98); }
          100% { transform: translate(15px, 10px) scale(1.04); }
        }
        @keyframes smoke-drift-5 {
          0%   { transform: translate(0px, 0px) scale(1); }
          60%  { transform: translate(-28px, -18px) scale(1.09); }
          100% { transform: translate(22px, 28px) scale(0.97); }
        }

        /* Firefly blink variants */
        @keyframes ff-blink-0 {
          0%   { opacity: 0.05; transform: scale(0.7); }
          50%  { opacity: 0.9; }
          100% { opacity: 0.15; transform: scale(1.3); }
        }
        @keyframes ff-blink-1 {
          0%   { opacity: 0.2; transform: scale(1); }
          40%  { opacity: 0.05; }
          100% { opacity: 1; transform: scale(1.1); }
        }
        @keyframes ff-blink-2 {
          0%   { opacity: 0.8; transform: scale(1.2); }
          60%  { opacity: 0.05; transform: scale(0.6); }
          100% { opacity: 0.6; transform: scale(1); }
        }
        @keyframes ff-blink-3 {
          0%   { opacity: 0.05; }
          30%  { opacity: 0.85; transform: scale(1.4); }
          70%  { opacity: 0.2; }
          100% { opacity: 0.95; transform: scale(1); }
        }

        /* Firefly drift variants */
        @keyframes ff-drift-0 {
          0%   { transform: translate(0, 0); }
          100% { transform: translate(44px, -30px); }
        }
        @keyframes ff-drift-1 {
          0%   { transform: translate(0, 0); }
          100% { transform: translate(-38px, 24px); }
        }
        @keyframes ff-drift-2 {
          0%   { transform: translate(0, 0); }
          33%  { transform: translate(22px, -42px); }
          100% { transform: translate(-20px, 18px); }
        }
        @keyframes ff-drift-3 {
          0%   { transform: translate(0, 0); }
          50%  { transform: translate(-32px, -22px); }
          100% { transform: translate(28px, 38px); }
        }
        @keyframes ff-drift-4 {
          0%   { transform: translate(0, 0); }
          25%  { transform: translate(18px, 32px); }
          75%  { transform: translate(-28px, -18px); }
          100% { transform: translate(12px, 22px); }
        }
        @keyframes ff-drift-5 {
          0%   { transform: translate(0, 0); }
          40%  { transform: translate(-12px, -38px); }
          80%  { transform: translate(34px, 12px); }
          100% { transform: translate(-8px, -24px); }
        }
      ` }} />
    </div>
  );
}
