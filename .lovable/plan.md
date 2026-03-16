
Plan:
1. Remove the existing floating chat conversation UI and replace it with a simpler floating “AI Assistant” trigger button that opens the existing `/asistent` experience inside a popup.
2. Remove “Asistent” from the navbar on both desktop and mobile menus so the assistant is no longer a top-level navigation item.
3. Refactor the `/asistent` page so its core content can be reused in two contexts:
   - normal route page at `/asistent`
   - embedded popup content opened from the floating button
4. Build a reusable assistant modal using the existing shadcn `Dialog` primitives:
   - desktop: centered large popup
   - mobile: full-screen dialog
   - preserve the same quiz/results/compare behavior already implemented
5. Replace `AlChatbot.tsx` behavior:
   - remove chat state, localStorage chat history, chips, and message rendering
   - keep a floating CTA button
   - open the reusable assistant modal instead of chat
6. Keep `/asistent` route available for direct links and comparison deep links like `?compare=...`, but when shown inside the popup, hide duplicated page chrome such as navbar/footer/hero heading if needed to avoid nested layout.
7. Update entry points:
   - keep the floating assistant button on the homepage
   - if desired, make popup launcher reusable later on other pages without depending on the old chatbot code

Files to change:
- `src/components/chat/AlChatbot.tsx` — convert from chatbot shell into floating assistant launcher
- `src/components/Navbar.tsx` — remove Asistent link
- `src/pages/Assistant.tsx` — split page layout from reusable assistant content
- likely add a reusable component such as `src/components/Assistant/AssistantContent.tsx` or `AssistantModal.tsx`

Technical notes:
- Best approach is to extract the section currently inside `src/pages/Assistant.tsx` into a reusable component with props like `embedded` / `showPageChrome`.
- The modal should render that reusable component directly, not iframe the route.
- The existing wizard and comparison logic can stay unchanged; only the container and launch pattern need to change.
- On mobile, use dialog content sizing classes like full viewport height/width; on desktop, use a wide constrained modal with internal scrolling.
- Existing compare links to `/asistent?compare=...` should still work directly even after removing the navbar item.

Result:
Users will click one floating assistant button, get the same `/asistent` functionality in a popup window, and no longer see “Asistent” in the main navigation.
