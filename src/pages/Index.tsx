import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ValuePillars from "@/components/ValuePillars";
import ProductsPreview from "@/components/ProductsPreview";
import SubsidyBanner from "@/components/SubsidyBanner";
import MeasurementBanner from "@/components/MeasurementBanner";
import EnergyROICalculator from "@/components/EnergyCalculator/EnergyROICalculator";
import TrustSection from "@/components/Trust/TrustSection";
import FaqSection from "@/components/Faq/FaqSection";
import Footer from "@/components/Footer";
import { buildLocalBusinessJsonLd } from "@/lib/localBusiness";

const Index = () => {
  return (
    <main>
      <Helmet>
        <title>AL Company – PVC i aluminijumska stolarija Valjevo</title>
        <meta name="description" content="AL Company d.o.o. – Proizvođač vrhunske PVC i aluminijumske stolarije od 2002. GEALAN i ALUMIL profili. Valjevo, Srbija." />
        <script type="application/ld+json">{JSON.stringify(buildLocalBusinessJsonLd())}</script>
      </Helmet>
      <Navbar />
      <HeroSection />
      <ValuePillars />
      <ProductsPreview />
      <SubsidyBanner />
      <MeasurementBanner />
      <EnergyROICalculator />
      <TrustSection />
      <FaqSection />
      <div id="kontakt">
        <Footer />
      </div>
    </main>
  );
};

export default Index;
