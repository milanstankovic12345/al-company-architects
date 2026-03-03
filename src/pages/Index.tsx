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
      <Navbar />
      <HeroSection />
      <ValuePillars />
      <ProductsPreview />
      <SubsidyBanner />
      <EnergyROICalculator />
      <PartnersSection />
      <StickyQuoteBar />
      <Footer />
    </main>
  );
};

export default Index;
