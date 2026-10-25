import { MotionConfig } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SubsidyNavigator from "./pages/SubsidyNavigator";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Contact from "./pages/Contact";
import Quote from "./pages/Quote";
import Measurement from "./pages/Measurement";
import Assistant from "./pages/Assistant";
import PvcProducts from "./pages/PvcProducts";
import AluProducts from "./pages/AluProducts";
import EntranceDoors from "./pages/EntranceDoors";
import AboutUs from "./pages/AboutUs";
import Drvodekor from "./pages/Drvodekor";
import Acrylcolor from "./pages/Acrylcolor";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { ComparisonProvider } from "./contexts/ComparisonContext";

const queryClient = new QueryClient();

const App = () => (
  <MotionConfig reducedMotion="user">
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ComparisonProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/o-nama" element={<AboutUs />} />
            <Route path="/subvencije" element={<SubsidyNavigator />} />
            <Route path="/proizvodi" element={<Products />} />
            <Route path="/proizvodi/pvc" element={<PvcProducts />} />
            <Route path="/proizvodi/aluminijum" element={<AluProducts />} />
            <Route path="/proizvodi/ulazna-vrata" element={<EntranceDoors />} />
            <Route path="/proizvodi/drvodekor" element={<Drvodekor />} />
            <Route path="/proizvodi/acrylcolor" element={<Acrylcolor />} />
            <Route path="/proizvodi/:slug" element={<ProductDetail />} />
            <Route path="/kontakt" element={<Contact />} />
            <Route path="/ponuda" element={<Quote />} />
            <Route path="/merenje" element={<Measurement />} />
            <Route path="/asistent" element={<Assistant />} />
            <Route path="/politika-privatnosti" element={<PrivacyPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ComparisonProvider>
    </TooltipProvider>
  </QueryClientProvider>
  </MotionConfig>
);

export default App;

