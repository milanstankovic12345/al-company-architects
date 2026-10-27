import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";

const QuoteWizard = lazy(() => import("@/components/QuoteWizard/QuoteWizard"));

const Quote = () => (
  <main>
    <Helmet>
      <title>Zatražite ponudu | AL Company – PVC i aluminijumska stolarija Valjevo</title>
      <meta name="description" content="Zatražite besplatnu ponudu za PVC i aluminijumsku stolariju u 6 jednostavnih koraka. AL Company d.o.o. Valjevo." />
    </Helmet>
    <Navbar />
    <section className="pt-28 md:pt-36 pb-16 md:pb-24 bg-background">
      <div className="container max-w-4xl">
        <p className="text-accent font-semibold text-sm tracking-[0.2em] uppercase mb-4">Ponuda</p>
        <h1 className="text-3xl md:text-5xl font-heading font-black text-foreground mb-4">Zatražite ponudu</h1>
        <p className="font-body text-muted-foreground max-w-xl mb-10">
          Odgovorite na nekoliko pitanja i javićemo vam se sa ponudom. Želite da dođemo i izmerimo? <Link to="/merenje" className="text-accent underline underline-offset-2">Zakažite besplatno merenje</Link>. Za opšta pitanja koristite{" "}
          <Link to="/kontakt" className="text-accent underline underline-offset-2">
            kontakt formular
          </Link>
          .
        </p>
        <Suspense fallback={<Skeleton className="h-96 w-full max-w-3xl mx-auto" />}>
          <QuoteWizard />
        </Suspense>
      </div>
    </section>
    <Footer />
  </main>
);

export default Quote;
