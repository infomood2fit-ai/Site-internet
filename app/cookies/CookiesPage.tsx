"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CookiesPage() {
  return (
    <>
      <Navbar />
      <main style={{ position: "relative", zIndex: 1, backgroundColor: "#0f0520" }}>
        <section className="min-h-screen py-32 px-6" style={{ background: "#0f0520" }}>
          <div className="max-w-3xl mx-auto pt-8">
            <h1 className="font-roboto font-900 text-white uppercase text-4xl mb-10" style={{ letterSpacing: "-0.02em" }}>
              Politique <span style={{ color: "#f72585" }}>cookies</span>
            </h1>
            <div className="flex flex-col gap-8 font-roboto text-white/60 leading-relaxed" style={{ fontSize: "15px" }}>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Qu'est-ce qu'un cookie ?</h2>
                <p>Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone) lors de la visite d'un site web. Il permet au site de mémoriser des informations sur votre visite.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Cookies utilisés</h2>
                <p>Le site mood2fit.com utilise les cookies suivants :</p>
                <div className="mt-3 flex flex-col gap-4">
                  <div className="p-4 rounded-lg" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <p className="text-white font-700 mb-1">Cookies techniques (nécessaires)</p>
                    <p>Indispensables au bon fonctionnement du site. Ils ne peuvent pas être désactivés. Aucun consentement n'est requis.</p>
                  </div>
                  <div className="p-4 rounded-lg" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <p className="text-white font-700 mb-1">Cookies de monitoring (Sentry)</p>
                    <p>Utilisés pour détecter et corriger les erreurs techniques du site. Aucune donnée personnelle identifiable n'est collectée à des fins publicitaires. Base légale : intérêt légitime (sécurité et stabilité du site). Ces cookies peuvent être refusés via les paramètres de votre navigateur.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Cookies tiers</h2>
                <p>Mood2Fit n'utilise pas de cookies publicitaires ou de tracking marketing. Aucun cookie tiers à des fins publicitaires n'est déposé sur votre terminal.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Durée de conservation</h2>
                <p>La durée de conservation des cookies ne peut excéder 13 mois conformément aux recommandations de la CNIL. Les cookies techniques expirent à la fin de votre session ou après 13 mois maximum.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Gestion des cookies</h2>
                <p>Vous pouvez à tout moment configurer votre navigateur pour refuser les cookies. Voici les liens vers les paramètres des principaux navigateurs :</p>
                <ul className="mt-2 flex flex-col gap-1 pl-4" style={{ listStyleType: "disc" }}>
                  <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" style={{ color: "#f72585" }} className="hover:opacity-75 transition-opacity">Google Chrome</a></li>
                  <li><a href="https://support.mozilla.org/fr/kb/cookies-informations-sites-enregistrent" target="_blank" rel="noopener noreferrer" style={{ color: "#f72585" }} className="hover:opacity-75 transition-opacity">Mozilla Firefox</a></li>
                  <li><a href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" style={{ color: "#f72585" }} className="hover:opacity-75 transition-opacity">Safari</a></li>
                  <li><a href="https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" style={{ color: "#f72585" }} className="hover:opacity-75 transition-opacity">Microsoft Edge</a></li>
                </ul>
                <p className="mt-2">Attention : le blocage des cookies techniques peut affecter le fonctionnement du site.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Contact</h2>
                <p>Pour toute question relative aux cookies : <a href="mailto:hello@mood2fit.com" style={{ color: "#f72585" }} className="hover:opacity-75 transition-opacity">hello@mood2fit.com</a></p>
              </section>

              <p className="text-white/30 text-sm">Dernière mise à jour : mai 2026</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}