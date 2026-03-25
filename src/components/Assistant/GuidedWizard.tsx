import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import StepBuildingType from "./StepBuildingType";
import type { BuildingType } from "@/data/assistantProducts";
import { assistantProducts, securityRank } from "@/data/assistantProducts";

type Goal = "energy" | "security" | "design" | "budget";
type Noise = "quiet" | "busy";
type Floor = "ground" | "high";
type Subsidy = "yes" | "no";

interface WizardState {
  buildingType: BuildingType | null;
  goal: Goal | null;
  noise: Noise | null;
  floor: Floor | null;
  subsidy: Subsidy | null;
}

export interface WizardResult {
  slug: string;
  name: string;
  category: string;
  score: number;
  image: string;
}

interface GuidedWizardProps {
  onResults: (results: WizardResult[]) => void;
}

const RadioCard = ({
  selected,
  onClick,
  label,
  desc,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  desc?: string;
}) => (
  <button
    onClick={onClick}
    className={`p-4 border text-left transition-all ${
      selected ? "border-accent bg-accent/10" : "border-border bg-card hover:border-accent/40"
    }`}
  >
    <span className="font-medium text-foreground block">{label}</span>
    {desc && <span className="text-sm text-muted-foreground">{desc}</span>}
  </button>
);

const GuidedWizard = ({ onResults }: GuidedWizardProps) => {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<WizardState>({
    buildingType: null,
    goal: null,
    noise: null,
    floor: null,
    subsidy: null,
  });

  const skipFloor = state.buildingType === "house";
  const totalSteps = skipFloor ? 4 : 5;

  // Map logical step index to actual step
  const getStepIndex = (s: number) => {
    if (!skipFloor) return s;
    // When house: skip floor step (index 3)
    if (s >= 3) return s + 1;
    return s;
  };

  const actualStep = getStepIndex(step);

  const canNext = () => {
    switch (actualStep) {
      case 0: return !!state.buildingType;
      case 1: return !!state.goal;
      case 2: return !!state.noise;
      case 3: return !!state.floor;
      case 4: return !!state.subsidy;
      default: return false;
    }
  };

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      calculate();
    }
  };

  const calculate = () => {
    // Client-side recommendation only; do not use as a security, pricing, or eligibility authority.
    let pool = [...assistantProducts];

    // Filter by subsidy eligibility
    if (state.subsidy === "yes") {
      pool = pool.filter((p) => p.subsidyEligible);
    }

    // Filter by building suitability
    if (state.buildingType) {
      pool = pool.filter((p) => p.suitableFor.includes(state.buildingType!));
    }

    const scored = pool.map((p) => {
      let score = 0;

      // Goal weights
      switch (state.goal) {
        case "energy":
          score += (3 - p.uw) * 30; // lower Uw = better
          score += (2 - p.uf) * 20;
          score += p.sealLevels * 5;
          break;
        case "security":
          score += (securityRank[p.securityClass] || 0) * 30;
          score += p.frameDepth * 0.3;
          break;
        case "design":
          score += p.maxGlazing * 0.5;
          if (p.aestheticStyle === "modern") score += 25;
          break;
        case "budget":
          score += (100 - p.frameDepth) * 0.4; // simpler = cheaper
          score += (2 - p.uf) * 10;
          break;
      }

      // Noise weights
      const noiseMult = state.buildingType !== "house" ? 1.5 : 1.0;
      if (state.noise === "busy") {
        score += p.soundInsulation * 2 * noiseMult;
      } else {
        score += p.soundInsulation * 0.3;
      }

      // Floor/security weights
      const isGroundFloor = state.buildingType === "house" || state.floor === "ground";
      if (isGroundFloor) {
        score += (securityRank[p.securityClass] || 0) * 20;
      } else {
        score += (securityRank[p.securityClass] || 0) * 5;
      }

      // Building type multiplier for window area (informational for now)
      // wholeBuilding projects get slight boost for robust systems
      if (state.buildingType === "wholeBuilding") {
        score += p.sealLevels * 5;
        if (p.securityClass === "RC3") score += 10;
      }

      return { slug: p.slug, name: p.name, category: p.category, score, image: p.image };
    });

    scored.sort((a, b) => b.score - a.score);

    // Normalize to percentage of top score
    const maxScore = scored[0]?.score || 1;
    const results = scored.slice(0, 3).map((r) => ({
      ...r,
      score: Math.round((r.score / maxScore) * 100),
    }));

    onResults(results);
  };

  const floorLabel =
    state.buildingType === "wholeBuilding"
      ? "Da li objekat ima prizemne lokale/stanove?"
      : "Na kom spratu se nalazi stan?";

  return (
    <div className="max-w-lg mx-auto">
      <Progress value={((step + 1) / totalSteps) * 100} className="mb-8 h-1.5" />

      <AnimatePresence mode="wait">
        <motion.div
          key={actualStep}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
        >
          {actualStep === 0 && (
            <StepBuildingType
              value={state.buildingType}
              onChange={(v) => setState({ ...state, buildingType: v })}
            />
          )}

          {actualStep === 1 && (
            <div className="space-y-3">
              <h2 className="text-xl font-heading font-bold text-foreground mb-1">Šta vam je najvažnije?</h2>
              <p className="text-sm text-muted-foreground mb-6">Izaberite primarni cilj.</p>
              <div className="grid gap-3">
                <RadioCard selected={state.goal === "energy"} onClick={() => setState({ ...state, goal: "energy" })} label="Ušteda energije" desc="Maksimalna toplotna izolacija" />
                <RadioCard selected={state.goal === "security"} onClick={() => setState({ ...state, goal: "security" })} label="Sigurnost" desc="Zaštita od provale" />
                <RadioCard selected={state.goal === "design"} onClick={() => setState({ ...state, goal: "design" })} label="Dizajn i svetlost" desc="Moderan izgled, veliko staklo" />
                <RadioCard selected={state.goal === "budget"} onClick={() => setState({ ...state, goal: "budget" })} label="Budžet" desc="Najbolji odnos cene i kvaliteta" />
              </div>
            </div>
          )}

          {actualStep === 2 && (
            <div className="space-y-3">
              <h2 className="text-xl font-heading font-bold text-foreground mb-1">Da li je buka problem?</h2>
              <p className="text-sm text-muted-foreground mb-6">Koliko je vaše okruženje bučno?</p>
              <div className="grid gap-3">
                <RadioCard selected={state.noise === "quiet"} onClick={() => setState({ ...state, noise: "quiet" })} label="Mirno okruženje" desc="Tiha ulica, selo ili predgrađe" />
                <RadioCard selected={state.noise === "busy"} onClick={() => setState({ ...state, noise: "busy" })} label="Prometna ulica / blizina autoputa" desc="Potrebna pojačana zvučna izolacija" />
              </div>
            </div>
          )}

          {actualStep === 3 && (
            <div className="space-y-3">
              <h2 className="text-xl font-heading font-bold text-foreground mb-1">{floorLabel}</h2>
              <p className="text-sm text-muted-foreground mb-6">Prizemlje zahteva veću zaštitu od provale.</p>
              <div className="grid gap-3">
                <RadioCard
                  selected={state.floor === "ground"}
                  onClick={() => setState({ ...state, floor: "ground" })}
                  label={state.buildingType === "wholeBuilding" ? "Da, ima prizemne prostore" : "Prizemlje / prvi sprat"}
                  desc="Veća potreba za sigurnošću"
                />
                <RadioCard
                  selected={state.floor === "high"}
                  onClick={() => setState({ ...state, floor: "high" })}
                  label={state.buildingType === "wholeBuilding" ? "Ne, samo viši spratovi" : "Viši spratovi"}
                  desc="Standardna sigurnost"
                />
              </div>
            </div>
          )}

          {actualStep === 4 && (
            <div className="space-y-3">
              <h2 className="text-xl font-heading font-bold text-foreground mb-1">Da li aplicirate za državne subvencije?</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Subvencije za energetsku efikasnost 2025/2026.
              </p>
              <div className="grid gap-3">
                <RadioCard selected={state.subsidy === "yes"} onClick={() => setState({ ...state, subsidy: "yes" })} label="Da" desc="Prikaži samo sisteme koji ispunjavaju uslove" />
                <RadioCard selected={state.subsidy === "no"} onClick={() => setState({ ...state, subsidy: "no" })} label="Ne" desc="Prikaži sve opcije" />
              </div>
              {state.subsidy === "yes" && state.buildingType === "wholeBuilding" && (
                <div className="mt-4 p-3 bg-accent/10 border border-accent/30 text-sm text-foreground">
                  <strong>Napomena:</strong> Za celu zgradu potrebna je kolektivna prijava svih stanara.
                </div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
        >
          <ArrowLeft size={16} /> Nazad
        </Button>
        <Button onClick={handleNext} disabled={!canNext()}>
          {step === totalSteps - 1 ? "Prikaži rezultate" : "Dalje"} <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default GuidedWizard;
