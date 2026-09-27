"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const diff = targetDate.getTime() - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative">
        {/* Glitch double */}
        <span
          className="absolute inset-0 text-2xl sm:text-3xl md:text-4xl font-black font-mono text-emerald-400 select-none"
          style={{ clipPath: 'inset(40% 0 50% 0)', transform: 'translate(-2px, 0)', opacity: 0.6, color: '#22c55e' }}
          aria-hidden
        >
          {String(value).padStart(2, '0')}
        </span>
        <motion.span
          key={value}
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.15 }}
          className="text-2xl sm:text-3xl md:text-4xl font-black font-mono text-white tabular-nums"
        >
          {String(value).padStart(2, '0')}
        </motion.span>
      </div>
      <span className="text-[8px] font-mono tracking-[0.3em] text-emerald-500/60 uppercase">{label}</span>
    </div>
  );
}

// Hackathon date — set this to your real event date
const HACKATHON_DATE = new Date("2026-09-30T10:36:30+05:30");

export default function Hero() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 500], [0.5, 0]);
  const countdown = useCountdown(HACKATHON_DATE);

  return (
    <section ref={ref} className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      <motion.div
        className="absolute inset-0 z-[-1]"
        style={{ y, opacity }}
      >
        <div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618519764633-5605059cb232?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-30 grayscale"
          style={{ maskImage: "linear-gradient(to bottom, black 50%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent)" }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black pointer-events-none" />

      {/* Glitch keyframes */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes glitch-1 {
          0%, 100% { clip-path: inset(0 0 100% 0); transform: translate(0); }
          10% { clip-path: inset(10% 0 80% 0); transform: translate(-4px, 0); }
          20% { clip-path: inset(40% 0 50% 0); transform: translate(4px, 0); }
          30% { clip-path: inset(70% 0 20% 0); transform: translate(-2px, 0); }
          40% { clip-path: inset(20% 0 70% 0); transform: translate(2px, 0); }
          50% { clip-path: inset(0 0 100% 0); transform: translate(0); }
        }
        @keyframes glitch-2 {
          0%, 100% { clip-path: inset(0 0 100% 0); transform: translate(0); }
          15% { clip-path: inset(60% 0 30% 0); transform: translate(5px, 0); }
          25% { clip-path: inset(20% 0 60% 0); transform: translate(-5px, 0); }
          35% { clip-path: inset(80% 0 10% 0); transform: translate(3px, 0); }
          45% { clip-path: inset(0 0 100% 0); transform: translate(0); }
        }
        @keyframes title-glitch {
          0%, 88%, 100% { opacity: 1; }
          90% { opacity: 0.4; transform: skewX(-5deg); }
          91% { opacity: 1; transform: skewX(0); }
          94% { opacity: 0.7; }
          95% { opacity: 1; }
        }
      `}} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1 }}
        className="relative z-10 flex flex-col items-center w-full max-w-[100vw] px-2 space-y-4"
      >
        <p className="text-green-500 font-medium tracking-[0.1em] sm:tracking-[0.3em] uppercase text-[0.6rem] sm:text-xs md:text-sm drop-shadow-md text-center break-words max-w-full">
          GeeksForGeeks Student Chapter • Bennett University
        </p>

        {/* Glitch title */}
        <div className="relative inline-block">
          {/* Ghost layer 1 — cyan */}
          <span
            aria-hidden
            className="absolute inset-0 text-[15vw] sm:text-[10rem] md:text-[16rem] lg:text-[20rem] font-black tracking-tighter uppercase text-cyan-400 leading-none overflow-hidden whitespace-nowrap select-none"
            style={{ animation: 'glitch-1 8s infinite', opacity: 0.4 }}
          >
            Sovereign
          </span>
          {/* Ghost layer 2 — red */}
          <span
            aria-hidden
            className="absolute inset-0 text-[15vw] sm:text-[10rem] md:text-[16rem] lg:text-[20rem] font-black tracking-tighter uppercase text-red-400 leading-none overflow-hidden whitespace-nowrap select-none"
            style={{ animation: 'glitch-2 8s infinite 0.5s', opacity: 0.3 }}
          >
            Sovereign
          </span>
          {/* Main title */}
          <h1
            className="text-[15vw] sm:text-[10rem] md:text-[16rem] lg:text-[20rem] font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-300 to-zinc-600 drop-shadow-2xl mix-blend-screen leading-none overflow-hidden whitespace-nowrap"
            style={{ animation: 'title-glitch 9s infinite 2s' }}
          >
            Sovereign
          </h1>
        </div>

        <p className="text-sm sm:text-lg md:text-2xl text-zinc-300 max-w-2xl mx-auto font-light tracking-widest mt-4 sm:mt-8 px-4 break-words">
          A night of unyielding trials. Only the worthy will ascend.
        </p>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="mt-8 flex flex-col items-center gap-3"
        >
          <p className="text-[10px] font-mono tracking-[0.4em] text-emerald-500/60 uppercase">Time Until The Gates Open</p>
          <div className="flex items-center gap-4 sm:gap-8 px-8 py-4 bg-black/60 backdrop-blur-sm border border-emerald-900/60 relative">
            {/* Corner accents */}
            <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-emerald-500/60" />
            <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-emerald-500/60" />
            <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-emerald-500/60" />
            <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-emerald-500/60" />

            <CountdownUnit value={countdown.days} label="Days" />
            <span className="text-emerald-500/40 text-2xl font-mono font-black pb-4">:</span>
            <CountdownUnit value={countdown.hours} label="Hours" />
            <span className="text-emerald-500/40 text-2xl font-mono font-black pb-4">:</span>
            <CountdownUnit value={countdown.minutes} label="Min" />
            <span className="text-emerald-500/40 text-2xl font-mono font-black pb-4">:</span>
            <CountdownUnit value={countdown.seconds} label="Sec" />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-green-500/70 uppercase tracking-widest font-bold">Enter the Domain</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-green-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
