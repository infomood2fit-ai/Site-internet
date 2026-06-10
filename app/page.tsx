import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomeHero from "@/components/home/HomeHero";
import HomeFeatures from "@/components/home/HomeFeatures";
import HomeArticles from "@/components/home/HomeArticles";
import HomeCommunity from "@/components/home/HomeCommunity";
import HomeNewsletter from "@/components/home/HomeNewsletter";
import CtaSection from "@/components/CtaSection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main style={{ position: "relative", zIndex: 1, backgroundColor: "#080010" }}>
        <HomeHero />
        <HomeFeatures />
        <HomeArticles />
        <HomeCommunity />
        <HomeNewsletter />
        <CtaSection variant="pink" title={"La commu t'attends"} />
        
      </main>
      <Footer />
    </>
  );
}