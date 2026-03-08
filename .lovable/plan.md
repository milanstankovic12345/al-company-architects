

# Plan: Expand Product Catalog with Old Site & Manufacturer Data

## Research Findings

From the old AL Company site, their production program includes:

**PVC (GEALAN profiles):**
- Sistem 4 komore (4-chamber) — basic, for large windows
- Sistem 6 komora (6-chamber) — mid-range (already have as S-9000)
- Sistem 7 komora (7-chamber) — premium
- S-8000 IQ — high-end GEALAN system

**ALU (ALUMIL profiles):**
- M 9400 — standard windows
- M 11000 — thermal break windows
- M 9050 — sliding systems
- M 9650 — curtain wall/facades
- M 300 — folding/bi-fold doors
- M 23300 — lift & slide
- M 11500 — entrance doors
- M 11600 — entrance doors premium
- M 5600 — roller shutters
- M 9800, M 19800 — curtain walls
- M 8000 — casement windows

**Finishing options:**
- Drvodekor — 20+ wood decor foil finishes (Oregon, Zlatni hrast, Mahagoni, etc.)
- Acrylcolor — acrylic-coated colored PVC profiles (not foil, integrated color layer)

---

## Changes

### 1. Extend Product Data Model (`src/data/products.ts`)

Add a `subcategory` field to `Product` interface for grouping:
```
type ProductSubcategory = "Prozori" | "Vrata" | "Klizni sistemi" | "Fasade" | "Roletne" | "Dodatna oprema";
```

Add ~8 new products to cover the old site's range:

**New PVC products:**
- **GEALAN S-3000** (4-chamber, basic, Uf 1.6, 58mm depth) — tag "Ekonomičan izbor"
- **GEALAN S-7000 IQ** (7-chamber, Uf 0.95, 82.5mm) — tag "Premium izolacija"  
- **GEALAN S-8000 IQ** (6-chamber, Uf 1.0, 74mm, IQ koncept) — tag "Pametni profil"

**New ALU products:**
- **ALUMIL M 11000** — thermal break windows (Uf 1.8–3.5, standard ALU prozori)
- **ALUMIL M 9400** — curtain wall facade system
- **ALUMIL M 9050** — sliding system for large glass openings
- **ALUMIL M 11500** — ALU entrance doors (alternative to SD77)

### 2. Add Finishing Options Section (`src/data/finishes.ts` — new file)

Static data for:
- **Drvodekor** finishes: list of ~20 color names (Oregon IV, Zlatni hrast, Hrast, Mahagoni, Tamni hrast, Lešnik, etc.)
- **Acrylcolor**: description of acrylic coating technology and its benefits (true color integration, UV resistance, easy maintenance)

### 3. Update Products Listing Page (`src/pages/Products.tsx`)

- Add subcategory section headers to visually group products: "Prozori", "Vrata", "Klizni sistemi", "Fasade"
- Add a "Završne obrade" (Finishes) section at the bottom with Drvodekor color palette display and Acrylcolor info card
- Keep existing PVC/ALU filter tabs, add subcategory sub-filters

### 4. Update Product Card (`src/components/Products/ProductCard.tsx`)

- Show subcategory badge alongside category badge

### 5. Update ProductsPreview on Homepage (`src/components/ProductsPreview.tsx`)

- No structural changes needed; the existing two featured products remain

---

## Files Modified/Created

| File | Action |
|------|--------|
| `src/data/products.ts` | Add subcategory type, add 7 new products |
| `src/data/finishes.ts` | New — Drvodekor colors + Acrylcolor data |
| `src/pages/Products.tsx` | Add subcategory grouping + finishes section |
| `src/components/Products/ProductCard.tsx` | Show subcategory badge |
| `src/components/Products/FinishesSection.tsx` | New — Drvodekor palette + Acrylcolor card |

## Implementation Order

1. Extend data model and add new products
2. Create finishes data file
3. Build FinishesSection component
4. Update Products page with grouping and finishes
5. Update ProductCard with subcategory

