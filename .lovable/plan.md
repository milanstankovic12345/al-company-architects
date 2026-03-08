

# Plan: Contact Form, Remove Downloads, Fix Footer Links

## Changes Overview

### 1. Create Contact Page (`src/pages/Contact.tsx`)
New page at `/kontakt` with a lead capture form containing:
- **Ime i prezime** (name) — text input
- **Email** — email input
- **Telefon** — tel input
- **Kvadratura objekta (m²)** — number input
- **Broj prozora za zamenu** — number input
- **Broj vrata za zamenu** — number input
- **Tip stolarije** — select: PVC / ALU / Nisam siguran
- **Dodatne napomene** — textarea
- Submit button with success toast via `sonner`
- Zod validation for all fields

### 2. Remove "Preuzmite listu dokumenata" from Subsidy Result
**File: `src/components/SubsidyNavigator/SubsidyResult.tsx`**
- Delete the download button and `handleDownload` function
- Change "Zatražite predračun" button to link to `/kontakt`

### 3. Remove "Preuzimanja" tab from Product Pages
**File: `src/components/Products/ProductTabs.tsx`**
- Remove the "Preuzimanja" `TabsTrigger` and `TabsContent`
- Remove `Download` import

### 4. Update all "Zatražite ponudu" buttons to link to `/kontakt`
- **`src/components/HeroSection.tsx`** — change first Link `to="/kontakt"`
- **`src/components/Navbar.tsx`** — wrap both desktop and mobile buttons in `<Link to="/kontakt">`
- **`src/pages/ProductDetail.tsx`** — wrap button in `<Link to="/kontakt">`
- **`src/components/StickyQuoteBar.tsx`** — change "Predračun" link to `/kontakt`

### 5. Fix Footer Links
**File: `src/components/Footer.tsx`**
- "O nama" → `/o-nama` (new internal page, or keep as section — will link to `/kontakt` for now since no about page exists; better: create a simple About page)
- "Projekti" → link to `/proizvodi` (closest equivalent on new site)
- "Kontakt" → `/kontakt`

Since there's no About or Projects page yet, "O nama" and "Projekti" will link to reasonable internal alternatives rather than the old external site.

### 6. Add Route for Contact Page
**File: `src/App.tsx`**
- Add `/kontakt` route pointing to the new Contact page

### 7. Update Navbar links
**File: `src/components/Navbar.tsx`**
- Change "Projekti" `href: "#projects"` → `href: "/proizvodi"` 
- Change "O nama" `href: "#about"` → `href: "/kontakt"` (until dedicated about page exists)

## Files
- `src/pages/Contact.tsx` — **new**
- `src/components/SubsidyNavigator/SubsidyResult.tsx` — edit
- `src/components/Products/ProductTabs.tsx` — edit
- `src/components/HeroSection.tsx` — edit
- `src/components/Navbar.tsx` — edit
- `src/pages/ProductDetail.tsx` — edit
- `src/components/StickyQuoteBar.tsx` — edit
- `src/components/Footer.tsx` — edit
- `src/App.tsx` — edit

