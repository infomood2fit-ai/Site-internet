"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, MapPin } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import ResponsiveBg from "@/components/ResponsiveBg";
import Footer from "@/components/Footer";

const feedPosts = [
  {
    id: "p1",
    user: { name: "Karim B.", city: "Paris 19e", initials: "KB", color: "#f72585" },
    time: "il y a 2h", sport: "Street Workout",
    content: "Séance de dips + tractions au parc des Buttes-Chaumont. On était 4 ce matin grâce à Mood2Fit. Ambiance de folie.",
    likes: 47, comments: 12,
  },
  {
    id: "p2",
    user: { name: "Inès M.", city: "Lyon 6e", initials: "IM", color: "#7209b7" },
    time: "il y a 5h", sport: "Musculation",
    content: "3 mois que je m'entraîne avec Sofia. On s'est trouvées via l'app un soir où j'allais annuler ma séance. Aujourd'hui on a battu notre record sur le squat.",
    likes: 89, comments: 23,
  },
  {
    id: "p3",
    user: { name: "Maxime L.", city: "Bordeaux", initials: "ML", color: "#4cc9f0" },
    time: "il y a 1j", sport: "Running",
    content: "10km avec Léa ce matin. On parle autant qu'on court — c'est ça la magie. Le sport devient un prétexte pour de vraies conversations.",
    likes: 134, comments: 31,
  },
  {
    id: "p4",
    user: { name: "Sofia R.", city: "Paris 15e", initials: "SR", color: "#06d6a0" },
    time: "il y a 2j", sport: "HIIT",
    content: "Premier cours HIIT en groupe trouvé sur Mood2Fit. J'avais peur de ne pas être au niveau. Tout le monde était bienveillant. Je reviens vendredi.",
    likes: 62, comments: 18,
  },
];

const testimonials = [
  {
    id: "t1", name: "Inès", city: "Lyon", sport: "Musculation", initials: "IN", color: "#f72585",
    quote: "Mood2Fit m'a redonné une raison de remettre mes baskets. Je n'ai pas annulé une seule séance depuis 3 mois.",
    streak: "3 mois",
  },
  {
    id: "t2", name: "Karim", city: "Paris 19e", sport: "Street Workout", initials: "KA", color: "#b5179e",
    quote: "Un groupe de street workout trouvé en 20 minutes. On s'entraîne ensemble depuis 3 mois. Mon niveau a explosé.",
    streak: "12 semaines",
  },
  {
    id: "t3", name: "Maxime", city: "Bordeaux", sport: "Running", initials: "MA", color: "#7209b7",
    quote: "J'attends le vendredi pour le run avec Léa. C'est devenu mon rituel préféré de la semaine.",
    streak: "9 semaines",
  },
];

const mapUsers = [
  { id: 1, x: 28, y: 35, name: "Lucas", sport: "Muscu", color: "#f72585" },
  { id: 2, x: 45, y: 22, name: "Amina", sport: "CrossFit", color: "#7209b7" },
  { id: 3, x: 62, y: 48, name: "Tom", sport: "Running", color: "#4cc9f0" },
  { id: 4, x: 35, y: 60, name: "Sofia", sport: "HIIT", color: "#06d6a0" },
  { id: 5, x: 72, y: 30, name: "Karim", sport: "Street WO", color: "#b5179e" },
  { id: 6, x: 55, y: 68, name: "Inès", sport: "Muscu", color: "#f72585" },
  { id: 7, x: 20, y: 52, name: "Alex", sport: "Cardio", color: "#7209b7" },
  { id: 8, x: 80, y: 55, name: "Léa", sport: "Yoga", color: "#06d6a0" },
];

const stats = [
  { value: " 70+", label: "membres actifs" },
  { value: "100", label: " séances partagées" },
  { value: "800", label: "park Street-Workout en France" },
  { value: "5 600+", label: "salle de sport en France" },
];

