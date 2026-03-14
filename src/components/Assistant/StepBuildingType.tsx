import { Home, Building2, DoorOpen } from "lucide-react";
import type { BuildingType } from "@/data/assistantProducts";

interface StepBuildingTypeProps {
  value: BuildingType | null;
  onChange: (v: BuildingType) => void;
}

const options: { value: BuildingType; label: string; desc: string; icon: React.ReactNode }[] = [
  { value: "house", label: "Kuća", desc: "Porodična kuća – svi prozori i vrata", icon: <Home size={28} /> },
  { value: "wholeBuilding", label: "Zgrada – ceo objekat", desc: "Stambena zgrada, svi stanovi", icon: <Building2 size={28} /> },
  { value: "singleApartment", label: "Zgrada – jedan stan", desc: "Jedan stan u stambenoj zgradi", icon: <DoorOpen size={28} /> },
];

const StepBuildingType = ({ value, onChange }: StepBuildingTypeProps) => (
  <div className="space-y-3">
    <h2 className="text-xl font-heading font-bold text-foreground mb-1">Kakav je vaš objekat?</h2>
    <p className="text-sm text-muted-foreground mb-6">Izaberite tip objekta kako bismo prilagodili preporuku.</p>
    <div className="grid gap-3">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`flex items-center gap-4 p-5 border text-left transition-all ${
            value === opt.value
              ? "border-accent bg-accent/10"
              : "border-border bg-card hover:border-accent/40"
          }`}
        >
          <span className={value === opt.value ? "text-accent" : "text-muted-foreground"}>{opt.icon}</span>
          <div>
            <span className="font-medium text-foreground block">{opt.label}</span>
            <span className="text-sm text-muted-foreground">{opt.desc}</span>
          </div>
        </button>
      ))}
    </div>
  </div>
);

export default StepBuildingType;
