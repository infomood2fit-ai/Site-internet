"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import ResponsiveBg from "@/components/ResponsiveBg";
import Footer from "@/components/Footer";

const SLIDES = [
  {
    id: "home", bg: "#f72585", img: "/home.png", label: "HOME · ACCUEIL", num: "01 / 03",
    left: [
      { id:"l1", num:"01 — MOOD",        title:"Je suis chaud",              desc:"T'as l'énergie, faut pas la gâcher. C'est le mood pour aller chercher quelque chose que t'avais jamais fait.",  tx:0.2,  ty:0.25 },
      { id:"l2", num:"02 — MOOD",        title:"Dans ma bulle",              desc:"Focus total. Pas de distraction, juste toi et ta séance. Certains jours, c'est tout ce dont t'as besoin.",       tx:0.4,  ty:0.4  },
      { id:"l3", num:"03 — TEMPORALITÉ", title:"La commu bouge maintenant",  desc:"Vois en temps réel ce que les autres terminent. Rien de plus motivant que de savoir que t'es pas seul.",         tx:0.58, ty:0.60 },
    ],
    right: [
      { id:"r1", num:"04 — MOOD",        title:"À mon rythme",               desc:"Pas besoin d'être au max pour s'entraîner. Calme aussi, c'est un mood. L'important c'est d'y aller.",            tx:0.55, ty:0.25 },
      { id:"r2", num:"05 — MOOD",        title:"Me dépasser",                desc:"T'es là pour souffrir aujourd'hui ? Parfait. L'app le sait et te donne ce qu'il faut pour aller au bout.",        tx:0.55, ty:0.4  },
      { id:"r3", num:"06 — SIGNALEMENT", title:"Un problème ? Tu nous le dis.", desc:"Un bug, un truc qui cloche, le drapeau est là. On préfère le savoir plutôt que tu restes bloqué.",            tx:0.62, ty:0.79 },
    ],
  },
  {
    id: "seance", bg: "#0A0A0F", img: "/sceance.png", label: "SÉANCES · TRAIN", num: "02 / 03",
    left: [
      { id:"l1", num:"01 — DÉFI XP",    title:"Un défi t'attend cette semaine.", desc:"Chaque semaine un nouveau challenge. Relève-le, gagne des XP, monte de niveau.",          tx:0.4,  ty:0.32 },
      { id:"l2", num:"02 — CONNEXION",  title:"Connecte-toi, tout s'ouvre.",     desc:"Tes progrès, tes défis, ton historique, tout est là dès que tu te connectes.",             tx:0.48, ty:0.4  },
      { id:"l3", num:"03 — FILTRES",    title:"Ta séance, tes règles.",           desc:"Niveau, durée, groupe musculaire, filtre et trouve exactement ce dont t'as besoin.",       tx:0.4,  ty:0.48 },
    ],
    right: [
      { id:"r1", num:"04 — TOUT EN UN COUP D'ŒIL", title:"Tu sais ce qui t'attend.",            desc:"Type, durée, niveau, XP, tout est affiché avant même que tu commences.",          tx:0.5,  ty:0.76 },
      { id:"r2", num:"05 — DÉMARRER ",             title:"Pas d'excuse. Un bouton.",             desc:"Mode libre, zéro programme imposé. T'as envie de bouger ? C'est parti.",          tx:0.48, ty:0.6  },
      { id:"r3", num:"06 — MOTIVATION ",           title:"Quelqu'un s'entraîne là, maintenant.", desc:"Vois en direct qui est en séance. Parfois, c'est tout ce qu'il faut pour se lancer.", tx:0.55, ty:0.80 },
    ],
  },
  {
    id: "profil", bg: "#9650CD", img: "/profil.jpeg", label: "PROFIL · YOU", num: "03 / 03",
    left: [
      { id:"l1", num:"01 — XP & NIVEAU", title:"Tu progresses, on le voit.",     desc:"Chaque séance compte. La barre d'XP te montre exactement où t'en es dans ton parcours.",  tx:0.38, ty:0.23  },
      { id:"l2", num:"02 — SÉANCES",     title:"Tes séances, ton histoire.",      desc:"Un compteur qui grandit avec toi. Chaque entraînement terminé s'ajoute à ton palmarès.",   tx:0.39, ty:0.31  },
      { id:"l3", num:"03 — ÉDITER",      title:"Ton profil, c'est toi.",          desc:"Pseudo, photo, disciplines, personnalise tout en un tap. C'est ton espace, fais-en ce que tu veux.", tx:0.62, ty:0.158 },
    ],
    right: [
      { id:"r1", num:"04 — POSTS",     title:"Ce que tu partages reste.",         desc:"Tous tes posts, réunis au même endroit. Ta trace dans la communauté.",                     tx:0.5,  ty:0.3  },
      { id:"r2", num:"05 — RÉACTIONS", title:"T'as motivé des gens.",             desc:"Chaque réaction que t'as laissée, c'est quelqu'un que t'as encouragé. Ça compte plus qu'on croit.", tx:0.58, ty:0.31 },
      { id:"r3", num:"06 — BADGES",    title:"Les défis que t'as relevés.",        desc:"Chaque badge raconte quelque chose. Un effort, un palier, un moment où t'as pas lâché.", tx:0.38, ty:0.54 },
    ],
  },
];

