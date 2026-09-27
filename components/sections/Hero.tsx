"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 500], [0.5, 0]);

  return (
    <section ref={ref} className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      <motion.div 
        className="absolute inset-0 z-[-1]"
        style={{ y, opacity }}
      >
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618519764633-5605059cb232?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-30 grayscale" 
          style={{ maskImage: "linear-gradient(to bottom, black 50%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent)" }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1 }}
        className="relative z-10 flex flex-col items-center w-full max-w-[100vw] px-2 space-y-4"
      >
        <p className="text-green-500 font-medium tracking-[0.1em] sm:tracking-[0.3em] uppercase text-[0.6rem] sm:text-xs md:text-sm drop-shadow-md text-center break-words max-w-full">
          GeeksForGeeks Student Chapter • Bennett University
        </p>
        
        <h1 className="text-[15vw] sm:text-[10rem] md:text-[16rem] lg:text-[20rem] font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-300 to-zinc-600 drop-shadow-2xl mix-blend-screen leading-none overflow-hidden whitespace-nowrap">
          Sovereign
        </h1>
        
        <p className="text-sm sm:text-lg md:text-2xl text-zinc-300 max-w-2xl mx-auto font-light tracking-widest mt-4 sm:mt-8 px-4 break-words">
          A night of unyielding trials. Only the worthy will ascend.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-green-500/70 uppercase tracking-widest font-bold">Enter the Domain</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-green-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
