import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Building2, Award, Users, Wrench, Calendar } from "lucide-react";

/** About Us page — /o-nama */
const AboutUs = () => {
  const milestones = [
    { icon: Calendar, year: "2002", text: "Osnivanje firme AL Company d.o.o. u Valjevu" },
    { icon: Award, year: "2002–2010", text: "Uspostavljanje partnerstva sa GEALAN i ALUMIL" },
    { icon: Building2, year: "2010–2020", text: "Realizacija hiljada projekata širom Srbije" },
    { icon: Users, year: "2020–danas", text: "Nastavak inovacija i praćenja globalnih trendova" },
  ];

  return (
    <main>
      <Helmet>
        <title>O nama | AL Company – PVC i aluminijumska stolarija Valjevo</title>
        <meta name="description" content="AL Company d.o.o. — osnovan 2002. u Valjevu, jedan od pionira u proizvodnji PVC i aluminijumske stolarije u Srbiji. GEALAN i ALUMIL profili." />
      </Helmet>
      <Navbar />
      <section className="pt-28 md:pt-36 pb-16 md:pb-24 bg-background">
        <div className="container max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-accent font-semibold text-sm tracking-[0.2em] uppercase mb-4">O nama</p>
            <h1 className="text-3xl md:text-5xl font-heading font-black text-foreground mb-6">
              Tradicija kvaliteta od 2002. godine
            </h1>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="prose prose-lg max-w-none">
            <div className="border-l-4 border-accent pl-6 mb-10">
              <p className="font-body text-lg text-foreground leading-relaxed">
                AL Company d.o.o. je osnovan <strong>10. aprila 2002. godine</strong> u Valjevu, sa jasnom vizijom
                — doneti kvalitetnu PVC i aluminijumsku stolariju koja ispunjava najviše evropske standarde
                na srpsko tržište.
              </p>
            </div>

            <div className="space-y-6 font-body text-muted-foreground leading-relaxed mb-12">
              <p>
                Kao jedan od <strong>pionira u proizvodnji PVC i aluminijumske stolarije u Srbiji</strong>,
                AL Company je tokom više od dve decenije rada izgradio reputaciju pouzdanog proizvođača
                koji kombinuje svetske tehnologije sa lokalnim znanjem i posvećenošću svakom projektu.
              </p>
              <p>
                Naši proizvodi su zasnovani na profilnim sistemima renomiranih svetskih proizvođača —{" "}
                <strong>ALUMIL</strong> za aluminijumsku i <strong>GEALAN</strong> za PVC stolariju.
                Ovi brendovi su sinonim za kvalitet, inovaciju i dugotrajnost u svetskoj industriji
                stolarije.
              </p>
              <p>
                Tim stručnjaka AL Company-ja kontinuirano prati globalne inovacije u oblasti
                energetske efikasnosti, zvučne izolacije i bezbednosti, kako bismo našim klijentima
                uvek ponudili najsavremenija rešenja.
              </p>
              <p>
                Kao kompanija koja drži do tradicije, takođe pratimo i moderne trendove poslovanja.
                Prisutni smo na društvenim mrežama, poput <a href="https://www.instagram.com/alcompany2002/" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-accent font-medium underline underline-offset-4 decoration-accent/30 hover:decoration-accent transition-colors">Instagrama</a>, gde sa klijentima delimo naše najnovije projekte i inovacije u realnom vremenu.
              </p>
            </div>
          </motion.div>

          {/* Milestones */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-8">Naš put</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {milestones.map((m, i) => (
                <motion.div key={m.year} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="border border-border bg-card p-6 flex gap-4">
                  <div className="w-10 h-10 bg-accent/10 flex items-center justify-center shrink-0">
                    <m.icon className="text-accent" size={20} />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-foreground text-sm">{m.year}</p>
                    <p className="font-body text-muted-foreground text-sm mt-1">{m.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Key facts */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="border border-border bg-muted/30 p-8">
            <h2 className="text-xl font-heading font-bold text-foreground mb-6">Osnovni podaci</h2>
            <div className="grid sm:grid-cols-2 gap-4 font-body text-sm">
              <div className="flex items-center gap-3">
                <Wrench className="text-accent shrink-0" size={16} />
                <div>
                  <p className="text-muted-foreground">Registrovana delatnost</p>
                  <p className="text-foreground font-medium">Proizvodnja metalnih vrata i prozora (šifra 2512)</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="text-accent shrink-0" size={16} />
                <div>
                  <p className="text-muted-foreground">Pravna forma</p>
                  <p className="text-foreground font-medium">Društvo sa ograničenom odgovornošću (D.O.O.)</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="text-accent shrink-0" size={16} />
                <div>
                  <p className="text-muted-foreground">Datum osnivanja</p>
                  <p className="text-foreground font-medium">10. april 2002.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Award className="text-accent shrink-0" size={16} />
                <div>
                  <p className="text-muted-foreground">Partneri</p>
                  <p className="text-foreground font-medium">ALUMIL (aluminijum), GEALAN (PVC)</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default AboutUs;
