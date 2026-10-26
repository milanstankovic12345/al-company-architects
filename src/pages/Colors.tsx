import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";

const FinishVisualizer = lazy(() => import("@/components/Finishes/FinishVisualizer"));

const Colors = () => (
  <main>
    <Helmet>
      <title>Boje i dekori – vizualizator | AL Company – Valjevo</title>
      <meta name="description" content="Isprobajte boje i drvo dekore za PVC prozore: bela, antracit, zlatni hrast, orah i Acrylcolor RAL boje. AL Company d.o.o. Valjevo." />
    </Helmet>
    <Navbar />
    <section className="pt-28 md:pt-36 pb-16 md:pb-24 bg-background">
      <div className="container">
        <p className="text-accent font-semibold text-sm tracking-[0.2em] uppercase mb-4">Završne obrade</p>
        <h1 className="text-3xl md:text-5xl font-heading font-black text-foreground mb-4">Boje i dekori</h1>
        <p className="font-body text-muted-foreground max-w-xl mb-10">
          Izaberite boju ili drvo dekor i pogledajte kako bi prozor izgledao na vašem objektu.
        </p>
        <Suspense fallback={<Skeleton className="h-96 w-full" />}>
          <FinishVisualizer />
        </Suspense>
      </div>
    </section>
    <Footer />
  </main>
);

export default Colors;
