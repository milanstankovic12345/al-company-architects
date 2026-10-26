import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const cards = [
  {
    title: "Izaberite PVC ako…",
    points: [
      "vam je najvažnija toplotna izolacija i ušteda na grejanju",
      "želite povoljniju cenu po kvadratu",
      "tražite drvo dekore i jednostavno održavanje",
    ],
  },
  {
    title: "Izaberite aluminijum ako…",
    points: [
      "želite tanke profile i velike staklene površine",
      "planirate klizne sisteme za terasu ili veliki otvor",
      "vam je važna moderna, dugotrajna estetika",
    ],
  },
];

const PvcOrAluGuide = () => (
  <section aria-labelledby="pvc-alu-heading" className="mt-16">
    <h2 id="pvc-alu-heading" className="text-2xl md:text-3xl font-heading font-black text-foreground mb-2">
      PVC ili ALU?
    </h2>
    <p className="font-body text-muted-foreground max-w-xl mb-8">
      Kratak vodič: oba materijala su kvalitetna, razlika je u tome šta vam je prioritet.
    </p>
    <div className="grid md:grid-cols-2 gap-6">
      {cards.map((c) => (
        <div key={c.title} className="border border-border bg-card p-6">
          <h3 className="font-heading font-bold text-lg text-foreground mb-4">{c.title}</h3>
          <ul className="space-y-3">
            {c.points.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm font-body text-foreground">
                <Check size={16} className="text-accent mt-0.5 shrink-0" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="flex flex-wrap gap-3 mt-8">
      <Button asChild>
        <Link to="/asistent">Pomoć pri izboru</Link>
      </Button>
      <Button asChild variant="outline">
        <Link to="/ponuda">Zatražite ponudu</Link>
      </Button>
    </div>
  </section>
);

export default PvcOrAluGuide;
