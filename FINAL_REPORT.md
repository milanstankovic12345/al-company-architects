# FINAL REPORT — AL Company website (P0–P8)

Status: **not deployed.** Deployment waits for the owner's go-ahead (task 8.8). Site content stays Serbian (Latin); this report is English, like `PROGRESS.md`.

## 1. What was done, per priority
| Priority | Result |
|---|---|
| **P0** Inspection | Vite + React SPA (no Next.js / API routes / backend); plan agreed. |
| **P1** Critical fixes | Hero overlap fixed (svh/dvh min-height, fluid headline, stats in flow, 7 widths checked); AI Assistant widget removed (kept in `_disabled`); working contact form (validation, honeypot, env-based Formspree endpoint). |
| **P2** Brand colour | Green accent replaced by logo red across the site. |
| **P3** Animations | CountUp, Reveal, hover states; all respect `prefers-reduced-motion`. |
| **P4** Content accuracy | Experience computed from 2002; Uf unified to 0.89 (GEALAN S 9000); subsidy wording softened ("do X%"); calculator assumptions in `calculatorConfig.ts`; email unified. See `CONTENT_CHECK.md`. |
| **P5** Product imagery | Responsive AVIF/WebP, stock fallbacks, Serbian alt text. |
| **P6** New features | `/ponuda` quote wizard, `/merenje` measurement booking, `/projekti` gallery + lightbox + before/after, `/boje` finish visualizer, `/uporedi` system comparison, sticky mobile action bar (call/Viber/WhatsApp/quote), trust section + real Google reviews, S-9000 and other profile cross-sections, FAQ with FAQPage JSON-LD, `/saveti` blog (3 stub articles), local SEO (canonical, OG, LocalBusiness JSON-LD, sitemap), click-to-load Google Map, Vercel Analytics, updated privacy policy. |
| **P7** Logo | 3 concepts (A, B, C) × horizontal / stacked / icon × light / dark / mono, outlined SVGs in `brand/logo-proposals/`; review page `/brand-preview` (noindex); rationale in `BRAND_NOTES.md`; originality confirmed. **No concept has been chosen or applied to the site.** |
| **P8** Wrap-up | Lazy-loading check, Lighthouse + keyboard pass with fixes (below), this report. |

### P8 results
**8.1 Lazy loading — confirmed.** `ProjectGrid` / `Lightbox` (gallery), `FinishVisualizer`, quote wizard, measurement form, compare table, profile cross-section are separate chunks. The map iframe only loads after a click. Open point: the main bundle is **957 kB (303 kB gzip)** because all pages are imported eagerly in `src/App.tsx`. Route-level `lazy()` would cut it; not done (outside the task list, would change loading behaviour for every route).

**8.2 Lighthouse, mobile, local production build (`vite preview`).** Performance trace on `/` (no throttling): LCP 288 ms, CLS 0.00. The Lighthouse tool used here does not score Performance, so there is no 0–100 Performance number; **re-run on the deployed URL with PageSpeed Insights** for real-network scores.

| Page | Accessibility (before → after) | SEO | Best Practices |
|---|---|---|---|
| `/` | 87 → 100 | 100 | 96 |
| `/proizvodi` | 96 (not re-fixed, see below) | 100 | 96 |
| `/projekti` | 95 → 100 | 100 | 96 |
| `/kontakt` | 88 → 96 | 100 | 96 |
| `/ponuda` | 95 → 100 | 100 | 96 |

Best Practices 96 everywhere comes from one console error: the `/_vercel/insights/script.js` 404, which only happens off Vercel. `/projekti` CLS is 0.077 (under the 0.1 "good" limit; lazy grid replaces a shorter skeleton).

**Fixes made in P8:** unnamed calculator slider and selects (`EnergyROICalculator.tsx`, `ui/slider.tsx` thumb now takes `aria-label`); footer text contrast (`Footer.tsx`); footer headings `h4` → `h2` (skipped levels on every page); gallery cards: accessible name now comes from visible text, `h3` → `h2`; contact `h3` → `h2`; inline links underlined (not colour-only) on `/projekti`, `/kontakt`, `/ponuda`, `/merenje`; phone links on `/kontakt` get a 24 px target; **lightbox did not return focus to the card on close (it dropped to `<body>`) — fixed** in `ProjectGrid.tsx`.

