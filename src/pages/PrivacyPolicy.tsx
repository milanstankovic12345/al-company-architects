import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Shield, Mail, UserCheck, Clock, FileText } from "lucide-react";

/** Privacy Policy page — /politika-privatnosti */
const PrivacyPolicy = () => {
  return (
    <main>
      <Helmet>
        <title>Politika privatnosti | AL Company – PVC i aluminijumska stolarija Valjevo</title>
        <meta name="description" content="Politika privatnosti AL Company d.o.o. — kako prikupljamo i koristimo vaše lične podatke." />
      </Helmet>
      <Navbar />
      <section className="pt-28 md:pt-36 pb-16 md:pb-24 bg-background">
        <div className="container max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="text-accent" size={24} />
              <p className="text-accent font-semibold text-sm tracking-[0.2em] uppercase">Pravne informacije</p>
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-black text-foreground mb-8">Politika privatnosti</h1>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="space-y-8 font-body text-muted-foreground leading-relaxed">

            <div className="border border-border bg-card p-6">
              <div className="flex items-start gap-3 mb-3">
                <FileText className="text-accent shrink-0 mt-1" size={18} />
                <h2 className="text-lg font-heading font-bold text-foreground">Ko prikuplja podatke</h2>
              </div>
              <p>
                Vaše podatke prikuplja <strong>AL Company d.o.o.</strong>, sa sedištem na adresi
                Prva proleterska 60, 14000 Valjevo, Republika Srbija (u daljem tekstu: „mi", „nas" ili „naš").
              </p>
            </div>

            <div className="border border-border bg-card p-6">
              <div className="flex items-start gap-3 mb-3">
                <UserCheck className="text-accent shrink-0 mt-1" size={18} />
                <h2 className="text-lg font-heading font-bold text-foreground">Koje podatke prikupljamo</h2>
              </div>
              <p>
                Putem formulara na našem sajtu (kontakt, zahtev za ponudu i zakazivanje merenja)
                prikupljamo sledeće podatke koje vi dobrovoljno unosite:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Ime i prezime</li>
                <li>Email adresa</li>
                <li>Broj telefona (u kontakt formularu opciono)</li>
                <li>Sadržaj vaše poruke ili napomene</li>
                <li>Zahtev za ponudu: izabrani proizvod i materijal, dimenzije, količina, završna obrada, grad</li>
                <li>Zakazivanje merenja: grad, adresa, željeni datum i termin</li>
                <li>Željeni način kontakta (telefon, email i sl.)</li>
              </ul>
              <p className="mt-3">
                Poruke sa formulara prosleđuje nam servis <strong>Formspree</strong>, koji u našem
                ime prenosi podatke na našu email adresu (obrađivač podataka).
              </p>
            </div>

            <div className="border border-border bg-card p-6">
              <div className="flex items-start gap-3 mb-3">
                <FileText className="text-accent shrink-0 mt-1" size={18} />
                <h2 className="text-lg font-heading font-bold text-foreground">Kolačići, lokalno čuvanje i analitika</h2>
              </div>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Lista proizvoda za poređenje i nacrt zahteva za ponudu čuvaju se samo u vašem
                  pregledaču (localStorage) i ne šalju se nama. Kratka pauza između slanja formulara
                  koristi sessionStorage.
                </li>
                <li>
                  Koristimo Vercel Analytics, analitiku bez kolačića koja beleži samo agregirane
                  posete stranicama, bez praćenja pojedinaca preko sajtova.
                </li>
                <li>
                  Mapa na stranici Kontakt je Google mapa i učitava se tek kada kliknete na „Prikaži
                  mapu“. Tada Google može postaviti kolačiće i obrađivati vašu IP adresu prema
                  sopstvenoj politici privatnosti.
                </li>
              </ul>
            </div>

            <div className="border border-border bg-card p-6">
              <div className="flex items-start gap-3 mb-3">
                <Mail className="text-accent shrink-0 mt-1" size={18} />
                <h2 className="text-lg font-heading font-bold text-foreground">Zašto prikupljamo podatke</h2>
              </div>
              <p>
                Vaše podatke koristimo isključivo u svrhu odgovaranja na vaše upite i pružanja
                informacija o našim proizvodima i uslugama. Ne koristimo vaše podatke u marketinške
                svrhe niti ih delimo sa trećim stranama.
              </p>
            </div>

            <div className="border border-border bg-card p-6">
              <div className="flex items-start gap-3 mb-3">
                <Clock className="text-accent shrink-0 mt-1" size={18} />
                <h2 className="text-lg font-heading font-bold text-foreground">Koliko dugo čuvamo podatke</h2>
              </div>
              <p>
                Vaše podatke čuvamo samo onoliko koliko je potrebno da odgovorimo na vaš upit.
                Nakon toga, podaci se brišu iz naših sistema, osim ako postoji zakonska obaveza
                za njihovo čuvanje.
              </p>
            </div>

            <div className="border border-border bg-card p-6">
              <div className="flex items-start gap-3 mb-3">
                <Shield className="text-accent shrink-0 mt-1" size={18} />
                <h2 className="text-lg font-heading font-bold text-foreground">Vaša prava</h2>
              </div>
              <p>U skladu sa zakonom, imate pravo da:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Pristupite svojim ličnim podacima koje čuvamo</li>
                <li>Zatražite ispravku netačnih podataka</li>
                <li>Zatražite brisanje vaših podataka</li>
                <li>Povučete saglasnost za obradu podataka</li>
              </ul>
              <p className="mt-3">
                Za sve zahteve u vezi sa vašim ličnim podacima, kontaktirajte nas na:{" "}
                <a href="mailto:milanaiagency@gmail.com" className="text-accent hover:underline">milanaiagency@gmail.com</a>
              </p>
            </div>

            <p className="text-sm text-muted-foreground/60">
              Poslednje ažuriranje: oktobar 2026. godine.
            </p>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default PrivacyPolicy;
