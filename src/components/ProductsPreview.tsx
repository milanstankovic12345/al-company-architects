import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { products as allProducts } from "@/data/products";

const previewProductSlugs = ["gealan-s9000", "alumil-supreme-sd77"] as const;

const previewProducts = previewProductSlugs
  .map((slug) => allProducts.find((product) => product.slug === slug))
  .filter((product): product is NonNullable<(typeof allProducts)[number]> => Boolean(product))
  .map((product) => ({
    slug: product.slug,
    tag: `${product.category} SISTEMI`,
    name: product.name,
    description: product.description,
    specs: product.specs.slice(0, 4).map((spec) => spec.value),
    image: product.heroImage,
  }));

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
          {previewProducts.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative overflow-hidden bg-primary-foreground/5 border border-primary-foreground/10 hover:border-accent/40 transition-colors"
            >
              <div className="w-[300px] h-[300px] max-w-full mx-auto overflow-hidden">
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
