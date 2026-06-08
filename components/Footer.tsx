"use client";

import Link from "next/link";
import { Instagram } from "lucide-react";

const socialIcons: Record<string, React.ReactNode> = {
  instagram: <Instagram size={20} strokeWidth={1.8} />,
  linkedin: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
};

const footerColumns = [
  {
    title: "Application",
    links: [
      { label: "Fonctionnalités", href: "/fonctionnalites" },
      { label: "Communauté", href: "/communaute" },
      { label: "Actualités", href: "/actualite" },
      { label: "À propos", href: "/apropos" },
      { label: "Rejoins-nous", href: "/recrutons" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/contact#faq" },
      { label: "Centre d'aide", href: "/contact#formulaire" },
      { label: "Signaler un bug", href: "/contact#formulaire" },
    ],
  },
  {
    title: "Légal",
    links: [
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "Confidentialité", href: "/confidentialite" },
      { label: "CGU", href: "/cgu" },
      { label: "Cookies", href: "/cookies" },
    ],
  },
];

const socials = [
  { platform: "instagram", href: "https://www.instagram.com/mood2fitapp?igsh=d3E2bmc1YnRjbnl0&utm_source=qr", ariaLabel: "Instagram Mood2Fit" },
  { platform: "linkedin", href: "https://www.linkedin.com/company/mood2fit/", ariaLabel: "LinkedIn Mood2Fit" },
];

export default function Footer() {
  return (
<footer className="bg-[#080010]" role="contentinfo" style={{ position: "sticky", bottom: 0, zIndex: 0 }}>      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(247,37,133,0.25)] to-transparent" />
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-8">
          {footerColumns.map((col) => (
            <nav key={col.title} aria-label={`Navigation ${col.title}`}>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-5" style={{ color: "#ffb3d1" }}>
                {col.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-[rgba(250,244,255,0.55)] hover:text-[#faf4ff] transition-colors duration-200 relative group inline-flex">
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-[#f72585] to-[#9650CD] group-hover:w-full transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-10 pt-6 border-t border-[rgba(250,244,255,0.06)] flex items-center">
          <div className="flex items-center gap-3" role="list">
            {socials.map((social) => (
              <Link
                key={social.platform}
                href={social.href}
                role="listitem"
                aria-label={social.ariaLabel}
                className="w-9 h-9 rounded-xl bg-[rgba(250,244,255,0.05)] border border-[rgba(250,244,255,0.08)] flex items-center justify-center text-[rgba(250,244,255,0.45)] hover:text-[#f72585] hover:border-[rgba(247,37,133,0.3)] hover:bg-[rgba(247,37,133,0.06)] active:scale-95 transition-all duration-200">
                {socialIcons[social.platform]}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="overflow-hidden select-none w-full text-center" style={{ paddingTop: "clamp(12px, 2vw, 24px)", paddingBottom: 0, whiteSpace: "nowrap", fontSize: "clamp(60px, 11vw, 170px)", fontFamily: "var(--font-roboto), 'Roboto', sans-serif", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1 }}>
        <span style={{ color: "#faf4ff" }}>M</span>
        <span style={{ color: "#faf4ff", textTransform: "lowercase" }}>ood</span>
        <span style={{ color: "#f72585" }}>2</span>
        <span style={{ color: "#f72585" }}>F</span>
        <span style={{ color: "#f72585", textTransform: "lowercase" }}>it</span>
      </div>
    </footer>
  );
}