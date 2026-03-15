import { assistantProducts, securityRank, type BuildingType } from "@/data/assistantProducts";

export type ChatStep =
  | "greeting"
  | "buildingType"
  | "goal"
  | "noise"
  | "floor"
  | "subsidy"
  | "results"
  | "followUp";

export type Goal = "energy" | "security" | "design" | "budget";
export type Noise = "quiet" | "busy";
export type Floor = "ground" | "high";
export type SubsidyChoice = "yes" | "no";

export interface ChatState {
  step: ChatStep;
  buildingType: BuildingType | null;
  goal: Goal | null;
  noise: Noise | null;
  floor: Floor | null;
  subsidy: SubsidyChoice | null;
}

export interface ToolResponse {
  type: "roi" | "comparison" | "subsidy" | "cta";
  data?: unknown;
}

export interface StepOutput {
  botMessages: string[];
  chips?: { label: string; value: string }[];
  toolResponses?: ToolResponse[];
  nextStep: ChatStep;
}

export const initialChatState: ChatState = {
  step: "greeting",
  buildingType: null,
  goal: null,
  noise: null,
  floor: null,
  subsidy: null,
};

export function getGreeting(): StepOutput {
  return {
    botMessages: [
      "Zdravo! Ja sam vaš Al Architectural Advisor. Da li želite da poboljšate energetsku efikasnost, sigurnost ili dizajn vaših prozora i vrata?",
    ],
    chips: [
      { label: "Energija", value: "energy" },
      { label: "Sigurnost", value: "security" },
      { label: "Dizajn", value: "design" },
      { label: "Budžet", value: "budget" },
    ],
    nextStep: "goal",
  };
}

export function processInput(
  state: ChatState,
  input: string
): { newState: ChatState; output: StepOutput } {
  switch (state.step) {
    case "goal": {
      const goal = input as Goal;
      const newState = { ...state, step: "buildingType" as ChatStep, goal };
      return {
        newState,
        output: {
          botMessages: ["Kakav je vaš objekat?"],
          chips: [
            { label: "Kuća", value: "house" },
            { label: "Zgrada – ceo objekat", value: "wholeBuilding" },
            { label: "Zgrada – jedan stan", value: "singleApartment" },
          ],
          nextStep: "buildingType",
        },
      };
    }

    case "buildingType": {
      const buildingType = input as BuildingType;
      const newState = { ...state, step: "noise" as ChatStep, buildingType };
      return {
        newState,
        output: {
          botMessages: ["Da li je buka problem u vašem okruženju?"],
          chips: [
            { label: "Mirno okruženje", value: "quiet" },
            { label: "Prometna ulica", value: "busy" },
          ],
          nextStep: "noise",
        },
      };
    }

    case "noise": {
      const noise = input as Noise;
      const newState = { ...state, step: "floor" as ChatStep, noise };

      // Skip floor for houses
      if (state.buildingType === "house") {
        const stateWithFloor = { ...newState, step: "subsidy" as ChatStep, floor: "ground" as Floor };
        return {
          newState: stateWithFloor,
          output: {
            botMessages: ["Da li aplicirate za državne subvencije za energetsku efikasnost 2025/2026?"],
            chips: [
              { label: "Da, želim subvencije", value: "yes" },
              { label: "Ne, prikaži sve", value: "no" },
            ],
            nextStep: "subsidy",
          },
        };
      }

      const floorQ =
        state.buildingType === "wholeBuilding"
          ? "Da li objekat ima prizemne lokale ili stanove?"
          : "Na kom spratu se nalazi vaš stan?";

      return {
        newState,
        output: {
          botMessages: [floorQ],
          chips: [
            {
              label: state.buildingType === "wholeBuilding" ? "Da, ima prizemne prostore" : "Prizemlje / prvi sprat",
              value: "ground",
            },
            {
              label: state.buildingType === "wholeBuilding" ? "Ne, samo viši spratovi" : "Viši spratovi",
              value: "high",
            },
          ],
          nextStep: "floor",
        },
      };
    }

    case "floor": {
      const floor = input as Floor;
      const newState = { ...state, step: "subsidy" as ChatStep, floor };
      const msgs = ["Da li aplicirate za državne subvencije za energetsku efikasnost 2025/2026?"];
      if (state.buildingType === "wholeBuilding") {
        msgs.push("⚠️ Za celu zgradu potrebna je kolektivna prijava svih stanara.");
      }
      return {
        newState,
        output: {
          botMessages: msgs,
          chips: [
            { label: "Da, želim subvencije", value: "yes" },
            { label: "Ne, prikaži sve", value: "no" },
          ],
          nextStep: "subsidy",
        },
      };
    }

    case "subsidy": {
      const subsidy = input as SubsidyChoice;
      const finalState = { ...state, step: "results" as ChatStep, subsidy };
      const results = calculateResults(finalState);
      const toolResponses: ToolResponse[] = [];

      // ROI card if energy goal
      if (finalState.goal === "energy") {
        const bestUw = results[0] ? assistantProducts.find((p) => p.slug === results[0].slug)?.uw ?? 0.73 : 0.73;
        toolResponses.push({
          type: "roi",
          data: { oldUw: 3.0, newUw: bestUw, annualSavings: estimateAnnualSavings(3.0, bestUw) },
        });
      }

      // Comparison carousel
      toolResponses.push({ type: "comparison", data: results });

      // Subsidy badge
      if (subsidy === "yes") {
        const bestProduct = results[0];
        const productData = bestProduct
          ? assistantProducts.find((p) => p.slug === bestProduct.slug)
          : null;
        const pct = productData && productData.uw <= 0.9 ? 90 : 50;
        toolResponses.push({ type: "subsidy", data: { percentage: pct } });
      }

      // CTA
      toolResponses.push({ type: "cta" });

      return {
        newState: finalState,
        output: {
          botMessages: ["Na osnovu vaših odgovora, evo mojih preporuka:"],
          toolResponses,
          nextStep: "followUp",
        },
      };
    }

    default:
      return {
        newState: state,
        output: {
          botMessages: [
            "Nisam siguran da razumem. Da li želite da razgovarate sa stručnjakom?",
          ],
          chips: [
            { label: "Razgovaraj sa stručnjakom", value: "__contact" },
            { label: "Ponovo započni", value: "__restart" },
          ],
          nextStep: state.step,
        },
      };
  }
}

