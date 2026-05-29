"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MentionsLegalesPage() {
  return (
    <>
      <Navbar />
      <main style={{ position: "relative", zIndex: 1, backgroundColor: "#0f0520" }}>
        <section className="min-h-screen py-32 px-6" style={{ background: "#0f0520" }}>
          <div className="max-w-3xl mx-auto pt-8">
            <h1 className="font-roboto font-900 uppercase text-4xl mb-10" style={{ letterSpacing: "-0.02em", color: "#fff" }}>
              Mentions <span style={{ color: "#f72585" }}>légales</span>
            </h1>
            <div className="flex flex-col gap-8 font-roboto leading-relaxed" style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)" }}>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Éditeur du site</h2>
                <p>Le site mood2fit.com est édité par :</p>
                <p className="mt-2"><strong style={{ color: "#fff" }}>Heitor LAVORATA</strong>, entrepreneur individuel (micro-entreprise)<br />
                SIRET : 103 550 497 00012<br />
                Activité : Conseil en systèmes et logiciels informatiques (APE 6201Z)<br />
                Siège social : Yvelines (78), France<br />
                Responsable de publication : Heitor LAVORATA<br />
                Email : <a href="mailto:hello@mood2fit.com" style={{ color: "#f72585" }} className="hover:opacity-75 transition-colors">hello@mood2fit.com</a></p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Hébergement</h2>
                <p>Le site est hébergé par :</p>
                <p className="mt-2"><strong style={{ color: "#fff" }}>Vercel Inc.</strong><br />
                440 N Barranca Ave #4133, Covina, CA 91723, États-Unis<br />
                Site : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" style={{ color: "#f72585" }} className="hover:opacity-75 transition-colors">vercel.com</a></p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Directeur de publication</h2>
                <p>Heitor LAVORATA est le directeur de la publication au sens de la loi n° 82-652 du 29 juillet 1982.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Propriété intellectuelle</h2>
                <p>L'ensemble des contenus présents sur mood2fit.com (textes, images, logos, design) sont la propriété exclusive de Mood2Fit et sont protégés par les lois françaises et internationales relatives à la propriété intellectuelle. Toute reproduction, même partielle, est strictement interdite sans autorisation préalable écrite.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Responsabilité</h2>
                <p>Mood2Fit s'efforce de maintenir les informations publiées sur ce site à jour et exactes. Cependant, Mood2Fit ne peut garantir l'exactitude, la complétude ou l'actualité des informations diffusées. L'utilisation des informations et contenus disponibles sur ce site se fait sous l'entière responsabilité de l'utilisateur.</p>
                <p className="mt-2">Mood2Fit ne saurait être tenu responsable des dommages directs ou indirects résultant de l'utilisation du site ou de l'impossibilité d'y accéder.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Liens hypertextes</h2>
                <p>Le site mood2fit.com peut contenir des liens vers des sites tiers. Mood2Fit n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu ou leur politique de confidentialité.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Droit applicable</h2>
                <p>Les présentes mentions légales sont soumises au droit français. Tout litige relatif à leur interprétation ou à leur exécution relève de la compétence exclusive des tribunaux français.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Contact</h2>
                <p>Pour toute question relative aux mentions légales : <a href="mailto:hello@mood2fit.com" style={{ color: "#f72585" }} className="hover:opacity-75 transition-colors">hello@mood2fit.com</a></p>
              </section>

              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px" }}>Dernière mise à jour : mai 2026</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}