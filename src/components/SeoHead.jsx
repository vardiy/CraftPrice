import { Helmet } from "react-helmet-async";

const GENERIC = {
  title: "CraftPrice | Crochet & Craft Profit Calculator",
  description:
    "Free pricing calculator for makers. Track materials, labor, and overhead to find your perfect retail and wholesale prices. Export results as PDF.",
  canonical: "https://craftprice.app/",
  jsonLdName: "CraftPrice",
  jsonLdDescription:
    "Free profit calculator for crochet, knitting, woodworking, and craft makers. Calculate retail and wholesale prices with material tracking, labor costs, and PDF export.",
};

export default function SeoHead({ niche }) {
  const title = niche?.metaTitle ?? GENERIC.title;
  const description = niche?.metaDescription ?? GENERIC.description;
  const canonical = niche
    ? `https://craftprice.app/calc/${niche.slug}`
    : GENERIC.canonical;
  const jsonLdName = niche
    ? `CraftPrice \u2014 ${niche.name} Calculator`
    : GENERIC.jsonLdName;
  const jsonLdDescription = niche?.metaDescription ?? GENERIC.jsonLdDescription;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: jsonLdName,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: jsonLdDescription,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}
