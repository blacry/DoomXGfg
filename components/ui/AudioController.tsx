"use client";

import { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { audioManager } from "@/lib/audio";
import { motion, AnimatePresence } from "framer-motion";

export function AudioController() {
  const [isMuted, setIsMuted] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Periodically check if muted state changed externally (e.g. from LoadingScreen)
    const interval = setInterval(() => {
      setIsMuted(audioManager.isMuted);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 sm:gap-3">
      <AnimatePresence>
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const muted = audioManager.toggleMute();
            setIsMuted(muted);
          }}
          className="group w-12 h-12 flex flex-col items-center justify-center rounded-full bg-black/60 border border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.2)] backdrop-blur-md hover:bg-emerald-950/80 hover:border-emerald-400 transition-colors duration-300"
          aria-label={isMuted ? "Audio Off" : "Audio On"}
        >
          {isMuted ? (
            <VolumeX className="text-zinc-400 group-hover:text-emerald-400 w-5 h-5 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          ) : (
            <Volume2 className="text-emerald-500 group-hover:text-emerald-400 w-5 h-5 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          )}
        </motion.button>
      </AnimatePresence>
    </div>
  );
}
