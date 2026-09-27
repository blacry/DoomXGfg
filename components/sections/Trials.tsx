"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { audioManager } from "@/lib/audio";

export default function Trials() {
  const [active, setActive] = useState<number | null>(null);

  const arenas = [
    {
      name: "Web Supremacy",
      tags: ["Frontend", "Backend", "UX/UI"],
      longDescription: "Dominate the web by constructing flawless interfaces and impenetrable backends. Your applications must be robust, responsive, and secure against the chaos of the outside world.",
      color: "from-blue-900/40 to-cyan-900/10",
      label: "ARENA::WEB",
      code: "WEB-01"
    },
    {
      name: "Machine Intelligence",
      tags: ["AI", "ML", "Data"],
      longDescription: "Harness the power of neural networks and massive datasets. Train models that can predict, classify, and outsmart human logic. The data holds the truth; you must extract it.",
      color: "from-purple-900/40 to-pink-900/10",
      label: "ARENA::AI",
      code: "AI-02"
    },
    {
      name: "Protocol Breach",
      tags: ["Security", "Cryptography"],
      longDescription: "Crack ciphers, expose vulnerabilities, and defend your own systems. This is a realm of absolute paranoia where a single compromised byte means total annihilation.",
      color: "from-red-900/40 to-orange-900/10",
      label: "ARENA::SEC",
      code: "SEC-03"
    },
    {
      name: "Hardware Domination",
      tags: ["IoT", "Embedded"],
      longDescription: "Control the physical realm. Write code that interfaces with silicon, manipulates sensors, and commands robotics. If it has a circuit, you will own it.",
      color: "from-amber-900/40 to-yellow-900/10",
      label: "ARENA::HW",
      code: "HW-04"
    }
  ];

  return (
    <section className="relative min-h-screen py-24 px-4 flex flex-col justify-center">
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-10%" }}
          className="mb-16 md:w-1/2"
        >
          <p className="text-emerald-500/60 text-xs font-mono tracking-[0.4em] uppercase mb-3">LATVERIAN PROTOCOL // ARENA_SELECT.EXE</p>
          <h2 className="text-4xl font-black uppercase text-white mb-4 drop-shadow-[0_4px_25px_rgba(0,0,0,1)]">Choose Your Trial</h2>
          <p className="text-zinc-400 drop-shadow-[0_2px_15px_rgba(0,0,0,1)]">
            Select the arena where you will stake your claim. Master your domain, or be cast aside into the digital void.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-0">
          {arenas.map((arena, i) => (
            <motion.div
              key={`arena-${i}`}
              layoutId={`arena-container-${i}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              onClick={() => {
                audioManager.play("click");
                setActive(i);
              }}
              onMouseEnter={() => audioManager.play("hover")}
              className="cursor-pointer group h-full"
            >
              {/* HUD Arena Card */}
              <div className="relative h-full bg-black/70 backdrop-blur-md border border-emerald-900/50 group-hover:border-emerald-500/70 transition-all duration-300 overflow-hidden">
                {/* Scan-line */}
                <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent pointer-events-none"
                  style={{ animation: `scan ${3.5 + i * 0.6}s linear infinite`, animationDelay: `${i * 0.9}s` }}
                />

                {/* Corner brackets */}
                <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-emerald-400 group-hover:w-7 group-hover:h-7 transition-all duration-300" />
                <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-emerald-400 group-hover:w-7 group-hover:h-7 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-emerald-400 group-hover:w-7 group-hover:h-7 transition-all duration-300" />
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-emerald-400 group-hover:w-7 group-hover:h-7 transition-all duration-300" />

                {/* Hover glow */}
                <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/5 transition-all duration-500 pointer-events-none" />

                {/* Labels */}
                <div className="absolute top-2.5 right-3 text-[9px] font-mono text-emerald-500/40 group-hover:text-emerald-400/70 transition-colors tracking-widest">{arena.label}</div>
                <div className="absolute bottom-2.5 left-3 text-[9px] font-mono text-emerald-500/30">[{arena.code}]</div>

                <div className="p-7 pb-10">
                  <motion.div layoutId={`arena-title-${i}`}>
                    <h3 className="text-2xl font-black uppercase tracking-wider text-white group-hover:text-emerald-300 transition-colors mb-3">{arena.name}</h3>
                  </motion.div>
                  <div className="h-px w-8 bg-emerald-500/50 mb-4 group-hover:w-full transition-all duration-500" />
                  <div className="flex gap-2 flex-wrap">
                    {arena.tags.map((tag, j) => (
                      <motion.span
                        layoutId={`arena-tag-${i}-${j}`}
                        key={j}
                        className="px-3 py-1 bg-emerald-950/50 border border-emerald-800/60 text-xs font-mono font-medium text-emerald-400 tracking-wider"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/90 backdrop-blur-md"
              onClick={() => setActive(null)}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                layoutId={`arena-container-${active}`}
                className="w-full max-w-2xl overflow-hidden bg-black border border-emerald-500/50 shadow-[0_0_60px_rgba(16,185,129,0.2)] pointer-events-auto relative"
              >
                {/* Corner brackets on modal */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-emerald-400" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-emerald-400" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-emerald-400" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-emerald-400" />

                <div className="p-8 relative">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-emerald-900/60">
                    <span className="text-[10px] font-mono text-emerald-500/60 tracking-widest uppercase">{arenas[active].label} // OPEN</span>
                    <button
                      onClick={() => { audioManager.play("hover"); setActive(null); }}
                      className="text-zinc-500 hover:text-emerald-400 transition-colors p-1"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <motion.div layoutId={`arena-title-${active}`} className="mb-3">
                    <h2 className="text-4xl font-black uppercase tracking-wider text-white">{arenas[active].name}</h2>
                  </motion.div>

                  <div className="flex gap-2 flex-wrap mb-8">
                    {arenas[active].tags.map((tag, j) => (
                      <motion.span
                        layoutId={`arena-tag-${active}-${j}`}
                        key={j}
                        className="px-4 py-1.5 bg-emerald-950/60 border border-emerald-500/40 text-sm font-mono font-medium text-emerald-400"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="pt-5 border-t border-emerald-900/40"
                  >
                    <p className="text-zinc-400 text-sm leading-relaxed">{arenas[active].longDescription}</p>
                    <div className="mt-8 flex justify-end">
                      <button
                        className="px-8 py-2.5 bg-emerald-950/60 border border-emerald-500/60 hover:bg-emerald-500 text-emerald-400 hover:text-black font-black uppercase tracking-widest text-xs transition-all duration-200"
                        onClick={() => { audioManager.play("click"); setActive(null); }}
                      >
                        Select Arena
                      </button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
