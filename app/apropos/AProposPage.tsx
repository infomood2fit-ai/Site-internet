"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import ResponsiveBg from "@/components/ResponsiveBg";
import Footer from "@/components/Footer";

const timeline = [
  {
    year: "2023",
    title: "L'idée naît d'une frustration",
    desc: "Heitor et Karim, amis de salle depuis 4 ans, réalisent qu'ils annulent leurs séances une fois sur deux. Incompatibilité d'horaires, niveaux qui divergent. Il doit exister un meilleur moyen.",
    side: "left",
  },
  {
    year: "2025",
    title: "Le premier prototype",
    desc: "La v1 est lancée en beta fermée à Paris. 50 premiers utilisateurs. Le concept fonctionne, les retours explosent.",
    side: "right",
  },
  {
    year: "2026",
    title: "Le concept prend forme",
    desc: "Matcher des sportifs sur niveau, zone, mood et objectifs. Jade rejoint pour le design, Alfayed pour la tech.",
    side: "left",
  },
];

const values = [
  {
    num: "01",
    title: "Bienveillance",
    desc: "Le sport doit être un espace sûr et positif. On crée des connexions basées sur le respect mutuel, peu importe le niveau.",
    color: "#f72585",
  },
  {
    num: "02",
    title: "Progression",
    desc: "Chacun avance à son rythme. On célèbre les progrès, des premières tractions au muscle-up. Tout compte.",
    color: "#f72585",
  },
  {
    num: "03",
    title: "Communauté",
    desc: "Le sport seul c'est bien. Avec d'autres, c'est transformateur. On construit une communauté où les gens se soutiennent vraiment.",
    color: "#f72585",
  },
];

const team = [
  { name: "Heitor Lavorata", role: "Fondateur de l'application, passionné de street workout et de musculation depuis 8 ans.", tag: "Fondateur", initials: "HL" },
  { name: "Jade", role: "En charge du design et du marketing. Elle transforme des idées brutes en expériences visuelles qui parlent.", tag: "Design & Marketing", initials: "JD" },
  { name: "Alfayed", role: "Il construit et maintient le site et l'application. Le code, c'est son terrain d'entraînement.", tag: "Développement", initials: "AF" },
];

const stats = [
  { value: "2023", label: "Année de création" },
  { value: "3", label: "Personnes dans l'équipe" },
  { value: "70 +", label: "Sur la liste d'attente" },
  { value: "Paris", label: "Notre base" },
];

