import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GuidedWizard, { type WizardResult } from "@/components/Assistant/GuidedWizard";
import ComparisonGrid from "@/components/Assistant/ComparisonGrid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { RotateCcw } from "lucide-react";

const Assistant = () => {
  const [searchParams] = useSearchParams();
  const compareParam = searchParams.get("compare");
  const [results, setResults] = useState<WizardResult[] | null>(null);

  const compareSlugs = compareParam ? compareParam.split(",") : null;

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
            <h1 className="text-4xl md:text-5xl font-heading font-black text-foreground mb-4">
              Asistent za izbor profila
            </h1>
            <p className="font-body text-muted-foreground max-w-xl mx-auto">
              Odgovorite na nekoliko pitanja i pronađite idealan profilni sistem za vaš objekat.
            </p>
          </motion.div>

          {compareSlugs ? (
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Poređenje proizvoda</h2>
              <ComparisonGrid slugs={compareSlugs} />
            </div>
          ) : !results ? (
            <GuidedWizard onResults={setResults} />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-2xl font-heading font-bold text-foreground mb-6 text-center">
                Preporučeni sistemi
              </h2>
              <div className="grid gap-4 mb-8">
                {results.map((r, i) => (
                  <Link
                    key={r.slug}
                    to={`/proizvodi/${r.slug}`}
                    className="flex items-center gap-4 p-5 border border-border bg-card hover:border-accent/40 transition-all"
                  >
                    <div className="w-16 h-16 bg-muted overflow-hidden shrink-0">
                      <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-heading font-bold text-foreground">{r.name}</span>
                        <Badge variant="secondary" className="text-xs">{r.category}</Badge>
                        {i === 0 && <Badge className="bg-accent text-accent-foreground text-xs">Najbolji izbor</Badge>}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-secondary overflow-hidden">
                          <motion.div
                            className="h-full bg-accent"
                            initial={{ width: 0 }}
                            animate={{ width: `${r.score}%` }}
                            transition={{ duration: 0.8, delay: i * 0.15 }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-accent">{r.score}%</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="text-center space-y-4">
                <ComparisonGrid slugs={results.map((r) => r.slug)} />
                <div className="flex justify-center gap-3 mt-8">
                  <Button variant="outline" onClick={() => setResults(null)}>
                    <RotateCcw size={14} /> Ponovi
                  </Button>
                  <Link to="/kontakt">
                    <Button>Zatražite ponudu</Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Assistant;
