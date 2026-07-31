import type { Metadata } from "next";
import ConfidentialiteAppPage from "./ConfidentialiteAppPage";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Application",
  description: "Politique de confidentialité de l'application mobile Mood2Fit — données collectées, vos droits RGPD, prestataires tiers.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ConfidentialiteAppPage />;
}
