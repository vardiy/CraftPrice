import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, AlertTriangle, Calculator as CalcIcon } from "lucide-react";
import { getNiche, NICHES } from "../config/nicheConfig";
import { NICHE_CONTENT } from "../config/nicheContent";
import Calculator from "../components/Calculator";
import SeoHead from "../components/SeoHead";
import PinterestMeta from "../components/PinterestMeta";

export default function NicheCalculatorPage() {
  const { niche: slug } = useParams();
  const niche = getNiche(slug);

  if (!niche) return <Navigate to="/" replace />;

  const content = NICHE_CONTENT[slug];
  const otherNiches = Object.values(NICHES).filter((n) => n.slug !== slug);

  const faqJsonLd = content && {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <SeoHead niche={niche} />
      <PinterestMeta
        title={niche.metaTitle}
        description={niche.metaDescription}
        nicheName={niche.name}
      />
      {faqJsonLd && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        </Helmet>
      )}

      <h1 className="mb-6 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        {niche.h1}
      </h1>
      <Calculator nicheConfig={niche} />

      {content && (
        <div className="mt-16 grid gap-12">
          {/* Pricing intro */}
          <section aria-labelledby={`${slug}-intro`}>
            <h2 id={`${slug}-intro`} className="mb-4 text-2xl font-bold tracking-tight text-slate-900">
              {content.intro.heading}
            </h2>
            <div className="prose prose-slate max-w-none">
              {content.intro.paragraphs.map((p, i) => (
                <p key={i} className="mb-4 text-base leading-relaxed text-slate-700">
                  {p}
                </p>
              ))}
            </div>
          </section>

          {/* Common mistakes */}
          <section aria-labelledby={`${slug}-mistakes`}>
            <h2 id={`${slug}-mistakes`} className="mb-4 text-2xl font-bold tracking-tight text-slate-900">
              {content.mistakes.heading}
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {content.mistakes.items.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-5"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 text-amber-700" aria-hidden="true">
                    <AlertTriangle className="h-5 w-5" />
                  </span>
                  <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-700">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Worked example */}
          <section aria-labelledby={`${slug}-example`}>
            <h2 id={`${slug}-example`} className="mb-4 text-2xl font-bold tracking-tight text-slate-900">
              {content.worked_example.heading}
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
                  {content.worked_example.rows.map(([label, value]) => (
                    <tr key={label}>
                      <td className="px-4 py-3 text-slate-700 sm:px-6">{label}</td>
                      <td className="px-4 py-3 text-right tabular-nums font-medium text-slate-900 sm:px-6">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              {content.worked_example.footnote}
            </p>
          </section>

          {/* FAQ */}
          <section aria-labelledby={`${slug}-faq`}>
            <h2 id={`${slug}-faq`} className="mb-4 text-2xl font-bold tracking-tight text-slate-900">
              Frequently asked questions about {niche.name.toLowerCase()} pricing
            </h2>
            <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
              {content.faq.map((item, i) => (
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

          {/* Internal links to other niches */}
          <section aria-labelledby={`${slug}-other`}>
            <h2 id={`${slug}-other`} className="mb-4 text-2xl font-bold tracking-tight text-slate-900">
              Try another calculator
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {otherNiches.map((other) => {
                const Icon = other.icon;
                return (
                  <Link
                    key={other.slug}
                    to={`/calc/${other.slug}`}
                    className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white" aria-hidden="true">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-semibold text-slate-900">{other.name}</span>
                  </Link>
                );
              })}
            </div>
            <Link
              to="/"
              className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-lg border-2 border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <CalcIcon className="h-5 w-5" aria-hidden="true" />
              Back to all calculators
            </Link>
          </section>
        </div>
      )}
    </>
  );
}
