import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";

const ProjectGrid = lazy(() => import("@/components/Projects/ProjectGrid"));

const Projects = () => (
  <main>
    <Helmet>
      <title>Realizovani projekti | AL Company – Valjevo</title>
      <meta name="description" content="Pogledajte realizovane projekte AL Company d.o.o. Valjevo: PVC i aluminijumska stolarija na kućama, stanovima i poslovnim objektima." />
    </Helmet>
    <Navbar />
    <section className="pt-28 md:pt-36 pb-16 md:pb-24 bg-background">
      <div className="container">
        <p className="text-accent font-semibold text-sm tracking-[0.2em] uppercase mb-4">Projekti</p>
        <h1 className="text-3xl md:text-5xl font-heading font-black text-foreground mb-4">Realizovani projekti</h1>
        <p className="font-body text-muted-foreground max-w-xl mb-10">
          Izdvojeni radovi na kućama, stanovima i poslovnim objektima. Želite isto za svoj dom?{" "}
          <Link to="/ponuda" className="text-accent underline underline-offset-2">
            Zatražite ponudu
          </Link>{" "}
          ili{" "}
          <Link to="/merenje" className="text-accent underline underline-offset-2">
            zakažite besplatno merenje
          </Link>
          .
        </p>
        <Suspense fallback={<Skeleton className="h-96 w-full" />}>
          <ProjectGrid />
        </Suspense>
      </div>
    </section>
    <Footer />
  </main>
);

export default Projects;
