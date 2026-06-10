"use client";

import { motion } from "framer-motion";
import ResponsiveBg from "@/components/ResponsiveBg";

interface HeroSectionProps {
  whiteLine: string;
  pinkLine: string;
  subtitle: string;
  priority?: boolean;
}

export default function HeroSection({ whiteLine, pinkLine, subtitle, priority = false }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ResponsiveBg priority={priority} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center text-center gap-6 px-6 max-w-5xl mx-auto pt-20"
      >
        <h1
          className="font-roboto font-900 uppercase leading-[0.9] text-white"
          style={{
            letterSpacing: "-0.02em",
            fontSize: "clamp(56px, 10vw, 130px)",
            textShadow: "0 2px 20px rgba(0,0,0,0.25)",
          }}
        >
          {whiteLine}
          <br />
          <span style={{ color: "#f72585" }}>{pinkLine}</span>
        </h1>
        <p
          className="font-roboto font-400 max-w-lg text-center"
          style={{ fontSize: "clamp(15px, 1.5vw, 18px)", color: "rgba(255,255,255,0.7)" }}
        >
          {subtitle}
        </p>
      </motion.div>
    </section>
  );
}