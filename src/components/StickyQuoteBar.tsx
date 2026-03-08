import { Phone, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const StickyQuoteBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-md border-t border-border shadow-lg p-3 flex gap-2">
      <a
        href="tel:+38114246079"
        className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 text-sm font-medium"
      >
        <Phone size={16} /> Pozovite odmah
      </a>
      <Link
        to="/kontakt"
        className="flex-1 flex items-center justify-center gap-2 bg-accent text-accent-foreground py-3 text-sm font-medium"
      >
        <FileText size={16} /> Zatražite ponudu
      </Link>
    </div>
  );
};

export default StickyQuoteBar;
