"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Stat {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  sub: string;
}

const STATS: Stat[] = [
  { value: 500, suffix: "+", label: "Participants", sub: "Warriors summoned" },
  { value: 24,  suffix: "H", label: "Duration", sub: "Non-stop combat" },
  { value: 3,   suffix: "",  label: "Tracks", sub: "Domains of conquest" },
  { value: 1,   suffix: "L", prefix: "₹", label: "Prize Pool", sub: "For the worthy" },
];

function useCountUp(target: number, active: boolean, duration = 1800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const pct = Math.min((ts - start) / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - pct, 3);
      setVal(Math.floor(ease * target));
      if (pct < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return val;
}

function StatCard({ stat, active, i }: { stat: Stat; active: boolean; i: number }) {
  const count = useCountUp(stat.value, active, 1600 + i * 200);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative group flex flex-col items-center text-center p-6 border border-emerald-900/50 bg-black/50 backdrop-blur-sm hover:border-emerald-500/50 transition-colors duration-300"
    >
      {/* Corner accents */}
      <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-emerald-400 group-hover:w-5 group-hover:h-5 transition-all duration-300" />
      <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-emerald-400 group-hover:w-5 group-hover:h-5 transition-all duration-300" />
      <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-emerald-400 group-hover:w-5 group-hover:h-5 transition-all duration-300" />
      <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-emerald-400 group-hover:w-5 group-hover:h-5 transition-all duration-300" />

      {/* Number */}
      <div className="flex items-baseline gap-0.5 mb-1">
        {stat.prefix && <span className="text-2xl font-mono font-black text-emerald-400">{stat.prefix}</span>}
        <span
          className="text-5xl md:text-6xl font-black font-mono text-white tabular-nums"
          style={{ textShadow: "0 0 30px rgba(16,185,129,0.5)" }}
        >
          {active ? count : 0}
        </span>
        <span className="text-3xl font-black font-mono text-emerald-400">{stat.suffix}</span>
      </div>

      {/* Label */}
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-white mb-0.5">{stat.label}</p>
      <p className="text-[10px] font-mono text-emerald-500/60 tracking-widest uppercase">{stat.sub}</p>
    </motion.div>
  );
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-16 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      {/* Top / bottom separator lines */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <p className="text-center text-[10px] font-mono tracking-[0.4em] text-emerald-500/50 uppercase mb-8">LATVERIAN INTEL // CLASSIFIED METRICS</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((stat, i) => (
            <StatCard key={i} stat={stat} active={active} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
