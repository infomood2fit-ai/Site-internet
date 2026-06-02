"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BASE = [
  {
    id: "t1",
    quote: "Mood2Fit m'a redonné une raison de remettre mes baskets. Je n'ai pas annulé une seule séance depuis.",
    name: "Inès", city: "Lyon", sport: "Musculation 💪",
    color: "#f72585", streak: "3 mois", initials: "IN",
  },
  {
    id: "t2",
    quote: "Un groupe de street workout trouvé en 20 minutes. On s'entraîne ensemble depuis 3 mois. Mon niveau a explosé.",
    name: "Karim", city: "Paris 19e", sport: "Street Workout 🏋️",
    color: "#9C1A8A", streak: "12 semaines", initials: "KA",
  },
  {
    id: "t3",
    quote: "J'attends le vendredi pour le run avec Léa. C'est devenu mon rituel préféré de la semaine.",
    name: "Maxime", city: "Bordeaux", sport: "Running 🏃",
    color: "#7209b7", streak: "9 semaines", initials: "MA",
  },
  {
    id: "t4",
    quote: "Premier cours HIIT en groupe trouvé sur Mood2Fit. Tout le monde était bienveillant. Je reviens chaque vendredi.",
    name: "Sofia", city: "Paris 15e", sport: "HIIT 🔥",
    color: "#4cc9f0", streak: "6 semaines", initials: "SO",
  },
];

const N = BASE.length;

export default function HomeCommunity() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (idx: number, direction: number) => {
    setDir(direction);
    setCurrent(((idx % N) + N) % N);
  };

  const handleNav = (delta: number) => {
    stopAuto();
    goTo(current + delta, delta);
    setTimeout(startAuto, 4000);
  };

  const startAuto = () => {
    stopAuto();
    autoTimer.current = setInterval(() => {
      setCurrent(prev => {
        setDir(1);
        return (prev + 1) % N;
      });
    }, 4000);
  };

  const stopAuto = () => {
    if (autoTimer.current) clearInterval(autoTimer.current);
  };

  useEffect(() => {
    startAuto();
    return stopAuto;
  }, []);

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 80 : -80 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -80 : 80 }),
  };

  const t = BASE[current];

  return (
    <section style={{ background: "#fff" }} className="py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-16">

        <div className="flex items-end justify-between mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-roboto font-900 uppercase leading-[0.88] tracking-[-0.03em] text-black"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            Pas des avis.<br />
            <span style={{ color: "#f72585" }}>Des vraies histoires.</span>
          </motion.h2>

          <div className="hidden md:flex items-center gap-3">
            {[-1, 1].map((delta) => (
              <button
                key={delta}
                onClick={() => handleNav(delta)}
                className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
                style={{ border: "1.5px solid rgba(0,0,0,0.15)" }}
                aria-label={delta === -1 ? "Précédent" : "Suivant"}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d={delta === -1 ? "M10 3L5 8L10 13" : "M6 3L11 8L6 13"}
                    stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                  />
                </svg>
              </button>
            ))}
          </div>
        </div>

        <div className="relative flex items-center justify-center" style={{ minHeight: "320px" }}>

          <div
            className="hidden md:block absolute select-none"
            style={{ left: "0", width: "360px", opacity: 0.35, transform: "scale(0.92)", pointerEvents: "none", zIndex: 1 }}
          >
            <Card t={BASE[((current - 1) + N) % N]} isActive={false} />
          </div>

          <div className="relative z-10" style={{ width: "420px", maxWidth: "100%" }}>
            <AnimatePresence custom={dir} mode="wait">
              <motion.div
                key={current}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card t={t} isActive={true} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div
            className="hidden md:block absolute select-none"
            style={{ right: "0", width: "360px", opacity: 0.35, transform: "scale(0.92)", pointerEvents: "none", zIndex: 1 }}
          >
            <Card t={BASE[(current + 1) % N]} isActive={false} />
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 mt-8">
          {BASE.map((_, i) => (
            <button
              key={i}
              onClick={() => { handleNav(i - current); }}
              aria-label={`Témoignage ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? 32 : 24,
                height: 24,
                background: i === current ? "#f72585" : "rgba(0,0,0,0.15)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ t, isActive }: { t: typeof BASE[0]; isActive: boolean }) {
  return (
    <div
      className="flex flex-col justify-between p-7"
      style={{
        borderRadius: "20px",
        background: isActive ? "#000" : "#f7f4fb",
        minHeight: "280px",
      }}
    >
      <p className="font-roboto font-400 leading-relaxed italic"
        style={{ fontSize: "16px", color: isActive ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.8)" }}>
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="flex items-center justify-between mt-6 pt-5"
        style={{ borderTop: `1px solid ${isActive ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}` }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center font-roboto font-700 text-white text-xs flex-shrink-0"
            style={{ background: `linear-gradient(135deg, ${t.color}, #7209b7)` }}>
            {t.initials}
          </div>
          <div>
            <p className="font-roboto font-700 text-sm" style={{ color: isActive ? "#fff" : "#000" }}>
              {t.name} · {t.city}
            </p>
            <p className="font-roboto text-xs mt-0.5" style={{ color: isActive ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)" }}>
              {t.sport}
            </p>
          </div>
        </div>
        <span
          className="font-roboto font-700 text-[10px] tracking-[0.1em] uppercase px-2.5 py-1.5 rounded-full flex-shrink-0"
          style={{
            background: "#fff",
            color: t.color,
            border: `1px solid ${t.color}40`,
          }}
        >
          {t.streak}
        </span>
      </div>
    </div>
  );
}