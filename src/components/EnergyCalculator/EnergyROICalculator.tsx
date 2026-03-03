import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SavingsMeter from "./SavingsMeter";
import PaybackTimeline from "./PaybackTimeline";
import TechTooltip from "@/components/TechTooltip";
import { Calculator } from "lucide-react";

const heatingSources = [
  { value: "electric", label: "Struja", costPerKwh: 11 },
  { value: "wood", label: "Drva", costPerKwh: 8000 / (1000 / 0.4) }, // ~3.2 RSD/kWh
  { value: "gas", label: "Gas", costPerKwh: 50 / (1000 / 10) }, // ~0.5 → adjusted: 50*10/1000=0.5 nope, let me recalc
  { value: "pellet", label: "Pelet", costPerKwh: 32000 / (1000 / 0.2) }, // ~6.4 RSD/kWh
];

// Recalculate properly:
// Wood: 0.4 m³ per 1000kWh → 0.4*8000/1000 = 3.2 RSD/kWh
// Gas: 10 m³ per 1000kWh → 10*50/1000 = 0.5 RSD/kWh (seems low, use 5 RSD/kWh for natural gas)
// Pellet: 0.2t per 1000kWh → 0.2*32000/1000 = 6.4 RSD/kWh
const heatingCosts: Record<string, number> = {
  electric: 11,
  wood: 3.2,
  gas: 5,
  pellet: 6.4,
};

const windowTypes = [
  { value: "single", label: "Stari jednoslojni drveni", uw: 3.0 },
  { value: "double", label: "Dvoslojni drveni", uw: 2.5 },
];

const NEW_UW = 0.9;
const CONSUMPTION_PER_M2 = 150; // kWh/m²/year
const WINDOW_HEAT_LOSS_SHARE = 0.4;
const COST_PER_M2_WINDOW = 350; // EUR equivalent in RSD (~41,000 RSD/m², simplified)

const EnergyROICalculator = () => {
  const [homeSize, setHomeSize] = useState(80);
  const [heating, setHeating] = useState("electric");
  const [windowType, setWindowType] = useState("single");

  const result = useMemo(() => {
    const oldUw = windowTypes.find((w) => w.value === windowType)?.uw ?? 3.0;
    const costPerKwh = heatingCosts[heating] ?? 11;

    const annualEnergy = homeSize * CONSUMPTION_PER_M2;
    const windowLoss = annualEnergy * WINDOW_HEAT_LOSS_SHARE;

    // U-value improvement ratio
    const improvement = (oldUw - NEW_UW) / oldUw;
    const energySaved = windowLoss * improvement; // kWh saved
    const annualSavings = Math.round(energySaved * costPerKwh);

    // Estimate window cost: ~15% of home area is windows, ~350 EUR/m² window
    const windowArea = homeSize * 0.15;
    const windowCost = windowArea * COST_PER_M2_WINDOW * 117; // rough EUR to RSD
    const paybackYears = annualSavings > 0 ? windowCost / annualSavings : 99;

    return { annualSavings, paybackYears: Math.min(paybackYears, 20) };
  }, [homeSize, heating, windowType]);

  return (
    <section className="py-24 md:py-32 bg-background" id="calculator">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-accent/20 flex items-center justify-center">
              <Calculator className="text-accent" size={20} />
            </div>
            <p className="text-accent font-semibold text-sm tracking-[0.15em] uppercase">
              Kalkulator ušteda
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-heading font-black text-foreground mb-4">
            Koliko možete da uštedite?
          </h2>
          <p className="font-body text-muted-foreground max-w-lg mb-10">
            Izračunajte godišnju uštedu na grejanju zamenom starih prozora sa{" "}
            <TechTooltip value="GEALAN sistemom (Uw 0.9)" tooltipKey="uw" />.
          </p>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Inputs */}
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">
                  Površina stana/kuće: <span className="text-accent font-bold">{homeSize} m²</span>
                </label>
                <Slider
                  value={[homeSize]}
                  onValueChange={([v]) => setHomeSize(v)}
                  min={30}
                  max={300}
                  step={5}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>30 m²</span>
                  <span>300 m²</span>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Izvor grejanja</label>
                <Select value={heating} onValueChange={setHeating}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(heatingCosts).map(([key]) => (
                      <SelectItem key={key} value={key}>
                        {key === "electric" ? "Struja (11 RSD/kWh)" : 
                         key === "wood" ? "Drva (8.000 RSD/m³)" :
                         key === "gas" ? "Gas (50 RSD/m³)" : "Pelet (32.000 RSD/t)"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Trenutni prozori</label>
                <Select value={windowType} onValueChange={setWindowType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {windowTypes.map((w) => (
                      <SelectItem key={w.value} value={w.value}>
                        {w.label} (Uw = {w.uw})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-8 border border-border p-6 md:p-8">
              <SavingsMeter annualSavings={result.annualSavings} />
              <PaybackTimeline
                paybackYears={result.paybackYears}
                annualSavings={result.annualSavings}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EnergyROICalculator;
