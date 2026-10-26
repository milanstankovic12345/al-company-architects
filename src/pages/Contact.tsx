import { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { z } from "zod";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Send, Phone, Mail, MapPin, Printer, Instagram, Loader2 } from "lucide-react";

const FORM_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined;
const COOLDOWN_MS = 60_000;
const COOLDOWN_KEY = "al-contact-last-sent";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Unesite ime i prezime (najmanje 2 karaktera)")
    .max(100, "Ime može imati najviše 100 karaktera"),
  email: z
    .string()
    .trim()
    .min(1, "Unesite e-mail adresu")
    .email("Unesite ispravnu e-mail adresu")
    .max(255, "E-mail adresa može imati najviše 255 karaktera"),
  phone: z
    .string()
    .trim()
    .regex(/^(\+?[0-9][0-9\s\-()/]{5,19})?$/, "Unesite ispravan broj telefona, npr. +381 63 123 4567")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Poruka mora imati najmanje 10 karaktera")
    .max(1000, "Poruka može imati najviše 1000 karaktera"),
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
  const [submitError, setSubmitError] = useState("");
  const honeypotRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: keyof ContactForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");

    // Honeypot: bots fill the hidden field, humans never see it
    if (honeypotRef.current?.value) {
      setSubmitted(true);
      return;
    }

    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactForm, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof ContactForm;
        if (!fieldErrors[field]) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      const firstInvalid = (["name", "email", "phone", "message"] as const).find((f) => fieldErrors[f]);
      if (firstInvalid) e.currentTarget.querySelector<HTMLElement>(`#${firstInvalid}`)?.focus();
      return;
    }

    // Client-side throttle (there is no server route to rate limit on)
    try {
      const last = Number(sessionStorage.getItem(COOLDOWN_KEY) || 0);
      if (Date.now() - last < COOLDOWN_MS) {
        setSubmitError("Poruka je upravo poslata. Sačekajte minut pre slanja nove poruke.");
        return;
      }
    } catch {
      // sessionStorage unavailable — skip throttle
    }

    if (!FORM_ENDPOINT) {
      console.error("VITE_FORMSPREE_ENDPOINT is not set");
      setSubmitError("Slanje trenutno nije dostupno. Pozovite nas na +381 14 246 079.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(FORM_ENDPOINT, {
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
        try {
          sessionStorage.setItem(COOLDOWN_KEY, String(Date.now()));
        } catch {
          // ignore
        }
        setSubmitted(true);
        toast.success("Vaša poruka je uspešno poslata!");
      } else {
        setSubmitError("Došlo je do greške pri slanju. Pokušajte ponovo ili nas pozovite na +381 14 246 079.");
      }
    } catch {
      setSubmitError("Greška u slanju. Proverite internet vezu i pokušajte ponovo.");
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
                <div role="status" aria-live="polite" className="text-center py-16 border border-border bg-muted/30 p-8">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send className="text-accent" size={28} />
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-3">Poruka je poslata!</h2>
                  <p className="font-body text-muted-foreground max-w-md mx-auto">
                    Hvala vam na interesovanju. Odgovorićemo vam u najkraćem roku.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name">Ime i prezime *</Label>
                      <Input id="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} value={form.name} onChange={(e) => handleChange("name", e.target.value)} placeholder="Vaše ime i prezime" />
                      {errors.name && <p id="name-error" role="alert" className="text-xs text-destructive">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail adresa *</Label>
                      <Input id="email" type="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} value={form.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="vas@email.com" />
                      {errors.email && <p id="email-error" role="alert" className="text-xs text-destructive">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input id="phone" type="tel" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} placeholder="+381 6X XXX XXXX" />
                    {errors.phone && <p id="phone-error" role="alert" className="text-xs text-destructive">{errors.phone}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Poruka *</Label>
                    <Textarea id="message" aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} value={form.message} onChange={(e) => handleChange("message", e.target.value)} placeholder="Opišite šta vam je potrebno — tip prozora, boja, posebni zahtevi..." rows={5} />
                    {errors.message && <p id="message-error" role="alert" className="text-xs text-destructive">{errors.message}</p>}
                  </div>

                  <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label htmlFor="website">Ne popunjavajte ovo polje</label>
                    <input ref={honeypotRef} id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Slanjem poruke prihvatate našu{" "}
                    <Link to="/politika-privatnosti" className="text-accent hover:underline">
                      politiku privatnosti
                    </Link>.
                  </p>

                  <div aria-live="assertive">
                    {submitError && (
                      <p role="alert" className="text-sm text-destructive border border-destructive/30 bg-destructive/5 p-3">
                        {submitError}
                      </p>
                    )}
                  </div>

                  <Button type="submit" variant="hero" size="lg" className="gap-2" disabled={submitting}>
                    {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                    {submitting ? "Slanje..." : "Pošaljite poruku"}
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
                      <a href="tel:+38163369392" className="hover:text-foreground transition-colors block">+381 63 369 392 (mobilni)</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Printer size={16} className="text-accent shrink-0" />
                    <span>Faks: +381 14 246 079</span>
                  </div>
                  <a href="mailto:milanaiagency@gmail.com" className="flex items-center gap-3 hover:text-foreground transition-colors">
                    <Mail size={16} className="text-accent shrink-0" />
                    milanaiagency@gmail.com
                  </a>
                  <a href="https://maps.app.goo.gl/ZXj7UDHgeK4nkm7cA" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-foreground transition-colors">
                    <MapPin size={16} className="text-accent mt-0.5 shrink-0" />
                    Prva proleterska 60, 14000 Valjevo, Srbija
                  </a>
                  <a href="https://www.instagram.com/alcompany2002/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-foreground transition-colors">
                    <Instagram size={16} className="text-accent shrink-0" />
                    @alcompany2002
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
    </main>
  );
};

export default Contact;