**Not fixed — owner decision:** brand red `#E4252B` on near-white measures 4.37–4.45:1, just under the 4.5:1 WCAG AA limit for small text (`/proizvodi` "Ekonomičan izbor" badge, "Detaljnije", "Detaljno poređenje sistema →"; `/kontakt` "Prikaži na Google Maps →"). Fix is a slightly darker red for text on light backgrounds; this touches the brand and was left alone.

Lighthouse "Agentic Browsing" failures (`llms.txt`, `ai-catalog.json`) are optional and not addressed.

**8.3 Keyboard / screen-reader pass — partial.** Verified with real key presses and the accessibility tree: gallery (cards named, lightbox has title + description, ←/→ navigate, Esc closes, focus returns after fix, before/after slider is a named slider), and the Lighthouse axe checks above on 5 pages (names, roles, headings, contrast, target size). **Not manually tested:** Compare picker, quote/measurement wizard flows with a real screen reader, FAQ accordion, testimonial slider, profile hotspots, StickyQuoteBar on a device, touch swipe. No real screen reader (NVDA/VoiceOver) was run.

Final checks: `npm run build` OK, `npm run lint` 0 errors (6 pre-existing warnings), `npm test` 50/50.

## 2. To confirm with the client
Full list with exact files: **`CONTENT_CHECK.md`**. Main points: "15.000+ projekata"; exclusive-partner claim (GEALAN/ALUMIL); sound/security figures (dB, RC2/RC3) and Uw 0,73; "ušteda do 40%"; product specs and "130+ modela"; About timeline; **warranty (no statement anywhere)**; contact details (fax = phone; email is a temporary test address); subsidy percentages (not verified against an official call); calculator window price (230 €/m²). Also: which logo concept (A/B/C) to use — open `/brand-preview`.

## 3. To configure on Vercel
- **Env var:** `VITE_FORMSPREE_ENDPOINT` = real endpoint from formspree.io (Project Settings → Environment Variables; redeploy after setting). Without it the contact, quote and measurement forms do not send. Photo upload in `/ponuda` needs a **paid** Formspree plan (free plan falls back to file names only).
- **Email:** replace the temporary `milanaiagency@gmail.com` (Footer, Contact, `index.html`, PrivacyPolicy; Formspree recipient too) with the real business address.
- **Analytics:** `@vercel/analytics` is already in `App.tsx`; enable Web Analytics for the project in the Vercel dashboard. Cookie-free, so no banner, and the privacy policy already mentions it.
- **Domain:** `SITE_URL` in `src/lib/seo.ts` is `https://al-company.vercel.app`; change it (plus `public/sitemap.xml`, `public/robots.txt`, OG tags in `index.html`) when the real domain is attached.
- **Redirects:** `vercel.json` has the SPA rewrite and permanent redirects from legacy `/index.php?pid=N`; add one there for any other old URL. `sitemap.xml` is hand-maintained (new routes need an entry; `/asistent` and `/brand-preview` are deliberately excluded).
- After deploy: run PageSpeed Insights on the live URL and submit the sitemap in Google Search Console.

## 4. Scaffolded / placeholder, needs real data
(All marked `// TODO: real data from client` in code.)
- `src/data/projects.ts` — all 8 projects, photos and before/after pairs are stock/placeholder.
- `src/data/trust.ts` — testimonials wording (Google reviews were added later; check), warranty length, certificate names; partner "logos" are text wordmarks (need brand files).
- `src/data/faq.ts` — no prices, lead times or warranty length stated; winter-installation / maintenance wording is generic.
- `src/data/measurementOptions.ts` — towns, working days (Mon–Sat), time windows, 60-day horizon.
- `src/data/quoteOptions.ts` — product and finish lists for the wizard.
- `src/data/subsidy.ts` — placeholder source link; replace with the official javni poziv and confirm figures.
- `src/data/calculatorConfig.ts` — prices, energy tariffs, payback assumptions.
- `src/data/profileSections.ts` — schematic profile drawings; replace with manufacturer drawings, confirm steel-reinforcement wording.
- `src/lib/localBusiness.ts` — opening hours (placeholder Mon–Fri 8–16, Sat 8–14), approximate coordinates, public business email.
- `src/content/saveti/*.md` — 3 stub articles; owner to review facts (subsidy article especially).
- **Not built:** 6.10.a Downloads section (placeholder PDFs).
- **Pending decision:** logo concept (P7) — nothing in `src/` uses the new logos yet.

## 5. Deployment
**Not deployed. Waiting for the owner's go-ahead.**
