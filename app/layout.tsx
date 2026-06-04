import * as Sentry from "@sentry/nextjs";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Script from "next/script";

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
    metadataBase: new URL("https://mood2fit.com"),
    title: {
      default: "Mood2Fit",
      template: "%s | Mood2Fit",
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
    openGraph: {
      title: "Mood2Fit — Trouve ta séance de sport idéale",
      description: "L'app qui matche ton énergie du jour avec ta séance de sport.",
      url: "https://mood2fit.com",
      siteName: "Mood2Fit",
      locale: "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Mood2Fit — Trouve ta séance de sport idéale",
      description: "L'app qui matche ton énergie du jour avec ta séance de sport.",
    },
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
    <html lang="fr" className={roboto.variable} style={{ overflowX: "hidden" }}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
        <body className="font-roboto bg-[#080010] text-text-main antialiased overflow-x-hidden" style={{ overflowX: "hidden", width: "100%", maxWidth: "100vw" }}>
        {children}
      </body>
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
    </html>
  );
}