import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, ArrowRight, FileText } from "lucide-react";

interface SubsidyResultProps {
  percentage: number;
  maxAmount?: number;
  isVulnerable: boolean;
}

const documents = [
  "Lična karta (fotokopija)",
  "Dokaz o vlasništvu nepokretnosti",
  "Račun za električnu energiju (poslednji mesec)",
  "Profaktura od izvođača radova",
];

const SubsidyResult = ({ percentage, maxAmount, isVulnerable }: SubsidyResultProps) => {
  const handleDownload = () => {
    const text = `LISTA POTREBNIH DOKUMENATA ZA SUBVENCIJE 2026\n\n${documents.map((d, i) => `${i + 1}. ${d}`).join("\n")}\n\nNapomena: Proverite sa lokalnom samoupravom dodatne zahteve.`;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "subvencije-dokumenta-lista.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 text-center"
    >
      <div>
        <p className="text-sm font-body text-muted-foreground mb-2">Vaša procenjena subvencija</p>
        <motion.p
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="text-7xl md:text-8xl font-heading font-black text-accent"
        >
          {percentage}%
        </motion.p>
        {maxAmount && (
          <p className="text-lg font-body text-muted-foreground mt-2">
            Maksimalno do{" "}
            <span className="font-semibold text-foreground">
              {maxAmount.toLocaleString("sr-RS")} RSD
            </span>
          </p>
        )}
        {isVulnerable && (
          <p className="text-sm text-accent font-medium mt-2">
            Socijalno ugrožena kategorija — fiksna subvencija
          </p>
        )}
      </div>

      <div className="text-left max-w-md mx-auto">
        <h4 className="font-heading font-bold text-sm text-foreground mb-3 flex items-center gap-2">
          <FileText size={16} /> Potrebna dokumenta
        </h4>
        <ul className="space-y-2">
          {documents.map((doc, i) => (
            <li key={i} className="flex items-start gap-2 text-sm font-body text-muted-foreground">
              <span className="text-accent font-medium">{i + 1}.</span> {doc}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button variant="hero" size="lg" className="gap-2" asChild>
          <a href="#contact">
            Zatražite predračun <ArrowRight size={16} />
          </a>
        </Button>
        <Button variant="outline" size="lg" className="gap-2" onClick={handleDownload}>
          <Download size={16} /> Preuzmite listu dokumenata
        </Button>
      </div>
    </motion.div>
  );
};

export default SubsidyResult;
