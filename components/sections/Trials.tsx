"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import { audioManager } from "@/lib/audio";

export default function Trials() {
  const [active, setActive] = useState<number | null>(null);

  const arenas = [
    { 
      name: "Web Supremacy", 
      tags: ["Frontend", "Backend", "UX/UI"],
      longDescription: "Dominate the web by constructing flawless interfaces and impenetrable backends. Your applications must be robust, responsive, and secure against the chaos of the outside world.",
      color: "from-blue-900/40 to-cyan-900/10"
    },
    { 
      name: "Machine Intelligence", 
      tags: ["AI", "ML", "Data"],
      longDescription: "Harness the power of neural networks and massive datasets. Train models that can predict, classify, and outsmart human logic. The data holds the truth; you must extract it.",
      color: "from-purple-900/40 to-pink-900/10"
    },
    { 
      name: "Protocol Breach", 
      tags: ["Security", "Cryptography"],
      longDescription: "Crack ciphers, expose vulnerabilities, and defend your own systems. This is a realm of absolute paranoia where a single compromised byte means total annihilation.",
      color: "from-red-900/40 to-orange-900/10"
    },
    { 
      name: "Hardware Domination", 
      tags: ["IoT", "Embedded"],
      longDescription: "Control the physical realm. Write code that interfaces with silicon, manipulates sensors, and commands robotics. If it has a circuit, you will own it.",
      color: "from-amber-900/40 to-yellow-900/10"
    }
  ];

  return (
    <section className="relative min-h-screen py-24 px-4 flex flex-col justify-center">
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-10%" }}
          className="mb-16 md:w-1/2"
        >
          <h2 className="text-4xl font-black uppercase text-white mb-4">Choose Your Trial</h2>
          <p className="text-zinc-400">
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
              <Card 
                className="bg-zinc-900/50 backdrop-blur-md border-zinc-700/50 hover:bg-zinc-800/80 hover:border-green-500/50 transition-all h-full flex flex-col relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 via-transparent to-transparent group-hover:from-green-500/10 transition-all duration-500 pointer-events-none" />
                <CardHeader>
                  <motion.div layoutId={`arena-title-${i}`}>
                    <CardTitle className="text-2xl text-white group-hover:text-green-400 transition-colors">
                      {arena.name}
                    </CardTitle>
                  </motion.div>
                </CardHeader>
                <CardContent className="flex gap-2 flex-wrap flex-1">
                  {arena.tags.map((tag, j) => (
                    <motion.span 
                      layoutId={`arena-tag-${i}-${j}`}
                      key={j} 
                      className="px-3 py-1 bg-black/50 border border-zinc-700 rounded-full text-xs font-medium text-zinc-300"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </CardContent>
              </Card>
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
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md"
              onClick={() => setActive(null)}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                layoutId={`arena-container-${active}`}
                className={`w-full max-w-2xl overflow-hidden rounded-xl bg-gradient-to-br ${arenas[active].color} bg-zinc-950 border border-green-500/50 shadow-2xl pointer-events-auto`}
              >
                <div className="p-8 relative">
                  <button 
                    onClick={() => {
                      audioManager.play("hover");
                      setActive(null);
                    }}
                    className="absolute top-6 right-6 text-zinc-400 hover:text-white transition-colors p-2 hover:bg-zinc-800/50 rounded-full"
                  >
                    <X size={24} />
                  </button>
                  
                  <motion.div layoutId={`arena-title-${active}`} className="mb-6">
                    <h2 className="text-4xl font-black text-white">{arenas[active].name}</h2>
                  </motion.div>
                  
                  <div className="flex gap-2 flex-wrap mb-8">
                    {arenas[active].tags.map((tag, j) => (
                      <motion.span 
                        layoutId={`arena-tag-${active}-${j}`}
                        key={j} 
                        className="px-4 py-1.5 bg-black/50 border border-green-500/30 rounded-full text-sm font-medium text-green-400"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="pt-6 border-t border-zinc-800"
                  >
                    <p className="text-zinc-300 text-lg leading-relaxed">
                      {arenas[active].longDescription}
                    </p>
                    <div className="mt-8 flex justify-end">
                      <button 
                        className="px-8 py-3 bg-white hover:bg-zinc-200 text-black font-black uppercase tracking-widest text-sm rounded transition-colors" 
                        onClick={() => {
                          audioManager.play("click");
                          setActive(null);
                        }}
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
