"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, Loader2, Bell, ChevronRight, ChevronLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import ResponsiveBg from "@/components/ResponsiveBg";
import Footer from "@/components/Footer";

// ---- Types ----
type Article = {
  id: string;
  title: string;
  description: string;
  url: string;
  image: string;
  source: string;
  publishedAt_fr: string;
  read: string;
  category: string;
  lang?: string;
};

// ---- Catégories affichées (ordre + labels FR) ----
const categories = [
  { id: "humeur",     label: "Par humeur" },
  { id: "equipe",     label: "Trouve ton partenaire" },
  { id: "tendances",  label: "Tendances sport" },
  { id: "sante",      label: "Conseils & bien-être" },
  { id: "nutrition",  label: "Nutrition" },
  { id: "evenements", label: "Événements" },
];

// ---- Schéma newsletter ----
const schema = z.object({ email: z.string().email("Email invalide") });
type FormData = z.infer<typeof schema>;

// ============================================================
// NEWSLETTER BANNER
// ============================================================
function NewsletterBanner() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });
  const onSubmit = async (data: FormData) => {
  try {
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: data.email }),
    });
    if (res.ok || res.status === 409) {
      setSubmitted(true);
    }
  } catch {}
};
  return (
    <div className="mt-20 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row md:items-center gap-8" style={{ background: "#f72585" }}>
      <div className="flex flex-col gap-3 flex-1">
        <h2 className="font-roboto font-900 uppercase text-white leading-[0.9] tracking-[-0.03em]" style={{ fontSize: "clamp(28px, 4vw, 52px)" }}>
          Dans la boucle avant tout le monde.
        </h2>
        <p className="font-roboto font-400 text-white/70 text-sm max-w-md">Chaque semaine, l'essentiel de la communauté Mood2Fit. Zéro bruit.</p>
      </div>
      <div className="flex-shrink-0 w-full md:w-[380px]">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div key="ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 text-white">
              <CheckCircle size={22} />
              <span className="font-roboto font-700 text-sm">Tu es dans la boucle !</span>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={handleSubmit(onSubmit)} className="flex gap-3" noValidate>
              <input type="email" placeholder="ton@email.com"
                className="flex-1 px-5 py-3.5 rounded-full font-roboto font-400 text-black placeholder-black/35 focus:outline-none text-sm bg-white"
                {...register("email")} />
              <button type="submit" disabled={isSubmitting}
                className="flex-shrink-0 flex items-center gap-2 px-6 py-3.5 rounded-full font-roboto font-700 text-sm text-[#f72585] bg-white hover:scale-[1.03] active:scale-[0.97] transition-all disabled:opacity-50"
                style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
                {isSubmitting ? <Loader2 size={15} className="animate-spin" /> : <><Bell size={15} />S'abonner</>}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
        {errors.email && <p className="font-roboto text-xs text-white mt-2">{errors.email.message}</p>}
      </div>
    </div>
  );
}

// ============================================================
// CARD
// ============================================================
function Card({ item }: { item: Article }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-shrink-0 w-[300px] md:w-[320px] flex flex-col cursor-pointer group/card overflow-hidden rounded-2xl relative"
      style={{
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        minHeight: "280px",
        textDecoration: "none",
      }}
    >
      {/* Image de fond */}
      {item.image ? (
        <div className="absolute inset-0 z-0">
          <img
            src={item.image}
            alt=""
            loading="lazy"
            aria-hidden="true"
            sizes="(max-width: 768px) 300px, 320px"
            className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
          />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.88) 100%)" }}
          />
        </div>
      ) : (
        <div className="absolute inset-0 z-0" style={{ background: "#f7f4fb" }} />
      )}

      {/* Contenu */}
      <div className="relative z-10 flex flex-col h-full p-5 gap-3">
        {/* Source + date */}
        <div className="flex items-center justify-between">
          <span className="font-roboto font-700 text-[11px] tracking-[0.15em] uppercase px-2.5 py-1 rounded-full"
            style={{
              background: item.image ? "rgba(247,37,133,0.85)" : "rgba(247,37,133,0.08)",
              color: item.image ? "#fff" : "#f72585",
            }}>
            {item.source}
          </span>
          <div className="flex items-center gap-2">
            {/* Badge FR / ANG */}
            {item.lang && (
              <span className="font-roboto font-700 text-[13px] tracking-[0.1em] uppercase px-1.5 py-0.5 rounded"
                style={{
                  background: item.lang === "FR" ? "rgba(0,122,255,0.15)" : "rgba(255,255,255,0.15)",
                  color: item.lang === "FR" ? (item.image ? "#fff" : "#007AFF") : (item.image ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.4)"),
                }}>
                {item.lang === "FR" ? "🇫🇷" : "🇬🇧"}
              </span>
            )}
            <span className="font-roboto text-[11px] font-500"
              style={{ color: item.image ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.3)" }}>
              {item.publishedAt_fr}
            </span>
          </div>
        </div>

        {/* Titre */}
        <h3 className="font-roboto font-700 leading-tight mt-auto transition-colors duration-200"
          style={{ fontSize: "16px", color: item.image ? "#f72585" : "#000" }}>
          {item.title}
        </h3>

        {/* Description */}
        <p className="font-roboto font-400 leading-relaxed line-clamp-3"
          style={{ fontSize: "13px", color: item.image ? "rgba(255,255,255,0.72)" : "rgba(0,0,0,0.55)" }}>
          {item.description}
        </p>

        {/* Footer Lire */}
        <div className="flex items-center gap-2 pt-3 opacity-70 group-hover/card:opacity-100 transition-all duration-200"
          style={{ borderTop: `1px solid ${item.image ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.06)"}` }}>
          <span className="font-roboto font-700 text-[11px] uppercase tracking-[0.1em] group-hover/card:text-[#f72585] transition-colors duration-200"
            style={{ color: item.image ? "#fff" : "rgba(0,0,0,0.4)" }}>
            Lire
          </span>
          <ArrowRight size={13}
            className="group-hover/card:translate-x-1 transition-all duration-200"
            style={{ color: item.image ? "#fff" : "rgba(0,0,0,0.3)" }} />
        </div>
      </div>
    </a>
  );
}

