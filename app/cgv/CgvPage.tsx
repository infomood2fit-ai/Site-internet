"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LegalTable from "@/components/legal/LegalTable";

export default function CgvPage() {
  return (
    <>
      <Navbar />
      <main style={{ position: "relative", zIndex: 1, backgroundColor: "#0f0520" }}>
        <section className="min-h-screen py-32 px-6" style={{ background: "#0f0520" }}>
          <div className="max-w-3xl mx-auto pt-8">
            <h1 className="font-roboto font-900 text-white uppercase text-4xl mb-10" style={{ letterSpacing: "-0.02em" }}>
              Conditions générales de <span style={{ color: "#f72585" }}>vente</span>
            </h1>
            <div className="flex flex-col gap-8 font-roboto text-white/60 leading-relaxed" style={{ fontSize: "15px" }}>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>1. Vendeur</h2>
                <p>Les présentes conditions générales de vente (CGV) s'appliquent aux achats effectués dans l'application Mood2Fit. Le service est édité par <strong className="text-white">Heitor Lavorata</strong>, entrepreneur individuel, SIRET 103 550 497 00012, 2 rue du Printemps, escalier D, 78230 Le Pecq, contact : <a href="mailto:hello@mood2fit.com" style={{ color: "#f72585" }} className="hover:opacity-75 transition-opacity">hello@mood2fit.com</a>.</p>
                <p className="mt-2">Elles complètent les conditions générales d'utilisation (CGU) de l'application. En cas de contradiction sur un achat, les CGV prévalent.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>2. Offres concernées</h2>
                <p>L'application est gratuite. Deux offres payantes donnent le statut de Super Mooder :</p>
                <ul className="mt-2 flex flex-col gap-1 pl-4" style={{ listStyleType: "disc" }}>
                  <li><strong className="text-white">Le Pass Fondateur</strong> : un achat unique, proposé en trois paliers et réservé aux 100 premiers acheteurs.</li>
                  <li><strong className="text-white">L'abonnement Super Mooder</strong> : un abonnement mensuel ou annuel à renouvellement automatique, proposé une fois les places fondateur épuisées.</li>
                </ul>
                <LegalTable
                  headers={["Offre", "Prix TTC (France)", "Paiement"]}
                  rows={[
                    ["Pass Fondateur Bronze", "4,99 €", "Unique"],
                    ["Pass Fondateur Argent", "9,99 €", "Unique"],
                    ["Pass Fondateur Or", "19,99 €", "Unique"],
                    ["Abonnement mensuel", "2,99 € / mois", "Renouvelé chaque mois"],
                    ["Abonnement annuel", "24,99 € / an", "Renouvelé chaque année"],
                  ]}
                />
                <p className="mt-3">Le prix applicable est celui affiché dans l'application au moment de l'achat. Il est exprimé toutes taxes comprises, dans la devise de ton pays, et peut varier d'un pays à l'autre.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>3. Ce que comprend le Pass Fondateur</h2>
                <p>Tous les paliers donnent :</p>
                <ul className="mt-2 flex flex-col gap-1 pl-4" style={{ listStyleType: "disc" }}>
                  <li>l'accès à vie aux fonctionnalités Super Mooder, actuelles et futures, dans les limites de l'article 5 ;</li>
                  <li>un numéro de fondateur, attribué dans l'ordre des achats ;</li>
                  <li>un badge « Super Mooder » numéroté, affiché sur ton profil (tu peux le masquer dans les réglages) ;</li>
                  <li>l'accès à l'espace Super Mooder et le droit de vote aux sondages sur les prochaines fonctionnalités.</li>
                </ul>
                <p className="mt-3">En plus, selon le palier :</p>
                <LegalTable
                  headers={["Palier", "Avantages supplémentaires"]}
                  rows={[
                    ["Bronze", "Badge Bronze"],
                    ["Argent", "Badge Argent et accès anticipé aux versions bêta"],
                    ["Or", "Badge Or, accès anticipé aux versions bêta et nom dans les crédits de l'application (ou mention anonyme, au choix)"],
                  ]}
                />
                <p className="mt-3">Les trois paliers donnent accès aux mêmes fonctionnalités. La différence de prix correspond à un niveau de soutien plus élevé et à des avantages symboliques.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>4. Places limitées et numéros de fondateur</h2>
                <p>Le Pass Fondateur est limité à 100 places. Le nombre de places restantes est affiché dans l'application. Si plusieurs achats sont validés au moment où la dernière place est prise, tous sont honorés : leurs auteurs reçoivent un numéro au-delà de 100 (101, 102…).</p>
                <p className="mt-2">Un numéro est personnel et attaché à ton compte Mood2Fit. Il n'est jamais réattribué à quelqu'un d'autre, même s'il est libéré par un remboursement. Un remboursement ne libère pas non plus de place.</p>
                <p className="mt-2"><strong className="text-white">Changement de palier.</strong> Tu peux passer à un palier supérieur en achetant ce palier au prix affiché. Le prix du palier déjà acheté n'est pas déduit. Tu conserves ton numéro d'origine.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>5. Portée de l'accès « à vie »</h2>
                <p>« À vie » signifie pour toute la durée pendant laquelle Mood2Fit exploite l'application. L'accès couvre les fonctionnalités Super Mooder présentes et futures, <strong className="text-white">à l'exception des services impliquant un coût par utilisateur auprès d'un prestataire tiers</strong> (par exemple des fonctionnalités d'intelligence artificielle, du coaching humain ou des séances avec des coachs partenaires). Ces services pourront faire l'objet d'une offre séparée.</p>
                <p className="mt-2">Mood2Fit peut faire évoluer, remplacer ou retirer des fonctionnalités pour améliorer le service. Si Mood2Fit décide d'arrêter définitivement l'application, les Super Mooders seront prévenus au moins trois mois à l'avance, et les fonctionnalités Super Mooder resteront accessibles pendant ce délai.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>6. L'abonnement Super Mooder</h2>
                <p>L'abonnement donne accès aux fonctionnalités Super Mooder, à l'espace Super Mooder, au vote et à un badge « Super Mooder » non numéroté, tant qu'il est actif. Il ne donne pas de numéro de fondateur. Les exclusions de l'article 5 s'appliquent aussi.</p>
                <ul className="mt-2 flex flex-col gap-1 pl-4" style={{ listStyleType: "disc" }}>
                  <li><strong className="text-white">Renouvellement.</strong> L'abonnement se renouvelle automatiquement à la fin de chaque période, au prix en vigueur, sauf résiliation.</li>
                  <li><strong className="text-white">Résiliation.</strong> Tu peux résilier à tout moment depuis les réglages de ton compte Apple ou Google, au moins 24 heures avant la date de renouvellement. L'accès reste actif jusqu'à la fin de la période déjà payée. Supprimer l'application ou ton compte Mood2Fit ne résilie pas l'abonnement.</li>
                  <li><strong className="text-white">Changement de formule.</strong> Le passage du mensuel à l'annuel, ou l'inverse, prend effet à la prochaine date de renouvellement.</li>
                  <li><strong className="text-white">Problème de paiement.</strong> Si un renouvellement échoue, l'accès est maintenu pendant le délai de grâce prévu par le store, puis suspendu si le paiement n'aboutit pas.</li>
                  <li><strong className="text-white">Changement de prix.</strong> Une hausse de prix est annoncée à l'avance, selon les règles d'Apple ou de Google, et ne s'applique qu'au renouvellement suivant.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>7. Commande et paiement</h2>
                <p>Les achats se font exclusivement dans l'application, par le système de paiement de l'App Store (Apple) ou de Google Play (Google). Le paiement est traité par Apple ou Google selon leurs propres conditions. Mood2Fit n'a jamais accès à tes coordonnées bancaires.</p>
                <p className="mt-2">L'accès est activé dès la confirmation du paiement par le store. Il est rattaché à ton compte Mood2Fit et peut être restauré sur un nouvel appareil avec le bouton « Restaurer mes achats ». Le partage familial n'est pas proposé.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>8. Droit de rétractation</h2>
                <p>Le Pass Fondateur et l'abonnement sont des contenus numériques fournis immédiatement après l'achat. Conformément à l'article L221-28, 13° du Code de la consommation, en validant l'achat, tu demandes que l'accès commence immédiatement et tu reconnais perdre ton droit de rétractation de 14 jours.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>9. Remboursements</h2>
                <p>Les remboursements sont gérés par Apple ou Google, selon leurs politiques. Tu peux les demander sur reportaproblem.apple.com (Apple) ou depuis ton historique de commandes Google Play (Google). Mood2Fit ne peut pas rembourser directement un achat effectué sur un store.</p>
                <p className="mt-2">Si un Pass Fondateur est remboursé, l'accès Super Mooder, le palier, le badge et le numéro de fondateur sont retirés. Le numéro n'est pas réattribué. Si un abonnement est remboursé, l'accès est retiré immédiatement.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>10. Sondages et fonctionnalités à venir</h2>
                <p>Les sondages de l'espace Super Mooder sont consultatifs. Mood2Fit s'engage à tenir compte de leurs résultats, mais reste seul décideur du contenu et du calendrier. Les dates annoncées sont indicatives.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>11. Compte, suspension et suppression</h2>
                <p>Les avantages Super Mooder sont personnels et ne peuvent être ni cédés ni revendus. En cas de manquement grave aux CGU (fraude, harcèlement, usurpation), Mood2Fit peut suspendre le compte et les avantages associés, après t'en avoir informé.</p>
                <p className="mt-2">Si tu supprimes ton compte Mood2Fit, ton numéro de fondateur est définitivement perdu et n'est jamais réattribué. Si tu restaures ensuite ton achat sur un nouveau compte Mood2Fit, avec le même compte Apple ou Google, tu retrouves l'accès Super Mooder avec un nouveau numéro.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>12. Garantie légale de conformité</h2>
                <p>Tu bénéficies de la garantie légale de conformité des contenus et services numériques (articles L224-25-12 et suivants du Code de la consommation). En cas de dysfonctionnement d'une fonctionnalité achetée, écris à <a href="mailto:hello@mood2fit.com" style={{ color: "#f72585" }} className="hover:opacity-75 transition-opacity">hello@mood2fit.com</a>.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>13. Réclamations et médiation</h2>
                <p>Pour toute réclamation, écris d'abord à <a href="mailto:hello@mood2fit.com" style={{ color: "#f72585" }} className="hover:opacity-75 transition-opacity">hello@mood2fit.com</a>. Réponse sous 30 jours. Si le désaccord persiste, tu peux saisir gratuitement le médiateur de la consommation CM2C, en ligne sur <a href="https://cm2c.net" target="_blank" rel="noopener noreferrer" style={{ color: "#f72585" }} className="hover:opacity-75 transition-opacity">https://cm2c.net</a>.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>14. Droit applicable</h2>
                <p>Les présentes CGV sont soumises au droit français. Si tu es consommateur et que tu résides dans un autre pays de l'Union européenne, tu conserves la protection des règles impératives de ton pays de résidence.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>15. Modification des CGV</h2>
                <p>Mood2Fit peut modifier les CGV. Les conditions applicables sont celles en vigueur au moment de l'achat. Pour un abonnement, une modification importante est annoncée dans l'application avant le renouvellement suivant.</p>
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
