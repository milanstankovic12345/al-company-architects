import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import StepEligibility from "./StepEligibility";
import StepCategory from "./StepCategory";
import StepMeasures from "./StepMeasures";
import SubsidyResult from "./SubsidyResult";
import { ArrowLeft, ArrowRight } from "lucide-react";

const SubsidyWizard = () => {
  const [step, setStep] = useState(0);
  const [owner, setOwner] = useState("");
  const [consumption, setConsumption] = useState("");
  const [category, setCategory] = useState("");
  const [measure, setMeasure] = useState("");

  const eligible = owner === "yes" && consumption === "yes";
  const canNext = [
    eligible && owner.length > 0 && consumption.length > 0,
    category.length > 0,
    measure.length > 0,
  ];

  const getResult = () => {
    if (category === "vulnerable") return { percentage: 90, maxAmount: undefined, isVulnerable: true };
    switch (measure) {
      case "single": return { percentage: 50, maxAmount: 180000, isVulnerable: false };
      case "basic": return { percentage: 55, maxAmount: undefined, isVulnerable: false };
      case "standard": return { percentage: 60, maxAmount: undefined, isVulnerable: false };
      case "advanced": return { percentage: 65, maxAmount: undefined, isVulnerable: false };
      default: return { percentage: 50, maxAmount: 180000, isVulnerable: false };
    }
  };

  const totalSteps = category === "vulnerable" ? 2 : 3;
  const isResult = step === totalSteps;

  const next = () => {
    if (category === "vulnerable" && step === 1) {
      setStep(totalSteps); // skip to result
    } else {
      setStep((s) => s + 1);
    }
  };

  const steps = ["Uslovi", "Kategorija", "Mere"];
  const visibleSteps = category === "vulnerable" ? steps.slice(0, 2) : steps;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      {!isResult && (
        <div className="flex items-center gap-2 mb-8">
          {visibleSteps.map((label, i) => (
            <div key={label} className="flex items-center gap-2 flex-1">
              <div
                className={`w-8 h-8 flex items-center justify-center text-sm font-heading font-bold shrink-0 ${
                  i <= step
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i + 1}
              </div>
              <span className="text-xs font-medium text-muted-foreground hidden sm:block">
                {label}
              </span>
              {i < visibleSteps.length - 1 && (
                <div className={`h-px flex-1 ${i < step ? "bg-accent" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 0 && (
          <StepEligibility
            key="eligibility"
            owner={owner}
            consumption={consumption}
            setOwner={setOwner}
            setConsumption={setConsumption}
          />
        )}
        {step === 1 && (
          <StepCategory key="category" category={category} setCategory={setCategory} />
        )}
        {step === 2 && !isResult && (
          <StepMeasures key="measures" measure={measure} setMeasure={setMeasure} />
        )}
        {isResult && <SubsidyResult key="result" {...getResult()} />}
      </AnimatePresence>

      {/* Navigation */}
      {!isResult && (
        <div className="flex justify-between mt-8 pt-6 border-t border-border">
          <Button
            variant="ghost"
            onClick={() => setStep((s) => s - 1)}
            disabled={step === 0}
            className="gap-2"
          >
            <ArrowLeft size={16} /> Nazad
          </Button>
          <Button
            variant="hero"
            onClick={next}
            disabled={!canNext[step]}
            className="gap-2"
          >
            {step === totalSteps - 1 ? "Prikaži rezultat" : "Dalje"} <ArrowRight size={16} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default SubsidyWizard;
