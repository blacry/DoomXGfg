"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Shield, Zap, X } from "lucide-react";
import { audioManager } from "@/lib/audio";

export default function Decree() {
  const [active, setActive] = useState<number | null>(null);

  const decrees = [
    {
      title: "The Forge",
      description: "Construct resilient architectures capable of withstanding chaos.",
      longDescription: "In The Forge, you will be tested on your ability to build scalable, fault-tolerant backends and distributed systems. The weak will crumble under the load; only true architects will prevail. Bring your best DevOps, system design, and backend engineering skills.",
      icon: <Terminal className="w-8 h-8 text-emerald-400" />,
      color: "from-emerald-900/40 to-green-900/10",
      label: "SYS::ARCH"
    },
    {
      title: "The Gauntlet",
      description: "Endure relentless algorithmic challenges designed to break the weak.",
      longDescription: "The Gauntlet is a pure test of logic and optimization. Face a barrage of competitive programming puzzles where efficiency and time complexity are the only currency that matters. Optimize or perish.",
      icon: <Shield className="w-8 h-8 text-emerald-400" />,
      color: "from-zinc-900/80 to-zinc-950/80",
      label: "SYS::ALGO"
    },
    {
      title: "The Cipher",
      description: "Decrypt the unknown and bend the digital fabric to your will.",
      longDescription: "The Cipher demands mastery over cryptography, reverse engineering, and web security. Unravel the mysteries hidden within our systems, exploit vulnerabilities, and secure your own code, or be locked out forever.",
      icon: <Zap className="w-8 h-8 text-emerald-400" />,
      color: "from-green-950/40 to-zinc-900/40",
      label: "SYS::SEC"
    }
  ];

  return (
    <section className="relative min-h-screen py-24 px-4 flex flex-col justify-center">
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      
      {/* Scan-line keyframes */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { top: -2px; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes hud-flicker {
          0%, 100% { opacity: 1; }
          92% { opacity: 1; }
          93% { opacity: 0.4; }
          94% { opacity: 1; }
          96% { opacity: 0.7; }
          97% { opacity: 1; }
        }
        @keyframes corner-pulse {
          0%, 100% { box-shadow: 0 0 4px rgba(16,185,129,0.4); }
          50% { box-shadow: 0 0 12px rgba(16,185,129,0.9); }
        }
      `}} />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-10%" }}
          className="text-center mb-16"
        >
          <p className="text-emerald-500/60 text-xs font-mono tracking-[0.4em] uppercase mb-3">LATVERIAN PROTOCOL // DECREE.EXE</p>
          <h2 className="text-4xl font-black uppercase text-white mb-4 drop-shadow-[0_4px_25px_rgba(0,0,0,1)]">The Decree</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto drop-shadow-[0_2px_15px_rgba(0,0,0,1)]">
            You must prove your worth across three fundamental domains. Failure is not an option; it is a certainty for the unprepared.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-0">
          {decrees.map((decree, i) => (
            <motion.div
              key={`card-${i}`}
              layoutId={`card-container-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              onClick={() => {
                audioManager.play("hover");
                setActive(i);
              }}
              className="cursor-pointer group h-full"
            >
              {/* HUD Terminal Card */}
              <div
                className="relative h-full bg-black/70 backdrop-blur-md border border-emerald-900/50 group-hover:border-emerald-500/80 transition-all duration-400 overflow-hidden"
                style={{ animation: `hud-flicker ${6 + i * 2}s infinite` }}
              >
                {/* Animated scan-line sweep */}
                <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent pointer-events-none"
                  style={{ animation: `scan ${4 + i * 0.8}s linear infinite`, animationDelay: `${i * 1.2}s` }}
                />

                {/* Corner brackets — TL */}
                <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-emerald-400 group-hover:w-7 group-hover:h-7 transition-all duration-300" style={{ animation: 'corner-pulse 3s ease-in-out infinite' }} />
                {/* TR */}
                <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-emerald-400 group-hover:w-7 group-hover:h-7 transition-all duration-300" style={{ animation: 'corner-pulse 3s ease-in-out infinite', animationDelay: '0.75s' }} />
                {/* BL */}
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-emerald-400 group-hover:w-7 group-hover:h-7 transition-all duration-300" style={{ animation: 'corner-pulse 3s ease-in-out infinite', animationDelay: '1.5s' }} />
                {/* BR */}
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-emerald-400 group-hover:w-7 group-hover:h-7 transition-all duration-300" style={{ animation: 'corner-pulse 3s ease-in-out infinite', animationDelay: '2.25s' }} />

                {/* Glow overlay on hover */}
                <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/5 transition-all duration-500 pointer-events-none" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[inset_0_0_40px_rgba(16,185,129,0.06)]" />

                {/* System label top-right */}
                <div className="absolute top-2.5 right-3 text-[9px] font-mono text-emerald-500/40 group-hover:text-emerald-400/70 transition-colors tracking-widest">{decree.label}</div>
                {/* Index bottom-left */}
                <div className="absolute bottom-2.5 left-3 text-[9px] font-mono text-emerald-500/30 group-hover:text-emerald-400/50 transition-colors">[{String(i + 1).padStart(2, '0')} / 03]</div>

                <div className="p-6 pb-10">
                  <motion.div layoutId={`card-icon-${i}`} className="mb-5 p-3 bg-emerald-950/40 border border-emerald-900/60 inline-block">
                    {decree.icon}
                  </motion.div>
                  <motion.div layoutId={`card-title-${i}`}>
                    <h3 className="text-lg font-black uppercase tracking-[0.12em] text-white group-hover:text-emerald-300 transition-colors mb-2">{decree.title}</h3>
                  </motion.div>
                  {/* Animated underline */}
                  <div className="h-px w-6 bg-emerald-500/50 mb-4 group-hover:w-full transition-all duration-500" />
                  <motion.div layoutId={`card-desc-${i}`}>
                    <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-400 transition-colors">{decree.description}</p>
                  </motion.div>
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
                layoutId={`card-container-${active}`}
                className="w-full max-w-2xl overflow-hidden bg-black border border-emerald-500/50 shadow-[0_0_60px_rgba(16,185,129,0.2)] pointer-events-auto relative"
              >
                {/* Corner brackets on modal */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-emerald-400" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-emerald-400" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-emerald-400" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-emerald-400" />

                <div className="p-8 relative">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-emerald-900/60">
                    <span className="text-[10px] font-mono text-emerald-500/60 tracking-widest uppercase">{decrees[active].label} // CLASSIFIED</span>
                    <button
                      onClick={() => { audioManager.play("hover"); setActive(null); }}
                      className="text-zinc-500 hover:text-emerald-400 transition-colors p-1"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <motion.div layoutId={`card-icon-${active}`} className="mb-5 p-3 bg-emerald-950/40 border border-emerald-900/60 inline-block">
                    {decrees[active].icon}
                  </motion.div>

                  <motion.div layoutId={`card-title-${active}`} className="mb-2">
                    <h2 className="text-3xl font-black uppercase tracking-wider text-white">{decrees[active].title}</h2>
                  </motion.div>

                  <motion.div layoutId={`card-desc-${active}`} className="mb-6">
                    <p className="text-emerald-400/80 font-medium">{decrees[active].description}</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="pt-5 border-t border-emerald-900/40"
                  >
                    <p className="text-zinc-400 leading-relaxed text-sm">{decrees[active].longDescription}</p>
                    <div className="mt-8 flex justify-end">
                      <button
                        className="px-6 py-2.5 bg-emerald-950/60 border border-emerald-500/60 hover:bg-emerald-500 text-emerald-400 hover:text-black font-black uppercase tracking-widest text-xs transition-all duration-200"
                        onClick={() => setActive(null)}
                      >
                        Acknowledge
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
