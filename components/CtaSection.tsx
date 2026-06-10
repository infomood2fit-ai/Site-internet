"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type CtaVariant = "purple" | "pink" | "black";

interface CtaSectionProps {
  title?: string;
  variant?: CtaVariant;
}

const variantStyles: Record<CtaVariant, { bg: string; titleColor: string; appleFilter: string; appleTextColor: string; playBg: string; playTextColor: string }> = {
  purple: {
    bg: "#9650CD",
    titleColor: "text-white",
    appleFilter: "brightness(0)",
    appleTextColor: "#000",
    playBg: "#000",
    playTextColor: "#fff",
  },
  pink: {
    bg: "#f72585",
    titleColor: "text-white",
    appleFilter: "brightness(0)",
    appleTextColor: "#000",
    playBg: "#000",
    playTextColor: "#fff",
  },
  black: {
    bg: "#0A0A0F",
    titleColor: "text-white",
    appleFilter: "brightness(0) invert(1)",
    appleTextColor: "#fff",
    playBg: "#fff",
    playTextColor: "#000",
  },
};

export default function CtaSection({
  title = "LA COMMU\nT'ATTEND.",
  variant = "purple",
}: CtaSectionProps) {
  const styles = variantStyles[variant];
  const lines = title.split("\n");

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden py-40"
      style={{ background: styles.bg }}
    >
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className={`font-roboto font-900 ${styles.titleColor} uppercase leading-[0.85] tracking-[-0.04em] mb-10`}
          style={{ fontSize: "clamp(56px, 9vw, 120px)" }}
        >
          {lines.map((line, i) => (
            <span key={i}>
              {line}
              {i < lines.length - 1 && <br />}
            </span>
          ))}
        </motion.h2>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* App Store */}
          <Link
            href="#"
            className="flex items-center gap-3 px-9 py-4 rounded-full font-roboto font-700 text-sm bg-white hover:scale-[1.03] active:scale-[0.97] transition-all"
            style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.2)" }}
          >
            <Image
              src="/app/apple.png"
              alt="Apple"
              width={22}
              height={22}
              style={{ objectFit: "contain", filter: styles.appleFilter }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
              <span style={{ fontSize: "9px", color: "rgba(0,0,0,0.5)", lineHeight: 1 }}>
                Télécharger sur
              </span>
              <span style={{ fontSize: "14px", fontWeight: 700, color: styles.appleTextColor, lineHeight: 1.2 }}>
                App Store
              </span>
            </div>
          </Link>

          {/* Google Play */}
          <Link
            href="#"
            className="flex items-center gap-3 px-9 py-4 rounded-full font-roboto font-700 text-sm border-2 border-black/20 hover:border-black/40 active:scale-[0.97] transition-all"
            style={{ background: styles.playBg }}
          >
            <Image
              src="/app/android.png"
              alt="Google Play"
              width={22}
              height={22}
              style={{ objectFit: "contain" }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
              <span style={{ fontSize: "9px", color: `${styles.playTextColor}99`, lineHeight: 1 }}>
                Disponible sur
              </span>
              <span style={{ fontSize: "14px", fontWeight: 700, color: styles.playTextColor, lineHeight: 1.2 }}>
                Google Play
              </span>
            </div>
          </Link>
        </div>

        <p className="font-roboto text-xs text-white/40 mt-8 tracking-widest uppercase">
          Bientôt disponible sur les stores
        </p>
      </div>
    </section>
  );
}