function PostCard({ post }: { post: typeof feedPosts[0] }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-4 p-6 rounded-2xl bg-white"
      style={{ border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-roboto font-700 text-white flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${post.user.color}, #7209b7)` }}>
          {post.user.initials}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-roboto font-700 text-sm text-black">{post.user.name}</span>
            <span className="font-roboto text-xs text-black/35">{post.user.city}</span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="font-roboto text-xs text-black/30">{post.time}</span>
            <span className="font-roboto font-700 text-[10px] tracking-[0.1em] uppercase px-2 py-0.5 rounded-full"
              style={{ background: `${post.user.color}12`, color: post.user.color }}>
              {post.sport}
            </span>
          </div>
        </div>
      </div>
      <p className="font-roboto font-400 text-black/70 leading-relaxed text-sm">{post.content}</p>
      <div className="flex items-center gap-5 pt-2" style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}>
        <button onClick={() => { setLiked(!liked); setLikes(liked ? likes - 1 : likes + 1); }}
          className="flex items-center gap-1.5 font-roboto text-xs transition-colors duration-200"
          style={{ color: liked ? "#f72585" : "rgba(0,0,0,0.35)" }}>
          <Heart size={14} fill={liked ? "#f72585" : "none"} /> {likes}
        </button>
        <button className="flex items-center gap-1.5 font-roboto text-xs text-black/35 hover:text-black/60 transition-colors duration-200">
          <MessageCircle size={14} /> {post.comments}
        </button>
        <button className="flex items-center gap-1.5 font-roboto text-xs text-black/35 hover:text-black/60 transition-colors duration-200 ml-auto">
          <Share2 size={14} /> Partager
        </button>
      </div>
    </motion.div>
  );
}

