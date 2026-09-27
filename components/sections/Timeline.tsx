"use client";

import { motion } from "framer-motion";

export default function Timeline() {
  const events = [
    { time: "18:00", title: "Gates Open", desc: "Arrival and Registration" },
    { time: "19:30", title: "The Sovereign Speaks", desc: "Opening Ceremony & Rules" },
    { time: "20:00", title: "Trials Commence", desc: "Hackathon Begins" },
    { time: "00:00", title: "Midnight Assessment", desc: "First checkpoint evaluation" },
    { time: "08:00", title: "Dawn of Reckoning", desc: "Submissions close" },
    { time: "10:00", title: "Ascension", desc: "Winners Announced" }
  ];

  return (
    <section className="relative min-h-screen py-24 px-4 flex flex-col justify-center">
      <div className="absolute inset-0 bg-black/70 pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-10%" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-black uppercase text-white mb-4">Run of the Night</h2>
          <p className="text-zinc-400">Time waits for no one in my domain.</p>
        </motion.div>

        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-700 before:to-transparent">
          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ delay: i * 0.1 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-800 bg-zinc-950 text-zinc-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <div className="w-2 h-2 bg-zinc-500 rounded-full group-hover:bg-white transition-colors" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-zinc-800/50 bg-zinc-950/50 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-white text-lg">{event.title}</h3>
                  <time className="font-mono text-sm text-zinc-500">{event.time}</time>
                </div>
                <p className="text-zinc-400 text-sm">{event.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
