"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { audioManager } from "@/lib/audio";

const prizes = [
  {
    rank: "01",
    title: "Supreme Conqueror",
    amount: "₹50,000",
    perks: ["Gold Trophy", "Internship Opportunity", "Feature in Latverian Chronicles", "Doom's Personal Endorsement"],
    color: "from-yellow-500/20 to-amber-900/10",
    borderColor: "border-yellow-500/60",
    accentColor: "#f59e0b",
    glowColor: "rgba(245,158,11,0.3)",
    label: "PRIZE::RANK_1",
  },
  {
    rank: "02",
    title: "Worthy Challenger",
    amount: "₹30,000",
    perks: ["Silver Crest", "Mentorship Sessions", "Swag Kit", "Certificate of Valor"],
    color: "from-zinc-400/20 to-zinc-700/10",
    borderColor: "border-zinc-400/60",
    accentColor: "#a1a1aa",
    glowColor: "rgba(161,161,170,0.3)",
    label: "PRIZE::RANK_2",
  },
  {
    rank: "03",
    title: "Proven Soldier",
    amount: "₹20,000",
    perks: ["Bronze Seal", "Goodies Pack", "LinkedIn Shoutout", "Certificate of Valor"],
    color: "from-orange-700/20 to-amber-950/10",
    borderColor: "border-orange-600/60",
    accentColor: "#c2410c",
    glowColor: "rgba(194,65,12,0.3)",
    label: "PRIZE::RANK_3",
  },
];

export default function Prizes() {
  const [revealed, setRevealed] = useState<boolean[]>([false, false, false]);

  const reveal = (i: number) => {
    audioManager.play("impact");
    setRevealed((prev) => { const next = [...prev]; next[i] = true; return next; });
  };

  return (
    <section className="relative min-h-screen py-24 px-4 flex flex-col justify-center">
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-10%" }}
          className="text-center mb-16"
        >
          <p className="text-emerald-500/60 text-xs font-mono tracking-[0.4em] uppercase mb-3">LATVERIAN PROTOCOL // REWARDS.EXE</p>
          <h2 className="text-4xl font-black uppercase text-white mb-4 drop-shadow-[0_4px_25px_rgba(0,0,0,1)]">Spoils of War</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto drop-shadow-[0_2px_15px_rgba(0,0,0,1)]">
            Doom rewards excellence. Unlock the classified intel on your prize by cracking open the file.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {prizes.map((prize, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="relative group cursor-pointer"
              onClick={() => !revealed[i] && reveal(i)}
              onMouseEnter={() => audioManager.play("hover")}
            >
              <div
                className={`relative h-full border ${prize.borderColor} bg-black/70 backdrop-blur-md overflow-hidden transition-all duration-500`}
                style={{ boxShadow: revealed[i] ? `0 0 40px ${prize.glowColor}, 0 0 80px ${prize.glowColor}40` : "none" }}
              >
                {/* Corner brackets */}
                <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 transition-all duration-300" style={{ borderColor: prize.accentColor }} />
                <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 transition-all duration-300" style={{ borderColor: prize.accentColor }} />
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 transition-all duration-300" style={{ borderColor: prize.accentColor }} />
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 transition-all duration-300" style={{ borderColor: prize.accentColor }} />

                {/* Rank badge */}
                <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest" style={{ color: prize.accentColor }}>
                  [{prize.label}]
                </div>

                <AnimatePresence mode="wait">
                  {!revealed[i] ? (
                    /* ── LOCKED STATE ── */
                    <motion.div
                      key="locked"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="p-8 pt-12 flex flex-col items-center text-center gap-6 min-h-[300px] justify-center"
                    >
                      {/* Redacted rank number */}
                      <div className="text-8xl font-black font-mono" style={{ color: prize.accentColor, textShadow: `0 0 30px ${prize.glowColor}` }}>
                        #{prize.rank}
                      </div>
                      <div className="space-y-2">
                        {/* Redaction bars */}
                        <div className="h-3 w-32 bg-zinc-700 mx-auto" />
                        <div className="h-3 w-24 bg-zinc-800 mx-auto" />
                        <div className="h-3 w-28 bg-zinc-700 mx-auto" />
                      </div>
                      <div className="mt-2 px-4 py-2 border text-xs font-mono font-bold uppercase tracking-widest transition-all duration-200 group-hover:bg-white/5"
                        style={{ borderColor: prize.accentColor, color: prize.accentColor }}>
                        DECRYPT FILE
                      </div>
                    </motion.div>
                  ) : (
                    /* ── REVEALED STATE ── */
                    <motion.div
                      key="revealed"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="p-8 pt-12 flex flex-col gap-4 min-h-[300px]"
                    >
                      <div className="text-5xl font-black font-mono" style={{ color: prize.accentColor, textShadow: `0 0 20px ${prize.glowColor}` }}>
                        #{prize.rank}
                      </div>
                      <div>
                        <h3 className="text-xl font-black uppercase tracking-wider text-white mb-1">{prize.title}</h3>
                        <p className="text-3xl font-black font-mono" style={{ color: prize.accentColor }}>{prize.amount}</p>
                      </div>
                      <div className="h-px bg-emerald-900/40 my-1" />
                      <ul className="space-y-1.5">
                        {prize.perks.map((perk, j) => (
                          <motion.li
                            key={j}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + j * 0.08 }}
                            className="flex items-center gap-2 text-sm text-zinc-300"
                          >
                            <span className="text-xs" style={{ color: prize.accentColor }}>▸</span>
                            {perk}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Special mentions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 p-5 border border-emerald-900/40 bg-black/40 text-center"
        >
          <p className="text-[10px] font-mono text-emerald-500/50 tracking-widest uppercase mb-2">ADDITIONAL DECREES</p>
          <p className="text-zinc-400 text-sm">Best in Track Awards • Best UI/UX • Most Innovative Hack • Rookie of the Night</p>
        </motion.div>
      </div>
    </section>
  );
}
