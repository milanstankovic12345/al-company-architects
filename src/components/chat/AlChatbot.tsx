import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage, { type ChatMsg } from "./ChatMessage";
import {
  type ChatState,
  initialChatState,
  getGreeting,
  processInput,
} from "./chatEngine";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "al-advisor-chat";

interface PersistedState {
  messages: ChatMsg[];
  chatState: ChatState;
}

function loadState(): PersistedState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return null;
}

function saveState(state: PersistedState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch { /* ignore */ }
}

let msgId = 0;
const nextId = () => `msg-${++msgId}`;

const AlChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("");

  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [chatState, setChatState] = useState<ChatState>(initialChatState);

  // Load persisted state on mount
  useEffect(() => {
    const saved = loadState();
    if (saved && saved.messages.length > 0) {
      setMessages(saved.messages);
      setChatState(saved.chatState);
    } else {
      initGreeting();
    }
  }, []);

  // Persist on change
  useEffect(() => {
    if (messages.length > 0) {
      saveState({ messages, chatState });
    }
  }, [messages, chatState]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const initGreeting = useCallback(() => {
    const greeting = getGreeting();
    setMessages([
      {
        id: nextId(),
        role: "bot",
        text: greeting.botMessages[0],
        chips: greeting.chips,
      },
    ]);
    setChatState({ ...initialChatState, step: greeting.nextStep });
  }, []);

  const handleRestart = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    initGreeting();
  }, [initGreeting]);

  const handleChipClick = useCallback(
    (value: string) => {
      if (value === "__contact") {
        navigate("/kontakt");
        return;
      }
      if (value === "__restart") {
        handleRestart();
        return;
      }

      // Find the chip label
      const lastBotMsg = [...messages].reverse().find((m) => m.role === "bot" && m.chips);
      const chipLabel = lastBotMsg?.chips?.find((c) => c.value === value)?.label ?? value;

      // Add user message
      const userMsg: ChatMsg = { id: nextId(), role: "user", text: chipLabel };

      // Process
      const { newState, output } = processInput(chatState, value);

      const botMsgs: ChatMsg[] = output.botMessages.map((text, i) => ({
        id: nextId(),
        role: "bot" as const,
        text,
        chips: i === output.botMessages.length - 1 ? output.chips : undefined,
        toolResponses: i === output.botMessages.length - 1 ? output.toolResponses : undefined,
      }));

      setMessages((prev) => {
        // Remove chips from previous bot messages
        const cleaned = prev.map((m) => ({ ...m, chips: undefined }));
        return [...cleaned, userMsg, ...botMsgs];
      });
      setChatState({ ...newState, step: output.nextStep });
    },
    [chatState, messages, navigate, handleRestart]
  );

  const handleSendText = useCallback(() => {
    const text = inputValue.trim();
    if (!text) return;
    setInputValue("");

    const userMsg: ChatMsg = { id: nextId(), role: "user", text };

    // Try to match text to current chips
    const lastBotMsg = [...messages].reverse().find((m) => m.role === "bot" && m.chips);
    const matchedChip = lastBotMsg?.chips?.find(
      (c) => c.label.toLowerCase().includes(text.toLowerCase()) || c.value.toLowerCase() === text.toLowerCase()
    );

    if (matchedChip) {
      handleChipClick(matchedChip.value);
      return;
    }

    // Fallback
    const botMsg: ChatMsg = {
      id: nextId(),
      role: "bot",
      text: "Nisam siguran da razumem vaš upit. Molim vas koristite ponuđene opcije ili kontaktirajte našeg stručnjaka.",
      chips: [
        { label: "Razgovaraj sa stručnjakom", value: "__contact" },
        { label: "Ponovo započni", value: "__restart" },
      ],
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
  }, [inputValue, messages, handleChipClick]);

  return (
    <>
      {/* Floating bubble */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 md:bottom-6 bottom-20 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
            aria-label="Otvori Al Advisor"
          >
            <MessageCircle size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 md:bottom-6 bottom-20 w-[calc(100vw-2rem)] max-w-[400px] h-[500px] max-h-[80vh] bg-background border border-border rounded-lg shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground border-b border-border">
              <div>
                <div className="font-heading font-bold text-sm">Al Architectural Advisor</div>
                <div className="text-[10px] opacity-70">Stručni savetnik za prozore i vrata</div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-primary-foreground/10 rounded transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4" ref={scrollRef as any}>
              {messages.map((msg, i) => (
                <ChatMessage
                  key={msg.id}
                  message={msg}
                  onChipClick={handleChipClick}
                  isLatest={i === messages.length - 1}
                  onRestart={handleRestart}
                />
              ))}
            </ScrollArea>

            {/* Input */}
            <div className="p-3 border-t border-border">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendText();
                }}
                className="flex gap-2"
              >
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Unesite poruku..."
                  className="flex-1 h-9 text-sm"
                />
                <Button type="submit" size="icon" className="h-9 w-9 flex-shrink-0">
                  <Send size={16} />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AlChatbot;
