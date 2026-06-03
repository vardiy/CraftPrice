import { Helmet } from "react-helmet-async";

const SITE_ORIGIN = "https://makermarginsapp.com";

const NICHE_KEYWORDS = {
  crochet: ["crochet pricing", "handmade crochet business", "amigurumi profit calculator"],
  woodworking: ["woodworking pricing", "handmade furniture costs", "wood shop profit calculator"],
  jewelry: ["jewelry pricing", "handmade jewelry business", "beading profit calculator"],
  baking: ["baking pricing", "home bakery costs", "cake pricing calculator"],
  sewing: ["sewing pricing", "handmade clothing business", "quilting profit calculator"],
};

const DEFAULT_KEYWORDS = ["craft pricing", "handmade business", "profit calculator"];

function absolutize(path) {
  if (!path) return `${SITE_ORIGIN}/assets/pins/home-preview.png`;
  return path.startsWith("http") ? path : `${SITE_ORIGIN}${path}`;
}

export default function PinterestMeta({
  title,
  description,
  path = "/",
  image,
  nicheSlug,
  includeArticleJsonLd = true,
}) {
  const url = `${SITE_ORIGIN}${path}`;
  const imageUrl = absolutize(image);
  const keywords = (nicheSlug && NICHE_KEYWORDS[nicheSlug]) || DEFAULT_KEYWORDS;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: imageUrl,
    author: { "@type": "Organization", name: "MakerMargins" },
    publisher: { "@type": "Organization", name: "MakerMargins" },
    keywords: keywords.join(", "),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  return (
    <Helmet>
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1000" />
      <meta property="og:image:height" content="1500" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      {includeArticleJsonLd && (
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
      )}
    </Helmet>
  );
}
