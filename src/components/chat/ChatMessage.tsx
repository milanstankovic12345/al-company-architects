import { memo } from "react";
import type { ToolResponse } from "./chatEngine";
import ChatROICard from "./ChatROICard";
import ChatComparisonCarousel from "./ChatComparisonCarousel";
import ChatSubsidyBadge from "./ChatSubsidyBadge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ExternalLink, RotateCcw } from "lucide-react";

export interface ChatMsg {
  id: string;
  role: "bot" | "user";
  text: string;
  chips?: { label: string; value: string }[];
  toolResponses?: ToolResponse[];
}

interface ChatMessageProps {
  message: ChatMsg;
  onChipClick?: (value: string) => void;
  isLatest?: boolean;
  onRestart?: () => void;
}

const ChatMessage = memo(({ message, onChipClick, isLatest, onRestart }: ChatMessageProps) => {
  const navigate = useNavigate();
  const isBot = message.role === "bot";

  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"} mb-3`}>
      <div className={`max-w-[85%] space-y-2`}>
        <div
          className={`px-4 py-2.5 text-sm leading-relaxed ${
            isBot
              ? "bg-primary text-primary-foreground rounded-tr-lg rounded-br-lg rounded-bl-lg"
              : "bg-accent text-accent-foreground rounded-tl-lg rounded-bl-lg rounded-br-lg"
          }`}
        >
          {message.text}
        </div>

        {/* Tool responses */}
        {message.toolResponses?.map((tool, i) => (
          <div key={i}>
            {tool.type === "roi" && <ChatROICard data={tool.data as any} />}
            {tool.type === "comparison" && <ChatComparisonCarousel data={tool.data as any} />}
            {tool.type === "subsidy" && <ChatSubsidyBadge data={tool.data as any} />}
            {tool.type === "cta" && (
              <div className="flex flex-col gap-2 mt-2">
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => navigate("/kontakt?source=advisor")}
                >
                  <ExternalLink size={14} />
                  Pošaljite konfiguraciju konsultantu
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full"
                  onClick={onRestart}
                >
                  <RotateCcw size={14} />
                  Ponovo započni
                </Button>
              </div>
            )}
          </div>
        ))}

        {/* Suggestion chips */}
        {isLatest && message.chips && message.chips.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {message.chips.map((chip) => (
              <button
                key={chip.value}
                onClick={() => onChipClick?.(chip.value)}
                className="px-3 py-1.5 text-xs font-medium border border-accent text-accent rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {chip.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

ChatMessage.displayName = "ChatMessage";
export default ChatMessage;
