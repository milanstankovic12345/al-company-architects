import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import alCompanyLogo from "@/assets/al-company-logo.png";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToHash } from "@/lib/anchors";

const navLinks = [
  { label: "O nama", href: "/#about" },
  { label: "Proizvodi", href: "/proizvodi" },
  { label: "Subvencije 2026", href: "/subvencije" },
  { label: "Kontakt", href: "/#kontakt" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const handleHomeAnchorClick = (href: string) => (e: React.MouseEvent) => {
    const hashIndex = href.indexOf("#");
    if (hashIndex === -1) return;
    if (pathname !== "/") return;

    e.preventDefault();
    scrollToHash(href.slice(hashIndex) as `#${string}`);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2">
          <img src={alCompanyLogo} alt="AL Company Valjevo Logo" className="h-10 md:h-14 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.href.startsWith("/") ? (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={handleHomeAnchorClick(link.href)}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            )
          )}
        </nav>

        <div className="hidden md:flex items-center gap-3">
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

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="container py-6 flex flex-col gap-4">
              {navLinks.map((link) =>
                link.href.startsWith("/") ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-base font-medium text-foreground py-2"
                    onClick={(e) => {
                      setOpen(false);
                      handleHomeAnchorClick(link.href)(e);
                    }}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-base font-medium text-foreground py-2"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                )
              )}
              <Link to="/kontakt" onClick={() => setOpen(false)}>
                <Button variant="hero" size="lg" className="mt-2 w-full">
                  Zatražite ponudu
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
