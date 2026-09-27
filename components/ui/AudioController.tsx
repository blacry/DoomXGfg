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
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      <AnimatePresence>
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const muted = audioManager.toggleMute();
            setIsMuted(muted);
          }}
          className="group flex items-center gap-3 px-4 py-3 rounded-full bg-zinc-900/90 border border-zinc-700 hover:border-green-500 shadow-lg backdrop-blur-md transition-all"
        >
          {isMuted ? <VolumeX className="text-zinc-500 group-hover:text-green-500" size={24} /> : <Volume2 className="text-green-500" size={24} />}
          <span className="text-sm font-bold uppercase tracking-wider text-zinc-300 group-hover:text-white">
            {isMuted ? "Audio Off" : "Audio On"}
          </span>
        </motion.button>
      </AnimatePresence>
    </div>
  );
}
