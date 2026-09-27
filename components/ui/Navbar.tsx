"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Decree", href: "#decree" },
  { label: "Trials", href: "#trials" },
  { label: "Prizes", href: "#prizes" },
  { label: "Timeline", href: "#timeline" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setHidden(y > lastY.current && y > 200);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-[500] pointer-events-auto"
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background — appears on scroll */}
      <div className={`absolute inset-0 transition-all duration-500 ${scrolled ? "bg-black/80 backdrop-blur-md border-b border-emerald-900/40" : ""}`} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo / brand */}
        <a
          href="#"
          className="flex items-center gap-3 group"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        >
          <div className="relative">
            <div className="w-7 h-7 border border-emerald-500/60 flex items-center justify-center group-hover:border-emerald-400 transition-colors">
              <span className="text-[8px] font-mono font-black text-emerald-400">GFG</span>
            </div>
            <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          </div>
          <span className="text-white font-black uppercase tracking-[0.15em] text-sm group-hover:text-emerald-400 transition-colors">
            Sovereign
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="relative px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 hover:text-emerald-400 transition-colors duration-200 group"
            >
              {link.label}
              {/* Underline on hover */}
              <span className="absolute bottom-0 left-4 right-4 h-px bg-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <button
            onClick={() => {
              const el = document.querySelector("#register");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="relative px-5 py-2 text-xs font-mono font-black uppercase tracking-widest text-emerald-400 border border-emerald-500/60 hover:bg-emerald-950/60 hover:border-emerald-400 transition-all duration-200 group"
          >
            {/* Corner accents */}
            <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            Register
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 text-emerald-400"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-5 h-px bg-current transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
          <span className={`block w-5 h-px bg-current transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-current transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-md border-b border-emerald-900/40 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="text-left px-3 py-2.5 text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 hover:text-emerald-400 hover:bg-emerald-950/30 transition-colors border-l border-transparent hover:border-emerald-500"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("#register")}
                className="mt-2 px-4 py-2.5 text-xs font-mono font-black uppercase tracking-widest text-emerald-400 border border-emerald-500/60 hover:bg-emerald-950/60 transition-all"
              >
                Register
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
