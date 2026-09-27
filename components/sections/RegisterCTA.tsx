"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { audioManager } from "@/lib/audio";

function DoomSuccessOverlay({ onClose }: { onClose: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15)_0%,transparent_70%)]" />
      <motion.div 
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        className="relative z-10 flex flex-col items-center text-center space-y-6"
      >
        <motion.div 
          animate={{ 
            boxShadow: ["0 0 20px rgba(16,185,129,0.5)", "0 0 60px rgba(16,185,129,0.8)", "0 0 20px rgba(16,185,129,0.5)"]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-32 h-32 rounded-full border-2 border-emerald-500 bg-emerald-950/50 flex items-center justify-center mb-4 relative"
        >
          {/* Latverian Sigil Placeholder */}
          <svg className="w-16 h-16 text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </motion.div>
        
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-[0.2em] text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]">
          Pledge Accepted
        </h2>
        <p className="text-xl md:text-2xl text-zinc-300 font-light tracking-widest max-w-lg">
          YOU ARE NOW SUBJECT TO THE WILL OF DOOM.
        </p>
        <div className="pt-8">
          <Button 
            onClick={() => {
              audioManager.play("click");
              onClose();
            }}
            onMouseEnter={() => audioManager.play("hover")}
            className="h-12 px-8 bg-transparent border border-emerald-500 text-emerald-500 hover:bg-emerald-950 hover:text-emerald-400 uppercase tracking-widest font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all"
          >
            Acknowledge
          </Button>
        </div>
      </motion.div>
      
      {/* Magical green "confetti" particles */}
      {Array.from({ length: 70 }).map((_, i) => {
        const size = Math.random() * 4 + 2;
        return (
          <motion.div
            key={i}
            className="absolute bg-emerald-400 rounded-sm"
            style={{ width: size, height: size }}
            initial={{
              x: "50vw",
              y: "50vh",
              opacity: 1,
            }}
            animate={{
              x: `${Math.random() * 100}vw`,
              y: `${Math.random() * 100}vh`,
              opacity: [1, 0.8, 0],
              scale: [1, Math.random() * 2 + 1, 0],
              rotate: Math.random() * 360
            }}
            transition={{
              duration: Math.random() * 2.5 + 1.5,
              ease: "easeOut",
              delay: Math.random() * 0.2
            }}
          />
        );
      })}
    </motion.div>
  );
}

export default function RegisterCTA() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  useEffect(() => setMounted(true), []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    audioManager.play("impact");
    setIsOpen(false);
    setShowSuccess(true);
  };

  return (
    <>
      <section className="relative min-h-[70vh] py-24 px-4 flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 bg-black/80 pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 space-y-10 max-w-3xl mx-auto"
        >
          <div className="space-y-4">
            <h2 className="text-5xl md:text-7xl font-black uppercase text-white tracking-tighter drop-shadow-lg">
              Will You Answer?
            </h2>
            <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-2xl mx-auto">
              The sovereign awaits your arrival. Secure your place in the trials before the gates close forever.
            </p>
          </div>

          {mounted && (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button 
                  size="lg" 
                  className="relative h-16 px-12 text-xl uppercase font-black tracking-widest bg-emerald-950/40 text-emerald-400 border border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:bg-emerald-900 transition-all duration-300 backdrop-blur-sm"
                  onMouseEnter={() => audioManager.play("hover")}
                  onClick={() => audioManager.play("click")}
                >
                  Pledge Allegiance
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] border-emerald-900 bg-zinc-950/95 text-emerald-500 backdrop-blur-md shadow-[0_0_50px_rgba(16,185,129,0.15)]">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-black uppercase tracking-widest drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]">
                    Enter the Domain
                  </DialogTitle>
                  <DialogDescription className="text-emerald-500/70 text-lg uppercase tracking-wider font-light">
                    Submit your credentials to the sovereign.
                  </DialogDescription>
                </DialogHeader>
                <form className="space-y-5 mt-4" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-emerald-500/80">Identifier</label>
                    <input id="name" className="flex h-12 w-full rounded-none border border-emerald-900/50 bg-emerald-950/20 px-3 py-2 text-sm text-emerald-300 placeholder:text-emerald-800/50 focus:outline-none focus:border-emerald-500 focus:bg-emerald-950/40 transition-colors" placeholder="Full Legal Name" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-emerald-500/80">Comms Link</label>
                    <input id="email" type="email" className="flex h-12 w-full rounded-none border border-emerald-900/50 bg-emerald-950/20 px-3 py-2 text-sm text-emerald-300 placeholder:text-emerald-800/50 focus:outline-none focus:border-emerald-500 focus:bg-emerald-950/40 transition-colors" placeholder="Secure Email Address" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="expertise" className="text-xs font-bold uppercase tracking-widest text-emerald-500/80">Area of Expertise</label>
                    <input id="expertise" className="flex h-12 w-full rounded-none border border-emerald-900/50 bg-emerald-950/20 px-3 py-2 text-sm text-emerald-300 placeholder:text-emerald-800/50 focus:outline-none focus:border-emerald-500 focus:bg-emerald-950/40 transition-colors" placeholder="E.g. Cybernetics, Sorcery, Robotics" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="motivation" className="text-xs font-bold uppercase tracking-widest text-emerald-500/80">Pledge of Loyalty</label>
                    <textarea id="motivation" rows={3} className="flex w-full rounded-none border border-emerald-900/50 bg-emerald-950/20 px-3 py-2 text-sm text-emerald-300 placeholder:text-emerald-800/50 focus:outline-none focus:border-emerald-500 focus:bg-emerald-950/40 transition-colors resize-none" placeholder="State your motivation to serve Latveria..." required />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-emerald-900/50 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-600 hover:text-white uppercase font-black tracking-widest transition-all shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                    onMouseEnter={() => audioManager.play("hover")}
                  >
                    Submit Credentials
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </motion.div>
      </section>

      <AnimatePresence>
        {showSuccess && (
          <DoomSuccessOverlay onClose={() => setShowSuccess(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
