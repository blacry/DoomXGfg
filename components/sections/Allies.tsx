"use client";

import { motion } from "framer-motion";
import { audioManager } from "@/lib/audio";

const PARTNERS = [
  { name: "Devfolio", logo: "⬡", role: "Platform Partner" },
  { name: "Polygon", logo: "◈", role: "Web3 Partner" },
  { name: "ETHIndia", logo: "◉", role: "Ecosystem Partner" },
  { name: "GitHub", logo: "★", role: "Developer Tools" },
];

export default function Allies() {
  return (
    <section id="allies" className="relative py-24 px-4 overflow-hidden border-y border-emerald-900/20 bg-black/40">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-10%" }}
          className="text-center mb-16"
        >
          <p className="text-emerald-500/50 text-[10px] font-mono tracking-[0.4em] uppercase mb-3">LATVERIAN PROTOCOL // ALLIANCES.SYS</p>
          <h2 className="text-3xl md:text-4xl font-black uppercase text-white mb-4 drop-shadow-[0_4px_25px_rgba(0,0,0,1)]">Allied Forces</h2>
          <p className="text-zinc-400 text-sm max-w-xl mx-auto drop-shadow-[0_2px_15px_rgba(0,0,0,1)]">
            Doom recognizes power. These entities have sworn their resources to the success of the trials.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PARTNERS.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => audioManager.play("hover")}
              className="group relative p-6 border border-emerald-900/40 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-4 hover:bg-emerald-950/40 hover:border-emerald-500/60 transition-all duration-300 cursor-default"
            >
              {/* Corner brackets */}
              <span className="absolute top-0 left-0 w-2 h-2 border-t border-l transition-colors duration-300 border-emerald-900/50 group-hover:border-emerald-500" />
              <span className="absolute top-0 right-0 w-2 h-2 border-t border-r transition-colors duration-300 border-emerald-900/50 group-hover:border-emerald-500" />
              <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l transition-colors duration-300 border-emerald-900/50 group-hover:border-emerald-500" />
              <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r transition-colors duration-300 border-emerald-900/50 group-hover:border-emerald-500" />

              {/* Logo placeholder */}
              <div className="w-16 h-16 flex items-center justify-center text-4xl text-emerald-900 group-hover:text-emerald-400 group-hover:drop-shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all duration-300">
                {partner.logo}
              </div>
              
              <div className="text-center">
                <h3 className="font-bold text-zinc-300 group-hover:text-white transition-colors">{partner.name}</h3>
                <p className="text-[10px] font-mono tracking-widest text-emerald-600/60 group-hover:text-emerald-500 mt-1 transition-colors">{partner.role}</p>
              </div>
              
              {/* Scanline hover effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h4v1H0z' fill='%2310b981' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
