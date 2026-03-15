import type { ScoredResult } from "./chatEngine";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface ChatComparisonCarouselProps {
  data: ScoredResult[];
}

const ChatComparisonCarousel = ({ data }: ChatComparisonCarouselProps) => {
  return (
    <ScrollArea className="w-full">
      <div className="flex gap-2 pb-2">
        {data.map((product, i) => (
          <Link
            key={product.slug}
            to={`/proizvodi/${product.slug}`}
            className="min-w-[160px] border border-border bg-card rounded-lg p-3 hover:border-accent transition-colors flex-shrink-0"
          >
            <div className="flex items-center justify-between mb-2">
              <Badge
                variant={product.category === "PVC" ? "default" : "secondary"}
                className="text-[10px]"
              >
                {product.category}
              </Badge>
              <span className="text-xs font-bold text-accent">{product.score}%</span>
            </div>
            <div className="font-medium text-xs text-foreground mb-2 leading-tight">
              {i === 0 && "🏆 "}
              {product.name}
            </div>
            <div className="space-y-1 text-[10px] text-muted-foreground">
              <div>Uw: <span className="text-foreground font-medium">{product.uw}</span> W/m²K</div>
              <div>Zvuk: <span className="text-foreground font-medium">{product.soundInsulation}</span> dB</div>
              <div>Klasa: <span className="text-foreground font-medium">{product.securityClass}</span></div>
            </div>
          </Link>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default ChatComparisonCarousel;
