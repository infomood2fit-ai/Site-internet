"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { OPEN_CONSENT_EVENT } from "@/lib/cookieConsent";

export default function CookiesPage() {
  const openPreferences = () => {
    window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
  };

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
                <p>Le site mood2fit.com utilise les cookies et traceurs suivants :</p>
                <div className="mt-3 flex flex-col gap-4">
                  <div className="p-4 rounded-lg" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <p className="text-white font-700 mb-1">Cookies techniques (nécessaires)</p>
                    <p>Indispensables au bon fonctionnement du site. Ils ne peuvent pas être désactivés. Aucun consentement n'est requis.</p>
                  </div>
                  <div className="p-4 rounded-lg" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <p className="text-white font-700 mb-1">Cookies de mesure d'audience (Google Analytics)</p>
                    <p>Utilisés pour mesurer la fréquentation du site (pages vues, provenance du trafic). <strong className="text-white">Ces cookies ne sont déposés qu'avec votre consentement</strong>, recueilli via le bandeau affiché lors de votre première visite. Vous pouvez accepter, refuser ou modifier ce choix à tout moment ci-dessous.</p>
                  </div>
                  <div className="p-4 rounded-lg" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <p className="text-white font-700 mb-1">Cookies de monitoring et de rejeu de session (Sentry)</p>
                    <p>Utilisés pour détecter et corriger les erreurs techniques du site. Un échantillon des sessions (10 %, et 100 % en cas d'erreur) peut être rejoué à des fins de diagnostic technique ; les champs de saisie (formulaires, mots de passe) sont systématiquement masqués et ne sont jamais capturés. Base légale : intérêt légitime (sécurité et stabilité du site). Ces cookies, nécessaires à la sécurité du service, restent actifs indépendamment de votre choix sur la mesure d'audience.</p>
                  </div>
                  <div className="p-4 rounded-lg" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <p className="text-white font-700 mb-1">Vercel Analytics</p>
                    <p>Mesure d'audience agrégée et anonymisée fournie par notre hébergeur Vercel Inc. Ne dépose pas de cookie de suivi individuel et ne nécessite donc pas de consentement.</p>
                  </div>
                </div>
                <button
                  onClick={openPreferences}
                  className="mt-4 px-5 py-2.5 rounded-full font-700 text-sm text-white transition-opacity hover:opacity-80"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)" }}
                >
                  Modifier mes préférences de cookies
                </button>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Cookies tiers</h2>
                <p>Mood2Fit n'utilise pas de cookies publicitaires. Les cookies de mesure d'audience ci-dessus ne sont pas utilisés à des fins publicitaires ni revendus à des tiers.</p>
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

              <p className="text-white/30 text-sm">Dernière mise à jour : novembre 2026</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}