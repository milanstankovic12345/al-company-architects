import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { googleSummary, testimonials } from "@/data/trust";

const TestimonialsSlider = () => {
  const trackRef = useRef<HTMLUListElement>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Iskustva klijenata">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-heading text-xl font-bold text-foreground">Iskustva klijenata</h3>
          <a
            href={googleSummary.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {googleSummary.rating} ★ · {googleSummary.count} recenzija na Google-u
          </a>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => scrollByCard(-1)} aria-label="Prethodne recenzije">
            <ChevronLeft size={18} />
          </Button>
          <Button variant="outline" size="icon" onClick={() => scrollByCard(1)} aria-label="Sledeće recenzije">
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>
      <ul
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:thin]"
      >
        {testimonials.map((t) => (
          <li
            key={t.id}
            className="w-[85%] shrink-0 snap-start border border-border bg-card p-6 sm:w-[48%] lg:w-[32%]"
          >
            <figure>
              {t.rating && (
                <div className="mb-3 flex gap-0.5 text-accent" role="img" aria-label={`Ocena ${t.rating} od 5`}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} size={16} fill={i < t.rating ? "currentColor" : "none"} />
                  ))}
                </div>
              )}
              <blockquote className="font-body text-sm leading-relaxed text-muted-foreground">“{t.text}”</blockquote>
              <figcaption className="mt-4 text-xs text-foreground">
                <span className="font-semibold">{t.name}</span> · {t.source} · {t.when}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestimonialsSlider;
