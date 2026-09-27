"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Terminal, Shield, Zap, X } from "lucide-react";
import { audioManager } from "@/lib/audio";

export default function Decree() {
  const [active, setActive] = useState<number | null>(null);

  const decrees = [
    {
      title: "The Forge",
      description: "Construct resilient architectures capable of withstanding chaos.",
      longDescription: "In The Forge, you will be tested on your ability to build scalable, fault-tolerant backends and distributed systems. The weak will crumble under the load; only true architects will prevail. Bring your best DevOps, system design, and backend engineering skills.",
      icon: <Terminal className="w-8 h-8 mb-4 text-green-500" />,
      color: "from-emerald-900/40 to-green-900/10"
    },
    {
      title: "The Gauntlet",
      description: "Endure relentless algorithmic challenges designed to break the weak.",
      longDescription: "The Gauntlet is a pure test of logic and optimization. Face a barrage of competitive programming puzzles where efficiency and time complexity are the only currency that matters. Optimize or perish.",
      icon: <Shield className="w-8 h-8 mb-4 text-green-500" />,
      color: "from-zinc-900/80 to-zinc-950/80"
    },
    {
      title: "The Cipher",
      description: "Decrypt the unknown and bend the digital fabric to your will.",
      longDescription: "The Cipher demands mastery over cryptography, reverse engineering, and web security. Unravel the mysteries hidden within our systems, exploit vulnerabilities, and secure your own code, or be locked out forever.",
      icon: <Zap className="w-8 h-8 mb-4 text-green-500" />,
      color: "from-green-950/40 to-zinc-900/40"
    }
  ];

  return (
    <section className="relative min-h-screen py-24 px-4 flex flex-col justify-center">
      <div className="absolute inset-0 bg-black/70 pointer-events-none" />
      
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-10%" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-black uppercase text-white mb-4">The Decree</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            You must prove your worth across three fundamental domains. Failure is not an option; it is a certainty for the unprepared.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-0">
          {decrees.map((decree, i) => (
            <motion.div
              key={`card-${i}`}
              layoutId={`card-container-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              onClick={() => {
                audioManager.play("hover");
                setActive(i);
              }}
              className="cursor-pointer group h-full"
            >
              <Card className="bg-zinc-950/80 backdrop-blur-sm border-zinc-800 hover:border-green-500/50 transition-colors h-full flex flex-col relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 via-transparent to-transparent group-hover:from-green-500/5 transition-all duration-500 pointer-events-none" />
                <CardHeader>
                  <motion.div layoutId={`card-icon-${i}`}>{decree.icon}</motion.div>
                  <motion.div layoutId={`card-title-${i}`}>
                    <CardTitle className="text-xl text-white group-hover:text-green-400 transition-colors">{decree.title}</CardTitle>
                  </motion.div>
                </CardHeader>
                <CardContent className="flex-1">
                  <motion.div layoutId={`card-desc-${i}`}>
                    <CardDescription className="text-zinc-400 text-base">
                      {decree.description}
                    </CardDescription>
                  </motion.div>
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
                layoutId={`card-container-${active}`}
                className={`w-full max-w-2xl overflow-hidden rounded-xl bg-gradient-to-br ${decrees[active].color} bg-zinc-950 border border-green-500/30 shadow-2xl pointer-events-auto`}
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
                  
                  <motion.div layoutId={`card-icon-${active}`} className="mb-6">
                    {decrees[active].icon}
                  </motion.div>
                  
                  <motion.div layoutId={`card-title-${active}`} className="mb-4">
                    <h2 className="text-3xl font-black text-white">{decrees[active].title}</h2>
                  </motion.div>
                  
                  <motion.div layoutId={`card-desc-${active}`} className="mb-6">
                    <p className="text-zinc-300 text-lg font-medium">
                      {decrees[active].description}
                    </p>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="pt-6 border-t border-zinc-800"
                  >
                    <p className="text-zinc-400 leading-relaxed">
                      {decrees[active].longDescription}
                    </p>
                    <div className="mt-8 flex justify-end">
                      <button className="px-6 py-2 bg-green-500 hover:bg-green-400 text-black font-bold uppercase tracking-wider text-sm rounded transition-colors" onClick={() => setActive(null)}>
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
