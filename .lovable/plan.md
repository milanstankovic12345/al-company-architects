

# Plan: AlAdvisor — Floating Conversational Chatbot

## Overview

Build a standalone floating chatbot component that replaces the static wizard UX with a conversational interface. It reuses existing scoring logic, product data, and ROI calculations but presents them as an interactive chat with "mini-app" cards inline.

## Architecture

```text
src/components/chat/
├── AlChatbot.tsx          # Floating bubble + chat window shell
├── ChatMessage.tsx        # Single message renderer (text, chips, cards)
├── ChatROICard.tsx        # Inline ROI savings mini-card
├── ChatComparisonCarousel.tsx  # Horizontal product comparison carousel
├── ChatSubsidyBadge.tsx   # Green subsidy eligibility badge
└── chatEngine.ts          # State machine + scoring logic (no UI)
```

## Component Details

### 1. `AlChatbot.tsx` — Shell
- Floating action button (bottom-right, `fixed bottom-6 right-6 z-50`). On mobile, position above the existing `StickyQuoteBar` (`bottom-20`).
- Click expands into a chat window (~400×500px, or full-screen sheet on mobile via `vaul` Drawer).
- Header: "Al Architectural Advisor" with close button.
- Body: scrollable message list.
- Footer: text input + send button. Suggestion chips rendered above input when available.
- State: `isOpen` toggle, `messages[]` array, `chatState` from engine.
- Persist `messages` and `chatState` to `localStorage` key `"al-advisor-chat"`.

### 2. `chatEngine.ts` — State Machine (no AI API)
A deterministic dialogue engine. No LLM calls — purely rule-based branching.

**States:** `greeting → buildingType → goal → noise → floor → subsidy → results → followUp`

Each state defines:
- `botMessage`: text the bot sends
- `chips`: suggestion buttons (primary interaction mode)
- `next(userInput)`: transition function returning next state + optional tool response (ROI card, comparison, badge)

**Key logic reused from `GuidedWizard.tsx`:**
- Same `WizardState` accumulation (buildingType, goal, noise, floor, subsidy)
- Same `calculate()` scoring with `assistantProducts` data
- Floor step skipped when buildingType === "house"

**Tool responses triggered at specific points:**
- After energy goal + noise answer → render `ChatROICard` with savings estimate
- After results calculated → render `ChatComparisonCarousel` with top 3
- After subsidy "yes" → render `ChatSubsidyBadge`
- Fallback: if user types free text not matching any chip, bot responds with "Nisam siguran da razumem. Da li želite da razgovarate sa stručnjakom?" + button to `/kontakt`

### 3. `ChatMessage.tsx` — Message Renderer
- Renders bot messages (left-aligned, charcoal bg) and user messages (right-aligned, accent bg)
- Supports embedded components via a `toolResponse` field on message objects:
  - `type: "roi"` → renders `ChatROICard`
  - `type: "comparison"` → renders `ChatComparisonCarousel`
  - `type: "subsidy"` → renders `ChatSubsidyBadge`
  - `type: "cta"` → renders final CTA buttons

### 4. Mini-App Components

**`ChatROICard.tsx`**: Compact card showing old Uw → new Uw, annual RSD savings, payback years. Reuses calculation logic from `EnergyROICalculator` (heating costs, improvement ratio). Assumes 80m² default home size, electric heating.

**`ChatComparisonCarousel.tsx`**: Horizontal scroll of 2-3 product cards showing name, category badge, Uw, dB, security class. Uses existing `Carousel` component from shadcn/ui. Each card links to `/proizvodi/:slug`.

**`ChatSubsidyBadge.tsx`**: Green badge showing "90% Subvencija" or "50% Osnovni paket" based on product Uw threshold.

### 5. Closing CTA
Final bot message includes two buttons:
- "Pošaljite konfiguraciju konsultantu" → navigates to `/kontakt` with query params encoding selections
- "Ponovo započni" → resets chat state

## Integration

| File | Change |
|------|--------|
| `src/pages/Index.tsx` | Add `<AlChatbot />` component |
| `src/App.tsx` | No change needed (chatbot is overlay, not a route) |

The chatbot renders globally from Index but as a fixed-position overlay. It does not interfere with the existing `/asistent` wizard page (which remains available).

## Conversation Example

```
Bot: "Zdravo! Ja sam vaš Al Architectural Advisor. Da li želite da
      poboljšate energetsku efikasnost, sigurnost ili dizajn?"
      [Energija] [Sigurnost] [Dizajn] [Budžet]

User clicks: [Energija]

Bot: "Kakav je vaš objekat?"
      [Kuća] [Zgrada – ceo objekat] [Zgrada – jedan stan]

User clicks: [Kuća]

Bot: "Da li je buka problem u vašem okruženju?"
      [Mirno] [Prometna ulica]

User clicks: [Prometna ulica]

Bot: "Da li aplicirate za državne subvencije?"
      [Da] [Ne]

User clicks: [Da]

Bot: "Na osnovu vaših odgovora, evo koliko možete uštedeti:"
     [ROI Card: Uw 3.0 → 0.73, ~85,000 RSD/god]

Bot: "Preporučujem ove sisteme:"
     [Comparison Carousel: S-9000 (98%), S-7000 IQ (91%), Linear (78%)]
     [Subsidy Badge: ✓ Ispunjava uslove za subvenciju]

Bot: "Želite li da pošaljete ovu konfiguraciju našem konsultantu?"
     [Pošaljite konsultantu] [Ponovo započni]
```

## Implementation Order

1. Create `chatEngine.ts` (state machine + scoring)
2. Create `ChatMessage.tsx`, `ChatROICard.tsx`, `ChatComparisonCarousel.tsx`, `ChatSubsidyBadge.tsx`
3. Create `AlChatbot.tsx` (shell + localStorage persistence)
4. Add to `Index.tsx`

