import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ResponsiveImage from "@/components/ResponsiveImage";
import { categoryLabels, projects } from "@/data/projects";

const TEASER_COUNT = 3;

/** First few projects with a link to the full gallery at /projekti. */
const ProjectsTeaser = () => (
  <div>
    <div className="grid gap-6 sm:grid-cols-3">
      {projects.slice(0, TEASER_COUNT).map((p) => (
        <Link
          key={p.id}
          to="/projekti"
          aria-label={`Pogledaj projekte: ${p.title}, ${p.location}`}
          className="group block overflow-hidden border border-border bg-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <div className="aspect-[4/3] overflow-hidden bg-muted">
            <ResponsiveImage
              name={p.image}
              alt={p.alt}
              sizes="(min-width: 896px) 280px, (min-width: 640px) 33vw, 100vw"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="p-4">
            <h3 className="font-heading font-bold text-foreground text-sm">{p.title}</h3>
            <p className="text-xs text-muted-foreground">
              {p.location} · {categoryLabels[p.category]} · {p.system.toUpperCase()}
            </p>
          </div>
        </Link>
      ))}
    </div>
    <Link to="/projekti" className="mt-6 inline-flex items-center gap-2 font-body text-sm font-medium text-accent hover:underline">
      Pogledajte sve projekte <ArrowRight size={16} />
    </Link>
  </div>
);

export default ProjectsTeaser;
