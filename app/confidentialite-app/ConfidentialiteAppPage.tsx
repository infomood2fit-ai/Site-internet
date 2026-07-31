"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ConfidentialiteAppPage() {
  return (
    <>
      <Navbar />
      <main style={{ position: "relative", zIndex: 1, backgroundColor: "#0f0520" }}>
        <section className="min-h-screen py-32 px-6" style={{ background: "#0f0520" }}>
          <div className="max-w-3xl mx-auto pt-8">
            <h1 className="font-roboto font-900 text-white uppercase text-4xl mb-10" style={{ letterSpacing: "-0.02em" }}>
              Politique de confidentialité — <span style={{ color: "#f72585" }}>Application mobile</span>
            </h1>
            <div className="flex flex-col gap-8 font-roboto text-white/60 leading-relaxed" style={{ fontSize: "15px" }}>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Introduction</h2>
                <p>Cette politique complète celle du site mood2fit.com et concerne spécifiquement l'application mobile Mood2Fit (iOS et Android), conformément au Règlement Général sur la Protection des Données (RGPD — Règlement UE 2016/679).</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Responsable du traitement</h2>
                <p><strong className="text-white">Heitor LAVORATA</strong>, entrepreneur individuel<br />
                SIRET : 103 550 497 00012<br />
                Email : <a href="mailto:hello@mood2fit.com" style={{ color: "#f72585" }} className="hover:opacity-75 transition-opacity">hello@mood2fit.com</a></p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Données collectées</h2>
                <ul className="mt-2 flex flex-col gap-1 pl-4" style={{ listStyleType: "disc" }}>
                  <li><strong className="text-white">Identité</strong> : prénom, pseudo, adresse email, photo de profil (optionnelle)</li>
                  <li><strong className="text-white">Activité</strong> : séances complétées, réactions, posts publiés, badges obtenus</li>
                  <li><strong className="text-white">Préférences</strong> : typologies, objectifs, rythme d'activité, thème d'affichage</li>
                  <li><strong className="text-white">Technique</strong> : token de notification push (optionnel), adresse IP lors de l'authentification</li>
                </ul>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Finalités du traitement</h2>
                <ul className="mt-2 flex flex-col gap-1 pl-4" style={{ listStyleType: "disc" }}>
                  <li>Créer et gérer ton compte</li>
                  <li>Afficher ton profil et tes statistiques</li>
                  <li>Proposer des séances adaptées à ton profil</li>
                  <li>Animer la communauté (feed, réactions)</li>
                  <li>Envoyer des notifications (si activées)</li>
                  <li>Améliorer l'application (statistiques anonymisées)</li>
                </ul>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Base légale</h2>
                <ul className="mt-2 flex flex-col gap-1 pl-4" style={{ listStyleType: "disc" }}>
                  <li>Exécution du contrat (fourniture de l'application) — art. 6.1.b RGPD</li>
                  <li>Consentement explicite lors de l'inscription — art. 6.1.a RGPD</li>
                  <li>Intérêt légitime à améliorer le service — art. 6.1.f RGPD</li>
                </ul>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Hébergement &amp; transferts</h2>
                <p>Les données de l'application sont hébergées sur les serveurs Supabase situés en Europe (Frankfurt, Allemagne — région eu-west-1). Aucun transfert hors UE n'est effectué pour ces données. Supabase Inc. est notre sous-traitant principal, lié par un accord de traitement de données (DPA) conforme au RGPD.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Durée de conservation</h2>
                <ul className="mt-2 flex flex-col gap-1 pl-4" style={{ listStyleType: "disc" }}>
                  <li>Données personnelles : conservées tant que le compte est actif, supprimées immédiatement en cas de suppression de compte</li>
                  <li>Posts publiés : anonymisés en cas de suppression de compte</li>
                  <li>Sauvegardes techniques : purgées sous 30 jours</li>
                </ul>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Tes droits (RGPD)</h2>
                <p>Accès, rectification, effacement, portabilité, opposition, limitation. Tu peux exercer ces droits, ou supprimer ton compte directement depuis l'application (Paramètres → Supprimer mon compte). Contact : <a href="mailto:hello@mood2fit.com" style={{ color: "#f72585" }} className="hover:opacity-75 transition-opacity">hello@mood2fit.com</a> — réponse garantie sous 30 jours.</p>
                <p className="mt-2">Tu peux également introduire une réclamation auprès de la <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" style={{ color: "#f72585" }} className="hover:opacity-75 transition-opacity">CNIL</a>.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Sécurité</h2>
                <ul className="mt-2 flex flex-col gap-1 pl-4" style={{ listStyleType: "disc" }}>
                  <li>Chiffrement des communications (HTTPS/TLS)</li>
                  <li>Mots de passe gérés par Supabase Auth (bcrypt), jamais stockés par Mood2Fit</li>
                  <li>Accès aux données restreint par des politiques Row Level Security (RLS)</li>
                  <li>Compteurs techniques anonymes conservés temporairement pour limiter les abus</li>
                </ul>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Analytics dans l'application</h2>
                <p>Nous utilisons PostHog, hébergé en Europe (Frankfurt, Allemagne). Données collectées : navigation entre écrans, identifiant utilisateur (UUID Supabase) si connecté, événements du cycle de vie de l'app. Aucune autocapture des champs saisis, aucune donnée de santé ni de contenu des posts. PostHog Inc. est lié par un accord de traitement conforme au RGPD.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Stockage local</h2>
                <p>L'application stocke localement sur ton appareil, via un espace protégé par le chiffrement matériel de ton système : tes préférences d'affichage et ta session d'authentification. Ces données ne sont pas partagées avec des tiers et sont effacées à la déconnexion ou à la désinstallation.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Modifications</h2>
                <p>Cette politique peut être mise à jour ; toute modification substantielle te sera notifiée dans l'application.</p>
              </section>

              <p className="text-white/30 text-sm">Dernière mise à jour : juillet 2026</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
