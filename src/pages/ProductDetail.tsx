import ResponsiveImage from "@/components/ResponsiveImage";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductTabs from "@/components/Products/ProductTabs";
import { products, getProductImageAlt } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import TechTooltip from "@/components/TechTooltip";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <main>
        <Navbar />
        <div className="pt-32 pb-24 container text-center">
          <h1 className="text-2xl font-heading font-bold mb-4">Proizvod nije pronađen</h1>
          <Link to="/proizvodi" className="text-accent hover:underline">
            ← Nazad na proizvode
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Helmet>
        <title>{product.name} | AL Company – PVC i aluminijumska stolarija Valjevo</title>
        <meta name="description" content={`${product.name} – ${product.description.slice(0, 150)}...`} />
      </Helmet>
      <Navbar />
      <section className="pt-28 md:pt-36 pb-16 md:pb-24 bg-background">
        <div className="container">
          <Link
            to="/proizvodi"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={14} /> Svi proizvodi
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-10 mb-12"
          >
            <div className="w-[300px] h-[300px] max-w-full mx-auto bg-muted overflow-hidden border border-border">
              <ResponsiveImage
                name={product.heroImage}
                alt={getProductImageAlt(product)}
                sizes="300px"
                priority
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <Badge variant="secondary">{product.category}</Badge>
                <Badge variant="outline" className="border-accent/30 text-accent">
                  {product.tag}
                </Badge>
                <Badge variant="outline" className="text-xs text-muted-foreground">
                  {product.subcategory}
                </Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-heading font-black text-foreground mb-4">
                {product.name}
              </h1>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {product.specs.slice(0, 4).map((spec) => (
                  <div key={spec.label} className="border border-border p-3">
                    <p className="text-xs text-muted-foreground font-body mb-1">{spec.label}</p>
                    <p className="text-sm font-semibold text-foreground">
                      <TechTooltip value={spec.value} tooltipKey={spec.tooltipKey} />
                    </p>
                  </div>
                ))}
              </div>

              <Link to="/kontakt">
                <Button variant="hero" size="lg" className="w-fit gap-2">
                  Zatražite ponudu <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </motion.div>

          <ProductTabs product={product} />
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default ProductDetail;
