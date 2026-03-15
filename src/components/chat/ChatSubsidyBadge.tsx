import { CheckCircle } from "lucide-react";

interface ChatSubsidyBadgeProps {
  data: {
    percentage: number;
  };
}

const ChatSubsidyBadge = ({ data }: ChatSubsidyBadgeProps) => {
  const label = data.percentage >= 90 ? "90% Subvencija – Socijalno ugroženi" : `${data.percentage}% Osnovni paket`;

  return (
    <div className="flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-lg px-3 py-2">
      <CheckCircle size={16} className="text-accent flex-shrink-0" />
      <span className="text-sm font-medium text-accent">{label}</span>
    </div>
  );
};

export default ChatSubsidyBadge;
