import { motion } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface StepMeasuresProps {
  measure: string;
  setMeasure: (v: string) => void;
}

const measures = [
  { value: "single", label: "Samo prozori/vrata", desc: "Do 50% subvencije, maks. 180.000 RSD" },
  { value: "basic", label: "Osnovni paket (2 mere)", desc: "Do 55% subvencije" },
  { value: "standard", label: "Standardni paket (+ toplotna pumpa)", desc: "Do 60% subvencije" },
  { value: "advanced", label: "Napredni paket (+ solarni paneli)", desc: "Do 65% subvencije" },
];

const StepMeasures = ({ measure, setMeasure }: StepMeasuresProps) => {
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
          Korak 3: Izbor mere
        </h3>
        <p className="font-body text-sm text-muted-foreground">
          Izaberite obim radova koji planirate.
        </p>
      </div>

      <RadioGroup value={measure} onValueChange={setMeasure} className="space-y-3">
        {measures.map((m) => (
          <label
            key={m.value}
            className={`flex items-start gap-4 p-4 border-2 cursor-pointer transition-all ${
              measure === m.value
                ? "border-accent bg-accent/5"
                : "border-border hover:border-accent/30"
            }`}
          >
            <RadioGroupItem value={m.value} className="mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">{m.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{m.desc}</p>
            </div>
          </label>
        ))}
      </RadioGroup>
    </motion.div>
  );
};

export default StepMeasures;