export default function CommunautePage() {
  const [hoveredUser, setHoveredUser] = useState<typeof mapUsers[0] | null>(null);

  return (
    <>
      <Navbar />
      {/* ── position relative + z-index 1 pour l'effet reveal footer ── */}
      <main style={{ position: "relative", zIndex: 1, backgroundColor: "#080010" }}>

        {/* HERO — plein écran avec fond fonds.png */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <ResponsiveBg priority={true} />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center text-center gap-6 px-6 max-w-4xl mx-auto pt-20"
          >
            <h1 className="font-roboto font-900 uppercase leading-[0.9] text-white"
              style={{ letterSpacing: "-0.02em", fontSize: "clamp(56px, 10vw, 130px)", textShadow: "0 2px 20px rgba(0,0,0,0.25)" }}>
              Seul on va plus vite.<br />
              <span style={{ color: "#f72585" }}>Ensemble on va plus loin.</span>
            </h1>
            <p className="font-roboto font-400 max-w-lg text-center"
              style={{ fontSize: "clamp(15px, 1.5vw, 18px)", color: "rgba(255,255,255,0.7)" }}>
              Mood2Fit est avant tout une communauté de gens qui se soutiennent. Le sport en est le moteur.
            </p>
          </motion.div>
        </section>

        {/* STATS — fond rose */}
        <section style={{ background: "#f72585" }} className="py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-16">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/20">
              {stats.map((s, i) => (
                <motion.div key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="flex flex-col gap-1 px-8 py-6">
                  <span className="font-roboto font-900 text-white leading-none tracking-[-0.02em]"
                    style={{ fontSize: "clamp(32px, 5vw, 70px)" }}>{s.value}</span>
                  <span className="font-roboto font-400 text-white/70 text-sm">{s.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FEED — fond blanc */}
        <section style={{ background: "#fff" }} className="py-32">
          <div className="max-w-7xl mx-auto px-6 md:px-16">
            <div className="flex items-end justify-between mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-roboto font-900 uppercase leading-[0.88] tracking-[-0.03em] text-black"
                style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
                Ce qui se passe<br />
                <span style={{ color: "#f72585" }}>dans la commu.</span>
              </motion.h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {feedPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>

        {/* TÉMOIGNAGES — fond noir, liste Nike */}
        <section style={{ background: "#000" }} className="py-32">
          <div className="max-w-7xl mx-auto px-6 md:px-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-roboto font-900 uppercase leading-[0.88] tracking-[-0.03em] text-white mb-20"
              style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
              Pas des avis.<br />
              <span style={{ color: "#f72585" }}>Des vraies histoires.</span>
            </motion.h2>
            <div className="flex flex-col" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              {testimonials.map((t, i) => (
                <motion.div key={t.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col md:flex-row md:items-center gap-6 md:gap-16 py-10 md:py-14"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <span className="font-roboto font-900 text-2xl flex-shrink-0 md:w-14" style={{ color: t.color }}>
                    0{i + 1}
                  </span>
                  <p className="font-roboto font-400 leading-relaxed text-white/85 flex-1 italic"
                    style={{ fontSize: "clamp(16px, 2vw, 22px)" }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex-shrink-0 md:text-right flex md:flex-col gap-4 md:gap-1 items-center md:items-end">
                    <div>
                      <p className="font-roboto font-700 text-sm text-white">{t.name} · {t.city}</p>
                      <p className="font-roboto text-xs text-white/40 mt-0.5">{t.sport}</p>
                    </div>
                    <span className="font-roboto font-700 text-[10px] tracking-[0.12em] uppercase px-3 py-1.5 rounded-full"
                      style={{ background: `${t.color}18`, color: t.color }}>
                      {t.streak}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CARTE — fond blanc */}
        <section style={{ background: "#fff" }} className="py-32">
          <div className="max-w-7xl mx-auto px-6 md:px-16">
            <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-6">
                <span className="font-roboto font-700 text-xs tracking-[0.2em] uppercase text-[#f72585]">
                  Autour de toi
                </span>
                <h2 className="font-roboto font-900 uppercase leading-[0.88] tracking-[-0.03em] text-black"
                  style={{ fontSize: "clamp(40px, 5.5vw, 72px)" }}>
                  Des sportifs<br />
                  <span style={{ color: "#f72585" }}>partout<br />près de toi.</span>
                </h2>
                <p className="font-roboto font-400 text-black/50 leading-relaxed max-w-sm"
                  style={{ fontSize: "clamp(14px, 1.4vw, 17px)" }}>
                  La carte Mood2Fit te montre les sportifs disponibles autour de toi en temps réel. Même discipline, même énergie, à 500m de chez toi.
                </p>
                <div className="flex flex-col gap-2 mt-2">
                  {[
                    "Sportifs disponibles dans un rayon de 1 à 10km",
                    "Filtrés par mood, discipline et niveau",
                    "Contacte-les directement depuis la carte",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#f72585" }} />
                      <span className="font-roboto font-400 text-black/50 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="relative rounded-3xl overflow-hidden aspect-square max-w-[440px] mx-auto"
                  style={{ background: "#f7f4fb", border: "1px solid rgba(0,0,0,0.08)" }}>
                  <div className="absolute inset-0 opacity-20"
                    style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                      style={{ width: `${i * 28}%`, height: `${i * 28}%`, border: "1px solid rgba(247,37,133,0.15)" }} />
                  ))}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <motion.div className="w-5 h-5 rounded-full bg-[#f72585] border-2 border-white"
                      style={{ boxShadow: "0 0 20px rgba(247,37,133,0.5)" }}
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }} />
                  </div>
                  {mapUsers.map((user, i) => (
                    <motion.div key={user.id} className="absolute z-10 cursor-pointer"
                      style={{ left: `${user.x}%`, top: `${user.y}%` }}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.3 }}
                      onMouseEnter={() => setHoveredUser(user)}
                      onMouseLeave={() => setHoveredUser(null)}>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-roboto font-700 text-white border-2 border-white hover:scale-125 transition-transform duration-200"
                        style={{ background: user.color, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
                        {user.name[0]}
                      </div>
                      {hoveredUser?.id === user.id && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white rounded-xl px-3 py-2 whitespace-nowrap z-30"
                          style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.12)", border: "1px solid rgba(0,0,0,0.08)" }}>
                          <p className="font-roboto font-700 text-xs text-black">{user.name}</p>
                          <p className="font-roboto text-[10px] text-black/45">{user.sport}</p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="font-roboto text-[10px] text-black/35">
                      <MapPin size={10} className="inline mr-1" />Paris, France
                    </span>
                    <span className="font-roboto font-700 text-[10px] text-[#f72585]">Sportifs près de toi</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative flex items-center justify-center overflow-hidden py-40" style={{ background: "#9650CD" }}>
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-roboto font-900 text-white uppercase leading-[0.85] tracking-[-0.04em] mb-10"
              style={{ fontSize: "clamp(56px, 9vw, 120px)" }}>
              Rejoins la<br />communauté.
            </motion.h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#" className="flex items-center gap-3 px-9 py-4 rounded-full font-roboto font-700 text-sm text-black bg-white hover:scale-[1.03] active:scale-[0.97] transition-all"
                style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.2)" }}>
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
            <p className="font-roboto text-xs text-white/40 mt-8 tracking-widest uppercase">
              Bientôt disponible sur les stores
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}