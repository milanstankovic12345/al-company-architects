import { MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-surface-dark py-16 md:py-20">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-12 md:gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-foreground flex items-center justify-center">
                <span className="text-primary font-heading font-black text-sm">AL</span>
              </div>
              <span className="font-heading font-bold text-lg text-primary-foreground">
                AL Company
              </span>
            </div>
            <p className="font-body text-primary-foreground/50 max-w-sm leading-relaxed mb-6">
              Proizvođač vrhunske PVC i aluminijumske stolarije od 1991. godine.
              Ekskluzivni partner kompanija GEALAN i ALUMIL za Srbiju.
            </p>
            <div className="flex flex-col gap-3 text-sm font-body text-primary-foreground/50">
              <a className="flex items-center gap-2 hover:text-primary-foreground/80 transition-colors" href="https://maps.app.goo.gl/ZXj7UDHgeK4nkm7cA" target="_blank" rel="noopener noreferrer">
                <MapPin size={14} /> Prva proleterska 60, 14000 Valjevo, Srbija
              </a>
              <a href="tel:+38114246079" className="flex items-center gap-2 hover:text-primary-foreground/80 transition-colors">
                <Phone size={14} /> +381 14 246 079
              </a>
              <a href="tel:+381143100179" className="flex items-center gap-2 hover:text-primary-foreground/80 transition-colors">
                <Phone size={14} /> +381 14 31 00 179
              </a>
              <a href="tel:+38163369392" className="flex items-center gap-2 hover:text-primary-foreground/80 transition-colors">
                <Phone size={14} /> +381 63 369 392
              </a>
              <a className="flex items-center gap-2 hover:text-primary-foreground/80 transition-colors" href="mailto:alcompany@open.telekom.rs">
                <Mail size={14} /> alcompany@open.telekom.rs
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-sm text-primary-foreground mb-4 tracking-wide uppercase">
              Proizvodi
            </h4>
            <ul className="space-y-3 font-body text-sm text-primary-foreground/50">
              <li><Link to="/proizvodi/gealan-s9000" className="hover:text-primary-foreground/80 transition-colors">PVC prozori</Link></li>
              <li><Link to="/proizvodi/gealan-linear" className="hover:text-primary-foreground/80 transition-colors">PVC vrata</Link></li>
              <li><Link to="/proizvodi/alumil-supreme-sd77" className="hover:text-primary-foreground/80 transition-colors">ALU fasade</Link></li>
              <li><Link to="/proizvodi/alumil-smartia-s67" className="hover:text-primary-foreground/80 transition-colors">ALU klizni sistemi</Link></li>
              <li><Link to="/proizvodi" className="hover:text-primary-foreground/80 transition-colors">Roletne i komarnici</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-sm text-primary-foreground mb-4 tracking-wide uppercase">
              Informacije
            </h4>
            <ul className="space-y-3 font-body text-sm text-primary-foreground/50">
              <li><Link to="/#about" className="hover:text-primary-foreground/80 transition-colors">O nama</Link></li>
              <li><Link to="/subvencije" className="hover:text-primary-foreground/80 transition-colors">Subvencije 2026</Link></li>
              <li><Link to="/proizvodi" className="hover:text-primary-foreground/80 transition-colors">Projekti</Link></li>
              <li><Link to="/kontakt" className="hover:text-primary-foreground/80 transition-colors">Kontakt</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-body text-primary-foreground/30">
            © 2026 AL Company. Sva prava zadržana.
          </p>
          <p className="text-xs font-body text-primary-foreground/30">
            Valjevo, Srbija · Od 1991.
          </p>
        </div>
      </div>
    </footer>);

};

export default Footer;