const COLORS_LIGHT = ["#fff","#fff","#fff","#fff","#fff","#fff"];
const COLORS_DARK  = ["#f72585","#9650CD","#f72585","#9650CD","#f72585","#9650CD"];
const NUM_COLORS_LIGHT  = ["#ffb3d1","#ffb3d1","#ffb3d1","#ffb3d1","#ffb3d1","#ffb3d1"];
const NUM_COLORS_DARK   = ["#ff6eb4","#ff6eb4","#ff6eb4","#ff6eb4","#ff6eb4","#ff6eb4"];
const NUM_COLORS_VIOLET = ["#d4aaff","#d4aaff","#d4aaff","#d4aaff","#d4aaff","#d4aaff"];

const activities = [
  { name: "Musculation", desc: "Force & hypertrophie" },
  { name: "Street Workout", desc: "Callisthénie urbaine" },
  { name: "Powerlifting", desc: "Force maximale" },
  { name: "Callisthénie", desc: "Poids du corps" },
  { name: "HIIT", desc: "Cardio intensif" },
  { name: "CrossFit", desc: "Fonctionnel" },
  { name: "Running", desc: "Endurance" },
  { name: "Cyclisme", desc: "Route & piste" },
  { name: "Yoga", desc: "Corps & esprit" },
  { name: "Boxe", desc: "Combat & cardio" },
  { name: "Marche à pied", desc: "Cardio & bien-être" },
  { name: "Et plus encore...", desc: "Toutes disciplines" },
];

function Dot({ imgRef, tx, ty, color }: {
  imgRef: React.RefObject<HTMLImageElement | null>;
  tx: number; ty: number; color: string;
}) {
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);

  const compute = useCallback(() => {
    const img = imgRef.current;
    if (!img) return;
    const imgRect = img.getBoundingClientRect();
    const parent = img.parentElement;
    if (!parent) return;
    const parentRect = parent.getBoundingClientRect();
    setPos({
      left: imgRect.left - parentRect.left + tx * imgRect.width,
      top:  imgRect.top  - parentRect.top  + ty * imgRect.height,
    });
  }, [imgRef, tx, ty]);

  useEffect(() => {
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [compute]);

  if (!pos) return null;
  return (
    <motion.div className="absolute z-20 pointer-events-none"
      style={{ left: pos.left, top: pos.top, transform: "translate(-50%,-50%)" }}
      initial={{ opacity:0, scale:0 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0 }}>
      <motion.div className="rounded-full"
        style={{ width:16, height:16, background: color, boxShadow:`0 0 14px 5px ${color}80` }}
        animate={{ scale:[1,1.5,1], opacity:[1,0.6,1] }}
        transition={{ duration:0.9, repeat:Infinity, ease:"easeInOut" }} />
    </motion.div>
  );
}

