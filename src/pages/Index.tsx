import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ValuePillars from "@/components/ValuePillars";
import ProductsPreview from "@/components/ProductsPreview";
import SubsidyBanner from "@/components/SubsidyBanner";
import PartnersSection from "@/components/PartnersSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ValuePillars />
      <ProductsPreview />
      <SubsidyBanner />
      <PartnersSection />
      <Footer />
    </main>
  );
};

export default Index;
