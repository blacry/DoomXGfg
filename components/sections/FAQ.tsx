"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    q: "Who is permitted to enter Doom's domain?",
    a: "Any student warrior currently enrolled in an earthly institution. You must bring valid identification. Those without credentials will be turned away at the gates.",
  },
  {
    q: "What is the team size for the trials?",
    a: "You may fight alone or form alliances of up to 4 members. Doom respects individual brilliance but acknowledges the power of a coordinated strike team.",
  },
  {
    q: "Is there an entry fee to face the trials?",
    a: "The Sovereign does not require your earthly currency. Entry is free. Your payment is your dedication and the quality of your work.",
  },
  {
    q: "Will provisions be supplied?",
    a: "Latverian hospitality is absolute. Food and energy reserves (snacks/drinks) will be provided to sustain you through the 24-hour siege.",
  },
  {
    q: "What technologies are permitted?",
    a: "All tools are permitted. Use whatever frameworks, languages, or APIs you require to construct your weapon. The end result is all that matters.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-24 px-4">
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-10%" }}
          className="text-center mb-16"
        >
          <p className="text-emerald-500/60 text-xs font-mono tracking-[0.4em] uppercase mb-3">LATVERIAN PROTOCOL // QUERY.SYS</p>
          <h2 className="text-4xl font-black uppercase text-white mb-4 drop-shadow-[0_4px_25px_rgba(0,0,0,1)]">Directives & Inquiries</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto drop-shadow-[0_2px_15px_rgba(0,0,0,1)]">
            The Sovereign anticipates your questions. Read carefully. Doom does not repeat himself.
          </p>
        </motion.div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <button
                onClick={() => toggle(i)}
                className={`w-full text-left p-6 border transition-all duration-300 flex justify-between items-center relative overflow-hidden
                  ${openIndex === i 
                    ? "bg-emerald-950/40 border-emerald-500/60" 
                    : "bg-black/60 border-emerald-900/40 hover:border-emerald-700 hover:bg-black/80"}`}
              >
                {/* Corner accents */}
                <span className={`absolute top-0 left-0 w-2 h-2 border-t border-l transition-colors duration-300 ${openIndex === i ? "border-emerald-400" : "border-emerald-700/50 group-hover:border-emerald-500"}`} />
                <span className={`absolute top-0 right-0 w-2 h-2 border-t border-r transition-colors duration-300 ${openIndex === i ? "border-emerald-400" : "border-emerald-700/50 group-hover:border-emerald-500"}`} />
                <span className={`absolute bottom-0 left-0 w-2 h-2 border-b border-l transition-colors duration-300 ${openIndex === i ? "border-emerald-400" : "border-emerald-700/50 group-hover:border-emerald-500"}`} />
                <span className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r transition-colors duration-300 ${openIndex === i ? "border-emerald-400" : "border-emerald-700/50 group-hover:border-emerald-500"}`} />

                <div className="flex items-center gap-4 relative z-10">
                  <span className={`font-mono text-sm tracking-widest ${openIndex === i ? "text-emerald-400" : "text-emerald-600"}`}>
                    Q::{String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={`font-bold uppercase tracking-wider text-sm sm:text-base ${openIndex === i ? "text-white" : "text-zinc-300 group-hover:text-white"}`}>
                    {faq.q}
                  </span>
                </div>
                
                <div className={`relative z-10 text-emerald-500 transition-transform duration-300 ${openIndex === i ? "rotate-45 text-emerald-400" : ""}`}>
                  +
                </div>

                {/* Animated scan line on hover (when closed) */}
                {openIndex !== i && (
                  <div
                    className="absolute left-0 right-0 h-px opacity-0 group-hover:opacity-100 pointer-events-none"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.4), transparent)",
                      animation: "scan 2s linear infinite",
                    }}
                  />
                )}
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-4 border-x border-b border-emerald-900/40 bg-black/40 text-zinc-400 text-sm leading-relaxed border-t-0 shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)]">
                      <div className="flex gap-4">
                        <span className="font-mono text-sm tracking-widest text-emerald-600/50">
                          A::{String(i + 1).padStart(2, "0")}
                        </span>
                        <p>{faq.a}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