// ============================================================
// ROW SCROLLABLE
// ============================================================
function ContentRow({ catId, rows }: { catId: string; rows: Record<string, Article[]> }) {
  const items: Article[] = rows[catId] || [];
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: "left" | "right") =>
    scrollRef.current?.scrollBy({ left: dir === "right" ? 340 : -340, behavior: "smooth" });

  if (items.length === 0) return (
    <p className="font-roboto text-sm text-black/30 py-4">Aucun article disponible pour le moment.</p>
  );

  return (
    <div className="relative group/row">
      <button onClick={() => scroll("left")} aria-label="Gauche"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-200 hover:scale-110"
        style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.12)", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
        <ChevronLeft size={16} className="text-black" />
      </button>
      <div ref={scrollRef} className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
        {items.map((item) => <Card key={item.id} item={item} />)}
      </div>
      <button onClick={() => scroll("right")} aria-label="Droite"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-200 hover:scale-110"
        style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.12)", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
        <ChevronRight size={16} className="text-black" />
      </button>
    </div>
  );
}

// ============================================================
// HERO
// ============================================================
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const darkness = useTransform(scrollYProgress, [0, 1], ["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0px", "-80px"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ResponsiveBg priority={true} />
      <motion.div className="absolute inset-0 z-[1]" style={{ background: darkness }} />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 flex flex-col items-center text-center gap-6 px-6 max-w-4xl mx-auto pt-20"
      >
        <h1 className="font-roboto font-900 uppercase leading-[0.9] text-white"
          style={{ letterSpacing: "-0.02em", fontSize: "clamp(56px, 10vw, 130px)", textShadow: "0 2px 20px rgba(0,0,0,0.25)" }}>
          Tout ce qui<br />
          <span style={{ color: "#f72585" }}>se passe.</span>
        </h1>
        <p className="font-roboto font-400 max-w-lg" style={{ fontSize: "clamp(15px, 1.5vw, 18px)", color: "rgba(255,255,255,0.7)" }}>
          Tips, témoignages, tendances et événements. Le fil de la communauté.
        </p>
      </motion.div>
    </section>
  );
}

// ============================================================
// PAGE PRINCIPALE
// ============================================================
export default function ActualitePage() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [rows, setRows] = useState<Record<string, Article[]>>({});
  const [loading, setLoading] = useState(true);

  // ── Fetch articles depuis public/articles.json ──
  useEffect(() => {
    fetch("/api/articles")
      .then((res) => res.json())
      .then((data) => {
        setRows(data.articles || {});
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const visibleCategories = activeFilter
    ? categories.filter(c => c.id === activeFilter)
    : categories;

  return (
    <>
      <Navbar />
      <main style={{ background: "#fff", minHeight: "100vh", position: "relative", zIndex: 1 }}>

        <HeroSection />

        {/* FILTRES STICKY */}
        <div className="sticky top-0 z-30 px-6 md:px-16 py-5"
          style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(24px)", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
          <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            <button onClick={() => setActiveFilter(null)}
              className="flex-shrink-0 px-5 py-2 rounded-full font-roboto font-700 text-sm transition-all duration-200"
              style={{ background: activeFilter === null ? "#000" : "rgba(0,0,0,0.07)", color: activeFilter === null ? "#fff" : "rgba(0,0,0,0.6)" }}>
              Tout
            </button>
            {categories.map((cat) => (
              <button key={cat.id}
                onClick={() => setActiveFilter(activeFilter === cat.id ? null : cat.id)}
                className="flex-shrink-0 px-5 py-2 rounded-full font-roboto font-700 text-sm transition-all duration-200 whitespace-nowrap"
                style={{ background: activeFilter === cat.id ? "#f72585" : "rgba(0,0,0,0.07)", color: activeFilter === cat.id ? "#fff" : "rgba(0,0,0,0.6)" }}>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* CONTENU */}
        <div className="px-6 md:px-16 max-w-7xl mx-auto py-10 flex flex-col gap-12">

          {/* État de chargement */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={32} className="animate-spin text-[#f72585]" />
            </div>
          ) : (
            visibleCategories.map((cat, i) => (
              <motion.section key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.04 }}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-roboto font-700 text-black" style={{ fontSize: "16px" }}>
                    {cat.label}
                  </h2>
                  <Link href="#" className="font-roboto font-700 text-[10px] tracking-[0.12em] uppercase text-black/30 hover:text-black transition-colors duration-200">
                    Tout afficher
                  </Link>
                </div>
                <ContentRow catId={cat.id} rows={rows} />
              </motion.section>
            ))
          )}

          <NewsletterBanner />
        </div>

        <div className="h-16" />
      </main>
      <Footer />
    </>
  );
}