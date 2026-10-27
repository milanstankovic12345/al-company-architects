import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { OG_IMAGE, canonicalUrl, isNoindex } from "@/lib/seo";

/**
 * Per-route canonical + Open Graph/Twitter defaults. Page titles and descriptions
 * stay in each page's own Helmet; this adds what is identical everywhere.
 */
const RouteSeo = () => {
  const { pathname } = useLocation();
  const url = canonicalUrl(pathname);
  return (
    <Helmet>
      <link rel="canonical" href={url} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="AL Company" />
      <meta property="og:locale" content="sr_RS" />
      <meta property="og:image" content={OG_IMAGE} />
      <meta name="twitter:card" content="summary_large_image" />
      {isNoindex(pathname) && <meta name="robots" content="noindex, follow" />}
    </Helmet>
  );
};

export default RouteSeo;
