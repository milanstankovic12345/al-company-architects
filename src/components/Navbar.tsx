import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Instagram } from "lucide-react";
import alCompanyLogo from "@/assets/al-company-logo.png";
import { motion, AnimatePresence } from "framer-motion";

const productLinks = [
  { label: "PVC stolarija", href: "/proizvodi/pvc" },
  { label: "Aluminijumska stolarija", href: "/proizvodi/aluminijum" },
  { label: "Ulazna vrata", href: "/proizvodi/ulazna-vrata" },
  { label: "Drvodekor", href: "/proizvodi/drvodekor" },
  { label: "Acrylcolor", href: "/proizvodi/acrylcolor" },
  { label: "Svi proizvodi", href: "/proizvodi" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2">
          <img src={alCompanyLogo} alt="AL Company Valjevo Logo" className="h-10 md:h-14 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-4 lg:gap-8">
          <Link to="/o-nama" className="whitespace-nowrap text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            O nama
          </Link>

          {/* Products dropdown */}
          <div className="relative" onMouseEnter={() => setProductsOpen(true)} onMouseLeave={() => setProductsOpen(false)}>
            <Link
              to="/proizvodi"
              className="whitespace-nowrap text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              Proizvodi <ChevronDown size={14} className={`transition-transform ${productsOpen ? "rotate-180" : ""}`} />
            </Link>
            <AnimatePresence>
              {productsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-2 w-56 bg-background border border-border shadow-lg py-2"
                >
                  {productLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                      onClick={() => setProductsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/subvencije" className="whitespace-nowrap text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Subvencije 2026
          </Link>
          <Link to="/kontakt" className="whitespace-nowrap text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Kontakt
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-3 lg:gap-4">
          <a
            href="https://www.instagram.com/alcompany2002/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={20} />
          </a>
          <Link to="/kontakt">
            <Button variant="hero" size="lg">
              Zatražite ponudu
            </Button>
          </Link>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="container py-6 flex flex-col gap-4">
              <Link to="/o-nama" className="text-base font-medium text-foreground py-2" onClick={() => setOpen(false)}>
                O nama
              </Link>
              <Link to="/proizvodi" className="text-base font-medium text-foreground py-2" onClick={() => setOpen(false)}>
                Proizvodi
              </Link>
              <div className="pl-4 flex flex-col gap-2 border-l-2 border-accent/30">
                {productLinks.filter((l) => l.href !== "/proizvodi").map((link) => (
                  <Link key={link.href} to={link.href} className="text-sm text-muted-foreground py-1.5" onClick={() => setOpen(false)}>
                    {link.label}
                  </Link>
                ))}
              </div>
              <Link to="/subvencije" className="text-base font-medium text-foreground py-2" onClick={() => setOpen(false)}>
                Subvencije 2026
              </Link>
              <Link to="/kontakt" className="text-base font-medium text-foreground py-2" onClick={() => setOpen(false)}>
                Kontakt
              </Link>
              <Link to="/kontakt" onClick={() => setOpen(false)}>
                <Button variant="hero" size="lg" className="mt-2 w-full">
                  Zatražite ponudu
                </Button>
              </Link>
              <div className="flex items-center gap-2 mt-2 pt-4 border-t border-border">
                <a
                  href="https://www.instagram.com/alcompany2002/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  <Instagram size={20} /> Pratite nas na Instagramu
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
