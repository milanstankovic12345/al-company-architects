import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";

const MeasurementForm = lazy(() => import("@/components/MeasurementForm/MeasurementForm"));

const Measurement = () => (
  <main>
    <Helmet>
      <title>Zakažite besplatno merenje | AL Company – Valjevo</title>
      <meta name="description" content="Zakažite besplatno merenje prozora i vrata na vašoj adresi. AL Company d.o.o. Valjevo, PVC i aluminijumska stolarija." />
    </Helmet>
    <Navbar />
    <section className="pt-28 md:pt-36 pb-16 md:pb-24 bg-background">
      <div className="container max-w-4xl">
        <p className="text-accent font-semibold text-sm tracking-[0.2em] uppercase mb-4">Merenje</p>
        <h1 className="text-3xl md:text-5xl font-heading font-black text-foreground mb-4">Zakažite besplatno merenje</h1>
        <p className="font-body text-muted-foreground max-w-xl mb-10">
          Naš stručnjak dolazi na vašu adresu, uzima tačne mere i savetuje vas o izboru stolarije — bez obaveze. Ako vam treba samo okvirna cena, možete{" "}
          <Link to="/ponuda" className="text-accent underline underline-offset-2">
            zatražiti ponudu
          </Link>
          .
        </p>
        <Suspense fallback={<Skeleton className="h-96 w-full max-w-3xl mx-auto" />}>
          <MeasurementForm />
        </Suspense>
      </div>
    </section>
    <Footer />
  </main>
);

export default Measurement;
