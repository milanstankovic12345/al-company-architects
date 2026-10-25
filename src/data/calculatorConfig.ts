// All assumptions of the savings calculator live here. TODO: real data from client.
export const calculatorConfig = {
  eurToRsd: 117,
  windowPriceEurPerM2: 230, // installed PVC window, incl. montaža (assumption)
  windowAreaShare: 0.15, // window area as a share of floor area
  consumptionKwhPerM2: 150, // annual heating demand of an older building
  windowHeatLossShare: 0.4, // share of heat loss going through windows
  newUw: 0.9, // whole-window Uw of a new GEALAN window
  maxPaybackYears: 25, // above this, the UI shows "više od 25 godina"
  heatingSources: [
    { value: "electric", label: "Struja", unit: "11 RSD/kWh", costPerKwh: 11 },
    { value: "wood", label: "Drva", unit: "8.000 RSD/prm, ~4 RSD/kWh", costPerKwh: 4 },
    { value: "gas", label: "Gas", unit: "50 RSD/m³, ~5 RSD/kWh", costPerKwh: 5 },
    { value: "pellet", label: "Pelet", unit: "32.000 RSD/t, ~6,4 RSD/kWh", costPerKwh: 6.4 },
  ],
  windowTypes: [
    { value: "single", label: "Stari jednoslojni drveni", uw: 3.0 },
    { value: "double", label: "Dvoslojni drveni", uw: 2.5 },
  ],
};

export type CalculatorConfig = typeof calculatorConfig;
