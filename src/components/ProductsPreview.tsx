import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const products = [
  {
    slug: "gealan-s9000",
    tag: "PVC SISTEMI",
    name: "GEALAN S-9000",
    description: "Šestokomorni profil sa tri nivoa zaptivanja. Uf=0.72 W/m²K. Maksimalna termička i zvučna izolacija za rezidencijalne projekte.",
    specs: ["6 komora", "Uf 0.72", "RC2 klasa", "47dB"],
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
  },
  {
    slug: "alumil-supreme-sd77",
    tag: "ALU SISTEMI",
    name: "ALUMIL SUPREME",
    description: "Premium aluminijumski sistem za velike staklene fasade. Tanki profili, maksimalna svetlost, izuzetna energetska efikasnost.",
    specs: ["Tanki profili", "Uf 1.0", "Fasade", "Klizni sistemi"],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  },
];

const ProductsPreview = () => {
  return (
    <section className="py-24 md:py-32 bg-surface-dark" id="products">
      <div className="container">
        <div className="max-w-2xl mb-16">
          <p className="text-accent font-semibold text-sm tracking-[0.2em] uppercase mb-4">
            Proizvodni program
          </p>
          <h2 className="text-3xl md:text-5xl font-heading font-black text-primary-foreground leading-tight">
            PVC & Aluminijum
            <br />
            svetske klase
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative overflow-hidden bg-primary-foreground/5 border border-primary-foreground/10 hover:border-accent/40 transition-colors"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="p-8">
                <p className="text-accent text-xs font-semibold tracking-[0.15em] uppercase mb-2">
                  {product.tag}
                </p>
                <h3 className="text-2xl font-heading font-bold text-primary-foreground mb-3">
                  {product.name}
                </h3>
                <p className="font-body text-primary-foreground/60 leading-relaxed mb-6">
                  {product.description}
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  {product.specs.map((spec) => (
                    <span
                      key={spec}
                      className="text-xs font-medium px-3 py-1.5 border border-primary-foreground/20 text-primary-foreground/70"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/proizvodi/${product.slug}`}
                  className="inline-flex items-center gap-2 text-accent text-sm font-semibold group-hover:gap-3 transition-all"
                >
                  Saznajte više <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsPreview;
