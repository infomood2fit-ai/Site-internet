"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HomeCta() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#f72585" }}
    >
      {/* Déco fond — texture légère */}
      <div className="absolute inset-0 pointer-events-none opacity-10"
        style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(0,0,0,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.3) 0%, transparent 50%)" }} />

      {/* Logo watermark — next/image */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
        <Image
          src="/logo.webp"
          alt=""
          width={500}
          height={500}
          className="object-contain opacity-[0.07]"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-6xl mx-auto">

        {/* Titre massif */}
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-roboto font-900 text-white uppercase leading-[0.85] tracking-[-0.04em] mb-10"
          style={{ fontSize: "clamp(64px, 12vw, 160px)" }}
        >
          Plus<br />d&apos;excuse.
        </motion.h2>

        {/* Sous-ligne */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-roboto font-400 text-white/75 max-w-md mb-12 leading-relaxed"
          style={{ fontSize: "clamp(15px, 1.6vw, 19px)" }}
        >
          Sois parmi les premiers à rejoindre la communauté.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          {/* App Store — next/image */}
          <Link href="#"
            className="flex items-center gap-3 px-8 py-4 rounded-full font-roboto font-700 text-sm text-black bg-white hover:scale-[1.03] active:scale-[0.97] transition-all duration-150"
            style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.2)" }}
          >
            <Image src="/app/apple.png" alt="Apple" width={28} height={28} style={{ objectFit: "contain" }} />
            <span style={{ fontSize: "15px", fontWeight: 700, color: "#000", fontFamily: "Arial" }}>App Store</span>
          </Link>

          {/* Google Play — next/image */}
          <Link href="#"
            className="flex items-center gap-3 px-8 py-4 rounded-full font-roboto font-700 text-sm text-white active:scale-[0.97] transition-all duration-150"
            style={{ background: "#000", border: "2px solid rgba(255,255,255,0.15)" }}
          >
            <Image src="/app/android.png" alt="Google Play" width={28} height={28} style={{ objectFit: "contain" }} />
            <span style={{ fontSize: "15px", fontWeight: 700, color: "#fff", fontFamily: "Arial" }}>Google Play</span>
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="font-roboto text-xs text-white/40 mt-8 tracking-widest uppercase"
        >
          Bientôt disponible sur les stores
        </motion.p>
      </div>
    </section>
  );
}