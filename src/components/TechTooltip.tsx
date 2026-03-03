import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { techExplanations } from "@/data/products";

interface TechTooltipProps {
  value: string;
  tooltipKey?: string;
  explanation?: string;
}

const TechTooltip = ({ value, tooltipKey, explanation }: TechTooltipProps) => {
  const tip = explanation || (tooltipKey ? techExplanations[tooltipKey] : undefined);

  if (!tip) return <span>{value}</span>;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="border-b border-dashed border-muted-foreground/50 cursor-help">
          {value}
        </span>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs text-sm" side="top">
        {tip}
      </TooltipContent>
    </Tooltip>
  );
};

export default TechTooltip;
