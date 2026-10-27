# BRAND_NOTES — AL Company logo proposal

Status: **proposal only**, not live on the site. Review at `/brand-preview` (noindex, not in the sitemap). All files are in `brand/logo-proposals/`.

## Why a redesign

The current logo (`src/assets/al-company-logo.png`) is a raster chrome/bevel badge: red triangular "A" with 4 slats, tiny curved "COMPANY / VALJEVO" text, and a wordmark beside it.

- The chrome gradient and bevel do not scale down or work in one colour.
- The badge micro-text and the slats are unreadable at 32 px.
- It is PNG only, and the lockup is hard to stack.

What all three concepts keep: the brand red, a bold geometric sans for "AL COMPANY", and a widely spaced grey "VALJEVO". What changes: flat vector shapes, no gradients, and light / dark / one-colour versions.

## Palette

Brand colours are computed from the tokens in `src/index.css`; the greys and ink are new.

| Role | Hex | Use |
|---|---|---|
| Brand red (`--primary`) | `#870D11` | Emblem and wordmark on light |
| Deep red (`--primary-dark`) | `#5E080B` | Shadow face (spare) |
| Hover red | `#B8141A` | Secondary face (spare) |
| Bright red (`--accent`) | `#E4252B` | Emblem on dark |
| Light red | `#EB474D` | Small highlights only |
| Steel grey | `#5B6168` | "VALJEVO" on light |
| Light grey | `#C9CDD2` | "VALJEVO" on dark |
| Ink | `#1B1D21` | Dark background, one-colour dark |
| White | `#FFFFFF` | Light background, one-colour white |

Versions per lockup: **light** (`#870D11` + `#5B6168` on white), **dark** (`#E4252B` emblem, white "AL COMPANY", `#C9CDD2` "VALJEVO" on `#1B1D21`), **mono-ink** and **mono-white** (one flat colour).

Contrast (WCAG): `#870D11` on white 10.02; `#5B6168` on white 6.26; `#C9CDD2` on ink 10.57; white on ink 16.88; `#E4252B` on ink 3.70 (graphics only, so on dark the small text is white/light grey); `#870D11` on ink 1.68 (never use on dark).

## Fonts

All are SIL OFL 1.1 (commercial use and logos allowed). Wordmarks in the SVGs are outlined, so no font is needed to display them. The fonts load only on `/brand-preview` if at all, not site-wide.

- Montserrat 800 / 500 — Concepts A and C ("AL COMPANY" 800, "VALJEVO" 500). Already loaded on the site.
- Barlow 700 — Concept B "AL COMPANY"; Montserrat 500 for "VALJEVO".

## Concepts

### A — Evolution
Closest to today's logo. The triangular "A" is rebuilt as flat polygons cut by three gaps (instead of 4 slats and a chrome badge). The icon's bottom piece has a notch between two feet so it reads as an "A"; the lockups use the plain stepped version, so adopting A means applying the notch to them too. "AL COMPANY" in Montserrat 800, red; "VALJEVO" in Montserrat 500, grey.
- Pro: keeps recognition with existing customers.
- Con: at 16 px the gaps blur into stripes (the silhouette still reads); at lockup size it reads more as a stepped pyramid than a letter.

### B — Architectural
A window frame (10-unit frame) with a bold "A" inside whose crossbar reads as the transom. Ties the mark to the product. "AL COMPANY" in Barlow 700, red; "VALJEVO" in Montserrat 500, grey.
- Pro: says "windows" without text; stays clear at 16 px as a favicon.
- Con: the frame is heavy next to the text and can feel boxy (thinning it to 8 is the fix).

### C — Minimalist monogram
A flat "AL" monogram (A with counter, L beside it), two paths. "AL COMPANY" in Montserrat 800, red; "VALJEVO" in Montserrat 500, grey.
- Pro: simplest and most scalable; clear at 16 px.
- Con: the monogram is tall and narrow next to the wordmark; least tied to windows and furthest from the current logo.

## Known limits (all concepts)

- "VALJEVO" becomes a hairline at about 32 px high; use the icon for small sizes.
- Red emblem on dark is for graphics only (see contrast above).

## Files

36 SVGs: `concept-{a,b,c}-{horizontal,stacked,icon}[-dark|-mono-white|-mono-ink].svg` (the light version has no suffix). Transparent backgrounds. Horizontal viewBox 360×100, stacked 240×180, icon 100×100.

## Originality check (task 7.22)

Checked on 2026-10-27, file and visual level:

- All 36 SVGs contain only hand-written `path` / `polygon` geometry. A search for `<image`, `<text`, `<use`, `href=` and `data:` finds nothing: no embedded raster, no live text, no external reference. Wordmarks are outlined from OFL fonts (Montserrat, Barlow).
- Concept A is rebuilt from the company's own current logo (`src/assets/al-company-logo.png`), not from a third-party mark.
- Concepts B (square frame + "A") and C ("AL" monogram) are drawn from plain geometric primitives. No Gealan or Alumil logo, wordmark or symbol was used as a base in any concept.

Limit: this is not a legal trademark search. A square frame with a letter and a two-letter monogram are generic forms and may resemble existing registered marks. Before adopting a concept, the owner should search the Serbian IP office (ZIS) and EUIPO databases for the chosen mark.
