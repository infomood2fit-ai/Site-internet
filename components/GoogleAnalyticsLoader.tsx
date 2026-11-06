"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { CONSENT_EVENT, ConsentValue, deleteGoogleAnalyticsCookies, getStoredConsent } from "@/lib/cookieConsent";

/**
 * Charge Google Analytics (gtag.js) uniquement si l'utilisateur a donné
 * son consentement à la mesure d'audience via le bandeau de cookies.
 * Se met à jour en direct (sans rechargement de page) quand le choix change.
 */
export default function GoogleAnalyticsLoader() {
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    if (stored?.analytics) setAnalyticsAllowed(true);

    const handleConsentChange = (event: Event) => {
      const detail = (event as CustomEvent<ConsentValue | null>).detail;
      if (detail?.analytics) {
        setAnalyticsAllowed(true);
      } else {
        setAnalyticsAllowed(false);
        deleteGoogleAnalyticsCookies();
      }
    };

    window.addEventListener(CONSENT_EVENT, handleConsentChange);
    return () => window.removeEventListener(CONSENT_EVENT, handleConsentChange);
  }, []);

  if (!analyticsAllowed || !process.env.NEXT_PUBLIC_GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
            send_page_view: false
          });
        `}
      </Script>
    </>
  );
}
