import { calculatorConfig, type CalculatorConfig } from "@/data/calculatorConfig";

export interface SavingsInput {
  homeSize: number; // m²
  heating: string;
  windowType: string;
}

export const calculateSavings = (
  { homeSize, heating, windowType }: SavingsInput,
  config: CalculatorConfig = calculatorConfig,
) => {
  const oldUw = config.windowTypes.find((w) => w.value === windowType)?.uw ?? config.windowTypes[0].uw;
  const costPerKwh =
    config.heatingSources.find((h) => h.value === heating)?.costPerKwh ?? config.heatingSources[0].costPerKwh;

  const windowLossKwh = homeSize * config.consumptionKwhPerM2 * config.windowHeatLossShare;
  const improvement = Math.max((oldUw - config.newUw) / oldUw, 0);
  const annualSavings = Math.round(windowLossKwh * improvement * costPerKwh);

  const windowCost = homeSize * config.windowAreaShare * config.windowPriceEurPerM2 * config.eurToRsd;
  const paybackYears = annualSavings > 0 ? windowCost / annualSavings : Infinity;

  return { annualSavings, windowCost: Math.round(windowCost), paybackYears };
};
