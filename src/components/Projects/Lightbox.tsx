import { useRef } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import ResponsiveImage from "@/components/ResponsiveImage";
import BeforeAfter from "./BeforeAfter";
import { categoryLabels, type Project } from "@/data/projects";
import { wrapIndex } from "@/lib/projects";

interface LightboxProps {
  items: Project[];
  /** Index of the open project in `items`, or null when closed. */
  index: number | null;
  onIndexChange: (index: number | null) => void;
}

const SWIPE_THRESHOLD = 50;

/** Radix Dialog gives the focus trap, Esc and focus return; arrows and swipe navigate. */
const Lightbox = ({ items, index, onIndexChange }: LightboxProps) => {
  const startX = useRef<number | null>(null);
  const open = index !== null && items[index] !== undefined;
  const project = open ? items[index] : null;

  const go = (delta: number) => {
    if (index === null) return;
    onIndexChange(wrapIndex(index + delta, items.length));
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(o) => !o && onIndexChange(null)}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/85 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-1.5rem)] max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg bg-background shadow-lg focus:outline-none"
          onKeyDown={(e) => {
            // Arrows belong to the before/after slider when it has focus.
            if ((e.target as HTMLElement).tagName === "INPUT") return;
            if (e.key === "ArrowLeft") go(-1);
            if (e.key === "ArrowRight") go(1);
          }}
          onPointerDown={(e) => {
            startX.current = e.clientX;
          }}
          onPointerUp={(e) => {
            if (startX.current === null) return;
            const dx = e.clientX - startX.current;
            startX.current = null;
            if (Math.abs(dx) > SWIPE_THRESHOLD) go(dx < 0 ? 1 : -1);
          }}
          onPointerCancel={() => {
            startX.current = null;
          }}
        >
          {project && (
            <>
              {project.before && project.after ? (
                <BeforeAfter before={project.before} after={project.after} alt={project.alt} />
              ) : (
                <div className="aspect-[3/2] w-full bg-muted">
                  <ResponsiveImage
                    name={project.image}
                    alt={project.alt}
                    sizes="(min-width: 1024px) 896px, 100vw"
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                </div>
              )}
              <div className="flex items-center justify-between gap-4 p-4">
                <div>
                  <DialogPrimitive.Title className="font-heading font-bold text-foreground">{project.title}</DialogPrimitive.Title>
                  <DialogPrimitive.Description className="text-sm text-muted-foreground">
                    {project.location} · {categoryLabels[project.category]} · {project.system.toUpperCase()}
                    {project.before && project.after ? " · Pre i posle" : ""}
                  </DialogPrimitive.Description>
                </div>
                <span className="shrink-0 text-sm text-muted-foreground" aria-live="polite">
                  {index! + 1} / {items.length}
                </span>
              </div>
            </>
          )}
          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Prethodni projekat"
                className="absolute left-2 top-[30%] rounded-full bg-black/50 p-2 text-white hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Sledeći projekat"
                className="absolute right-2 top-[30%] rounded-full bg-black/50 p-2 text-white hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
          <DialogPrimitive.Close
            aria-label="Zatvori"
            className="absolute right-2 top-2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            <X className="h-5 w-5" />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default Lightbox;
