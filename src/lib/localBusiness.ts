import { OG_IMAGE, SITE_URL } from "./seo";

export const buildLocalBusinessJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: "AL Company d.o.o.",
  description: "Proizvođač PVC i aluminijumske stolarije – prozori, vrata, fasade, klizni sistemi.",
  url: SITE_URL,
  image: OG_IMAGE,
  logo: `${SITE_URL}/favicon.png`,
  telephone: ["+381-14-246-079", "+381-63-369-392"],
  foundingDate: "2002",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Prva proleterska 60",
    addressLocality: "Valjevo",
    postalCode: "14000",
    addressCountry: "RS",
  },
  // TODO: verify exact coordinates of the workshop with the owner (currently approximate)
  geo: { "@type": "GeoCoordinates", latitude: 44.272, longitude: 19.887 },
  // TODO: real data from client (placeholder hours)
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "16:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "14:00" },
  ],
  areaServed: { "@type": "Country", name: "Srbija" },
  sameAs: ["https://www.instagram.com/alcompany2002/"],
});
