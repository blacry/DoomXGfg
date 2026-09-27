"use client";
import { useState, useEffect } from "react";
import { useProgress } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { audioManager } from "@/lib/audio";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*X";

export function LoadingScreen() {
  const { progress } = useProgress();
  const [isDismissed, setIsDismissed] = useState(false);
  const [canEnter, setCanEnter] = useState(false);
  const [scrambled, setScrambled] = useState("SOVEREIGN");

  useEffect(() => {
    if (progress === 100) {
      setScrambled("SOVEREIGN");
      const t = setTimeout(() => setCanEnter(true), 500);
      return () => clearTimeout(t);
    } else {
      const interval = setInterval(() => {
        setScrambled(
          "SOVEREIGN"
            .split("")
            .map((c, i) =>
              Math.random() > progress / 100
                ? chars[Math.floor(Math.random() * chars.length)]
                : "SOVEREIGN"[i]
            )
            .join("")
        );
      }, 50);
      return () => clearInterval(interval);
    }
  }, [progress]);

  useEffect(() => {
    audioManager.init();
  }, []);

  const handleEnter = () => {
    if (!canEnter) return;
    audioManager.unmuteAndStart();
    audioManager.play("impact");
    setIsDismissed(true);
  };

  return (
    <AnimatePresence>
      {!isDismissed && (
        <div
          className="fixed inset-0 z-[100] cursor-pointer overflow-hidden"
          onClick={handleEnter}
        >
          {/* Top Door */}
          <motion.div
            exit={{ y: "-100%" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-x-0 top-0 h-1/2 bg-zinc-950 border-b border-green-500/20 shadow-[0_4px_30px_rgba(34,197,94,0.1)] origin-top"
          >
            {/* Scanlines / Noise texture overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
          </motion.div>

          {/* Bottom Door */}
          <motion.div
            exit={{ y: "100%" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-x-0 bottom-0 h-1/2 bg-zinc-950 border-t border-green-500/20 shadow-[0_-4px_30px_rgba(34,197,94,0.1)] origin-bottom"
          >
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
          </motion.div>

          {/* Center Content */}
          <motion.div
            exit={{ scale: 3, opacity: 0, filter: "blur(20px)" }}
            transition={{ duration: 0.8, ease: "easeIn" }}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <h1 className="text-5xl md:text-8xl font-black uppercase tracking-[0.2em] mb-4 text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]">
                {scrambled}
              </h1>

              <div className="w-80 h-[2px] bg-zinc-900 overflow-hidden relative mb-8">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-green-500 shadow-[0_0_15px_rgba(34,197,94,1)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>

              <div className="h-10 flex items-center justify-center">
                {!canEnter ? (
                  <div className="text-green-500 font-mono text-sm tracking-[0.3em] flex items-center gap-3">
                    <motion.span 
                      animate={{ opacity: [1, 0, 1] }} 
                      transition={{ repeat: Infinity, duration: 1 }} 
                      className="w-2 h-2 bg-green-500" 
                    />
                    SYS.DECRYPT: {progress.toFixed(0)}%
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-white font-mono text-sm tracking-[0.3em] flex flex-col items-center gap-2"
                  >
                    <motion.div
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                      className="px-6 py-2 border border-green-500/50 text-green-400 bg-green-500/10 backdrop-blur-sm shadow-[0_0_20px_rgba(34,197,94,0.2)]"
                    >
                      [ CLICK TO INITIALIZE ]
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
