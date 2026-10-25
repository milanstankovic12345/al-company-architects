import type { ImgHTMLAttributes } from "react";
import { getImageSet } from "@/lib/images";

interface ResponsiveImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "alt" | "width" | "height"> {
  /** Key of a generated image (see src/lib/images.ts); unknown keys render the placeholder. */
  name: string;
  alt: string;
  /** `sizes` attribute, e.g. "(min-width: 768px) 300px, 100vw". */
  sizes: string;
  /** Above-the-fold image: loads eagerly with high fetch priority. */
  priority?: boolean;
}

/**
 * <picture> with AVIF/WebP srcset and intrinsic width/height so the browser
 * reserves space (no layout shift). Lazy by default; `priority` for the hero/LCP image.
 */
const ResponsiveImage = ({ name, alt, sizes, priority = false, ...rest }: ResponsiveImageProps) => {
  const set = getImageSet(name);

  if (!set) {
    return <img src="/placeholder.svg" alt={alt} width={600} height={400} loading="lazy" {...rest} />;
  }

  return (
    <picture className="block w-full h-full">
      <source type="image/avif" srcSet={set.srcSet.avif} sizes={sizes} />
      <source type="image/webp" srcSet={set.srcSet.webp} sizes={sizes} />
      <img
        src={set.src}
        srcSet={set.srcSet.webp}
        sizes={sizes}
        alt={alt}
        width={set.width}
        height={set.height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        {...rest}
      />
    </picture>
  );
};

export default ResponsiveImage;
