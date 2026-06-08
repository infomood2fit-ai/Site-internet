"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, Loader2, Send, Mail, Paperclip, Check } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ResponsiveBg from "@/components/ResponsiveBg";
import Footer from "@/components/Footer";

const schema = z.object({
  nom: z.string().min(2, "Nom trop court"),
  email: z.string().email("Email invalide"),
  poste: z.string().min(2, "Précise le poste visé"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const perks = [
  {
    num: "01",
    title: "Impact direct",
    desc: "Tu travailles sur une app fitness utilisée par une communauté active. Chaque contribution a un effet immédiat sur l'expérience des utilisateurs.",
  },
  {
    num: "02",
    title: "Équipe soudée",
    desc: "Une équipe à taille humaine où chaque profil compte. Tes idées sont entendues, débattues et souvent implémentées dès la semaine suivante.",
  },
  {
    num: "03",
    title: "Projet en croissance",
    desc: "Mood2Fit est disponible sur l'App Store et Google Play. Tu rejoins une aventure en pleine accélération avec une communauté qui grandit chaque jour.",
  },
];

function InputField({
  label,
  placeholder,
  type = "text",
  error,
  registration,
  optional,
}: {
  label: string;
  placeholder: string;
  type?: string;
  error?: string;
  registration: object;
  optional?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <label className="font-roboto font-700 text-xs tracking-[0.15em] uppercase text-black/40">
          {label}
        </label>
        {optional && (
          <span className="font-roboto text-[10px] text-black/25 italic">facultatif</span>
        )}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-5 py-4 rounded-2xl font-roboto font-400 text-black placeholder-black/25 focus:outline-none text-sm transition-all duration-200"
        style={{ background: "#f7f4fb", border: "1.5px solid rgba(0,0,0,0.06)" }}
        {...registration}
      />
      {error && <p className="font-roboto text-xs text-[#f72585]">{error}</p>}
    </div>
  );
}

export default function RecrutonsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvError, setCvError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      setSubmitError(null);
      const fd = new globalThis.FormData();
      fd.append("name", data.nom);
      fd.append("email", data.email);
      fd.append("poste", data.poste);
      fd.append("message", data.message || "");
      fd.append("_trap", "");
      if (cvFile) fd.append("cv", cvFile);

      const res = await fetch("/api/candidature", { method: "POST", body: fd });
      const json = await res.json();

      if (!res.ok) {
        setSubmitError(json.error || "Erreur lors de l'envoi.");
        return;
      }
      setSubmitted(true);
    } catch {
      setSubmitError("Une erreur est survenue. Réessaie.");
    }
  };

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowed.includes(file.type)) {
      setCvError("Format non accepté. PDF ou Word uniquement.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setCvError("Fichier trop lourd (max 5 Mo).");
      return;
    }
    setCvError(null);
    setCvFile(file);
  };

  return (
    <>
      <Navbar />
      <main style={{ position: "relative", zIndex: 1 }}>

        {/* HERO */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <ResponsiveBg priority={true} />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center text-center gap-6 px-6 max-w-4xl mx-auto pt-20"
          >
            <span className="font-roboto font-700 text-xs tracking-[0.25em] uppercase text-white/50">
              On recrute
            </span>
            <h1
              className="font-roboto font-900 uppercase text-white leading-[0.9]"
              style={{
                fontSize: "clamp(56px, 10vw, 130px)",
                letterSpacing: "-0.02em",
                textShadow: "0 2px 20px rgba(0,0,0,0.25)",
              }}
            >
              Rejoins<br />
              <span style={{ color: "#f72585" }}>l'aventure.</span>
            </h1>
            <p
              className="font-roboto font-400 max-w-lg text-center"
              style={{ fontSize: "clamp(15px, 1.5vw, 18px)", color: "rgba(255,255,255,0.7)" }}
            >
              Pas de poste ouvert en ce moment, mais on aime rencontrer des gens bien. Si tu te reconnais dans ce qu'on construit, parle-nous de toi.
            </p>
          </motion.div>
        </section>

        {/* POURQUOI NOUS */}
        <section style={{ background: "#000" }} className="py-32">
          <div className="max-w-7xl mx-auto px-6 md:px-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-roboto font-900 uppercase leading-[0.88] tracking-[-0.03em] text-white mb-24"
              style={{ fontSize: "clamp(40px, 5.5vw, 72px)" }}
            >
              Pourquoi<br />
              <span style={{ color: "#f72585" }}>nous rejoindre.</span>
            </motion.h2>
            <div className="flex flex-col" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              {perks.map((perk, i) => (
                <motion.div
                  key={perk.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className="grid grid-cols-[40px_1fr] md:grid-cols-[80px_240px_1fr] gap-4 md:gap-12 py-10 md:py-14 items-start"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <span className="font-roboto font-900 text-white/30" style={{ fontSize: "clamp(24px, 3vw, 40px)" }}>
                    {perk.num}
                  </span>
                  <h3 className="font-roboto font-900 uppercase text-white" style={{ fontSize: "clamp(20px, 2.5vw, 34px)", letterSpacing: "-0.03em" }}>
                    {perk.title}
                  </h3>
                  <p className="font-roboto font-400 text-white/60 leading-relaxed col-start-2 md:col-auto" style={{ fontSize: "clamp(14px, 1.4vw, 17px)" }}>
                    {perk.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FORMULAIRE */}
        <section style={{ background: "#fff" }} className="py-32">
          <div className="max-w-7xl mx-auto px-6 md:px-16">
            <div className="grid md:grid-cols-2 gap-16 md:gap-32 items-start">

              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="font-roboto font-700 text-xs tracking-[0.2em] uppercase text-[#f72585] mb-6 block">
                  Candidature spontanée
                </span>
                <h2
                  className="font-roboto font-900 uppercase leading-[0.88] tracking-[-0.04em] text-black mb-8"
                  style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
                >
                  Dis-nous<br />
                  <span style={{ color: "#f72585" }}>qui tu es.</span>
                </h2>
                <div className="h-px w-16 bg-[#f72585] mb-8" />
                <p className="font-roboto font-400 text-black/55 leading-relaxed" style={{ fontSize: "clamp(14px, 1.4vw, 16px)" }}>
                  On lit chaque message. Si ton profil nous parle, on te répond dans les 48h. Sinon, on garde ton contact pour la suite.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="ok"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center justify-center gap-4 py-20 text-center"
                    >
                      <CheckCircle size={48} style={{ color: "#f72585" }} />
                      <h3 className="font-roboto font-900 uppercase text-black text-2xl">Candidature reçue !</h3>
                      <p className="font-roboto font-400 text-black/50 text-sm max-w-xs">
                        On lit chaque candidature avec attention. On revient vers toi rapidement.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit(onSubmit)}
                      className="flex flex-col gap-5"
                      noValidate
                    >
                      <InputField
                        label="Nom complet"
                        placeholder="Ton nom"
                        error={errors.nom?.message}
                        registration={register("nom")}
                      />
                      <InputField
                        label="Email"
                        placeholder="ton@email.com"
                        type="email"
                        error={errors.email?.message}
                        registration={register("email")}
                      />
                      <InputField
                        label="Poste visé"
                        placeholder="Ex : Développeur, Designer, Marketing..."
                        error={errors.poste?.message}
                        registration={register("poste")}
                      />

                      {/* CV Upload */}
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                          <label className="font-roboto font-700 text-xs tracking-[0.15em] uppercase text-black/40">
                            CV
                          </label>
                          <span className="font-roboto text-[10px] text-black/25 italic">facultatif — PDF ou Word, max 5 Mo</span>
                        </div>
                        <label
                          className="w-full px-5 py-5 rounded-2xl font-roboto font-400 text-sm cursor-pointer flex flex-col items-center justify-center gap-2 transition-all duration-200 hover:border-[#f72585] hover:bg-[rgba(247,37,133,0.02)]"
                          style={{
                            background: cvFile ? "rgba(247,37,133,0.04)" : "#f7f4fb",
                            border: cvFile ? "2px dashed #f72585" : "2px dashed rgba(0,0,0,0.15)",
                          }}
                        >
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                            style={{ background: cvFile ? "rgba(247,37,133,0.12)" : "rgba(0,0,0,0.05)" }}
                          >
                            <Paperclip size={18} style={{ color: cvFile ? "#f72585" : "rgba(0,0,0,0.3)" }} />
                          </div>
                          <div className="text-center">
                            <p className="font-roboto font-700 text-sm" style={{ color: cvFile ? "#f72585" : "#000" }}>
                              {cvFile ? cvFile.name : "Importe ton CV"}
                            </p>
                            <p className="font-roboto text-xs mt-0.5" style={{ color: cvFile ? "rgba(247,37,133,0.6)" : "rgba(0,0,0,0.3)" }}>
                              {cvFile ? "Clique pour changer" : "Clique ici pour parcourir tes fichiers"}
                            </p>
                          </div>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                            onChange={handleCvChange}
                          />
                        </label>
                        {cvFile && (
                          <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl"
                            style={{ background: "rgba(247,37,133,0.06)" }}
                          >
                            <Check size={14} style={{ color: "#f72585" }} />
                            <p className="font-roboto font-700 text-xs" style={{ color: "#f72585" }}>
                              {cvFile.name} · {(cvFile.size / 1024).toFixed(0)} Ko
                            </p>
                            <button
                              type="button"
                              onClick={() => setCvFile(null)}
                              className="ml-auto font-roboto text-xs text-black/30 hover:text-black transition-colors"
                            >
                              Supprimer
                            </button>
                          </motion.div>
                        )}
                        {cvError && <p className="font-roboto text-xs text-[#f72585]">{cvError}</p>}
                      </div>

                      {/* Lettre de motivation */}
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                          <label className="font-roboto font-700 text-xs tracking-[0.15em] uppercase text-black/40">
                            Lettre de motivation
                          </label>
                          <span className="font-roboto text-[10px] text-black/25 italic">facultatif</span>
                        </div>
                        <textarea
                          rows={5}
                          placeholder="Ton parcours, tes motivations, pourquoi Mood2Fit..."
                          className="w-full px-5 py-4 rounded-2xl font-roboto font-400 text-black placeholder-black/25 focus:outline-none text-sm resize-none transition-all duration-200"
                          style={{ background: "#f7f4fb", border: "1.5px solid rgba(0,0,0,0.06)" }}
                          {...register("message")}
                        />
                      </div>

                      {submitError && (
                        <p className="font-roboto text-xs text-[#f72585] text-center">{submitError}</p>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center justify-center gap-2 w-full py-4 rounded-full font-roboto font-700 text-sm text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                        style={{ background: "#f72585", boxShadow: "0 8px 30px rgba(247,37,133,0.3)" }}
                      >
                        {isSubmitting ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <>
                            <Send size={15} />
                            Envoyer ma candidature
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section
          className="relative flex items-center justify-center overflow-hidden py-40"
          style={{ background: "#f72585" }}
        >
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-roboto font-900 text-white uppercase leading-[0.85] tracking-[-0.04em] mb-10"
              style={{ fontSize: "clamp(56px, 9vw, 120px)" }}
            >
              Rejoins<br />l'équipe.
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <Link
                href="mailto:hello@mood2fit.com"
                className="inline-flex items-center gap-3 px-9 py-4 rounded-full font-roboto font-700 text-sm text-[#f72585] bg-white hover:scale-[1.03] active:scale-[0.97] transition-all"
                style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.2)" }}
              >
                <Mail size={18} /> hello@mood2fit.com
              </Link>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}