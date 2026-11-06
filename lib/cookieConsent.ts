/**
 * lib/cookieConsent.ts — Gestion du consentement aux cookies non essentiels
 *
 * Stocke le choix de l'utilisateur (mesure d'audience Google Analytics) en
 * localStorage et diffuse un événement global pour que les composants
 * concernés (bandeau, loader Google Analytics) restent synchronisés sans
 * rechargement de page.
 *
 * Sentry (monitoring/erreurs) et Vercel Analytics (mesure d'audience
 * agrégée, sans cookie de suivi individuel) ne sont pas soumis à ce
 * consentement : ils restent actifs en permanence.
 */

export type ConsentValue = {
  analytics: boolean;
  timestamp: string;
};

export const CONSENT_STORAGE_KEY = "m2f_cookie_consent";
export const CONSENT_EVENT = "m2f-consent-updated";
/** Événement émis pour rouvrir le bandeau de cookies depuis une autre page (ex. /cookies). */
export const OPEN_CONSENT_EVENT = "m2f-open-consent";

export function getStoredConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed?.analytics !== "boolean") return null;
    return parsed as ConsentValue;
  } catch {
    return null;
  }
}

export function storeConsent(analytics: boolean): void {
  if (typeof window === "undefined") return;
  const value: ConsentValue = { analytics, timestamp: new Date().toISOString() };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(value));
  } catch {
    // localStorage indisponible (navigation privée stricte, etc.) — on continue quand même
  }
  window.dispatchEvent(new CustomEvent<ConsentValue>(CONSENT_EVENT, { detail: value }));
}

/** Efface le choix enregistré pour permettre à l'utilisateur de le refaire (ex. depuis /cookies). */
export function resetConsent(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY);
  } catch {
    // ignore
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: null }));
}

/** Supprime les cookies Google Analytics côté client lorsque le consentement est refusé/retiré. */
export function deleteGoogleAnalyticsCookies(): void {
  if (typeof document === "undefined") return;
  const cookieNames = document.cookie
    .split(";")
    .map((c) => c.split("=")[0]?.trim())
    .filter((name): name is string => !!name && (name.startsWith("_ga") || name === "_gid" || name.startsWith("_gac")));

  const hostname = typeof window !== "undefined" ? window.location.hostname : "";
  const rootDomain = hostname.split(".").slice(-2).join(".");

  cookieNames.forEach((name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    if (rootDomain) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${rootDomain};`;
    }
  });
}
