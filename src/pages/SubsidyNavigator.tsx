import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubsidyWizard from "@/components/SubsidyNavigator/SubsidyWizard";
import { BadgePercent } from "lucide-react";

const SubsidyNavigator = () => {
  return (
    <main>
      <Navbar />
      <section className="pt-28 md:pt-36 pb-16 md:pb-24 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-10 h-10 bg-accent/20 flex items-center justify-center">
                <BadgePercent className="text-accent" size={20} />
              </div>
              <p className="text-accent font-semibold text-sm tracking-[0.15em] uppercase">
                Subvencije 2026
              </p>
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-black text-foreground mb-4">
              Proverite pravo na subvenciju
            </h1>
            <p className="font-body text-muted-foreground max-w-lg mx-auto">
              U samo 3 koraka saznajte koliki procenat troškova zamene stolarije možete povratiti kroz državne subvencije.
            </p>
          </motion.div>

          <SubsidyWizard />
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default SubsidyNavigator;
