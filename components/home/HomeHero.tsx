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
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">

  <div className="absolute inset-0 z-0">
    <Image
      src="/street.jpeg"
      alt=""
      fill
      sizes="100vw"
      className="object-cover opacity-60"
      priority
    />
  </div>

  <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 pt-20 pb-10">
    <div className="grid md:grid-cols-2 gap-12 items-center">

      <motion.div>
        <h1
          className="font-roboto font-900 text-white uppercase leading-[0.88]"
          style={{
            fontSize: "clamp(48px, 6vw, 96px)",
            letterSpacing: "-0.02em"
          }}
        >
          Le sport<br />
          est meilleur<br />
          <span style={{ color: "#f72585" }}>à deux.</span>
        </h1>
      </motion.div>

      <motion.div
        className="hidden md:flex justify-center items-center"
      >
        <div
          className="relative"
          style={{ width: "clamp(180px, 18vw, 320px)" }}
        >
          <Image
            src="/mokup/home_mokup.png"
            alt="Mood2Fit app"
            width={270}
            height={584}
            style={{ width: "100%", height: "auto" }}
            priority
          />
        </div>
      </motion.div>

    </div>
  </div>
</section>
  );
}