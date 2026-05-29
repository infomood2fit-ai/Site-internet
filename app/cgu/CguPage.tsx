"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CguPage() {
  return (
    <>
      <Navbar />
      <main style={{ position: "relative", zIndex: 1, backgroundColor: "#0f0520" }}>
        <section className="min-h-screen py-32 px-6" style={{ background: "#0f0520" }}>
          <div className="max-w-3xl mx-auto pt-8">
            <h1 className="font-roboto font-900 text-white uppercase text-4xl mb-10" style={{ letterSpacing: "-0.02em" }}>
              Conditions générales <span style={{ color: "#f72585" }}>d'utilisation</span>
            </h1>
            <div className="flex flex-col gap-8 font-roboto text-white/60 leading-relaxed" style={{ fontSize: "15px" }}>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Objet</h2>
                <p>Les présentes conditions générales d'utilisation régissent l'accès et l'utilisation du site mood2fit.com édité par Mood2Fit — Heitor LAVORATA, SIRET : 103 550 497 00012. En accédant au site, vous acceptez sans réserve les présentes CGU.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Accès au site</h2>
                <p>Le site mood2fit.com est accessible gratuitement à tout utilisateur disposant d'un accès à Internet. Mood2Fit se réserve le droit de modifier, suspendre ou interrompre l'accès au site à tout moment, sans préavis, notamment pour des raisons de maintenance ou de mise à jour.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Utilisation du site</h2>
                <p>L'utilisateur s'engage à utiliser le site de manière licite et conforme aux présentes CGU. Il est notamment interdit de :</p>
                <ul className="mt-2 flex flex-col gap-1 pl-4" style={{ listStyleType: "disc" }}>
                  <li>Utiliser le site à des fins illicites ou frauduleuses</li>
                  <li>Transmettre des contenus illégaux, offensants ou nuisibles</li>
                  <li>Tenter de porter atteinte à la sécurité du site</li>
                  <li>Collecter des données personnelles d'autres utilisateurs</li>
                  <li>Utiliser des robots, scripts ou tout moyen automatisé pour accéder au site</li>
                </ul>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Newsletter</h2>
                <p>En vous inscrivant à la newsletter, vous acceptez de recevoir des communications de la part de Mood2Fit. Vous pouvez vous désinscrire à tout moment en cliquant sur le lien de désinscription présent dans chaque email ou en nous contactant à <a href="mailto:hello@mood2fit.com" style={{ color: "#f72585" }} className="hover:opacity-75 transition-opacity">hello@mood2fit.com</a>.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Propriété intellectuelle</h2>
                <p>Tous les contenus présents sur le site sont protégés par le droit de la propriété intellectuelle. Toute reproduction, même partielle, sans autorisation préalable écrite de Mood2Fit est strictement interdite.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Limitation de responsabilité</h2>
                <p>Mood2Fit s'efforce de fournir des informations exactes et à jour. Dans les limites permises par la loi, Mood2Fit ne pourra être tenu responsable :</p>
                <ul className="mt-2 flex flex-col gap-1 pl-4" style={{ listStyleType: "disc" }}>
                  <li>Des dommages directs ou indirects résultant de l'utilisation du site</li>
                  <li>Des interruptions ou dysfonctionnements du site</li>
                  <li>Des contenus des sites tiers accessibles via des liens hypertextes</li>
                  <li>De tout préjudice résultant d'une intrusion frauduleuse d'un tiers</li>
                </ul>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Modification des CGU</h2>
                <p>Mood2Fit se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront informés de toute modification substantielle par tout moyen approprié. L'utilisation continue du site après modification vaut acceptation des nouvelles CGU.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Nullité partielle</h2>
                <p>Si une ou plusieurs dispositions des présentes CGU sont tenues pour non valides ou déclarées comme telles en application d'une loi, d'un règlement ou à la suite d'une décision de justice, les autres dispositions gardent toute leur force et portée.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Droit applicable</h2>
                <p>Les présentes CGU sont soumises au droit français. En cas de litige, et à défaut de résolution amiable, les tribunaux français seront seuls compétents.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Contact</h2>
                <p>Pour toute question relative aux CGU : <a href="mailto:hello@mood2fit.com" style={{ color: "#f72585" }} className="hover:opacity-75 transition-opacity">hello@mood2fit.com</a></p>
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