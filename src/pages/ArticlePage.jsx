import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Clock, ArrowRight, ChevronRight } from "lucide-react";
import { getArticle, getArticlesByNiche } from "../content/articles";
import { getNiche } from "../config/nicheConfig";
import { useAnalytics } from "../hooks/useAnalytics";

const SITE_ORIGIN = "https://makermarginsapp.com";

export default function ArticlePage() {
  const { slug } = useParams();
  const article = getArticle(slug);
  const { trackEvent } = useAnalytics();

  if (!article) return <Navigate to="/learn" replace />;

  const niche = getNiche(article.niche);
  const canonicalUrl = `${SITE_ORIGIN}/learn/${article.slug}`;
  const related = getArticlesByNiche(article.niche).filter((a) => a.slug !== article.slug);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.publishDate,
    dateModified: article.lastUpdated,
    author: { "@type": "Organization", name: "MakerMargins" },
    publisher: { "@type": "Organization", name: "MakerMargins" },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN + "/" },
      { "@type": "ListItem", position: 2, name: "Learn", item: SITE_ORIGIN + "/learn" },
      { "@type": "ListItem", position: 3, name: article.title, item: canonicalUrl },
    ],
  };

  const faqJsonLd = article.faq && {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <Helmet>
        <title>{article.metaTitle}</title>
        <meta name="description" content={article.metaDescription} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={article.metaTitle} />
        <meta property="og:description" content={article.metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.metaTitle} />
        <meta name="twitter:description" content={article.metaDescription} />
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        {faqJsonLd && (
          <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        )}
      </Helmet>

      <article>
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-slate-500">
            <li>
              <Link to="/" className="hover:text-slate-900 hover:underline">Home</Link>
            </li>
            <li aria-hidden="true"><ChevronRight className="h-4 w-4" /></li>
            <li>
              <Link to="/learn" className="hover:text-slate-900 hover:underline">Learn</Link>
            </li>
            <li aria-hidden="true"><ChevronRight className="h-4 w-4" /></li>
            <li className="text-slate-900" aria-current="page">{niche?.name ?? article.niche}</li>
          </ol>
        </nav>

        <header className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {article.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            {niche && (
              <Link
                to={`/calc/${niche.slug}`}
                onClick={() => trackEvent("article_niche_tag_click", { article: article.slug, niche: niche.slug })}
                className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-100"
              >
                {niche.name}
              </Link>
            )}
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {article.readingMinutes} min read
            </span>
            <span aria-hidden="true">·</span>
            <span>Updated {new Date(article.lastUpdated).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
          </div>
        </header>

        {article.intro && (
          <div className="mb-8 border-l-4 border-blue-600 bg-slate-50 px-5 py-4">
            {article.intro.map((p, i) => (
              <p key={i} className="mb-3 text-base leading-relaxed text-slate-700 last:mb-0">
                {p}
              </p>
            ))}
          </div>
        )}

        {article.sections.map((section, i) => (
          <section key={i} className="mb-10">
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900">
              {section.heading}
            </h2>
            {section.paragraphs.map((p, j) => (
              <p key={j} className="mb-4 text-base leading-relaxed text-slate-700" dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(p) }} />
            ))}
          </section>
        ))}

        {article.example && (
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900">
              {article.example.title}
            </h2>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold text-slate-900 sm:px-6">Line item</th>
                    <th scope="col" className="px-4 py-3 text-right font-semibold text-slate-900 sm:px-6">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {article.example.rows.map(([label, value]) => (
                    <tr key={label}>
                      <td className="px-4 py-3 text-slate-700 sm:px-6">{label}</td>
                      <td className="px-4 py-3 text-right tabular-nums font-medium text-slate-900 sm:px-6">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              {article.example.footnote}
            </p>
          </section>
        )}

        {article.faq && (
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900">
              Frequently asked questions
            </h2>
            <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
              {article.faq.map((item, i) => (
                <details key={i} className="group p-5">
                  <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between text-base font-semibold text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <ArrowRight className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-90" aria-hidden="true" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {article.ctaHref && (
          <div className="mb-10 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-6 text-white shadow-lg">
            <h2 className="text-xl font-bold">{article.ctaText}</h2>
            <p className="mt-2 text-sm text-blue-100">
              Plug in your own materials, hours, and overhead — get retail and wholesale prices instantly.
            </p>
            <Link
              to={article.ctaHref}
              onClick={() => trackEvent("article_cta_click", { article: article.slug, niche: article.niche })}
              className="mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Open the calculator
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        )}

        {related.length > 0 && (
          <section>
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900">
              More {niche?.name?.toLowerCase() ?? "pricing"} articles
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/learn/${r.slug}`}
                  onClick={() => trackEvent("related_article_click", { from: article.slug, to: r.slug, niche: article.niche })}
                  className="group flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  <h3 className="text-base font-semibold text-slate-900 group-hover:text-blue-700">
                    {r.title}
                  </h3>
                  <p className="text-sm text-slate-600">{r.excerpt}</p>
                  <span className="mt-auto flex items-center gap-1 text-xs text-slate-400">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {r.readingMinutes} min
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}

// Tiny inline markdown for **bold** spans only. Article text is trusted
// content from our own modules — no XSS surface, but escape just in case.
function renderInlineMarkdown(text) {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return escaped.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}
