"use client";

import { motion } from "framer-motion";
import { audioManager } from "@/lib/audio";

const SovereignSigil = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Outer ring */}
    <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 3" />
    {/* Inner ring */}
    <circle cx="40" cy="40" r="28" stroke="currentColor" strokeWidth="0.5" />
    {/* Latverian "D" crown shape */}
    <path d="M40 14 L46 22 L52 16 L52 28 L60 28 L54 36 L60 44 L52 44 L46 52 L40 44 L34 52 L28 44 L20 44 L26 36 L20 28 L28 28 L28 16 L34 22 Z" stroke="currentColor" strokeWidth="1" fill="none" />
    {/* Center dot */}
    <circle cx="40" cy="40" r="3" fill="currentColor" />
    {/* Crosshairs */}
    <line x1="40" y1="12" x2="40" y2="20" stroke="currentColor" strokeWidth="0.8" />
    <line x1="40" y1="60" x2="40" y2="68" stroke="currentColor" strokeWidth="0.8" />
    <line x1="12" y1="40" x2="20" y2="40" stroke="currentColor" strokeWidth="0.8" />
    <line x1="60" y1="40" x2="68" y2="40" stroke="currentColor" strokeWidth="0.8" />
  </svg>
);

export default function Footer() {
  const socials = [
    { name: "Instagram", href: "#", label: "IG" },
    { name: "Twitter", href: "#", label: "TW" },
    { name: "Discord", href: "#", label: "DC" },
    { name: "LinkedIn", href: "#", label: "LI" },
  ];

  return (
    <footer className="relative border-t border-emerald-900/40 bg-black overflow-hidden z-20">
      {/* Faint grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      {/* Top glow line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-4 py-12">
        {/* Main content */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-0 justify-between">

          {/* Sigil + brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 text-emerald-500/70 hover:text-emerald-400 transition-colors duration-300" style={{ filter: 'drop-shadow(0 0 8px rgba(16,185,129,0.4))' }}>
                <SovereignSigil />
              </div>
              <div>
                <p className="text-white font-black text-lg uppercase tracking-widest leading-tight">Sovereign</p>
                <p className="text-emerald-500/60 text-[10px] font-mono tracking-[0.3em] uppercase">By Doom's Decree</p>
              </div>
            </div>
            <p className="text-zinc-600 text-xs font-mono max-w-xs text-center md:text-left leading-relaxed">
              A hackathon of unmatched ferocity.<br />
              <span className="text-emerald-800">Only the worthy shall ascend.</span>
            </p>
          </motion.div>

          {/* Center: flavor text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center gap-3 text-center"
          >
            <p className="text-[10px] font-mono text-emerald-500/40 tracking-[0.4em] uppercase">LATVERIA // CLASSIFIED</p>
            <blockquote className="text-zinc-500 text-sm italic max-w-xs leading-relaxed">
              "Doom does not request. Doom does not ask.<br />
              <span className="text-emerald-600 not-italic font-semibold">Doom commands."</span>
            </blockquote>
            <p className="text-[10px] font-mono text-zinc-700 tracking-widest">— DR. VICTOR VON DOOM</p>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center md:items-end gap-4"
          >
            <p className="text-[10px] font-mono text-emerald-500/40 tracking-[0.4em] uppercase">COMMS LINKS</p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  title={s.name}
                  onMouseEnter={() => audioManager.play("hover")}
                  className="relative w-10 h-10 flex items-center justify-center border border-emerald-900/60 hover:border-emerald-500/60 text-zinc-500 hover:text-emerald-400 text-[10px] font-mono font-bold tracking-widest transition-all duration-200 group"
                >
                  {/* Corner accents on hover */}
                  <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="group-hover:drop-shadow-[0_0_6px_rgba(16,185,129,0.8)] transition-all">{s.label}</span>
                </a>
              ))}
            </div>
            <p className="text-zinc-700 text-[10px] font-mono text-right">
              GFG STUDENT CHAPTER<br />
              BENNETT UNIVERSITY
            </p>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-emerald-900/30 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-zinc-700 text-[10px] font-mono tracking-widest">
            © {new Date().getFullYear()} LATVERIA HOLDINGS — ALL TERRITORIES CLAIMED
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-emerald-700 text-[10px] font-mono tracking-widest">SYSTEM ONLINE</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
