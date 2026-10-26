import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";

const CompareTable = lazy(() => import("@/components/Compare/CompareTable"));
const PvcOrAluGuide = lazy(() => import("@/components/Compare/PvcOrAluGuide"));

const Compare = () => (
  <main>
    <Helmet>
      <title>Poređenje PVC i ALU sistema | AL Company – Valjevo</title>
      <meta name="description" content="Uporedite GEALAN PVC i ALUMIL aluminijumske sisteme: Uf/Uw vrednosti, dubina profila, zaptivanje, sigurnost i zvučna izolacija. PVC ili ALU? AL Company d.o.o. Valjevo." />
    </Helmet>
    <Navbar />
    <section className="pt-28 md:pt-36 pb-16 md:pb-24 bg-background">
      <div className="container">
        <p className="text-accent font-semibold text-sm tracking-[0.2em] uppercase mb-4">Poređenje</p>
        <h1 className="text-3xl md:text-5xl font-heading font-black text-foreground mb-4">Uporedite sisteme</h1>
        <p className="font-body text-muted-foreground max-w-xl mb-10">
          Pogledajte tehničke karakteristike GEALAN i ALUMIL sistema jedne pored drugih.
        </p>
        <Suspense fallback={<Skeleton className="h-96 w-full" />}>
          <CompareTable />
          <PvcOrAluGuide />
        </Suspense>
      </div>
    </section>
    <Footer />
  </main>
);

export default Compare;
