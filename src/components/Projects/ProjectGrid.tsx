import { lazy, Suspense, useMemo, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import ResponsiveImage from "@/components/ResponsiveImage";
import { RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { categoryLabels, projectFilters, projects, type ProjectFilter } from "@/data/projects";
import { filterProjects } from "@/lib/projects";

const Lightbox = lazy(() => import("./Lightbox"));

const ProjectGrid = () => {
  const [filter, setFilter] = useState<ProjectFilter>("sve");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const visible = useMemo(() => filterProjects(projects, filter), [filter]);

  return (
    <div>
      <ToggleGroup
        type="single"
        value={filter}
        // Radix emits "" when the active item is clicked again; keep the filter selected.
        onValueChange={(v) => v && setFilter(v as ProjectFilter)}
        aria-label="Filter projekata"
        variant="outline"
        className="mb-8 flex-wrap justify-start"
      >
        {projectFilters.map((f) => (
          <ToggleGroupItem key={f.value} value={f.value} className="data-[state=on]:bg-accent data-[state=on]:text-accent-foreground">
            {f.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <p className="sr-only" role="status">
        Prikazano projekata: {visible.length}
      </p>

      {visible.length === 0 ? (
        <p className="py-12 text-center font-body text-muted-foreground">Nema projekata u ovoj kategoriji.</p>
      ) : (
        <RevealStagger key={filter} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <RevealItem key={p.id}>
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                aria-label={`Otvori projekat: ${p.title}, ${p.location}`}
                className="group block w-full overflow-hidden rounded-lg border bg-card text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <ResponsiveImage
                    name={p.image}
                    alt={p.alt}
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {p.before && p.after && (
                    <span className="absolute left-3 top-3 rounded bg-black/65 px-2 py-1 text-xs font-semibold text-white">Pre / posle</span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-bold text-foreground">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {p.location} · {categoryLabels[p.category]} · {p.system.toUpperCase()}
                  </p>
                </div>
              </button>
            </RevealItem>
          ))}
        </RevealStagger>
      )}

      {openIndex !== null && (
        <Suspense fallback={null}>
          <Lightbox items={visible} index={openIndex} onIndexChange={setOpenIndex} />
        </Suspense>
      )}
    </div>
  );
};

export default ProjectGrid;
