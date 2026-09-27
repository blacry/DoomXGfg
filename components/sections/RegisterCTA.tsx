"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { audioManager } from "@/lib/audio";

export default function RegisterCTA() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative min-h-[70vh] py-24 px-4 flex flex-col items-center justify-center text-center">
      <div className="absolute inset-0 bg-black/80 pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, margin: "-10%" }}
        transition={{ duration: 0.6 }}
        className="relative z-10 space-y-8 max-w-2xl mx-auto"
      >
        <h2 className="text-5xl md:text-7xl font-black uppercase text-white tracking-tighter">
          Will You Answer?
        </h2>
        <p className="text-xl text-zinc-400 font-light">
          The sovereign awaits your arrival. Secure your place in the trials before the gates close forever.
        </p>

        {mounted && (
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                size="lg" 
                className="h-14 px-8 text-lg uppercase font-bold tracking-widest bg-white text-black hover:bg-zinc-200"
                onMouseEnter={() => audioManager.play("hover")}
                onClick={() => audioManager.play("click")}
              >
                Initiate Registration
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] border-zinc-800 bg-black text-white">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold uppercase">Enter the Domain</DialogTitle>
                <DialogDescription className="text-zinc-400">
                  Fill in your credentials to join the trials.
                </DialogDescription>
              </DialogHeader>
              <form className="space-y-4 mt-4" onSubmit={(e) => { e.preventDefault(); audioManager.play("impact"); }}>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-zinc-300">Identifier (Name)</label>
                  <input id="name" className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-500" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-zinc-300">Comms Link (Email)</label>
                  <input id="email" type="email" className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-500" placeholder="john@example.com" required />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-white text-black hover:bg-zinc-200 uppercase font-bold"
                  onMouseEnter={() => audioManager.play("hover")}
                  onClick={() => audioManager.play("click")}
                >
                  Submit Credentials
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </motion.div>
    </section>
  );
}
