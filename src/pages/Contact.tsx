import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyQuoteBar from "@/components/StickyQuoteBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Send, Phone, Mail, MapPin } from "lucide-react";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Unesite ime i prezime").max(100),
  email: z.string().trim().email("Unesite validnu email adresu").max(255),
  phone: z.string().trim().min(6, "Unesite broj telefona").max(20),
  squareMeters: z.string().optional(),
  windowCount: z.string().optional(),
  doorCount: z.string().optional(),
  materialType: z.string().optional(),
  notes: z.string().max(1000).optional(),
});

type ContactForm = z.infer<typeof contactSchema>;

const Contact = () => {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    squareMeters: "",
    windowCount: "",
    doorCount: "",
    materialType: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof ContactForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
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
    setSubmitted(true);
    toast.success("Vaš zahtev je uspešno poslat! Kontaktiraćemo vas u najkraćem roku.");
  };

  return (
    <main>
      <Navbar />
      <section className="pt-28 md:pt-36 pb-16 md:pb-24 bg-background">
        <div className="container max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-accent font-semibold text-sm tracking-[0.2em] uppercase mb-4">
              Kontakt
            </p>
            <h1 className="text-3xl md:text-5xl font-heading font-black text-foreground mb-4">
              Zatražite ponudu
            </h1>
            <p className="font-body text-muted-foreground max-w-xl mb-12">
              Popunite formular sa osnovnim informacijama i kontaktiraćemo vas u najkraćem roku sa ponudom.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2"
            >
              {submitted ? (
                <div className="text-center py-16 border border-border bg-muted/30 p-8">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send className="text-accent" size={28} />
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-3">
                    Zahtev je poslat!
                  </h2>
                  <p className="font-body text-muted-foreground max-w-md mx-auto">
                    Hvala vam na interesovanju. Naš tim će vas kontaktirati u roku od 24 sata.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name">Ime i prezime *</Label>
                      <Input
                        id="name"
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Vaše ime i prezime"
                      />
                      {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email adresa *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="vas@email.com"
                      />
                      {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Broj telefona *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="+381 6X XXX XXXX"
                      />
                      {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="squareMeters">Kvadratura objekta (m²)</Label>
                      <Input
                        id="squareMeters"
                        type="number"
                        value={form.squareMeters}
                        onChange={(e) => handleChange("squareMeters", e.target.value)}
                        placeholder="npr. 120"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="windowCount">Broj prozora</Label>
                      <Input
                        id="windowCount"
                        type="number"
                        value={form.windowCount}
                        onChange={(e) => handleChange("windowCount", e.target.value)}
                        placeholder="npr. 8"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="doorCount">Broj vrata</Label>
                      <Input
                        id="doorCount"
                        type="number"
                        value={form.doorCount}
                        onChange={(e) => handleChange("doorCount", e.target.value)}
                        placeholder="npr. 3"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="materialType">Tip stolarije</Label>
                      <Select
                        value={form.materialType}
                        onValueChange={(v) => handleChange("materialType", v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Izaberite" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pvc">PVC</SelectItem>
                          <SelectItem value="alu">Aluminijum</SelectItem>
                          <SelectItem value="unsure">Nisam siguran/a</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Dodatne napomene</Label>
                    <Textarea
                      id="notes"
                      value={form.notes}
                      onChange={(e) => handleChange("notes", e.target.value)}
                      placeholder="Opišite šta vam je potrebno — tip prozora, boja, posebni zahtevi..."
                      rows={4}
                    />
                  </div>

                  <Button type="submit" variant="hero" size="lg" className="gap-2">
                    <Send size={16} /> Pošaljite zahtev
                  </Button>
                </form>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="border border-border p-6 bg-muted/30">
                <h3 className="font-heading font-bold text-foreground mb-4">Kontakt informacije</h3>
                <div className="space-y-4 text-sm font-body text-muted-foreground">
                  <a href="tel:+38114246079" className="flex items-start gap-3 hover:text-foreground transition-colors">
                    <Phone size={16} className="text-accent mt-0.5 shrink-0" />
                    <div>
                      <p>+381 14 246 079</p>
                      <p>+381 14 31 00 179</p>
                      <p>+381 63 369 392</p>
                    </div>
                  </a>
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
