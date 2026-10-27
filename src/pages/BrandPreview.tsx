import { Helmet } from "react-helmet-async";
import { Instagram, Menu } from "lucide-react";
import alCompanyLogo from "@/assets/al-company-logo.png";

/** Logo redesign proposal preview — /brand-preview (not linked from the site, noindex). */

const files = import.meta.glob("../../brand/logo-proposals/*.svg", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const logo = (concept: string, lockup: string, variant: string) => {
  const suffix = variant === "light" ? "" : `-${variant}`;
  return files[`../../brand/logo-proposals/concept-${concept}-${lockup}${suffix}.svg`];
};

const concepts = [
  { id: "a", name: "Koncept A", note: "Stepenasti trougaoni znak, slovo „A“" },
  { id: "b", name: "Koncept B", note: "Prozorski okvir sa slovom „A“" },
  { id: "c", name: "Koncept C", note: "Minimalistički monogram „AL“" },
];

const lockups = [
  { id: "horizontal", label: "horizontalni", className: "h-16" },
  { id: "stacked", label: "vertikalni", className: "h-28" },
  { id: "icon", label: "samo znak", className: "h-16" },
];

interface PanelProps {
  concept: { id: string; name: string };
  title: string;
  variant: string;
  monoVariant: string;
  monoLabel: string;
  bg: string;
  text: string;
}

const Panel = ({ concept, title, variant, monoVariant, monoLabel, bg, text }: PanelProps) => (
  <div className="p-6 border border-border" style={{ background: bg, color: text }}>
    <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-6 opacity-70">{title}</p>
    <div className="flex flex-wrap items-end gap-x-10 gap-y-8">
      {lockups.map((l) => (
        <img
          key={l.id}
          src={logo(concept.id, l.id, variant)}
          alt={`${concept.name} – ${l.label} logo, ${title.toLowerCase()}`}
          className={`${l.className} w-auto max-w-full`}
        />
      ))}
    </div>
    <p className="text-xs font-semibold tracking-[0.2em] uppercase mt-8 mb-4 opacity-70">{monoLabel}</p>
    <div className="flex flex-wrap items-end gap-x-10 gap-y-6">
      {lockups.map((l) => (
        <img
          key={l.id}
          src={logo(concept.id, l.id, monoVariant)}
          alt={`${concept.name} – ${l.label} logo, ${monoLabel.toLowerCase()}`}
          className="h-10 w-auto max-w-full"
        />
      ))}
    </div>
  </div>
);

// Pixel heights: favicon (icon), header (horizontal) and large (stacked / horizontal).
const sizes = [
  { label: "Favicon 16 px", lockup: "icon", height: 16 },
  { label: "Favicon 32 px", lockup: "icon", height: 32 },
  { label: "Zaglavlje 40 px", lockup: "horizontal", height: 40 },
  { label: "Zaglavlje 56 px", lockup: "horizontal", height: 56 },
  { label: "Veliko, vertikalni 200 px", lockup: "stacked", height: 200 },
  { label: "Veliko, horizontalni 120 px", lockup: "horizontal", height: 120 },
];

const Sizes = ({ concept }: { concept: { id: string; name: string } }) => (
  <div className="mt-6 grid gap-6 lg:grid-cols-2">
    {[
      { title: "Veličine, svetla pozadina", variant: "light", bg: "#FFFFFF", text: "#1B1D21" },
      { title: "Veličine, tamna pozadina", variant: "dark", bg: "#1B1D21", text: "#FFFFFF" },
    ].map((p) => (
      <div key={p.variant} className="p-6 border border-border" style={{ background: p.bg, color: p.text }}>
        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-6 opacity-70">{p.title}</p>
        <div className="flex flex-wrap items-end gap-x-10 gap-y-8">
          {sizes.map((s) => (
            <figure key={s.label} className="flex flex-col items-start gap-2 max-w-full">
              <img
                src={logo(concept.id, s.lockup, p.variant)}
                alt={`${concept.name} – ${s.label}`}
                style={{ height: s.height }}
                className="w-auto max-w-full"
              />
              <figcaption className="text-xs opacity-70">{s.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const navItems = ["O nama", "Proizvodi", "Subvencije 2026", "Kontakt"];

/** Static copy of the Navbar layout (h-20 desktop / h-16 mobile) with a swappable logo. */
const HeaderMock = ({ src, alt, mobile = false }: { src: string; alt: string; mobile?: boolean }) => (
  <div className={`bg-white border border-border ${mobile ? "max-w-[390px]" : ""}`} style={{ color: "#1B1D21" }}>
    <div className={`flex items-center justify-between gap-4 px-4 md:px-6 ${mobile ? "h-16" : "h-20"}`}>
      <img src={src} alt={alt} className={`${mobile ? "h-10" : "h-14"} w-auto`} />
      {mobile ? (
        <Menu size={24} aria-hidden="true" />
      ) : (
        <>
          <nav className="flex items-center gap-4 lg:gap-8 text-sm font-medium text-muted-foreground" aria-hidden="true">
            {navItems.map((n) => (
              <span key={n} className="whitespace-nowrap">
                {n}
              </span>
            ))}
          </nav>
          <div className="flex items-center gap-4" aria-hidden="true">
            <Instagram size={20} className="text-muted-foreground" />
            <span className="px-5 py-2.5 text-sm font-semibold text-white bg-primary whitespace-nowrap">
              Zatražite ponudu
            </span>
          </div>
        </>
      )}
    </div>
  </div>
);

const HeaderMocks = ({ title, src }: { title: string; src: string }) => (
  <div className="mt-6 space-y-4 overflow-x-auto">
    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
      Mockup zaglavlja – {title}
    </p>
    <HeaderMock src={src} alt={`${title} – zaglavlje, desktop`} />
    <HeaderMock src={src} alt={`${title} – zaglavlje, mobilni`} mobile />
  </div>
);

const BrandPreview = () => (
  <main className="min-h-screen bg-background">
    <Helmet>
      <title>Predlog logotipa | AL Company</title>
    </Helmet>
    <div className="container py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-heading font-black text-foreground mb-2">Predlog novog logotipa</h1>
      <p className="font-body text-muted-foreground mb-12 max-w-2xl">
        Tri koncepta na svetloj i tamnoj pozadini. Ovo je samo predlog i nije deo javnog sajta.
      </p>
      <section className="mb-16" aria-label="Trenutni logotip">
        <HeaderMocks title="Trenutni logotip (za poređenje)" src={alCompanyLogo} />
      </section>
      <div className="space-y-16">
        {concepts.map((c) => (
          <section key={c.id} aria-labelledby={`concept-${c.id}`}>
            <h2 id={`concept-${c.id}`} className="text-xl font-heading font-bold text-foreground">
              {c.name}
            </h2>
            <p className="font-body text-muted-foreground mb-6">{c.note}</p>
            <div className="grid gap-6 lg:grid-cols-2">
              <Panel
                concept={c}
                title="Svetla pozadina"
                variant="light"
                monoVariant="mono-ink"
                monoLabel="Jednobojno (tamno)"
                bg="#FFFFFF"
                text="#1B1D21"
              />
              <Panel
                concept={c}
                title="Tamna pozadina"
                variant="dark"
                monoVariant="mono-white"
                monoLabel="Jednobojno (belo)"
                bg="#1B1D21"
                text="#FFFFFF"
              />
            </div>
            <Sizes concept={c} />
            <HeaderMocks title={c.name} src={logo(c.id, "horizontal", "light")} />
          </section>
        ))}
      </div>
    </div>
  </main>
);

export default BrandPreview;