export interface ScoredResult {
  slug: string;
  name: string;
  category: string;
  score: number;
  image: string;
  uw: number;
  uf: number;
  soundInsulation: number;
  securityClass: string;
}

function calculateResults(state: ChatState): ScoredResult[] {
  let pool = [...assistantProducts];

  if (state.subsidy === "yes") {
    pool = pool.filter((p) => p.subsidyEligible);
  }
  if (state.buildingType) {
    pool = pool.filter((p) => p.suitableFor.includes(state.buildingType!));
  }

  const scored = pool.map((p) => {
    let score = 0;

    switch (state.goal) {
      case "energy":
        score += (3 - p.uw) * 30;
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
        score += (100 - p.frameDepth) * 0.4;
        score += (2 - p.uf) * 10;
        break;
    }

    const noiseMult = state.buildingType !== "house" ? 1.5 : 1.0;
    if (state.noise === "busy") {
      score += p.soundInsulation * 2 * noiseMult;
    } else {
      score += p.soundInsulation * 0.3;
    }

    const isGroundFloor = state.buildingType === "house" || state.floor === "ground";
    if (isGroundFloor) {
      score += (securityRank[p.securityClass] || 0) * 20;
    } else {
      score += (securityRank[p.securityClass] || 0) * 5;
    }

    if (state.buildingType === "wholeBuilding") {
      score += p.sealLevels * 5;
      if (p.securityClass === "RC3") score += 10;
    }

    return {
      slug: p.slug,
      name: p.name,
      category: p.category,
      score,
      image: p.image,
      uw: p.uw,
      uf: p.uf,
      soundInsulation: p.soundInsulation,
      securityClass: p.securityClass,
    };
  });

  scored.sort((a, b) => b.score - a.score);

  const maxScore = scored[0]?.score || 1;
  return scored.slice(0, 3).map((r) => ({
    ...r,
    score: Math.round((r.score / maxScore) * 100),
  }));
}

function estimateAnnualSavings(oldUw: number, newUw: number): number {
  const homeSize = 80;
  const annualHeating = homeSize * 150;
  const windowShare = 0.4;
  const oldLoss = windowShare * (oldUw / 3.5);
  const newLoss = windowShare * (newUw / 3.5);
  const savedKwh = annualHeating * (oldLoss - newLoss);
  const costPerKwh = 11; // RSD electricity
  return Math.round(savedKwh * costPerKwh);
}
