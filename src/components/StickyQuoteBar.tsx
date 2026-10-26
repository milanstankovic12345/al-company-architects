import { Phone, FileText, MessageCircle, Send } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const MOBILE_TEL = "tel:+38163369392";
const VIBER = "viber://chat?number=%2B381633369392";
const WHATSAPP = "https://wa.me/381633369392";

// Wizard pages have their own CTAs and navigation.
const HIDDEN_ON = ["/ponuda", "/merenje"];

const focus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
const item = `flex-1 min-h-[44px] flex flex-col items-center justify-center gap-0.5 py-2 text-xs font-medium ${focus}`;

const StickyQuoteBar = () => {
  const { pathname } = useLocation();
  if (HIDDEN_ON.includes(pathname.replace(/\/$/, ""))) return null;

  return (
    <>
      <nav
        aria-label="Brzi kontakt"
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background/95 backdrop-blur-md border-t border-border shadow-lg px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] flex gap-2"
      >
        <a href={MOBILE_TEL} className={`${item} bg-primary text-primary-foreground`}>
          <Phone size={18} aria-hidden="true" /> Pozovi
        </a>
        <a href={VIBER} className={`${item} border border-border text-foreground`}>
          <MessageCircle size={18} aria-hidden="true" /> Viber
        </a>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className={`${item} border border-border text-foreground`}
        >
          <Send size={18} aria-hidden="true" /> WhatsApp
        </a>
        <Link to="/ponuda" className={`${item} bg-accent text-accent-foreground`}>
          <FileText size={18} aria-hidden="true" /> Ponuda
        </Link>
      </nav>

      <a
        href={MOBILE_TEL}
        className={`hidden md:flex fixed bottom-6 right-6 z-40 items-center gap-2 bg-primary text-primary-foreground px-5 py-3 text-sm font-medium shadow-lg hover:bg-primary/90 transition-colors ${focus}`}
      >
        <Phone size={16} aria-hidden="true" /> Pozovite nas
      </a>
    </>
  );
};

export default StickyQuoteBar;