export default function AProposPage() {

  return (
    <>
      <Navbar />
      <main style={{ position: "relative", zIndex: 1, backgroundColor: "#080010" }}>

        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <ResponsiveBg priority={true} />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center text-center gap-6 px-6 max-w-4xl mx-auto pt-20"
          >
            <h1 className="font-roboto font-900 uppercase leading-[0.9] text-white"
              style={{ letterSpacing: "0.06em", lineHeight: "0.95", fontSize: "clamp(64px, 10vw, 130px)", textShadow: "0 2px 20px rgba(0,0,0,0.25)" }}>
              Née d'une séance<br />
              <span style={{ color: "#f72585" }}>ratée.</span>
            </h1>
            <p className="font-roboto font-400 max-w-lg text-center"
              style={{ fontSize: "clamp(15px, 1.5vw, 18px)", color: "rgba(255,255,255,0.7)" }}>
              Mood2Fit est née d'une conviction simple : le sport est meilleur quand il se partage.
            </p>
          </motion.div>
        </section>

        <section style={{ background: "#f72585" }} className="py-1">
          <div className="max-w-7xl mx-auto px-6 md:px-16">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/20">
              {stats.map((s, i) => (
                <motion.div key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="flex flex-col gap-1 px-8 py-10">
                  <span className="font-roboto font-900 text-white leading-none tracking-[-0.04em]"
                    style={{ fontSize: "clamp(28px, 4vw, 48px)" }}>{s.value}</span>
                  <span className="font-roboto font-400 text-white/70 text-sm">{s.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: "#fff" }} className="py-32">
          <div className="max-w-7xl mx-auto px-6 md:px-16">
            <div className="grid md:grid-cols-2 gap-16 md:gap-32 items-start">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
                <span className="font-roboto font-700 text-xs tracking-[0.2em] uppercase text-[#f72585] mb-6 block">
                  Qui sommes-nous
                </span>
                <h2 className="font-roboto font-900 uppercase leading-[0.88] tracking-[-0.04em] text-black mb-8"
                  style={{ fontSize: "clamp(40px, 5.5vw, 72px)" }}>
                  Des passionnés,<br />
                  <span style={{ color: "#f72585" }}>pas des<br />marketeurs.</span>
                </h2>
                <div className="h-px w-16 bg-[#f72585] mb-8" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-6 pt-4">
                <p className="font-roboto font-400 text-black/65 leading-relaxed"
                  style={{ fontSize: "clamp(15px, 1.5vw, 18px)" }}>
                  Mood2Fit, c'est une équipe de 3 personnes basée à Paris. On pratique la musculation, le street workout, la callisthénie. Et on a tous vécu la même frustration.
                </p>
                <p className="font-roboto font-400 text-black/65 leading-relaxed"
                  style={{ fontSize: "clamp(15px, 1.5vw, 18px)" }}>
                  On n'a pas eu l'idée d'une app. On a résolu notre propre problème et réalisé que des millions de gens avaient le même.
                </p>
                <blockquote className="border-l-4 border-[#f72585] pl-6 mt-4">
                  <p className="font-roboto font-700 text-black leading-snug"
                    style={{ fontSize: "clamp(18px, 2vw, 24px)" }}>
                    "Le sport n'est pas une corvée quand tu as la bonne compagnie."
                  </p>
                </blockquote>
              </motion.div>
            </div>
          </div>
        </section>

        <section style={{ background: "#000" }} className="py-32">
          <div className="max-w-7xl mx-auto px-6 md:px-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-roboto font-900 uppercase leading-[0.88] tracking-[-0.03em] text-white mb-24"
              style={{ fontSize: "clamp(40px, 5.5vw, 72px)" }}>
              Notre<br />
              <span style={{ color: "#f72585" }}>parcours.</span>
            </motion.h2>
            <div className="flex flex-col" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              {timeline.map((item, i) => (
                <motion.div key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col md:flex-row md:items-start gap-6 md:gap-16 py-12 md:py-16"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <span className="font-roboto font-900 flex-shrink-0 md:w-28"
                    style={{ fontSize: "clamp(36px, 4vw, 52px)", color: "#f72585" }}>
                    {item.year}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-roboto font-700 text-white mb-3"
                      style={{ fontSize: "clamp(18px, 2vw, 24px)" }}>
                      {item.title}
                    </h3>
                    <p className="font-roboto font-400 text-white/50 leading-relaxed max-w-lg"
                      style={{ fontSize: "clamp(14px, 1.4vw, 16px)" }}>
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: "#9650CD" }} className="py-32">
          <div className="max-w-7xl mx-auto px-6 md:px-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-roboto font-900 uppercase leading-[0.88] tracking-[-0.03em] text-white mb-24"
              style={{ fontSize: "clamp(40px, 5.5vw, 72px)" }}>
              Ce qu'on<br />croit vraiment.
            </motion.h2>
            <div className="flex flex-col" style={{ borderTop: "1px solid rgba(255,255,255,0.25)" }}>
              {values.map((val, i) => (
                <motion.div key={val.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className="grid grid-cols-[40px_1fr] md:grid-cols-[80px_240px_1fr] gap-4 md:gap-12 py-10 md:py-14 items-start"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.25)" }}>
                  <span className="font-roboto font-900 text-white/30"
                    style={{ fontSize: "clamp(24px, 3vw, 40px)" }}>
                    {val.num}
                  </span>
                  <h3 className="font-roboto font-900 uppercase text-white"
                    style={{ fontSize: "clamp(20px, 2.5vw, 34px)", letterSpacing: "-0.03em" }}>
                    {val.title}
                  </h3>
                  <p className="font-roboto font-400 text-white/75 leading-relaxed col-start-2 md:col-auto"
                    style={{ fontSize: "clamp(14px, 1.4vw, 17px)" }}>
                    {val.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: "#fff" }} className="py-32">
          <div className="max-w-7xl mx-auto px-6 md:px-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-roboto font-900 uppercase leading-[0.88] tracking-[-0.03em] text-black mb-24"
              style={{ fontSize: "clamp(40px, 5.5vw, 72px)" }}>
              Celles et ceux qui<br />
              <span style={{ color: "#f72585" }}>font Mood2Fit.</span>
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, i) => (
                <motion.div key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-4 group">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center font-roboto font-700 text-white text-xl flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #f72585, #7209b7)" }}>
                    {member.initials}
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-roboto font-700 text-[10px] tracking-[0.2em] uppercase text-[#f72585]">
                      {member.tag}
                    </span>
                    <h3 className="font-roboto font-900 text-black" style={{ fontSize: "22px" }}>{member.name}</h3>
                    <p className="font-roboto font-400 text-black/45 text-sm">{member.role}</p>
                  </div>
                  <div className="h-px w-8 group-hover:w-16 transition-all duration-300" style={{ background: "#f72585" }} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: "#f72585" }} className="min-h-screen flex items-center justify-center py-40">
          <div className="text-center px-6 max-w-5xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-roboto font-900 text-white uppercase leading-[0.85] tracking-[-0.04em] mb-10"
              style={{ fontSize: "clamp(60px, 11vw, 150px)" }}>
              Tu n'as plus<br />d'excuses.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="font-roboto font-400 text-white/45 mb-14 max-w-md mx-auto"
              style={{ fontSize: "clamp(15px, 1.5vw, 18px)" }}>
              Sois parmi les premiers.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex gap-4 justify-center flex-wrap">
              <Link href="#"
                className="flex items-center gap-3 px-9 py-4 rounded-full font-roboto font-700 text-sm text-black bg-white hover:scale-[1.03] active:scale-[0.97] transition-all"
                style={{ boxShadow: "0 8px 40px rgba(255,255,255,0.1)" }}>
                <Image src="/app/apple.png" alt="Apple" width={22} height={22} style={{ objectFit: "contain", filter: "brightness(0)" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
                  <span style={{ fontSize: "9px", color: "rgba(0,0,0,0.5)", lineHeight: 1 }}>Télécharger sur</span>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "#000", lineHeight: 1.2 }}>App Store</span>
                </div>
              </Link>
              <Link href="#"
                className="flex items-center gap-3 px-9 py-4 rounded-full font-roboto font-700 text-sm text-white border-2 border-black/20 active:scale-[0.97] transition-all" style={{ background: "#000" }}>
                <Image src="/app/android.png" alt="Google Play" width={22} height={22} style={{ objectFit: "contain" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
                  <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.6)", lineHeight: 1 }}>Disponible sur</span>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>Google Play</span>
                </div>
              </Link>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="font-roboto text-xs text-white/25 mt-8 tracking-widest uppercase">
              Bientôt disponible sur les stores
            </motion.p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}