# Plan: Replace Navbar Logo with Uploaded Image

## Changes

### 1. Copy uploaded logo to project

Copy `user-uploads://Gemini_Generated_Image_m8w11vm8w11vm8w1-removebg-preview_1.png` → `src/assets/al-company-logo.png`

### 2. Update `src/components/Navbar.tsx`

- Import the logo: `import alCompanyLogo from "@/assets/al-company-logo.png"`
- Replace the placeholder `<div>` + `<span>` logo block (lines 22–27) with an `<img>` tag:
  - `src={alCompanyLogo}`, `alt="AL Company Valjevo Logo"`
  - Desktop: `h-10 md:h-14 w-auto` (preserves aspect ratio, ~same visual width)
  - Vertically centered via existing `flex items-center`
  - The wrapping `<Link to="/">` stays as-is
  - Do not add any background box or color behind the logo.