"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ConfidentialitePage() {
  return (
    <>
      <Navbar />
      <main style={{ position: "relative", zIndex: 1, backgroundColor: "#0f0520" }}>
        <section className="min-h-screen py-32 px-6" style={{ background: "#0f0520" }}>
          <div className="max-w-3xl mx-auto pt-8">
            <h1 className="font-roboto font-900 text-white uppercase text-4xl mb-10" style={{ letterSpacing: "-0.02em" }}>
              Politique de <span style={{ color: "#f72585" }}>confidentialité</span>
            </h1>
            <div className="flex flex-col gap-8 font-roboto text-white/60 leading-relaxed" style={{ fontSize: "15px" }}>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Introduction</h2>
                <p>Mood2Fit accorde une grande importance à la protection de vos données personnelles. Cette politique de confidentialité décrit comment nous collectons, utilisons et protégeons vos informations lorsque vous utilisez notre site mood2fit.com, conformément au Règlement Général sur la Protection des Données (RGPD — Règlement UE 2016/679).</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Responsable du traitement</h2>
                <p>Le responsable du traitement des données est :<br />
                <strong className="text-white">Heitor LAVORATA</strong>, entrepreneur individuel<br />
                SIRET : 103 550 497 00012<br />
                Email : <a href="mailto:hello@mood2fit.com" style={{ color: "#f72585" }} className="hover:opacity-75 transition-opacity">hello@mood2fit.com</a></p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Données collectées et bases légales</h2>
                <p>Nous collectons les données suivantes :</p>
                <ul className="mt-2 flex flex-col gap-1 pl-4" style={{ listStyleType: "disc" }}>
                  <li><strong className="text-white">Formulaire de contact</strong> : nom, adresse email, message — base légale : intérêt légitime (répondre à votre demande)</li>
                  <li><strong className="text-white">Newsletter</strong> : adresse email — base légale : consentement (art. 6.1.a du RGPD)</li>
                  <li><strong className="text-white">Données de navigation</strong> : adresse IP, type de navigateur, pages visitées — base légale : intérêt légitime (sécurité et stabilité du site via Sentry)</li>
                </ul>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Utilisation des données</h2>
                <p>Les données collectées sont utilisées pour :</p>
                <ul className="mt-2 flex flex-col gap-1 pl-4" style={{ listStyleType: "disc" }}>
                  <li>Répondre à vos demandes de contact</li>
                  <li>Vous envoyer notre newsletter (avec votre consentement)</li>
                  <li>Améliorer les performances et la stabilité du site</li>
                </ul>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Conservation des données</h2>
                <p>Vos données sont conservées pour la durée strictement nécessaire :</p>
                <ul className="mt-2 flex flex-col gap-1 pl-4" style={{ listStyleType: "disc" }}>
                  <li>Données de contact : 3 ans à compter du dernier contact</li>
                  <li>Newsletter : jusqu'à votre désinscription</li>
                  <li>Données de navigation (Sentry) : 90 jours</li>
                </ul>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Vos droits</h2>
                <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                <ul className="mt-2 flex flex-col gap-1 pl-4" style={{ listStyleType: "disc" }}>
                  <li>Droit d'accès à vos données</li>
                  <li>Droit de rectification</li>
                  <li>Droit à l'effacement (droit à l'oubli)</li>
                  <li>Droit d'opposition au traitement</li>
                  <li>Droit à la portabilité</li>
                  <li>Droit de retirer votre consentement à tout moment</li>
                </ul>
                <p className="mt-3">Pour exercer ces droits, contactez-nous à : <a href="mailto:hello@mood2fit.com" style={{ color: "#f72585" }} className="hover:opacity-75 transition-opacity">hello@mood2fit.com</a></p>
                <p className="mt-2">Droit de réclamation : si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" style={{ color: "#f72585" }} className="hover:opacity-75 transition-opacity">CNIL</a>.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Prestataires tiers</h2>
                <p>Nous utilisons les services tiers suivants :</p>
                <ul className="mt-2 flex flex-col gap-1 pl-4" style={{ listStyleType: "disc" }}>
                  <li><strong className="text-white">Brevo</strong> : gestion des emails et de la newsletter</li>
                  <li><strong className="text-white">Vercel</strong> : hébergement du site</li>
                  <li><strong className="text-white">Sentry</strong> : monitoring des erreurs</li>
                  <li><strong className="text-white">Upstash Redis</strong> : protection contre le spam</li>
                </ul>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Transferts hors UE</h2>
                <p>Certains de nos prestataires (Vercel, Sentry, Upstash) sont établis aux États-Unis. Les transferts de données hors UE sont encadrés par les clauses contractuelles types de la Commission européenne ou par le Data Privacy Framework UE-États-Unis.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Sécurité</h2>
                <p>Nous mettons en œuvre les mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, altération, divulgation ou destruction.</p>
              </section>

              <p className="text-white/30 text-sm">Dernière mise à jour : mai 2026</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}