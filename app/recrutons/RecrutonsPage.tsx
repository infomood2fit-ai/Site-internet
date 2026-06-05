'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RecrutonsPage() {
  return (
    <>
      <Navbar />
      <main style={{ position: "relative", zIndex: 1 }}>
        {<h1>
            Bon, on recrute.
            <br />Tu veux faire partie de l'aventure Mood2Fit ?
            <br />Rejoins-nous et construisons ensemble la meilleure app de sp
            </h1>}
      </main>
      <Footer />
    </>
  );
}