import { motion } from "framer-motion";

interface SavingsMeterProps {
  annualSavings: number;
}

const SavingsMeter = ({ annualSavings }: SavingsMeterProps) => {
  const maxSavings = 200000;
  const percentage = Math.min((annualSavings / maxSavings) * 100, 100);

  return (
    <div className="space-y-3">
      <p className="text-sm font-body text-muted-foreground">Godišnja ušteda</p>
      <div className="relative h-10 bg-muted overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full bg-accent"
        />
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-3xl font-heading font-black text-accent"
      >
        {annualSavings.toLocaleString("sr-RS")} RSD
      </motion.p>
    </div>
  );
};

export default SavingsMeter;
