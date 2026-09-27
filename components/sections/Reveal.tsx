"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Reveal() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section ref={ref} className="relative h-[150vh] flex items-center justify-center px-4 overflow-hidden">
      <motion.div 
        className="absolute inset-0 z-[-1]"
        style={{ y }}
      >
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518365050014-70fe7232897f?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-20 grayscale" 
          style={{ maskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)" }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-transparent pointer-events-none" />
      
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: false, margin: "-20%" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto space-y-6"
        >
          <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 uppercase tracking-tighter drop-shadow-xl">
            The World Crumbles.
            <br />
            <span className="text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">I Offer Order.</span>
          </h2>
          <p className="text-xl text-zinc-300 font-light max-w-2xl mx-auto leading-relaxed">
            You stand before the sovereign of a new digital era. 
            Survival is not guaranteed, but for those who possess the intellect to overcome my trials, <strong className="text-white font-semibold">glory awaits.</strong>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