function Slide({ s }: { s: typeof SLIDES[0] }) {
  const imgDesktopRef = useRef<HTMLImageElement>(null);
  const imgMobileRef  = useRef<HTMLImageElement>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const isDark      = s.bg === "#0A0A0F";
  const titleColors = isDark ? COLORS_DARK : COLORS_LIGHT;
  const numColors   = s.bg === "#0A0A0F" ? NUM_COLORS_DARK : s.bg === "#9650CD" ? NUM_COLORS_VIOLET : NUM_COLORS_LIGHT;
  const dotColor    = isDark ? "#f72585" : "rgba(255,210,0,0.95)";

  useEffect(() => { setActiveIdx(null); }, [s.id]);

  const allBubbles = [...s.left, ...s.right];

  const renderCard = (b: typeof s.left[0], idx: number, side: "left" | "right") => (
    <motion.div key={b.id} onClick={() => setActiveIdx(prev => prev === idx ? null : idx)}
      initial={{ opacity: 0, x: side === "left" ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: (idx % 3) * 0.08 }}
      style={{
        background: activeIdx === idx ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.2)",
        border: `1px solid ${activeIdx === idx ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.12)"}`,
        borderRadius: "6px", padding: "12px 14px", cursor: "pointer",
        transition: "background 0.2s, border 0.2s",
      }}>
      <p style={{ fontFamily:"Roboto,sans-serif", fontWeight:700, fontSize:"8px", letterSpacing:"0.2em", textTransform:"uppercase", color:numColors[idx], marginBottom:"5px" }}>
        — {b.num}
      </p>
      <p style={{ fontFamily:"Roboto,sans-serif", fontWeight:900, fontSize:"clamp(12px,1vw,15px)", color:titleColors[idx], lineHeight:1.1, letterSpacing:"-0.01em", marginBottom:"5px", textTransform:"uppercase" }}>
        {b.title}
      </p>
      <p style={{ fontFamily:"Roboto,sans-serif", fontWeight:400, fontSize:"clamp(9px,0.7vw,11px)", color:"rgba(255,255,255,0.7)", lineHeight:1.5 }}>
        {b.desc}
      </p>
    </motion.div>
  );

  return (
    <div className="relative w-full h-full flex flex-col">

      {/* ── Zone centrale desktop ── */}
      <div className="hidden md:flex flex-1 items-stretch gap-8 px-8 min-h-0">
        <div className="flex flex-col flex-shrink-0" style={{ width: "26%", paddingLeft: "1%", paddingRight: "2%", justifyContent: "space-between", paddingTop: "5%", paddingBottom: "5%" }}>
          {s.left.map((b, i) => renderCard(b, i, "left"))}
        </div>

        <div className="relative flex-1 flex justify-center items-center h-full min-h-0">
          <AnimatePresence mode="wait">
            <motion.div key={`mokup-${s.id}`} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.3 }}
              className="relative h-[90%] flex items-center justify-center">
              <img
                ref={imgDesktopRef}
                src={s.id === "home" ? "/mokup/mokup_1.png" : s.id === "seance" ? "/mokup/mokup_2.png" : "/mokup/mokup_3.png"}
                alt={`Mockup ${s.label}`}
                style={{ height: "100%", width: "auto", objectFit: "contain", display: "block" }}
              />
              <AnimatePresence>
                {activeIdx !== null && (
                  <Dot key={`dot-${activeIdx}-${s.id}`} imgRef={imgDesktopRef} tx={allBubbles[activeIdx].tx} ty={allBubbles[activeIdx].ty} color={dotColor} />
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-col flex-shrink-0" style={{ width: "26%", paddingLeft: "2%", paddingRight: "1%", justifyContent: "space-between", paddingTop: "5%", paddingBottom: "5%" }}>
          {s.right.map((b, i) => renderCard(b, i + 3, "right"))}
        </div>
      </div>

      {/* ── MOBILE portrait ── */}
      <div className="md:hidden flex flex-col flex-1 min-h-0">

        <div className="flex flex-col items-center text-center flex-shrink-0" style={{ paddingTop:"6px", paddingBottom:"4px" }}>
          <p style={{ fontFamily:"Roboto,sans-serif", fontWeight:400, fontSize:"8px", letterSpacing:"0.25em", textTransform:"uppercase", color: numColors[0], marginBottom:"3px" }}>
            {s.id === "home" ? "ÉCRAN 01 — ACCUEIL" : s.id === "seance" ? "ÉCRAN 02 — SÉANCE" : "ÉCRAN 03 — PROFIL"}
          </p>
          <h2 style={{ fontFamily:"Roboto,sans-serif", fontWeight:900, fontSize:"clamp(16px,4.5vw,22px)", textTransform:"uppercase", letterSpacing:"-0.02em", lineHeight:1, color:"#fff" }}>
            {s.id === "home" ? <><span style={{color:"#fff"}}>L'accueil,</span> ton point de départ</> :
             s.id === "seance" ? <><span style={{color: numColors[0]}}>La séance,</span> ton terrain de jeu</> :
             <><span style={{color:"#fff"}}>Le profil,</span> ton miroir de progrès</>}
          </h2>
        </div>

        <div style={{ flexShrink:0, display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"4px", padding:"4px 4px 0" }}>
          {allBubbles.slice(0, 3).map((b, i) => (
            <motion.div key={b.id} onClick={() => setActiveIdx(prev => prev === i ? null : i)}
              initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.3, delay: i*0.04 }}
              style={{
                background: activeIdx===i ? "rgba(0,0,0,0.45)" : "rgba(0,0,0,0.22)",
                border:`1px solid ${activeIdx===i ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.12)"}`,
                borderRadius:"6px", padding:"8px 9px", cursor:"pointer",
                transition:"background 0.2s, border 0.2s",
              }}>
              <p style={{ fontFamily:"Roboto,sans-serif", fontWeight:700, fontSize:"6px", letterSpacing:"0.15em", textTransform:"uppercase", color:numColors[i], marginBottom:"3px" }}>— {b.num}</p>
              <p style={{ fontFamily:"Roboto,sans-serif", fontWeight:900, fontSize:"9px", color:titleColors[i], lineHeight:1.1, letterSpacing:"-0.01em", marginBottom:"3px", textTransform:"uppercase" }}>{b.title}</p>
              <p style={{ fontFamily:"Roboto,sans-serif", fontWeight:400, fontSize:"7px", color:"rgba(255,255,255,0.65)", lineHeight:1.4 }}>{b.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="relative flex-1 flex justify-center items-center min-h-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div key={`mob-mokup-${s.id}`} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.3 }}
              className="relative h-full flex items-center justify-center">
              <img
                ref={imgMobileRef}
                src={s.id === "home" ? "/mokup/mokup_1.png" : s.id === "seance" ? "/mokup/mokup_2.png" : "/mokup/mokup_3.png"}
                alt={`Mockup ${s.label}`}
                style={{ height:"100%", width:"auto", objectFit:"contain", maxHeight:"80%", display:"block" }}
              />
              <AnimatePresence>
                {activeIdx !== null && (
                  <Dot key={`mob-dot-${activeIdx}-${s.id}`} imgRef={imgMobileRef} tx={allBubbles[activeIdx].tx} ty={allBubbles[activeIdx].ty} color={dotColor} />
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>

        <div style={{ flexShrink:0, display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"4px", padding:"0 4px 5px" }}>
          {allBubbles.slice(3, 6).map((b, i) => (
            <motion.div key={b.id} onClick={() => setActiveIdx(prev => prev === i+3 ? null : i+3)}
              initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.3, delay: i*0.04 }}
              style={{
                background: activeIdx===i+3 ? "rgba(0,0,0,0.45)" : "rgba(0,0,0,0.22)",
                border:`1px solid ${activeIdx===i+3 ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.12)"}`,
                borderRadius:"6px", padding:"8px 9px", cursor:"pointer",
                transition:"background 0.2s, border 0.2s",
              }}>
              <p style={{ fontFamily:"Roboto,sans-serif", fontWeight:700, fontSize:"6px", letterSpacing:"0.15em", textTransform:"uppercase", color:numColors[i+3], marginBottom:"3px" }}>— {b.num}</p>
              <p style={{ fontFamily:"Roboto,sans-serif", fontWeight:900, fontSize:"9px", color:titleColors[i+3], lineHeight:1.1, letterSpacing:"-0.01em", marginBottom:"3px", textTransform:"uppercase" }}>{b.title}</p>
              <p style={{ fontFamily:"Roboto,sans-serif", fontWeight:400, fontSize:"7px", color:"rgba(255,255,255,0.65)", lineHeight:1.4 }}>{b.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}

function FullpageFeatures() {
  const [current, setCurrent] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef(0);
  const isAnimatingRef = useRef(false);

  const goTo = (idx: number) => {
    const el = wrapperRef.current;
    if (!el || isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    currentRef.current = idx;
    setCurrent(idx);
    const top = el.getBoundingClientRect().top + window.scrollY + idx * window.innerHeight;
    window.scrollTo({ top, behavior: "smooth" });
    setTimeout(() => { isAnimatingRef.current = false; }, 900);
  };

  useEffect(() => {
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top > 10 || rect.bottom < window.innerHeight - 10) return;
      const diff = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(diff) < 50) return;
      if (diff > 0 && currentRef.current < SLIDES.length - 1) goTo(currentRef.current + 1);
      else if (diff < 0 && currentRef.current > 0) goTo(currentRef.current - 1);
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top > 10 || rect.bottom < window.innerHeight - 10) return;
      if (e.deltaY > 0 && currentRef.current === SLIDES.length - 1) return;
      if (e.deltaY < 0 && currentRef.current === 0) return;
      e.preventDefault();
      if (isAnimatingRef.current) return;
      if (e.deltaY > 0) goTo(currentRef.current + 1);
      else if (e.deltaY < 0) goTo(currentRef.current - 1);
    };
    const onScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const elTop = el.getBoundingClientRect().top + window.scrollY;
      const elBottom = elTop + el.offsetHeight;
      const isInSlides = window.scrollY >= elTop - window.innerHeight * 0.5
                      && window.scrollY < elBottom - window.innerHeight * 0.5;
      if (!isAnimatingRef.current) {
        if (isInSlides) window.dispatchEvent(new Event("slides-enter"));
        else window.dispatchEvent(new Event("slides-leave"));
      }
      if (isAnimatingRef.current) return;
      const scrolled = window.scrollY - elTop;
      if (scrolled < 0) return;
      const idx = Math.round(scrolled / window.innerHeight);
      const clamped = Math.max(0, Math.min(SLIDES.length - 1, idx));
      if (clamped !== currentRef.current) { currentRef.current = clamped; setCurrent(clamped); }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      window.dispatchEvent(new Event("slides-leave"));
    };
  }, []);

  const s = SLIDES[current];
  const numColors = s.bg === "#0A0A0F" ? NUM_COLORS_DARK : s.bg === "#9650CD" ? NUM_COLORS_VIOLET : NUM_COLORS_LIGHT;

  return (
    <div ref={wrapperRef} style={{ height: `${SLIDES.length * 100}vh` }}>
      <div style={{ position:"sticky", top:0, height:"100vh" }}>
        <AnimatePresence mode="wait">
          <motion.div key={s.id} className="absolute inset-0" style={{ background: s.bg }} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.45 }} />
        </AnimatePresence>

        {s.bg === "#0A0A0F" && (
          <div className="absolute inset-0 pointer-events-none">
            <div style={{ position:"absolute", top:0, left:0, width:"600px", height:"600px", background:"radial-gradient(circle, rgba(114,9,183,0.1) 0%, transparent 70%)" }} />
            <div style={{ position:"absolute", bottom:0, right:0, width:"500px", height:"500px", background:"radial-gradient(circle, rgba(181,23,158,0.07) 0%, transparent 70%)" }} />
          </div>
        )}

        {/* ── Titre desktop — absolute top:8px par rapport au sticky container ── */}
        <div className="hidden md:flex flex-col items-center text-center"
          style={{ position:"absolute", top:"8px", left:0, right:0, zIndex:40 }}>
          <p style={{ fontFamily:"Roboto,sans-serif", fontWeight:400, fontSize:"9px", letterSpacing:"0.3em", textTransform:"uppercase", color: numColors[0], marginBottom:"5px" }}>
            {s.id === "home" ? "ÉCRAN 01 — ACCUEIL" : s.id === "seance" ? "ÉCRAN 02 — SÉANCE" : "ÉCRAN 03 — PROFIL"}
          </p>
          <h2 style={{ fontFamily:"Roboto,sans-serif", fontWeight:900, fontSize:"clamp(20px,2.8vw,38px)", textTransform:"uppercase", letterSpacing:"-0.02em", lineHeight:1, color:"#fff" }}>
            {s.id === "home" ? <><span style={{color:"#fff"}}>L'accueil,</span> ton point de départ</> :
             s.id === "seance" ? <><span style={{color: numColors[0]}}>La séance,</span> ton terrain de jeu</> :
             <><span style={{color:"#fff"}}>Le profil,</span> ton miroir de progrès</>}
          </h2>
        </div>

        {/* Slide — blocs + mockup inchangés */}
        <div className="absolute inset-0 z-10" style={{ padding:"0", paddingTop:"64px" }} id="slide-wrapper">
          <Slide s={s} />
        </div>

        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30">
          {SLIDES.map((_, i) => (
            <div key={i} onClick={() => goTo(i)} className="rounded-full transition-all duration-300 cursor-pointer" style={{ width:5, height: i===current ? 28:5, background: i===current ? "#fff":"rgba(255,255,255,0.3)" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FonctionnalitesPage() {
  return (
    <>
      <Navbar />
      <main style={{ position: "relative", zIndex: 1, backgroundColor: "#080010" }}>
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <ResponsiveBg priority={true} />
          <motion.div initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.9, ease:[0.16,1,0.3,1] }} className="relative z-10 flex flex-col items-center text-center gap-6 px-6 max-w-4xl mx-auto pt-20">
            <h1 className="font-roboto font-900 uppercase leading-[0.92] text-white" style={{ fontSize:"clamp(52px,9vw,120px)", letterSpacing:"-0.02em", textShadow:"0 2px 20px rgba(0,0,0,0.25)", lineHeight:"0.95" }}>
              Conçu pour<br /><span style={{ color:"#f72585" }}>créer du lien.</span>
            </h1>
            <p className="font-roboto font-400 max-w-lg text-center" style={{ fontSize:"clamp(15px,1.5vw,18px)", color:"rgba(255,255,255,0.7)" }}>
              Le sport est le prétexte. Ce qu'on construit vraiment, c'est le lien entre les gens.
            </p>
          </motion.div>
        </section>

        <FullpageFeatures />

        <section style={{ background:"#fff" }} className="py-32 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-[600px] h-[400px] pointer-events-none" style={{ background:"radial-gradient(ellipse, rgba(114,9,183,0.06) 0%, transparent 70%)" }} />
          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16">
            <motion.h2 initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-100px" }} transition={{ duration:0.8, ease:[0.16,1,0.3,1] }} className="font-roboto font-900 uppercase leading-[0.88] tracking-[-0.03em] text-black mb-4" style={{ fontSize:"clamp(40px,5.5vw,72px)" }}>
              Peu importe<br /><span style={{ color:"#f72585" }}>ton sport.</span>
            </motion.h2>
            <p className="font-roboto font-400 text-black/45 mb-16 max-w-md" style={{ fontSize:"clamp(14px,1.4vw,17px)" }}>
              Mood2Fit s'adapte à toutes les disciplines. Peu importe ton sport, tu trouveras des gens qui pratiquent comme toi.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px" style={{ background:"rgba(0,0,0,0.08)" }}>
              {activities.map((a, i) => (
                <motion.div key={a.name} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-50px" }} transition={{ duration:0.5, delay:i*0.04 }} className="flex flex-col gap-1.5 p-6 md:p-8 group cursor-default bg-white" whileHover={{ backgroundColor:"#faf7ff" }}>
                  <span className="font-roboto font-900 text-black group-hover:text-[#f72585] transition-colors duration-200" style={{ fontSize:"clamp(15px,1.6vw,18px)" }}>{a.name}</span>
                  <span className="font-roboto font-400 text-black/35 text-sm">{a.desc}</span>
                  <div className="h-px w-0 group-hover:w-8 transition-all duration-300 mt-1" style={{ background:"#f72585" }} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative flex items-center justify-center overflow-hidden py-40" style={{ background:"#f72585" }}>
          <div className="absolute bottom-0 left-0 w-[500px] h-[400px] pointer-events-none" style={{ background:"radial-gradient(ellipse, rgba(114,9,183,0.25) 0%, transparent 65%)" }} />
          <div className="absolute top-0 right-0 w-[300px] h-[300px] pointer-events-none" style={{ background:"radial-gradient(circle, rgba(181,23,158,0.2) 0%, transparent 70%)" }} />
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <motion.h2 initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.9, ease:[0.16,1,0.3,1] }} className="font-roboto font-900 text-white uppercase leading-[0.85] tracking-[-0.04em] mb-10" style={{ fontSize:"clamp(56px,9vw,120px)" }}>
              Commence<br />maintenant.
            </motion.h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#" className="flex items-center gap-3 px-9 py-4 rounded-full font-roboto font-700 text-sm text-black bg-white hover:scale-[1.03] active:scale-[0.97] transition-all" style={{ boxShadow:"0 8px 40px rgba(0,0,0,0.2)" }}>
                <Image src="/app/apple.png" alt="Apple" width={22} height={22} style={{ objectFit: "contain", filter: "brightness(0)" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
                  <span style={{ fontSize: "9px", color: "rgba(0,0,0,0.5)", lineHeight: 1 }}>Télécharger sur</span>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "#000", lineHeight: 1.2 }}>App Store</span>
                </div>
              </Link>
              <Link href="#" className="flex items-center gap-3 px-9 py-4 rounded-full font-roboto font-700 text-sm text-white border-2 border-black/20 hover:border-black/40 active:scale-[0.97] transition-all" style={{ background: "#000" }}>
                <Image src="/app/android.png" alt="Google Play" width={22} height={22} style={{ objectFit: "contain" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
                  <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.6)", lineHeight: 1 }}>Disponible sur</span>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>Google Play</span>
                </div>
              </Link>
            </div>
            <p className="font-roboto text-xs text-white/40 mt-8 tracking-widest uppercase">Bientôt disponible sur les stores</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}