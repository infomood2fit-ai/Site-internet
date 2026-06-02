"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { navContent } from "@/data/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);
  const slidesActive = useRef(false); // true quand on est dans les slides fonctionnalités

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      // Si on est dans les slides → navbar toujours cachée
      if (slidesActive.current) {
        setHidden(true);
      } else if (delta > 0 && currentY > 80) {
        // Scrolle vers le bas → cacher (seulement après 80px du top)
        setHidden(true);
      } else if (delta < 0) {
        // Scrolle vers le haut → montrer
        setHidden(false);
      }

      setScrolled(currentY > 20);
      lastScrollY.current = currentY;
    };

    // Événement émis par la page fonctionnalités
    const handleSlidesEnter = () => { slidesActive.current = true; setHidden(true); };
    const handleSlidesLeave = () => { slidesActive.current = false; };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("slides-enter", handleSlidesEnter);
    window.addEventListener("slides-leave", handleSlidesLeave);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("slides-enter", handleSlidesEnter);
      window.removeEventListener("slides-leave", handleSlidesLeave);
    };
  }, []);

  // Fermer le menu quand on navigue
  const handleNavClick = () => setMobileOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#080010]/80 backdrop-blur-xl border-b border-[rgba(247,37,133,0.1)] shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "bg-transparent"
        }`}
        style={{
          transform: hidden ? "translateY(-100%)" : "translateY(0)",
          transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.5s ease, border-color 0.5s ease",
        }}
      >
        <nav
          className="max-w-7xl mx-auto px-5 md:px-8 h-16 md:h-20 flex items-center justify-between"
          aria-label="Navigation principale"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="Mood2Fit — retour à l'accueil"
          >
            {/* Logo image */}
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 rounded-[10px] bg-[#f72585]/40 blur-[8px] scale-110 group-hover:bg-[#f72585]/60 transition-all duration-300" />
              <img
                src="/logo.webp"
                alt="Mood2Fit logo"
                width={38}
                height={38}
                className="relative z-10 rounded-[10px] object-contain"
                style={{ filter: "drop-shadow(0 0 6px rgba(247,37,133,0.5))" }}
              />
            </div>

            {/* Texte MOOD2FIT */}
            <div className="flex items-baseline gap-0">
              <span className="font-syne font-800 text-xl md:text-2xl text-[#faf4ff] tracking-tight">
                {navContent.logoText}
              </span>
              <span className="font-syne font-800 text-xl md:text-2xl tracking-tight" style={{ color: "#f72585" }}>
                {navContent.logoAccent}
              </span>
            </div>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {navContent.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-dm font-400 text-[rgba(250,244,255,0.6)] hover:text-[#faf4ff] transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-brand group-hover:w-full transition-all duration-300" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href={navContent.ctaHref}
              className="flex items-center gap-2 px-5 py-2.5 rounded-pill bg-gradient-brand text-[#faf4ff] text-sm font-dm font-500 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-glow"
              aria-label="Télécharger Mood2Fit"
            >
              <Download size={15} strokeWidth={2.5} />
              {navContent.ctaLabel}
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-brand border border-[rgba(247,37,133,0.2)] text-[#faf4ff] hover:border-[rgba(247,37,133,0.5)] transition-colors duration-200"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40 bg-[#080010]/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              className="fixed top-0 right-0 bottom-0 z-50 w-[280px] bg-[#0f0018] border-l border-[rgba(247,37,133,0.15)] flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 h-16 border-b border-[rgba(247,37,133,0.1)]">
                <div className="flex items-center gap-2">
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 rounded-[7px] bg-[#f72585]/40 blur-[6px] scale-110" />
                    <img
                      src="/logo.webp"
                      alt="Mood2Fit logo"
                      width={28}
                      height={28}
                      className="relative z-10 rounded-[7px] object-contain"
                      style={{ filter: "drop-shadow(0 0 4px rgba(247,37,133,0.5))" }}
                    />
                  </div>
                  <span className="font-syne font-700 text-lg">
                    <span className="text-[#faf4ff] uppercase">Mood</span>
                    <span style={{ color: "#f72585" }} className="uppercase">2Fit</span>
                  </span>
                </div>
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-[rgba(250,244,255,0.6)] hover:text-[#faf4ff] transition-colors"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Fermer le menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Drawer links */}
              <nav className="flex-1 px-6 py-8">
                <ul className="space-y-1" role="list">
                  {navContent.links.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 + 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={handleNavClick}
                        className="flex items-center h-12 px-3 rounded-brand text-[rgba(250,244,255,0.7)] hover:text-[#faf4ff] hover:bg-[rgba(247,37,133,0.08)] transition-all duration-200 font-dm font-400 text-base"
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Drawer CTA */}
              <div className="px-6 pb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <Link
                    href={navContent.ctaHref}
                    onClick={handleNavClick}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-brand bg-gradient-brand text-[#faf4ff] font-dm font-500 text-base hover:opacity-90 active:scale-[0.98] transition-all duration-200"
                  >
                    <Download size={16} strokeWidth={2.5} />
                    Télécharger l&apos;app
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}