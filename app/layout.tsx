import * as Sentry from "@sentry/nextjs";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google'

import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-roboto",
  display: "swap",
});

export function generateMetadata(): Metadata {
  return {
  // ── Base URL — requis pour que Next.js construise les URLs absolues (og:image etc.)
  metadataBase: new URL("https://mood2fit.com"),

  title: {
    default: "Mood2Fit",
    template: "%s | Mood2Fit", // ex: "Communauté | Mood2Fit"
  },
  description:
    "L'app qui matche ton énergie du jour avec le bon partenaire de sport. Musculation, street workout, cardio — entraîne-toi avec des gens qui te ressemblent.",
  keywords: [
    "partenaire sport",
    "workout",
    "musculation",
    "street workout",
    "motivation sport",
    "app fitness",
    "co-sport",
    "matching sport",
    "trouver partenaire musculation",
    "sport en groupe",
  ],
  authors: [{ name: "Mood2Fit" }],

  // ── Open Graph — preview sur Instagram, LinkedIn, WhatsApp, Facebook
  openGraph: {
    title: "Mood2Fit — Trouve ta scéeance de sport idéale",
    description:
      "L'app qui matche ton énergie du jour avec ta scéance de sport.",
    url: "https://mood2fit.com",
    siteName: "Mood2Fit",
    locale: "fr_FR",
    type: "website",
  },

  // ── Twitter / X
  twitter: {
    card: "summary_large_image",
    title: "Mood2Fit — Trouve ta scéeance de sport idéale",
    description:
      "L'app qui matche ton énergie du jour avec ta scéance de sport."
},

  // ── Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Icons
icons: {
  icon: '/icon.png',
  apple: '/apple-icon.png',
},

    other: {
      ...Sentry.getTraceData(),
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={roboto.variable}>
      <body className="font-roboto bg-[#080010] text-text-main antialiased overflow-x-hidden">
        {children}
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
    </html>
  );
}

