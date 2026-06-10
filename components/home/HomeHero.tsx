"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

function PhoneHero() {
  return (
    <div className="relative flex items-center justify-center">
      <div
        className="absolute pointer-events-none rounded-[80px]"
        style={{
          inset: "-40px",
          background: "radial-gradient(circle, rgba(247,37,133,0.28), transparent 72%)",
          filter: "blur(45px)",
          opacity: 0.9,
        }}
      />
      <div className="relative z-10" style={{ width: "320px" }}>
        <Image
          src="/mokup/home_mokup.png"
          alt="Mood2Fit app"
          width={320}
          height={690}
          priority
          style={{ width: "100%", height: "auto", objectFit: "contain" }}
        />
      </div>
    </div>
  );
}

export default function HomeHero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/street.jpeg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-55"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.2) 35%, rgba(0,0,0,0.75) 82%, #000 100%)",
          }}
        />
        <div
          className="absolute left-[18%] top-[18%] w-[520px] h-[520px] pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(114,9,183,0.14) 0%, transparent 72%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 lg:px-16">
        <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-2">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -45 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start pt-24 lg:pt-24"
          >
            {/* Titre — clamp responsive */}
            <h1
              className="uppercase text-white w-full"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 900,
                lineHeight: 0.88,
                letterSpacing: "-0.04em",
                fontSize: "clamp(43px, 11vw, 80px)", // ← clé du fix
              }}
            >
              LE MOOD
              <br />EST CONTAGIEUX,
              <br />
              <span style={{ color: "#f72585" }}>RéPANDS-LE.</span>
            </h1>

            {/* Sous-titre + boutons */}
            <div className="mt-6 flex flex-col items-start w-full">

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-white/65"
                style={{ fontSize: "clamp(14px, 3vw, 19px)", fontWeight: 300, letterSpacing: "0.01em" }}
              >
                Connectés par l&apos;effort, portés par le collectif.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                className="mt-8 mb-4 uppercase text-[#f72585]/40"
                style={{ fontSize: "11px", letterSpacing: "0.28em", fontWeight: 500 }}
              >
                Bientôt disponible sur les stores
              </motion.p>

              {/* Boutons — stack sur mobile, row sur desktop */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
              >
                {/* Apple */}
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-full bg-white px-6 py-3 transition-all duration-200 hover:scale-[1.02] w-full sm:w-auto justify-center"
                  style={{ boxShadow: "0 6px 20px rgba(0,0,0,0.28)" }}
                >
                  <Image src="/app/apple.png" alt="Apple" width={24} height={24} />
                  <div className="flex flex-col">
                    <span style={{ fontSize: "9px", color: "rgba(0,0,0,0.55)", lineHeight: 1 }}>
                      Télécharger sur
                    </span>
                    <span style={{ fontSize: "15px", fontWeight: 700, color: "#000" }}>
                      App Store
                    </span>
                  </div>
                </Link>

                {/* Google */}
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-full px-6 py-3 transition-all duration-200 hover:scale-[1.02] w-full sm:w-auto justify-center"
                  style={{
                    background: "#050505",
                    border: "1px solid rgba(255,255,255,0.12)",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
                  }}
                >
                  <Image src="/app/android.png" alt="Google Play" width={24} height={24} />
                  <div className="flex flex-col">
                    <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.55)", lineHeight: 1 }}>
                      Disponible sur
                    </span>
                    <span style={{ fontSize: "15px", fontWeight: 700, color: "#fff" }}>
                      Google Play
                    </span>
                  </div>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT — caché sur mobile */}
          <motion.div
            initial={{ opacity: 0, y: 45 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div style={{ transform: "translateY(200px)" }}>
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <PhoneHero />
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}