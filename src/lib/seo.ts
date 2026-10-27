export const SITE_URL = "https://al-company.vercel.app";
export const OG_IMAGE = `${SITE_URL}/og-default.png`;

/** Routes that must not be indexed (kept out of the sitemap too). */
export const NOINDEX_PATHS = ["/asistent", "/brand-preview"];

export const canonicalUrl = (pathname: string) => {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return `${SITE_URL}${path}`;
};

export const isNoindex = (pathname: string) => NOINDEX_PATHS.includes(pathname.replace(/\/+$/, ""));
