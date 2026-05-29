/**
 * lib/env.ts — Variables d'environnement validées à l'exécution
 *
 * La validation se fait au moment de l'appel (lazy),
 * pas au build — évite les crashes sur Vercel Edge Runtime.
 */

function getEnv(key: string, fallback?: string): string {
  const value = process.env[key] ?? fallback;
  if (!value) {
    throw new Error(`❌ Variable d'environnement manquante : ${key}\nAjoute-la dans .env.local ou Vercel`);
  }
  return value;
}

export const env = {
  // ── Brevo
  get BREVO_API_KEY()      { return getEnv("BREVO_API_KEY"); },
  get BREVO_SENDER_EMAIL() { return getEnv("BREVO_SENDER_EMAIL", "hello@mood2fit.com"); },
  get BREVO_LIST_ID()      { return Number(process.env.BREVO_LIST_ID ?? 5); },

  // ── Upstash Redis (rate limiting)
  get UPSTASH_REDIS_REST_URL()   { return getEnv("UPSTASH_REDIS_REST_URL"); },
  get UPSTASH_REDIS_REST_TOKEN() { return getEnv("UPSTASH_REDIS_REST_TOKEN"); },

  // ── Cron
  get CRON_SECRET() { return process.env.CRON_SECRET ?? ""; },

  // ── App
  get APP_URL() { return process.env.NEXT_PUBLIC_APP_URL ?? "https://mood2fit.com"; },
};