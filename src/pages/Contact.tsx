import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { z } from "zod";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyQuoteBar from "@/components/StickyQuoteBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Send, Phone, Mail, MapPin, Printer } from "lucide-react";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Unesite ime i prezime").max(100),
  email: z.string().trim().email("Unesite validnu email adresu").max(255),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Poruka mora imati najmanje 10 karaktera").max(1000),
});

type ContactForm = z.infer<typeof contactSchema>;

const Contact = () => {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: keyof ContactForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactForm, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof ContactForm;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    try {
      // TODO: Replace YOUR_FORMSPREE_ID with actual Formspree form ID
      const response = await fetch("https://formspree.io/f/YOUR_FORMSPREE_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        toast.success("Vaša poruka je uspešno poslata!");
      } else {
        toast.error("Došlo je do greške. Pokušajte ponovo ili nas pozovite telefonom.");
      }
    } catch {
      toast.error("Greška u slanju. Proverite internet vezu i pokušajte ponovo.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main>
      <Helmet>
        <title>Kontakt | AL Company – PVC i aluminijumska stolarija Valjevo</title>
        <meta name="description" content="Kontaktirajte AL Company d.o.o. u Valjevu — telefon, email, adresa i formular za ponudu. Prva proleterska 60, 14000 Valjevo." />
      </Helmet>
      <Navbar />
      <section className="pt-28 md:pt-36 pb-16 md:pb-24 bg-background">
        <div className="container max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-accent font-semibold text-sm tracking-[0.2em] uppercase mb-4">Kontakt</p>
            <h1 className="text-3xl md:text-5xl font-heading font-black text-foreground mb-4">Pošaljite nam poruku</h1>
            <p className="font-body text-muted-foreground max-w-xl mb-12">
              Popunite formular i kontaktiraćemo vas u najkraćem roku. Možete nas pozvati i direktno.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="lg:col-span-2">
              {submitted ? (
                <div className="text-center py-16 border border-border bg-muted/30 p-8">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send className="text-accent" size={28} />
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-3">Poruka je poslata!</h2>
                  <p className="font-body text-muted-foreground max-w-md mx-auto">
                    Hvala vam na interesovanju. Odgovorićemo vam u najkraćem roku.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name">Ime i prezime *</Label>
                      <Input id="name" value={form.name} onChange={(e) => handleChange("name", e.target.value)} placeholder="Vaše ime i prezime" />
                      {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail adresa *</Label>
                      <Input id="email" type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="vas@email.com" />
                      {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input id="phone" type="tel" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} placeholder="+381 6X XXX XXXX" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Poruka *</Label>
                    <Textarea id="message" value={form.message} onChange={(e) => handleChange("message", e.target.value)} placeholder="Opišite šta vam je potrebno — tip prozora, boja, posebni zahtevi..." rows={5} />
                    {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Slanjem poruke prihvatate našu{" "}
                    <Link to="/politika-privatnosti" className="text-accent hover:underline">
                      politiku privatnosti
                    </Link>.
                  </p>

                  <Button type="submit" variant="hero" size="lg" className="gap-2" disabled={submitting}>
                    <Send size={16} /> {submitting ? "Slanje..." : "Pošaljite poruku"}
                  </Button>
                </form>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="space-y-6">
              <div className="border border-border p-6 bg-muted/30">
                <h3 className="font-heading font-bold text-foreground mb-4">Kontakt informacije</h3>
                <div className="space-y-4 text-sm font-body text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <Phone size={16} className="text-accent mt-0.5 shrink-0" />
                    <div>
                      <a href="tel:+38114246079" className="hover:text-foreground transition-colors block">+381 14 246 079</a>
                      <a href="tel:+381143100179" className="hover:text-foreground transition-colors block">+381 14 31 00 179</a>
                      <a href="tel:+38163369392" className="hover:text-foreground transition-colors block">+381 63 369 392 (mobilni)</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Printer size={16} className="text-accent shrink-0" />
                    <span>Faks: +381 14 246 079</span>
                  </div>
                  <a href="mailto:alcompany@open.telekom.rs" className="flex items-center gap-3 hover:text-foreground transition-colors">
                    <Mail size={16} className="text-accent shrink-0" />
                    alcompany@open.telekom.rs
                  </a>
                  <a href="https://maps.app.goo.gl/ZXj7UDHgeK4nkm7cA" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-foreground transition-colors">
                    <MapPin size={16} className="text-accent mt-0.5 shrink-0" />
                    Prva proleterska 60, 14000 Valjevo, Srbija
                  </a>
                </div>
              </div>

              {/* OpenStreetMap embed */}
              <div className="border border-border overflow-hidden">
                <iframe
                  title="AL Company lokacija - Valjevo"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  loading="lazy"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=19.877%2C44.267%2C19.897%2C44.277&layer=mapnik&marker=44.272%2C19.887"
                />
                <a
                  href="https://www.google.com/maps/search/Prva+proleterska+60,+14000+Valjevo,+Srbija"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center text-xs text-accent hover:underline py-2 bg-muted/30"
                >
                  Prikaži na Google Maps →
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
      <StickyQuoteBar />
    </main>
  );
};

export default Contact;

