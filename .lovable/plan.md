

# Fix Plan: Broken Links, Navigation, and Scroll Issues

## Issues Found

1. **Hero buttons do nothing** — "Zatražite ponudu" and "Vodič za subvencije 2026" are plain `<Button>` without links.
2. **ProductsPreview "Saznajte više" links go to `#`** — Should link to the actual product detail pages (`/proizvodi/:slug`).
3. **Subsidy page opens at bottom** — Navigation to `/subvencije` doesn't scroll to top. Need `ScrollToTop` component.
4. **Footer links all point to `#`** — Need to connect them to real routes and the original site structure.

## Changes

### 1. `src/components/HeroSection.tsx`
- Wrap "Zatražite ponudu" in a `<Link to="/subvencije">` (or anchor to a contact/quote section).
- Wrap "Vodič za subvencije 2026" in a `<Link to="/subvencije">`.
- Import `Link` from `react-router-dom`.

### 2. `src/components/ProductsPreview.tsx`
- Add `slug` field to the two preview products matching `products.ts` slugs (`gealan-s9000`, `alumil-supreme-sd77`).
- Change `<a href="#">` to `<Link to={/proizvodi/${product.slug}}>`.
- Import `Link` from `react-router-dom`.

### 3. New `src/components/ScrollToTop.tsx`
- A small component using `useEffect` + `useLocation` from react-router-dom to call `window.scrollTo(0, 0)` on every route change.
- Add it inside `<BrowserRouter>` in `App.tsx`.

### 4. `src/components/Footer.tsx`
- Import `Link` from `react-router-dom`.
- Connect footer links based on original site structure and existing routes:
  - **Proizvodi column:**
    - "PVC prozori" → `/proizvodi/gealan-s9000`
    - "PVC vrata" → `/proizvodi/gealan-linear`
    - "ALU fasade" → `/proizvodi/alumil-supreme-sd77`
    - "ALU klizni sistemi" → `/proizvodi/alumil-smartia-s67`
    - "Roletne i komarnici" → `/proizvodi` (listing page)
  - **Informacije column:**
    - "O nama" → `/#about` (or external `https://www.alcompany.rs/index.php?pid=1`)
    - "Subvencije 2026" → `/subvencije`
    - "Projekti" → `/#projects`
    - "Kontakt" → `/#contact` (or external `https://www.alcompany.rs/index.php?pid=13`)

### 5. `src/App.tsx`
- Add `<ScrollToTop />` component inside `<BrowserRouter>`.

## Files Modified
- `src/components/HeroSection.tsx`
- `src/components/ProductsPreview.tsx`
- `src/components/Footer.tsx`
- `src/App.tsx`
- `src/components/ScrollToTop.tsx` (new)

