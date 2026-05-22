"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

function PhoneHero() {
  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute rounded-[60px] pointer-events-none"
        style={{ inset: "-30px", background: "radial-gradient(circle, rgba(247,37,133,0.3), transparent 70%)", filter: "blur(40px)", opacity: 0.8 }} />
      <div className="relative" style={{ width: "clamp(160px, 21vw, 360px)", zIndex: 1 }}>
        <Image
          src="/mokup/home_mokup.png"
          alt="Mood2Fit app"
          width={270}
          height={584}
          style={{ width: "100%", height: "auto" }}
          priority
        />
      </div>
    </div>
  );
}

export default function HomeHero() {
  return (
    <section className="relative h-screen flex items-center overflow-hidden bg-black">

      {/* Fond street.jpeg */}
      <div className="absolute inset-0 z-0">
        <Image src="/street.jpeg" alt="" fill className="object-cover opacity-60" priority />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.7) 85%, #000 100%)" }} />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(114,9,183,0.15) 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 pt-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Gauche — texte */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start text-left gap-6"
          >
            <h1 className="font-roboto font-900 text-white uppercase leading-[0.88]"
              style={{ fontSize: "clamp(52px, 7vw, 110px)", letterSpacing: "-0.02em" }}>
              Le sport<br />est meilleur<br />
              <span style={{ color: "#f72585" }}>à deux.</span>
            </h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
              className="font-roboto font-300 text-white/60 tracking-wide"
              style={{ fontSize: "clamp(14px, 1.5vw, 18px)" }}>
              Connectés par l&apos;effort, portés par le collectif.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}
              className="flex gap-3">
              <Link href="#" className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-white hover:bg-white/90 active:scale-[0.97] transition-all duration-150" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.2)" }}>
                <Image src="/app/apple.png" alt="Apple" width={22} height={22} style={{ objectFit: "contain", width: "22px", height: "22px" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
                  <span style={{ fontSize: "9px", color: "rgba(0,0,0,0.5)", lineHeight: 1 }}>Télécharger sur</span>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "#000", lineHeight: 1.2 }}>App Store</span>
                </div>
              </Link>
              <Link href="#" className="flex items-center gap-2.5 px-6 py-3 rounded-full active:scale-[0.97] transition-all duration-150" style={{ background: "#000", border: "2px solid rgba(255,255,255,0.15)" }}>
                <Image src="/app/android.png" alt="Google Play" width={22} height={22} style={{ objectFit: "contain", width: "22px", height: "22px" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
                  <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.6)", lineHeight: 1 }}>Disponible sur</span>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>Google Play</span>
                </div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Droite — téléphone semi-visible */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:flex justify-center items-end"
            style={{ position: "relative", bottom: "-25%" }}
          >
            <motion.div animate={{ y: [0, -16, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}>
              <PhoneHero />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}