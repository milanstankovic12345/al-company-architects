import { MapPin, Phone, Mail, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-surface-dark py-16 md:py-20 pb-[calc(7rem+env(safe-area-inset-bottom))] md:pb-20">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-12 md:gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-foreground flex items-center justify-center">
                <span className="text-primary font-heading font-black text-sm">AL</span>
              </div>
              <span className="font-heading font-bold text-lg text-primary-foreground">
                AL Company d.o.o.
              </span>
            </div>
            <p className="font-body text-primary-foreground/50 max-w-sm leading-relaxed mb-2 text-sm font-medium">
              PVC i aluminijumska stolarija
            </p>
            <p className="font-body text-primary-foreground/40 max-w-sm leading-relaxed mb-6 text-sm">
              Proizvođač vrhunske PVC i aluminijumske stolarije od 2002. godine.
              Ekskluzivni partner kompanija GEALAN i ALUMIL za Srbiju.
            </p>
            <div className="flex flex-col gap-3 text-sm font-body text-primary-foreground/50">
              <a className="flex items-center gap-2 hover:text-primary-foreground/80 transition-colors" href="https://maps.app.goo.gl/ZXj7UDHgeK4nkm7cA" target="_blank" rel="noopener noreferrer">
                <MapPin size={14} /> Prva proleterska 60, 14000 Valjevo, Srbija
              </a>
              <a href="tel:+38114246079" className="flex items-center gap-2 hover:text-primary-foreground/80 transition-colors">
                <Phone size={14} /> +381 14 246 079
              </a>
              <a href="tel:+38163369392" className="flex items-center gap-2 hover:text-primary-foreground/80 transition-colors">
                <Phone size={14} /> +381 63 369 392
              </a>
              <a className="flex items-center gap-2 hover:text-primary-foreground/80 transition-colors" href="mailto:milanaiagency@gmail.com">
                <Mail size={14} /> milanaiagency@gmail.com
              </a>
              <a href="https://www.instagram.com/alcompany2002/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary-foreground/80 transition-colors mt-1">
                <Instagram size={14} /> @alcompany2002
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-sm text-primary-foreground mb-4 tracking-wide uppercase">
              Proizvodi
            </h4>
            <ul className="space-y-3 font-body text-sm text-primary-foreground/50">
              <li><Link to="/proizvodi/pvc" className="hover:text-primary-foreground/80 transition-colors">PVC stolarija</Link></li>
              <li><Link to="/proizvodi/aluminijum" className="hover:text-primary-foreground/80 transition-colors">Aluminijumska stolarija</Link></li>
              <li><Link to="/proizvodi/ulazna-vrata" className="hover:text-primary-foreground/80 transition-colors">Ulazna vrata</Link></li>
              <li><Link to="/proizvodi/drvodekor" className="hover:text-primary-foreground/80 transition-colors">Drvodekor</Link></li>
              <li><Link to="/proizvodi/acrylcolor" className="hover:text-primary-foreground/80 transition-colors">Acrylcolor</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-sm text-primary-foreground mb-4 tracking-wide uppercase">
              Informacije
            </h4>
            <ul className="space-y-3 font-body text-sm text-primary-foreground/50">
              <li><Link to="/o-nama" className="hover:text-primary-foreground/80 transition-colors">O nama</Link></li>
              <li><Link to="/proizvodi" className="hover:text-primary-foreground/80 transition-colors">Proizvodi</Link></li>
              <li><Link to="/boje" className="hover:text-primary-foreground/80 transition-colors">Boje i dekori</Link></li>
              <li><Link to="/uporedi" className="hover:text-primary-foreground/80 transition-colors">Poređenje sistema</Link></li>
              <li><Link to="/projekti" className="hover:text-primary-foreground/80 transition-colors">Realizovani projekti</Link></li>
              <li><Link to="/subvencije" className="hover:text-primary-foreground/80 transition-colors">Subvencije 2026</Link></li>
              <li><Link to="/kontakt" className="hover:text-primary-foreground/80 transition-colors">Kontakt</Link></li>
              <li><Link to="/politika-privatnosti" className="hover:text-primary-foreground/80 transition-colors">Politika privatnosti</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-body text-primary-foreground/30">
            © 2002–{new Date().getFullYear()} AL Company d.o.o. Sva prava zadržana.
          </p>
          <p className="text-xs font-body text-primary-foreground/30">
            Valjevo, Srbija · Od 2002.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;