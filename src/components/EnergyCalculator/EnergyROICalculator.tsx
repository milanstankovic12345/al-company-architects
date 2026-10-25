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
import { calculatorConfig } from "@/data/calculatorConfig";
import { calculateSavings } from "@/lib/energyCalc";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const EnergyROICalculator = () => {
  const [homeSize, setHomeSize] = useState(80);
  const [heating, setHeating] = useState("electric");
  const [windowType, setWindowType] = useState("single");

  const result = useMemo(
    () => calculateSavings({ homeSize, heating, windowType }),
    [homeSize, heating, windowType],
  );
  const { heatingSources, windowTypes, newUw } = calculatorConfig;

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
            <TechTooltip value="GEALAN sistemom (Uw 0,9)" tooltipKey="uw" />.
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
                    {heatingSources.map((h) => (
                      <SelectItem key={h.value} value={h.value}>
                        {h.label} ({h.unit})
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
                        {w.label} (Uw = {w.uw.toLocaleString("sr-Latn-RS", { minimumFractionDigits: 1 })})
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

          <Accordion type="single" collapsible className="mt-10 max-w-3xl">
            <AccordionItem value="how">
              <AccordionTrigger>Kako računamo?</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>Godišnja potreba za grejanjem: {calculatorConfig.consumptionKwhPerM2} kWh/m², od čega {calculatorConfig.windowHeatLossShare * 100}% odlazi kroz prozore.</li>
                  <li>Površina prozora: {calculatorConfig.windowAreaShare * 100}% površine stana/kuće.</li>
                  <li>Nova stolarija: Uw {newUw.toLocaleString("sr-Latn-RS", { minimumFractionDigits: 1 })} W/m²K; cena {calculatorConfig.windowPriceEurPerM2} €/m² sa ugradnjom (kurs {calculatorConfig.eurToRsd} RSD/€).</li>
                  <li>Ušteda = gubici kroz prozore × (stari Uw − novi Uw) / stari Uw × cena energije.</li>
                  <li>Rezultat je okvirna procena; stvarna ušteda zavisi od objekta, navika i cena. Tačnu ponudu dobijate nakon merenja.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default EnergyROICalculator;
