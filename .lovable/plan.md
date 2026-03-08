

# Implementation Plan: Subsidy Navigator, ROI Calculator, and Product Pages

This is a large feature set spanning three major modules plus supporting UI elements. The plan creates dedicated pages with routing, reusable components, and all the calculation logic specified.

---

## Architecture Overview

```text
src/
├── pages/
│   ├── Index.tsx              (existing - add ROI Calculator section)
│   ├── SubsidyNavigator.tsx   (new page)
│   ├── Products.tsx           (new - product listing)
│   ├── ProductDetail.tsx      (new - tabbed product detail template)
│   └── NotFound.tsx
├── components/
│   ├── SubsidyNavigator/
│   │   ├── SubsidyWizard.tsx         (multi-step container)
│   │   ├── StepEligibility.tsx       (step 1)
│   │   ├── StepCategory.tsx          (step 2)
│   │   ├── StepMeasures.tsx          (step 3)
│   │   └── SubsidyResult.tsx         (output with checklist)
│   ├── EnergyCalculator/
│   │   ├── EnergyROICalculator.tsx   (main component)
│   │   ├── SavingsMeter.tsx          (animated bar visualization)
│   │   └── PaybackTimeline.tsx       (year-by-year chart)
│   ├── Products/
│   │   ├── ProductCard.tsx           (listing card)
│   │   ├── ProductSpecTable.tsx      (filterable spec table)
│   │   ├── ProductTabs.tsx           (Opis/Specifikacije/Preuzimanja)
│   │   └── ComparisonWidget.tsx      (PVC vs ALU side-by-side)
│   ├── StickyQuoteBar.tsx            (mobile bottom bar)
│   └── TechTooltip.tsx               (reusable tooltip for U-values, dB)
├── data/
│   └── products.ts                   (all product specifications as typed data)
```

---

## 1. Subsidy Navigator

**Route:** `/subvencije` (linked from SubsidyBanner CTA and navbar)

**Component: `SubsidyWizard.tsx`**
- Multi-step form using local React state (step 1–3 + result).
- Progress indicator bar at top showing current step.
- Animated transitions between steps using `framer-motion`.

**Step 1 — Eligibility (`StepEligibility.tsx`)**
- Two yes/no radio questions: building ownership and 80+ kWh consumption.
- If either is "No," display a message explaining ineligibility and stop.

**Step 2 — Category (`StepCategory.tsx`)**
- Two cards: "Redovno domaćinstvo" and "Socijalno ugrožena grupa" with descriptions (pensioner with lowest pension, social help recipient).

**Step 3 — Measures (`StepMeasures.tsx`)**
- If "Socially Vulnerable": skip to result (90% fixed).
- If "Regular": radio selection between "Samo prozori/vrata" (single measure) and package tiers:
  - Basic (2 measures) = 55%, up to max amount
  - Standard (+Heat Pump) = 60%
  - Advanced (+Solar) = 65%
  - Single measure = 50%, max 180,000 RSD

**Result (`SubsidyResult.tsx`)**
- Large percentage display with accent color.
- Max subsidy amount in RSD.
- "Download Checklist" button listing required documents (lična karta, dokaz o vlasništvu, račun za struju, profaktura).
- CTA: "Zatražite predračun" linking to quote form.

---

## 2. Energy ROI Calculator

**Placement:** New section on the homepage (between SubsidyBanner and PartnersSection), and also accessible on product detail pages.

**Component: `EnergyROICalculator.tsx`**

**Inputs (form):**
- Home size in m² — number input with slider (30–300 m²)
- Current heating source — select: Electricity (11 RSD/kWh), Wood (8,000 RSD/m³), Gas (50 RSD/m³), Pellet (32,000 RSD/t)
- Current window type — select: "Stari jednoslojni drveni" (Uw=3.0), "Dvoslojni drveni" (Uw=2.5)

**Calculation Logic:**
- Annual heating energy = homeSize × 150 kWh/m²
- Window heat loss share ≈ 40% of total
- Old window loss = windowShare × oldUw / totalUw
- New window loss = same formula with GEALAN Uw (0.9)
- Energy savings = difference × heating cost per kWh equivalent
- Convert fuel costs to per-kWh: Wood ~0.4 m³/1000kWh, Gas ~10 m³/1000kWh, Pellet ~0.2t/1000kWh
- Payback = estimated window cost (homeSize-based) / annual savings

**UI Output:**
- `SavingsMeter.tsx`: Animated green bar showing annual RSD savings with large number.
- `PaybackTimeline.tsx`: Simple horizontal timeline (recharts or custom) showing payback period in years with cumulative savings.
- Tooltip on the Uw value explaining what it means.

---

## 3. Product Pages

### Data Layer (`src/data/products.ts`)
Typed product data array containing all 4 products with: slug, name, category (PVC/ALU), tag, heroImage, description, features list, full technical specs object (Uf, depth, chambers, sealing levels, acoustic dB, security class, watertightness, threshold), and downloadable PDF links.

### Product Listing Page (`/proizvodi`)
- Category filter tabs: "Svi" | "PVC Sistemi" | "ALU Sistemi"
- Grid of `ProductCard` components with image, name, key spec badges, and link to detail.

### Product Detail Page (`/proizvodi/:slug`)
- Hero banner with product image and key specs overlay.
- **`ProductTabs.tsx`** with three tabs:
  - **Opis**: Rich text description, USP bullets, feature icons.
  - **Tehničke Specifikacije**: `ProductSpecTable` — clean table with rows for each spec. All U-values and dB ratings wrapped in `TechTooltip` (e.g., "Uf 0.92 znači pasivnu kuću – najviši nivo toplote").
  - **Preuzimanja**: Links to PDF catalogs (placeholder URLs for now).

### Comparison Widget (`ComparisonWidget.tsx`)
- Placed on the Products listing page below the grid.
- Side-by-side cards: PVC vs ALU.
- Rows: Thermal insulation, Price, Aesthetics, Large spans, Maintenance.
- Visual indicators (green check / neutral) for which is better in each category.

---

## 4. Supporting UI Components

### `TechTooltip.tsx`
- Wraps any technical value in a Radix `<Tooltip>` with a dashed underline style.
- Props: `value` (display text), `explanation` (tooltip content).
- Predefined explanations map for common values (Uf, Uw, dB, RC classes).

### `StickyQuoteBar.tsx`
- Fixed bottom bar, visible only on mobile (`md:hidden`).
- Two buttons: "Pozovite odmah" (tel: link) and "Zatražite predračun za subvencije" (links to quote/subsidy page).
- Slight shadow and blur backdrop, sits above footer.

---

## 5. Routing Updates (`App.tsx`)

Add routes:
- `/subvencije` → `SubsidyNavigator`
- `/proizvodi` → `Products`
- `/proizvodi/:slug` → `ProductDetail`

Update `Navbar.tsx` links to point to these routes using `react-router-dom` `Link` components instead of anchor `href`s.

Update `SubsidyBanner.tsx` CTA to link to `/subvencije`.

---

## 6. Implementation Order

1. **Product data + TechTooltip** — foundational data and reusable tooltip.
2. **Product listing and detail pages** — largest visual surface area.
3. **Comparison Widget** — added to product listing.
4. **Subsidy Navigator** — full multi-step wizard with calculation logic.
5. **Energy ROI Calculator** — calculator with visualizations, placed on homepage.
6. **Sticky Quote Bar** — mobile-only bottom bar added to layout.
7. **Routing + navigation updates** — wire everything together.

