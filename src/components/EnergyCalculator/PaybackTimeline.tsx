import { motion } from "framer-motion";

interface PaybackTimelineProps {
  paybackYears: number;
  annualSavings: number;
}

const PaybackTimeline = ({ paybackYears, annualSavings }: PaybackTimelineProps) => {
  const years = Array.from({ length: Math.min(Math.ceil(paybackYears) + 2, 15) }, (_, i) => i + 1);
  const maxCumulative = years[years.length - 1] * annualSavings;

  return (
    <div className="space-y-3">
      <p className="text-sm font-body text-muted-foreground">Period otplate</p>
      <div className="flex items-end gap-1 h-32">
        {years.map((year) => {
          const cumulative = year * annualSavings;
          const height = Math.max((cumulative / maxCumulative) * 100, 8);
          const isPastPayback = year > paybackYears;

          return (
            <div key={year} className="flex-1 flex flex-col items-center gap-1">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 0.5, delay: year * 0.05 }}
                className={`w-full min-h-[4px] ${isPastPayback ? "bg-accent" : "bg-accent/40"}`}
              />
              <span className="text-[10px] text-muted-foreground">{year}</span>
            </div>
          );
        })}
      </div>
      <p className="text-lg font-heading font-bold text-foreground">
        Otplata za{" "}
        <span className="text-accent">{paybackYears.toFixed(1)} godina</span>
      </p>
    </div>
  );
};

export default PaybackTimeline;
