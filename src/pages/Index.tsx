import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ValuePillars from "@/components/ValuePillars";
import ProductsPreview from "@/components/ProductsPreview";
import SubsidyBanner from "@/components/SubsidyBanner";
import EnergyROICalculator from "@/components/EnergyCalculator/EnergyROICalculator";
import PartnersSection from "@/components/PartnersSection";
import StickyQuoteBar from "@/components/StickyQuoteBar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main>
      <Helmet>
        <title>AL Company – PVC i aluminijumska stolarija Valjevo</title>
        <meta name="description" content="AL Company d.o.o. – Proizvođač vrhunske PVC i aluminijumske stolarije od 2002. GEALAN i ALUMIL profili. Valjevo, Srbija." />
      </Helmet>
      <Navbar />
      <HeroSection />
      <ValuePillars />
      <ProductsPreview />
      <SubsidyBanner />
      <EnergyROICalculator />
      <PartnersSection />
      <StickyQuoteBar />
      <div id="kontakt">
        <Footer />
      </div>
    </main>
  );
};

export default Index;
