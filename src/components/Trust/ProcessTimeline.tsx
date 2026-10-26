import { Link } from "react-router-dom";
import { processSteps } from "@/data/trust";

const ProcessTimeline = () => (
  <div>
    <h3 className="mb-8 font-heading text-xl font-bold text-foreground">Kako radimo</h3>
    <ol className="grid gap-6 lg:grid-cols-6 lg:gap-4">
      {processSteps.map((s, i) => (
        <li key={s.title} className="relative flex gap-4 lg:block">
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center bg-accent font-heading font-black text-accent-foreground lg:mb-4"
          >
            {i + 1}
          </span>
          <div>
            <h4 className="font-heading text-base font-bold text-foreground">
              {s.to ? (
                <Link
                  to={s.to}
                  className="hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {s.title}
                </Link>
              ) : (
                s.title
              )}
            </h4>
            <p className="mt-1 font-body text-sm leading-relaxed text-muted-foreground">{s.description}</p>
          </div>
        </li>
      ))}
    </ol>
  </div>
);

export default ProcessTimeline;
