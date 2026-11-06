"use client";

import { useEffect, useState } from "react";
import { OPEN_CONSENT_EVENT, getStoredConsent, storeConsent } from "@/lib/cookieConsent";

type View = "hidden" | "banner" | "customize";

export default function CookieConsent() {
  const [view, setView] = useState<View>("hidden");
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    // N'affiche le bandeau que si aucun choix n'a déjà été enregistré
    const stored = getStoredConsent();
    if (!stored) {
      setView("banner");
    }

    // Permet de rouvrir le bandeau depuis une autre page (ex. /cookies → "Modifier mes préférences")
    const reopen = () => {
      const current = getStoredConsent();
      setAnalyticsEnabled(!!current?.analytics);
      setView("banner");
    };
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  if (view === "hidden") return null;

  const acceptAll = () => {
    storeConsent(true);
    setView("hidden");
  };

  const refuseAll = () => {
    storeConsent(false);
    setView("hidden");
  };

  const saveCustom = () => {
    storeConsent(analyticsEnabled);
    setView("hidden");
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Gestion des cookies"
      className="fixed bottom-0 left-0 right-0 z-[200] px-4 pb-4 md:px-6 md:pb-6"
      style={{ pointerEvents: "none" }}
    >
      <div
        className="max-w-3xl mx-auto rounded-2xl p-5 md:p-6 font-roboto"
        style={{
          pointerEvents: "auto",
          background: "rgba(15,5,32,0.97)",
          border: "1px solid rgba(247,37,133,0.25)",
          boxShadow: "0 -4px 40px rgba(0,0,0,0.5)",
          backdropFilter: "blur(16px)",
        }}
      >
        {view === "banner" && (
          <div className="flex flex-col gap-4">
            <p className="text-white/70 leading-relaxed" style={{ fontSize: "14px" }}>
              Nous utilisons des cookies de mesure d&apos;audience (Google Analytics) uniquement avec votre accord.
              Des outils techniques indispensables au fonctionnement et à la sécurité du site (Sentry, Vercel
              Analytics) restent actifs dans tous les cas. Vous pouvez accepter, refuser ou personnaliser votre choix
              à tout moment — voir notre{" "}
              <a href="/cookies" style={{ color: "#f72585" }} className="hover:opacity-75 transition-opacity">
                politique cookies
              </a>
              .
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={refuseAll}
                className="flex-1 md:flex-none px-6 py-3 rounded-full font-700 text-sm text-white transition-opacity hover:opacity-80"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)" }}
              >
                Tout refuser
              </button>
              <button
                onClick={() => setView("customize")}
                className="flex-1 md:flex-none px-6 py-3 rounded-full font-700 text-sm text-white transition-opacity hover:opacity-80"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)" }}
              >
                Personnaliser
              </button>
              <button
                onClick={acceptAll}
                className="flex-1 md:flex-none px-6 py-3 rounded-full font-700 text-sm text-white transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #f72585, #9650CD)" }}
              >
                Tout accepter
              </button>
            </div>
          </div>
        )}

        {view === "customize" && (
          <div className="flex flex-col gap-4">
            <p className="text-white font-700" style={{ fontSize: "14px" }}>
              Personnaliser mes préférences
            </p>

            <div className="flex items-center justify-between gap-4 p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.04)" }}>
              <div>
                <p className="text-white font-700" style={{ fontSize: "13px" }}>Cookies techniques</p>
                <p className="text-white/50" style={{ fontSize: "12px" }}>Toujours actifs — nécessaires au fonctionnement du site.</p>
              </div>
              <span
                className="flex-shrink-0 w-10 h-6 rounded-full relative"
                style={{ background: "rgba(247,37,133,0.4)" }}
                aria-hidden="true"
              >
                <span className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-white" />
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.04)" }}>
              <div>
                <p className="text-white font-700" style={{ fontSize: "13px" }}>Mesure d&apos;audience (Google Analytics)</p>
                <p className="text-white/50" style={{ fontSize: "12px" }}>Nous aide à comprendre la fréquentation du site.</p>
              </div>
              <button
                role="switch"
                aria-checked={analyticsEnabled}
                onClick={() => setAnalyticsEnabled((v) => !v)}
                className="flex-shrink-0 w-10 h-6 rounded-full relative transition-colors"
                style={{ background: analyticsEnabled ? "#f72585" : "rgba(255,255,255,0.15)" }}
              >
                <span
                  className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all"
                  style={{ left: analyticsEnabled ? "20px" : "2px" }}
                />
              </button>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setView("banner")}
                className="px-5 py-2.5 rounded-full font-700 text-sm text-white/70 hover:text-white transition-colors"
                style={{ background: "transparent" }}
              >
                Retour
              </button>
              <button
                onClick={saveCustom}
                className="flex-1 md:flex-none px-6 py-2.5 rounded-full font-700 text-sm text-white transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #f72585, #9650CD)" }}
              >
                Enregistrer mes choix
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
