import { useComparison } from "@/contexts/ComparisonContext";
import { assistantProducts } from "@/data/assistantProducts";
import { X, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const ComparisonDrawer = () => {
  const { selectedSlugs, removeProduct, clearAll } = useComparison();

  if (selectedSlugs.length === 0) return null;

  const selected = selectedSlugs
    .map((s) => assistantProducts.find((p) => p.slug === s))
    .filter(Boolean);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        className="fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] md:bottom-0 left-0 right-0 z-40 bg-card border-t border-border shadow-lg backdrop-blur-md"
      >
        <div className="container py-3 flex items-center gap-4">
          <span className="text-sm font-medium text-muted-foreground hidden sm:inline">Uporedi:</span>
          <div className="flex items-center gap-2 flex-1 overflow-x-auto">
            {selected.map((p) =>
              p ? (
                <div
                  key={p.slug}
                  className="flex items-center gap-2 bg-secondary px-3 py-1.5 text-sm shrink-0"
                >
                  <span className="font-medium text-foreground">{p.name}</span>
                  <button onClick={() => removeProduct(p.slug)} className="text-muted-foreground hover:text-foreground">
                    <X size={14} />
                  </button>
                </div>
              ) : null
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={clearAll} className="text-xs text-muted-foreground hover:text-foreground">
              Obriši sve
            </button>
            <Link to={`/asistent?compare=${selectedSlugs.join(",")}`}>
              <Button size="sm">
                <BarChart3 size={14} /> Uporedi
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ComparisonDrawer;
