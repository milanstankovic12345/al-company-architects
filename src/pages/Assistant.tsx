import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AssistantContent from "@/components/Assistant/AssistantContent";

const Assistant = () => {
  return (
    <main>
      <Navbar />
      <section className="pt-28 md:pt-36 pb-16 md:pb-24 bg-background">
        <AssistantContent />
      </section>
      <Footer />
    </main>
  );
};

export default Assistant;
