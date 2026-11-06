"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LegalTable from "@/components/legal/LegalTable";

export default function ConfidentialiteAppPage() {
  return (
    <>
      <Navbar />
      <main style={{ position: "relative", zIndex: 1, backgroundColor: "#0f0520" }}>
        <section className="min-h-screen py-32 px-6" style={{ background: "#0f0520" }}>
          <div className="max-w-3xl mx-auto pt-8">
            <h1 className="font-roboto font-900 text-white uppercase text-4xl mb-10" style={{ letterSpacing: "-0.02em" }}>
              Politique de confidentialité de <span style={{ color: "#f72585" }}>l'application</span>
            </h1>
            <div className="flex flex-col gap-8 font-roboto text-white/60 leading-relaxed" style={{ fontSize: "15px" }}>

              <p>Cette politique complète celle du site mood2fit.com. Elle s'applique à l'application mobile Mood2Fit sur iOS et Android, conformément au Règlement général sur la protection des données (RGPD, règlement UE 2016/679).</p>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>1. Responsable du traitement</h2>
                <p>Heitor Lavorata, entrepreneur individuel, SIRET 103 550 497 00012, 2 rue du Printemps, escalier D, 78230 Le Pecq. Contact : <a href="mailto:hello@mood2fit.com" style={{ color: "#f72585" }} className="hover:opacity-75 transition-opacity">hello@mood2fit.com</a>.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>2. Données collectées</h2>
                <ul className="mt-2 flex flex-col gap-1 pl-4" style={{ listStyleType: "disc" }}>
                  <li><strong className="text-white">Identité</strong> : prénom, pseudo, adresse e-mail, photo de profil (facultative).</li>
                  <li><strong className="text-white">Activité</strong> : séances réalisées, réactions, publications, badges obtenus.</li>
                  <li><strong className="text-white">Préférences</strong> : types de séances, objectifs, rythme d'activité, thème d'affichage.</li>
                  <li><strong className="text-white">Achats</strong> : type d'offre achetée (Pass Fondateur et palier, ou abonnement), identifiant du produit, date d'achat et d'expiration, statut de l'abonnement, identifiant de transaction fourni par le store, numéro de fondateur, préférence d'affichage du badge et choix d'apparaître ou non dans les crédits. Mood2Fit ne reçoit jamais tes coordonnées bancaires : le paiement est traité par Apple ou Google.</li>
                  <li><strong className="text-white">Données techniques</strong> : jeton de notification push (facultatif), adresse IP utilisée lors de la connexion.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>3. Finalités et bases légales</h2>
                <LegalTable
                  headers={["Finalité", "Base légale"]}
                  rows={[
                    ["Création et gestion du compte", "Exécution du contrat (art. 6.1.b)"],
                    ["Affichage du profil et des statistiques, suggestions de séances", "Exécution du contrat (art. 6.1.b)"],
                    ["Fonctionnalités communautaires (fil, réactions)", "Exécution du contrat (art. 6.1.b)"],
                    ["Gestion des achats in-app : activation du statut Super Mooder, attribution du numéro de fondateur, restauration des achats, renouvellements, résiliations et remboursements", "Exécution du contrat (art. 6.1.b)"],
                    ["Conservation des justificatifs de transaction", "Obligation légale (art. 6.1.c)"],
                    ["Notifications push", "Consentement (art. 6.1.a)"],
                    ["Statistiques anonymisées pour améliorer l'application", "Intérêt légitime (art. 6.1.f)"],
                  ]}
                />
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>4. Paiements</h2>
                <p>Les achats sont effectués via l'App Store (Apple) ou Google Play (Google), qui traitent le paiement en tant que responsables de traitement indépendants, selon leurs propres politiques de confidentialité.</p>
                <p className="mt-2">Mood2Fit utilise RevenueCat, Inc. (États-Unis) pour vérifier les achats et gérer les abonnements. RevenueCat reçoit ton identifiant Mood2Fit et les informations de transaction transmises par le store, mais pas ton nom, ton e-mail ni tes coordonnées bancaires. RevenueCat agit comme sous-traitant, lié à Mood2Fit par un accord de traitement des données conforme au RGPD.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>5. Connexion avec Google ou Apple</h2>
                <p>Tu peux créer ton compte avec ton adresse e-mail, ou te connecter avec Google ou Apple. Mood2Fit ne reçoit jamais ton mot de passe Google ou Apple.</p>
                <ul className="mt-2 flex flex-col gap-1 pl-4" style={{ listStyleType: "disc" }}>
                  <li><strong className="text-white">Google</strong> transmet ton nom, ton adresse e-mail, ta photo de profil Google et un identifiant de compte Google.</li>
                  <li><strong className="text-white">Apple</strong> transmet un identifiant de compte Apple et ton adresse e-mail, ou une adresse relais si tu choisis de la masquer. Ton nom n'est transmis qu'à la première connexion, si tu acceptes de le partager.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>6. Sous-traitants</h2>
                <LegalTable
                  headers={["Sous-traitant", "Rôle", "Localisation des données"]}
                  rows={[
                    ["Supabase, Inc.", "Hébergement de la base de données, authentification", "Union européenne (Irlande)"],
                    ["PostHog, Inc.", "Statistiques d'usage", "Union européenne (Francfort)"],
                    ["RevenueCat, Inc.", "Vérification des achats et gestion des abonnements", "États-Unis"],
                  ]}
                />
                <p className="mt-3">Chaque sous-traitant est lié à Mood2Fit par un accord de traitement des données conforme au RGPD.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>7. Transferts hors de l'Union européenne</h2>
                <p>Les données de l'application sont hébergées dans l'Union européenne. Certains sous-traitants sont des sociétés américaines (Supabase Inc., PostHog Inc., RevenueCat Inc.), et les données liées aux achats sont traitées par RevenueCat aux États-Unis. Ces transferts sont encadrés par les clauses contractuelles types adoptées par la Commission européenne (décision 2021/914), intégrées à l'accord de traitement des données de chaque sous-traitant.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>8. Statistiques d'usage (PostHog)</h2>
                <p>PostHog collecte la navigation entre les écrans, ton identifiant utilisateur lorsque tu es connecté et les événements de cycle de vie de l'application (ouverture, fermeture). La capture automatique des champs de formulaire est désactivée. Aucune donnée de santé ni aucun contenu de publication n'est collecté.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>9. Ce qui est visible par les autres utilisateurs</h2>
                <p>Ton pseudo, ta photo de profil et tes publications sont visibles par les autres utilisateurs. Si tu es Super Mooder, ton badge, ton palier et ton numéro de fondateur sont visibles sur ton profil. Tu peux masquer ton badge à tout moment dans les réglages. Si tu as un Pass Fondateur Or, ton nom apparaît dans les crédits de l'application, sauf si tu choisis l'anonymat.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>10. Durée de conservation</h2>
                <ul className="mt-2 flex flex-col gap-1 pl-4" style={{ listStyleType: "disc" }}>
                  <li>Les données personnelles sont conservées tant que ton compte est actif, et supprimées lors de la suppression du compte.</li>
                  <li>Les publications sont anonymisées lors de la suppression du compte.</li>
                  <li>Les données liées à ton statut Super Mooder sont conservées tant que ton compte est actif.</li>
                  <li>Les justificatifs comptables de Mood2Fit sont les relevés de ventes fournis par Apple et Google. Lors de la suppression de ton compte, tes données d'achat sont anonymisées : seul un enregistrement sans lien avec ton identité (produit, date, numéro de fondateur) est conservé, afin de garantir qu'un numéro n'est jamais réattribué et de répondre aux éventuelles demandes de remboursement.</li>
                  <li>Les sauvegardes techniques sont purgées sous 30 jours.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>11. Tes droits</h2>
                <p>Tu disposes d'un droit d'accès, de rectification, d'effacement, de portabilité, d'opposition et de limitation du traitement. Pour les exercer, écris à <a href="mailto:hello@mood2fit.com" style={{ color: "#f72585" }} className="hover:opacity-75 transition-opacity">hello@mood2fit.com</a> ou supprime ton compte depuis l'application (Réglages → Supprimer mon compte). Réponse sous 30 jours. Tu peux aussi introduire une réclamation auprès de la <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" style={{ color: "#f72585" }} className="hover:opacity-75 transition-opacity">CNIL</a> (cnil.fr).</p>
                <p className="mt-2">La suppression de ton compte met fin à ton statut Super Mooder et entraîne la suppression de tes données chez RevenueCat. Elle ne résilie pas un abonnement en cours : pense à le résilier depuis les réglages de ton compte Apple ou Google.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>12. Sécurité</h2>
                <p>Chiffrement HTTPS/TLS, mots de passe gérés par Supabase Auth (hachage bcrypt, jamais stockés par Mood2Fit), règles de sécurité au niveau des lignes (RLS) limitant l'accès aux données, compteurs anonymes temporaires pour limiter les abus.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>13. Stockage local</h2>
                <p>Les préférences d'affichage et la session d'authentification sont stockées sur ton appareil avec un chiffrement matériel. Elles ne sont pas partagées avec des tiers et sont effacées à la déconnexion ou à la désinstallation.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>14. Modifications</h2>
                <p>Toute modification importante de cette politique est annoncée dans l'application.</p>
              </section>

              <p className="text-white/30 text-sm">Dernière mise à jour : novembre 2026</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
