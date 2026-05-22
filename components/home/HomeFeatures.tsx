"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const BASE_SLIDES = [
  { id: "mood", num: "01", title: "Ton humeur,\nta séance.", desc: "Que tu sois au top ou dans ta bulle, l'app s'adapte à ton énergie et te propose la séance qu'il te faut.", color: "#f72585", screen: "mood" },
  { id: "matching", num: "02", title: "Le bon\npartenaire.", desc: "Niveau, disponibilités, mood. L'algorithme trouve les profils qui te correspondent vraiment.", color: "#000000", screen: "matching" },
  { id: "challenges", num: "03", title: "Dépasse-toi\nensemble.", desc: "Des défis hebdomadaires solo ou en équipe. Pour progresser et ne jamais lâcher.", color: "#9650CD", screen: "challenges" },
];

// ── Mokups par slide — remplace par les vrais assets quand disponibles
const MOKUP_MAP: Record<string, string> = {
  mood:       "/mokup/mokup_1.png",
  matching:   "/mokup/mokup_5.png",
  challenges: "/mokup/mokup_6.png",
};

const N = BASE_SLIDES.length;

function SlideCard({ s }: { s: typeof BASE_SLIDES[0] }) {
  return (
    <div className="relative rounded-3xl"
      style={{ width: "100%", height: "78vh", background: s.color, boxShadow: `0 40px 100px ${s.color}55, 0 0 0 1px ${s.color}` }}>

      {/* ── DESKTOP ── */}
      <div className="hidden md:flex items-center px-14 h-full">
        <div className="flex flex-col gap-5 max-w-md z-10 relative">
          <span className="font-roboto font-700 text-xs tracking-[0.25em] uppercase text-white/50">{s.num}</span>
          <h2 className="font-roboto font-900 uppercase text-white whitespace-pre-line"
            style={{ fontSize: "clamp(40px, 5vw, 74px)", letterSpacing: "-0.02em", lineHeight: "0.9" }}>
            {s.title}
          </h2>
          <p className="font-roboto font-400 text-white/65 leading-relaxed"
            style={{ fontSize: "clamp(13px, 1.2vw, 15px)", maxWidth: "320px" }}>
            {s.desc}
          </p>
          <div className="h-px w-12" style={{ background: "rgba(255,255,255,0.4)" }} />
        </div>

        {/* Mokup desktop — next/image */}
        <div className="absolute pointer-events-none z-20" style={{ bottom: "-75px", right: "60px", width: "clamp(140px, 15vw, 210px)" }}>
          <Image
            src={MOKUP_MAP[s.id]}
            alt={`Mood2Fit ${s.id}`}
            width={210}
            height={455}
            style={{ width: "100%", height: "auto", objectFit: "contain" }}
          />
        </div>
      </div>

      {/* ── MOBILE ── */}
      <div className="flex md:hidden flex-col h-full px-5 pt-6">
        <div className="flex flex-col gap-3">
          <span className="font-roboto font-700 text-[10px] tracking-[0.25em] uppercase text-white/50">{s.num}</span>
          <h2 className="font-roboto font-900 uppercase text-white whitespace-pre-line"
            style={{ fontSize: "clamp(30px, 9vw, 44px)", letterSpacing: "-0.02em", lineHeight: "0.92" }}>
            {s.title}
          </h2>
          <p className="font-roboto font-400 text-white/65 leading-relaxed text-sm">{s.desc}</p>
        </div>

        {/* Mokup mobile — next/image */}
        <div className="flex justify-center mt-3" style={{ maxWidth: "200px", margin: "12px auto 0" }}>
          <Image
            src={MOKUP_MAP[s.id]}
            alt={`Mood2Fit ${s.id}`}
            width={200}
            height={433}
            style={{ width: "100%", height: "auto", objectFit: "contain" }}
          />
        </div>
      </div>

    </div>
  );
}

export default function HomeFeatures() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (idx: number, direction: number) => { setDir(direction); setCurrent(((idx % N) + N) % N); };
  const handleNav = (delta: number) => { stopAuto(); goTo(current + delta, delta); setTimeout(startAuto, 5000); };
  const startAuto = () => { stopAuto(); autoTimer.current = setInterval(() => { setCurrent(prev => { setDir(1); return (prev + 1) % N; }); }, 5000); };
  const stopAuto = () => { if (autoTimer.current) clearInterval(autoTimer.current); };

  useEffect(() => { startAuto(); return stopAuto; }, []);

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? "60%" : "-60%", scale: 0.97 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? "-60%" : "60%", scale: 0.97 }),
  };

  return (
    <section className="relative h-screen bg-white overflow-hidden flex flex-col items-center justify-center" aria-label="Fonctionnalités Mood2Fit">

      <div className="relative flex items-center justify-center w-full" style={{ height: "clamp(300px, 78vh, 78vh)", clipPath: "inset(0 0 -200px 0)" }}>
        <div className="relative z-10 w-[92vw] md:w-[76vw]">
          <AnimatePresence custom={dir} mode="wait">
            <motion.div key={current} custom={dir} variants={variants} initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
              <SlideCard s={BASE_SLIDES[current]} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Flèches */}
        {[-1, 1].map((delta) => (
          <button key={delta} onClick={() => handleNav(delta)}
            className={`absolute ${delta === -1 ? "left-2 md:left-8" : "right-2 md:right-8"} top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110`}
            style={{ background: "rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.1)" }}
            aria-label={delta === -1 ? "Précédent" : "Suivant"}>
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <path d={delta === -1 ? "M11 4L6 9L11 14" : "M7 4L12 9L7 14"} stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ))}
      </div>

      {/* Dots */}
      <div className="flex items-center gap-3 mt-8 z-20">
        {BASE_SLIDES.map((_s, i) => (
          <button key={i} onClick={() => { stopAuto(); goTo(i, i > current ? 1 : -1); setTimeout(startAuto, 5000); }}
            aria-label={`Slide ${i + 1}`} className="rounded-full transition-all duration-300"
            style={{ width: i === current ? 28 : 8, height: 8, background: i === current ? BASE_SLIDES[current].color : "rgba(0,0,0,0.15)" }} />
        ))}
      </div>

    </section>
  );
}