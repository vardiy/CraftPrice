import { Helmet } from "react-helmet-async";

const NICHE_KEYWORDS = {
  crochet: ["crochet pricing", "handmade crochet business", "amigurumi profit calculator"],
  woodworking: ["woodworking pricing", "handmade furniture costs", "wood shop profit calculator"],
  jewelry: ["jewelry pricing", "handmade jewelry business", "beading profit calculator"],
  baking: ["baking pricing", "home bakery costs", "cake pricing calculator"],
  sewing: ["sewing pricing", "handmade clothing business", "quilting profit calculator"],
};

const DEFAULT_IMAGE = "https://makermarginsapp.com/images/pin-preview.png";

export default function PinterestMeta({ title, description, nicheName, imageUrl }) {
  const slug = nicheName?.toLowerCase();
  const url = slug
    ? `https://makermarginsapp.com/calc/${slug}`
    : "https://makermarginsapp.com/";
  const image = imageUrl || DEFAULT_IMAGE;
  const keywords = NICHE_KEYWORDS[slug] || ["craft pricing", "handmade business", "profit calculator"];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image,
    author: {
      "@type": "Organization",
      name: "MakerMargins",
    },
    publisher: {
      "@type": "Organization",
      name: "MakerMargins",
    },
    keywords: keywords.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <Helmet>
      {/* Open Graph for Pinterest Rich Pins */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1000" />
      <meta property="og:image:height" content="1500" />

      {/* Twitter / Pinterest fallback */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Pinterest domain verification — replace with your code */}
      <meta name="p:domain_verify" content="YOUR_PINTEREST_VERIFICATION_CODE" />

      {/* Article JSON-LD for Pinterest crawler */}
      <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
    </Helmet>
  );
}
