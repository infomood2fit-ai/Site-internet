import type { Metadata } from "next";
import SuppressionComptePage from "./SuppressionComptePage";

export const metadata: Metadata = {
  title: "Suppression de compte — Application",
  description: "Comment supprimer ton compte Mood2Fit et les données personnelles associées, conformément au RGPD.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <SuppressionComptePage />;
}
