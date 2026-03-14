

# Updated Plan: Interactive Window & Door Assistant — Add Building Type Step

## Change Summary

Insert a new **Step 1 — "Tip objekta"** (Building Type) before the existing steps, making the wizard 5 steps + results. The building type affects scoring logic for noise, security, and product sizing recommendations.

## Updated Wizard Flow (5 steps → result)

**Step 1 (NEW) — "Kakav je vaš objekat?"**
- Options:
  - **"Kuća"** (House) — full house, owner controls all windows/doors
  - **"Zgrada – ceo objekat"** (Apartment Building – whole building) — stambena zgrada, all units
  - **"Zgrada – jedan stan"** (Apartment Building – single apartment) — one unit in a building
- Logic effects:
  - **House**: larger window area estimate (×1.0 multiplier), ground floor security relevant, all product types valid
  - **Whole building**: bulk quantity flag (affects quote CTA messaging), larger glazing area multiplier (×2.5), entrance door systems recommended (Alumil), sound insulation weighted higher (shared walls)
  - **Single apartment**: smaller window area (×0.6 multiplier), floor question becomes critical for security, noise from neighbors + street both relevant, subsidy eligibility may differ (ownership proof = different docs)

**Step 2** — "Šta vam je najvažnije?" (Goal) — unchanged

**Step 3** — "Da li je buka problem?" (Noise) — unchanged, but scoring now combines with building type (apartments in buildings get base noise boost ×1.5)

**Step 4** — "Na kom spratu?" (Floor/Security) — unchanged, but:
  - Skipped if building type is "House" (ground floor assumed, security auto-boosted)
  - For "whole building": show as "Da li objekat ima prizemne lokale/stanove?" (yes/no)

**Step 5** — "Da li aplicirate za subvencije?" (Subsidies) — unchanged, but:
  - "Whole building" selection shows note about collective application requirements

**Result** — Match scores with building-type-adjusted weights

## Scoring Adjustments

```
windowAreaMultiplier = house: 1.0, wholeBuilding: 2.5, singleApartment: 0.6
noiseBaseBoost = apartment types get +1.5× base acoustic weight
securityAutoBoost = house always gets ground-floor security consideration
```

These multipliers feed into the ROI calculator integration and product match scores.

## Files Affected

| File | Change |
|------|--------|
| `src/components/Assistant/GuidedWizard.tsx` | Add Step 1 (building type), shift other steps, update scoring with building multipliers |
| `src/components/Assistant/StepBuildingType.tsx` | New component — 3 radio cards with icons (House, Building, Apartment) |
| `src/pages/Assistant.tsx` | Update progress indicator from 4 to 5 steps |
| `src/data/assistantProducts.ts` | Add `suitableFor` field: array of building types each product is recommended for |

