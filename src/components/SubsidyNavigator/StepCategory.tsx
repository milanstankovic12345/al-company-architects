import { motion } from "framer-motion";
import { Home, Heart } from "lucide-react";

interface StepCategoryProps {
  category: string;
  setCategory: (v: string) => void;
}

const StepCategory = ({ category, setCategory }: StepCategoryProps) => {
  const options = [
    {
      value: "regular",
      icon: Home,
      title: "Redovno domaćinstvo",
      desc: "Porodice i domaćinstva sa redovnim primanjima.",
    },
    {
      value: "vulnerable",
      icon: Heart,
      title: "Socijalno ugrožena grupa",
      desc: "Penzioner sa najnižom penzijom, primalac socijalne pomoći ili dečijeg dodatka.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div>
        <h3 className="font-heading font-bold text-lg text-foreground mb-1">
          Korak 2: Kategorija domaćinstva
        </h3>
        <p className="font-body text-sm text-muted-foreground">
          Izaberite kategoriju kojoj pripadate.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setCategory(opt.value)}
            className={`text-left p-6 border-2 transition-all ${
              category === opt.value
                ? "border-accent bg-accent/5"
                : "border-border hover:border-accent/30"
            }`}
          >
            <opt.icon
              className={`mb-3 ${category === opt.value ? "text-accent" : "text-muted-foreground"}`}
              size={24}
            />
            <h4 className="font-heading font-bold text-foreground mb-1">{opt.title}</h4>
            <p className="text-sm font-body text-muted-foreground">{opt.desc}</p>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default StepCategory;
