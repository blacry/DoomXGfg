"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { audioManager } from "@/lib/audio";

const EVENTS = [
  {
    time: "18:00",
    code: "EVT::001",
    title: "Gates Open",
    desc: "Latverian border control activates. Warriors arrive and receive their clearance passes.",
    icon: "⬡",
    phase: "PHASE_ARRIVAL",
  },
  {
    time: "19:30",
    code: "EVT::002",
    title: "The Sovereign Speaks",
    desc: "Doom addresses the assembled. Rules of engagement are broadcast. No mercy for the unprepared.",
    icon: "◈",
    phase: "PHASE_BRIEF",
  },
  {
    time: "20:00",
    code: "EVT::003",
    title: "Trials Commence",
    desc: "The 24-hour war begins. All systems go. Build, break, and conquer.",
    icon: "▶",
    phase: "PHASE_COMBAT",
    highlight: true,
  },
  {
    time: "00:00",
    code: "EVT::004",
    title: "Midnight Assessment",
    desc: "First checkpoint. Mentors sweep through. Weak projects are flagged. Strong ones are watched.",
    icon: "◉",
    phase: "PHASE_EVAL",
  },
  {
    time: "08:00",
    code: "EVT::005",
    title: "Dawn of Reckoning",
    desc: "Submissions lock. The final builds are sealed into the Latverian vault. No further changes.",
    icon: "◼",
    phase: "PHASE_LOCK",
  },
  {
    time: "10:00",
    code: "EVT::006",
    title: "Ascension",
    desc: "The worthy are called forward. Doom himself selects the champions. The rest shall try again.",
    icon: "★",
    phase: "PHASE_VICTORY",
    highlight: true,
  },
];

function TimelineNode({ event, index, isLeft }: { event: typeof EVENTS[0]; index: number; isLeft: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-15%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -40 : 40 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
      className={`relative flex items-center gap-0 w-full flex-col md:flex-row ${!isLeft ? "md:flex-row-reverse" : ""}`}
    >
      {/* Card */}
      <div 
        className={`w-full md:w-[calc(50%-2.5rem)] ${isLeft ? "md:pr-6 md:text-right" : "md:pl-6 md:text-left"} mb-8 md:mb-0`}
        onMouseEnter={() => audioManager.play("hover")}
      >
        <div
          className={`relative group p-5 border bg-black/60 backdrop-blur-md transition-all duration-300 hover:bg-black/80 cursor-default
            ${event.highlight
              ? "border-emerald-400/70 shadow-[0_0_30px_rgba(16,185,129,0.15),inset_0_0_30px_rgba(16,185,129,0.03)]"
              : "border-emerald-900/50 hover:border-emerald-700/60"
            }`}
        >
          {/* Animated scan line */}
          <div
            className="absolute left-0 right-0 h-px opacity-0 group-hover:opacity-100 pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.6), transparent)",
              animation: "scan 2.5s linear infinite",
            }}
          />

          {/* Corner brackets */}
          <span className={`absolute top-0 left-0 w-3 h-3 border-t border-l transition-all duration-300 group-hover:w-5 group-hover:h-5 ${event.highlight ? "border-emerald-400" : "border-emerald-700/60 group-hover:border-emerald-500"}`} />
          <span className={`absolute top-0 right-0 w-3 h-3 border-t border-r transition-all duration-300 group-hover:w-5 group-hover:h-5 ${event.highlight ? "border-emerald-400" : "border-emerald-700/60 group-hover:border-emerald-500"}`} />
          <span className={`absolute bottom-0 left-0 w-3 h-3 border-b border-l transition-all duration-300 group-hover:w-5 group-hover:h-5 ${event.highlight ? "border-emerald-400" : "border-emerald-700/60 group-hover:border-emerald-500"}`} />
          <span className={`absolute bottom-0 right-0 w-3 h-3 border-b border-r transition-all duration-300 group-hover:w-5 group-hover:h-5 ${event.highlight ? "border-emerald-400" : "border-emerald-700/60 group-hover:border-emerald-500"}`} />

          {/* Header row */}
          <div className={`flex items-center gap-2 mb-2 ${isLeft ? "justify-end" : "justify-start"}`}>
            <span className="text-[9px] font-mono text-emerald-500/50 tracking-widest">{event.code}</span>
            <span className="text-[9px] font-mono text-emerald-500/30">|</span>
            <span className="text-[9px] font-mono text-emerald-500/50 tracking-widest">{event.phase}</span>
          </div>

          {/* Time */}
          <div className={`font-mono font-black text-3xl mb-1 tabular-nums ${event.highlight ? "text-emerald-400" : "text-emerald-600/80"}`}
            style={event.highlight ? { textShadow: "0 0 20px rgba(16,185,129,0.5)" } : {}}>
            {event.time}
          </div>

          {/* Title */}
          <h3 className="font-black uppercase tracking-wider text-white text-base mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">{event.title}</h3>

          {/* Desc */}
          <p className="text-xs text-zinc-400 leading-relaxed">{event.desc}</p>

          {/* Highlight pulse */}
          {event.highlight && (
            <div className="absolute -inset-px border border-emerald-400/20 animate-pulse pointer-events-none" />
          )}
        </div>
      </div>

      {/* Center node (Hidden on mobile for cleaner stack) */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 flex-col items-center z-10">
        <div
          className={`w-10 h-10 border-2 flex items-center justify-center font-mono font-bold text-lg transition-all duration-300
            ${event.highlight
              ? "border-emerald-400 bg-emerald-950 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.6)]"
              : "border-emerald-800 bg-black text-emerald-700"
            }`}
        >
          {event.icon}
        </div>
        {/* Index number */}
        <div className="text-[8px] font-mono text-emerald-500/40 mt-1 tracking-widest">{String(index + 1).padStart(2, "0")}</div>
      </div>

      {/* Empty right/left side spacer */}
      <div className="hidden md:block w-[calc(50%-2.5rem)]" />
    </motion.div>
  );
}

export default function Timeline() {
  return (
    <section id="timeline" className="relative py-28 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

      {/* Keyframes for scan line */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0%   { top: 0; opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      ` }} />

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-10%" }}
          className="text-center mb-20"
        >
          <p className="text-emerald-500/50 text-[10px] font-mono tracking-[0.4em] uppercase mb-3">LATVERIAN PROTOCOL // SCHEDULE.SYS</p>
          <h2 className="text-4xl md:text-5xl font-black uppercase text-white drop-shadow-[0_4px_25px_rgba(0,0,0,1)] mb-4">Run of the Night</h2>
          <p className="text-zinc-400 max-w-xl mx-auto text-sm drop-shadow-[0_2px_15px_rgba(0,0,0,1)]">
            Time waits for no one in my domain. Know the schedule. Miss it and perish.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative space-y-12">
          {/* Center line (Hidden on mobile) */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px pointer-events-none">
            <div className="h-full bg-gradient-to-b from-transparent via-emerald-900/60 to-transparent" />
          </div>

          {EVENTS.map((event, i) => (
            <TimelineNode key={i} event={event} index={i} isLeft={i % 2 === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
