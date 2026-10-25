# Disabled: AI Assistant widget

Floating "AI Assistant" button + dialog (removed from the site in task P1 1.2).
It has no API route or env variables; it only wraps `@/components/Assistant/AssistantContent`.

To restore:
1. `git mv _disabled/ai-assistant/AlChatbot.tsx src/components/chat/AlChatbot.tsx`
2. In `src/pages/Index.tsx` add `import AlChatbot from "@/components/chat/AlChatbot";` and render `<AlChatbot />`.
