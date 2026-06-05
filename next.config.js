/** @type {import('next').NextConfig} */
const nextConfig = {

  // ── Headers de sécurité HTTP ──────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [

          // Empêche le clickjacking (intégration dans une iframe)
          {
            key: "X-Frame-Options",
            value: "DENY",
          },

          // Empêche le MIME sniffing
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },

          // Force HTTPS pour 1 an
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },

          // Contrôle les infos envoyées dans le Referer
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },

          // Désactive les fonctionnalités navigateur non utilisées
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
          },

          // Content Security Policy — bloque les injections XSS
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Scripts : soi-même + Next.js inline + Google Analytics/GTM
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
              "worker-src 'self' blob:",
              // Styles : soi-même + inline (Tailwind)
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              // Polices
              "font-src 'self' https://fonts.gstatic.com",
              // Images : soi-même + Unsplash (articles) + ibb.co (logo newsletter)
              "img-src 'self' data: blob: https: http:",
              // Connexions API autorisées + Google Analytics
              "connect-src 'self' https://api.brevo.com https://newsapi.org https://gnews.io https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://region1.google-analytics.com",              // Frames interdites
              "frame-src 'none'",
              // Objets interdits
              "object-src 'none'",
              // Base URI restreinte
              "base-uri 'self'",
              // Formulaires uniquement vers soi-même
              "form-action 'self'",
            ].join("; "),
          },

        ],
      },
    ];
  },

webpack: (config) => {
  config.ignoreWarnings = [
    { module: /node_modules\/@prisma\/instrumentation/ }
  ];
  return config;
},
  // ── Image Optimizer — sources autorisées uniquement ───────
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.ibb.co" },
    ],
  },

};

module.exports = nextConfig;

