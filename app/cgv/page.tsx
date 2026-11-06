import type { Metadata } from "next";
import CgvPage from "./CgvPage";

export const metadata: Metadata = {
  title: "CGV — Conditions générales de vente",
  description: "Conditions générales de vente du Pass Fondateur et de l'abonnement Super Mooder dans l'application Mood2Fit.",
  robots: { index: true, follow: true },
};

export default function Page() {
  return <CgvPage />;
}
