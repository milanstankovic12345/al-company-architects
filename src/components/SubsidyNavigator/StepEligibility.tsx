import { motion } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";

interface StepEligibilityProps {
  owner: string;
  consumption: string;
  setOwner: (v: string) => void;
  setConsumption: (v: string) => void;
}

const StepEligibility = ({ owner, consumption, setOwner, setConsumption }: StepEligibilityProps) => {
  const ineligible = owner === "no" || consumption === "no";

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
          Korak 1: Provera uslova
        </h3>
        <p className="font-body text-sm text-muted-foreground">
          Odgovorite na dva pitanja da proverite osnovnu kvalifikovanost.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">
            Da li ste vlasnik/korisnik legalizovanog objekta?
          </p>
          <RadioGroup value={owner} onValueChange={setOwner} className="flex gap-6">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="yes" id="owner-yes" />
              <Label htmlFor="owner-yes">Da</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="no" id="owner-no" />
              <Label htmlFor="owner-no">Ne</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">
            Da li je vaša mesečna potrošnja struje veća od 80 kWh?
          </p>
          <RadioGroup value={consumption} onValueChange={setConsumption} className="flex gap-6">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="yes" id="cons-yes" />
              <Label htmlFor="cons-yes">Da</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="no" id="cons-no" />
              <Label htmlFor="cons-no">Ne</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      {ineligible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20"
        >
          <AlertCircle className="text-destructive mt-0.5 shrink-0" size={18} />
          <div>
            <p className="text-sm font-medium text-foreground">Niste kvalifikovani</p>
            <p className="text-sm text-muted-foreground mt-1">
              Za ostvarivanje subvencija neophodno je da budete vlasnik legalizovanog objekta i da je mesečna potrošnja struje veća od 80 kWh.
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default StepEligibility;
