import { TrendingDown, Zap } from "lucide-react";

interface ChatROICardProps {
  data: {
    oldUw: number;
    newUw: number;
    annualSavings: number;
  };
}

const ChatROICard = ({ data }: ChatROICardProps) => {
  const paybackYears = Math.round((80 * 350) / data.annualSavings); // rough estimate

  return (
    <div className="border border-accent/30 bg-accent/5 rounded-lg p-3 space-y-2">
      <div className="flex items-center gap-2 text-accent font-medium text-xs uppercase tracking-wide">
        <Zap size={14} />
        Ušteda energije
      </div>
      <div className="flex items-center gap-3">
        <div className="text-center">
          <div className="text-lg font-bold text-destructive line-through">
            {data.oldUw}
          </div>
          <div className="text-[10px] text-muted-foreground">Stari Uw</div>
        </div>
        <TrendingDown size={18} className="text-accent" />
        <div className="text-center">
          <div className="text-lg font-bold text-accent">{data.newUw}</div>
          <div className="text-[10px] text-muted-foreground">Novi Uw</div>
        </div>
        <div className="ml-auto text-right">
          <div className="text-lg font-bold text-foreground">
            ~{data.annualSavings.toLocaleString("sr-RS")} <span className="text-xs font-normal">RSD/god</span>
          </div>
          <div className="text-[10px] text-muted-foreground">
            Povrat za ~{paybackYears} god.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatROICard;
