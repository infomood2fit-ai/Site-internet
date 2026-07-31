"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SuppressionComptePage() {
  return (
    <>
      <Navbar />
      <main style={{ position: "relative", zIndex: 1, backgroundColor: "#0f0520" }}>
        <section className="min-h-screen py-32 px-6" style={{ background: "#0f0520" }}>
          <div className="max-w-3xl mx-auto pt-8">
            <h1 className="font-roboto font-900 text-white uppercase text-4xl mb-10" style={{ letterSpacing: "-0.02em" }}>
              Suppression de <span style={{ color: "#f72585" }}>compte</span>
            </h1>
            <div className="flex flex-col gap-8 font-roboto text-white/60 leading-relaxed" style={{ fontSize: "15px" }}>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Introduction</h2>
                <p>Conformément au Règlement Général sur la Protection des Données (RGPD — Règlement UE 2016/679), tu peux à tout moment demander la suppression de ton compte Mood2Fit et des données personnelles associées.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Responsable du traitement</h2>
                <p><strong className="text-white">Heitor LAVORATA</strong>, entrepreneur individuel<br />
                SIRET : 103 550 497 00012<br />
                Email : <a href="mailto:hello@mood2fit.com" style={{ color: "#f72585" }} className="hover:opacity-75 transition-opacity">hello@mood2fit.com</a></p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Comment supprimer ton compte</h2>

                <p className="text-white font-700 mb-2">Option 1 — Depuis l'application (recommandé)</p>
                <ol className="mt-2 mb-4 flex flex-col gap-1 pl-4" style={{ listStyleType: "decimal" }}>
                  <li>Ouvre l'application Mood2Fit sur ton téléphone</li>
                  <li>Va dans l'onglet Profil</li>
                  <li>Appuie sur Paramètres</li>
                  <li>Descends en bas de la page et appuie sur « Supprimer mon compte »</li>
                  <li>Confirme en deux étapes — l'action est immédiate et irréversible</li>
                </ol>
                <p className="mb-4">Tu dois être connecté·e avec ton compte pour utiliser cette option. Si tu n'as pas encore créé de compte (mode découverte uniquement), aucune donnée personnelle n'est associée à toi.</p>

                <p className="text-white font-700 mb-2">Option 2 — Par email</p>
                <p>Si tu ne peux pas accéder à l'application, envoie un email à <a href="mailto:hello@mood2fit.com" style={{ color: "#f72585" }} className="hover:opacity-75 transition-opacity">hello@mood2fit.com</a> avec :</p>
                <ul className="mt-2 flex flex-col gap-1 pl-4" style={{ listStyleType: "disc" }}>
                  <li>L'objet : « Demande de suppression de compte »</li>
                  <li>L'adresse email associée à ton compte Mood2Fit</li>
                  <li>Une confirmation explicite de ta demande de suppression</li>
                </ul>
                <p className="mt-3">Nous traiterons ta demande sous 30 jours maximum et te confirmerons par email une fois la suppression effectuée.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Données supprimées</h2>
                <p>Lors de la suppression de ton compte, les éléments suivants sont effacés définitivement :</p>
                <ul className="mt-2 flex flex-col gap-1 pl-4" style={{ listStyleType: "disc" }}>
                  <li>Ton compte d'authentification (email, identifiant)</li>
                  <li>Ton profil (pseudo, nom, photo de profil, bio, préférences, typologies, objectifs)</li>
                  <li>Tes séances enregistrées et historique d'XP</li>
                  <li>Tes badges et défis</li>
                  <li>Tes réactions sur les posts</li>
                  <li>Tes notifications</li>
                  <li>Tes messages et participations aux sessions de groupe</li>
                  <li>Tes retours et messages de contact</li>
                  <li>Ton token de notification push</li>
                  <li>Tes photos de profil et images de posts stockées sur nos serveurs</li>
                </ul>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Données anonymisées (conservées sans lien avec toi)</h2>
                <p>Certains contenus publiés dans le feed communautaire sont anonymisés plutôt que supprimés, afin de préserver la cohérence du fil d'actualité pour les autres utilisateurs :</p>
                <ul className="mt-2 flex flex-col gap-1 pl-4" style={{ listStyleType: "disc" }}>
                  <li>Le texte de tes posts est remplacé par « [supprimé] »</li>
                  <li>Ton identifiant est dissocié du post (plus aucun lien avec ton compte)</li>
                  <li>Les images associées à tes posts sont supprimées</li>
                </ul>
                <p className="mt-3">Aucune information personnelle ne reste identifiable après cette anonymisation.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Données conservées temporairement</h2>
                <ul className="mt-2 flex flex-col gap-1 pl-4" style={{ listStyleType: "disc" }}>
                  <li>Sauvegardes techniques : purgées sous 30 jours après la suppression</li>
                  <li>Compteurs anti-abus (rate limiting) : données techniques anonymes, non liées à ton identité, conservées le temps strictement nécessaire à la sécurité du service</li>
                </ul>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Délai de traitement</h2>
                <ul className="mt-2 flex flex-col gap-1 pl-4" style={{ listStyleType: "disc" }}>
                  <li>Suppression via l'app : immédiate</li>
                  <li>Demande par email : sous 30 jours</li>
                  <li>Sauvegardes techniques : jusqu'à 30 jours supplémentaires</li>
                </ul>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Tes autres droits (RGPD)</h2>
                <p>Outre le droit à l'effacement, tu disposes des droits d'accès, de rectification, de portabilité, d'opposition et de limitation. Pour les exercer : <a href="mailto:hello@mood2fit.com" style={{ color: "#f72585" }} className="hover:opacity-75 transition-opacity">hello@mood2fit.com</a></p>
                <p className="mt-2">Tu peux également introduire une réclamation auprès de la <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" style={{ color: "#f72585" }} className="hover:opacity-75 transition-opacity">CNIL</a>.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>En savoir plus</h2>
                <ul className="mt-2 flex flex-col gap-1 pl-4" style={{ listStyleType: "disc" }}>
                  <li><a href="/confidentialite" style={{ color: "#f72585" }} className="hover:opacity-75 transition-opacity">Politique de confidentialité du site</a></li>
                  <li><a href="/confidentialite-app" style={{ color: "#f72585" }} className="hover:opacity-75 transition-opacity">Politique de confidentialité de l'application</a></li>
                </ul>
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
