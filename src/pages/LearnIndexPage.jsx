import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Clock, ChevronRight } from "lucide-react";
import { ARTICLES } from "../content/articles";
import { NICHES } from "../config/nicheConfig";

const SITE_ORIGIN = "https://makermarginsapp.com";
const PAGE_TITLE = "Pricing Guides for Makers — Real Numbers, Not Guesses | MakerMargins";
const PAGE_DESCRIPTION =
  "In-depth pricing guides for handmade makers: amigurumi, cutting boards, sterling jewelry, custom cakes, quilts, and more. Real cost breakdowns and worked examples.";

export default function LearnIndexPage() {
  const niches = Object.values(NICHES);
  const articlesByNiche = niches.map((n) => ({
    niche: n,
    articles: ARTICLES.filter((a) => a.niche === n.slug),
  })).filter((g) => g.articles.length > 0);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN + "/" },
      { "@type": "ListItem", position: 2, name: "Learn", item: SITE_ORIGIN + "/learn" },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${SITE_ORIGIN}/learn`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:url" content={`${SITE_ORIGIN}/learn`} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>

      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-slate-500">
          <li>
            <Link to="/" className="hover:text-slate-900 hover:underline">Home</Link>
          </li>
          <li aria-hidden="true"><ChevronRight className="h-4 w-4" /></li>
          <li className="text-slate-900" aria-current="page">Learn</li>
        </ol>
      </nav>

      <header className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Pricing guides for makers
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-slate-600">
          Stop guessing. These guides break down the real cost of making
          handmade goods — materials, time, overhead — and walk you through
          what to charge so your craft pays you back.
        </p>
      </header>

      {articlesByNiche.map(({ niche, articles }) => {
        const Icon = niche.icon;
        return (
          <section key={niche.slug} className="mb-12" aria-labelledby={`section-${niche.slug}`}>
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600" aria-hidden="true">
                <Icon className="h-5 w-5" />
              </span>
              <h2 id={`section-${niche.slug}`} className="text-2xl font-bold tracking-tight text-slate-900">
                {niche.name}
              </h2>
              <Link
                to={`/calc/${niche.slug}`}
                className="ml-auto text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
              >
                Calculator →
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {articles.map((a) => (
                <Link
                  key={a.slug}
                  to={`/learn/${a.slug}`}
                  className="group flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-700">
                    {a.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">{a.excerpt}</p>
                  <span className="mt-auto flex items-center gap-1 text-xs text-slate-400">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {a.readingMinutes} min read
                  </span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
