

# Plan: Rename "Početna" to "O nama", Link to #about, Enrich ValuePillars

## Changes

### 1. Update Navbar (`src/components/Navbar.tsx`)
- Change `{ label: "Početna", href: "/" }` → `{ label: "O nama", href: "/#about" }`
- Since this uses an anchor on the homepage, the link needs to handle scroll-to-section. On the homepage it scrolls to `#about`; from other pages it navigates to `/#about`.

### 2. Update Footer (`src/components/Footer.tsx`)
- Change "O nama" link from `to="/kontakt"` → `to="/#about"`

### 3. Enrich ValuePillars (`src/components/ValuePillars.tsx`)
Add a company intro paragraph above the pillars grid, based on the old site content:

> "Preduzeće AL Company je nastalo kao rezultat ulaganja kapitala i znanja tokom dugog niza godina. Sa sigurnošću se može reći da je jedno od pionira u ovom poslu..."

Reworked into modern copy:
- Short company history paragraph (founded as pioneer, long-term investment in knowledge and capital)
- Key facts: wide range of ALU and PVC products from world-renowned manufacturers ALUMIL and GEALAN
- Quality positioning: products at the top of domestic and European production
- Team of experts continuously following global innovations

Add 2 more pillars or an intro text block between the heading and the grid to incorporate this content. Will add a concise company story paragraph below the section heading.

### Files
| File | Change |
|------|--------|
| `src/components/Navbar.tsx` | Rename "Početna" → "O nama", href → `/#about` |
| `src/components/Footer.tsx` | "O nama" link → `/#about` |
| `src/components/ValuePillars.tsx` | Add company intro paragraph from old site data |

