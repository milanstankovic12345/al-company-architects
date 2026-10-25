# CONTENT_CHECK — claims to confirm with the client

Status: ✅ verified/fixed · ⚠️ needs client confirmation · ❌ unverified

## Fixed in P4
| Claim | Where | Result |
|---|---|---|
| "30+ godina iskustva" | `HeroSection.tsx` | ✅ now computed from 2002, rounded down to 5 (`src/lib/experience.ts`) → "20+" in 2026 |
| Uf 0.72 (hero, ValuePillars) vs 0.92 (products) | `HeroSection.tsx`, `ValuePillars.tsx`, `products.ts`, `assistantProducts.ts` | ✅ unified to **0.89** — GEALAN brochures state S 9000 Uf up to 0.89 W/m²K (centre seal), 0.97 (stop seal). 0.72 had no source; 0.92 matched neither. Source: gealan.de S 9000 system brochures |
| "Ostvarite do 90% povraćaja" | `SubsidyBanner.tsx` | ✅ softened to "do 90% … u zavisnosti od opštine i javnog poziva" |
| Subsidy %, wizard | `StepMeasures.tsx`, `SubsidyResult.tsx`, `GuidedWizard.tsx` | ✅ prefixed "do", disclaimer + source link (placeholder `src/data/subsidy.ts`) |
| Calculator payback 13.3 yrs | `EnergyROICalculator.tsx` | ✅ assumptions moved to `src/data/calculatorConfig.ts`; window price lowered 350→230 €/m² (⚠️ confirm with client's real price list) → ~8.7 yrs for default inputs |

## Subsidy wording note
Percentages (50/55/60/65%, 90% for socijalno ugrožene, cap 180.000 RSD, rule "potrošnja > 80 kWh") are **not verified** against an official call. Wording must stay "do X%, u zavisnosti od opštine i javnog poziva". Replace `SUBSIDY_SOURCE_URL` with the real javni poziv link and confirm each figure.

## Still needs client confirmation
| Claim | Exact text | File |
|---|---|---|
| ⚠️ 15.000+ projects | "Realizovanih projekata" | `HeroSection.tsx:76` (AboutUs says only "hiljade") |
| ⚠️ Exclusive partner | "Ekskluzivni partner GEALAN i ALUMIL (za Srbiju)" | `index.html`, `Footer.tsx`, `PartnersSection.tsx` |
| ⚠️ Sound | S-9000 corrected to 45 dB (GEALAN states 34–45 dB); S-7000 IQ and others still say "Do 47 dB" — unverified | `products.ts`, `assistantProducts.ts` |
| ⚠️ S-9000 Uw 0,73 (reseller figure, depends on glazing; GEALAN publishes no Uw) and RC2 (GEALAN publishes no RC class) | `uw: 0.73`; calculator assumes new Uw 0.9 | `assistantProducts.ts`, `calculatorConfig.ts` |
| ⚠️ RC2 / RC3 | "RC2 klasa otpornosti"; SD77 "RC3"; SD77 listed as window (Uf 1.3) and entrance system | `ValuePillars`, `products.ts`, `assistantProducts.ts` |
| ⚠️ Energy saving | "Ušteda energije do 40%" | `ValuePillars.tsx:8` |
| ⚠️ Product specs | S-3000 1.6, S-7000 IQ 0.95, S-8000 1.0, Alumil M11000 1.8–3.5, Smartia 1.1–2.6; 82.5 mm, 6 chambers, 3 seals | `products.ts` |
| ⚠️ "130+ modela", "M 47 – M 92", "do 400 kg" | | `EntranceDoors.tsx`, `products.ts` |
| ⚠️ About timeline | "2010–2020 hiljade projekata" | `AboutUs.tsx:12` |
| ⚠️ Contact | all places now use milanaiagency@gmail.com (TEMPORARY test address, replace with the real one); fax = same as phone (+381 14 246 079) | `Footer`, `Contact`, `index.html`, `PrivacyPolicy` |
| ❌ Warranty | no warranty statement anywhere | — |
| ⚠️ Calculator inputs | 150 kWh/m², 40% window loss, windows = 15% of floor area, 230 €/m², 117 RSD/€, fuel prices | `calculatorConfig.ts` |

## Fotografije koje treba zatražiti od klijenta (P5)
Trenutno su na sajtu **privremene stock fotografije** (Pexels licenca, označene komentarom `TEMPORARY stock photo` u kodu) i proizvođačke slike profila. Zameniti pravim:
- Realizovani projekti (kuće, stanovi, poslovni objekti), po mogućstvu pre/posle ugradnje
- Proizvodni pogon / radionica (rad na mašinama, sečenje i zavarivanje profila)
- Showroom / prodajni salon (spolja i iznutra)
- Tim (portreti i grupna fotografija montera/prodaje)
- Ugradnja na terenu (montaža, zaptivanje, završni radovi)
- Ulazna vrata iz sopstvenih realizacija (klasična, moderna, premium) – trenutno stock
- Primeri Acrylcolor završne obrade (RAL uzorci na stvarnim profilima) – za sada nema fotografije
- Aluminijumski klizni / podizno-klizni sistemi ugrađeni kod klijenata
