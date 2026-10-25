import ResponsiveImage from "@/components/ResponsiveImage";

interface PageBannerProps {
  name: string;
  alt: string;
}

/** Wide, fixed-ratio photo banner for category pages (ratio reserves space, so no layout shift). */
const PageBanner = ({ name, alt }: PageBannerProps) => (
  <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-muted border border-border mb-12">
    <ResponsiveImage
      name={name}
      alt={alt}
      sizes="(min-width: 1400px) 1360px, 100vw"
      className="w-full h-full object-cover"
    />
  </div>
);

export default PageBanner;
