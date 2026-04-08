import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowDown, ChevronDown, Package, Clock, Building2, TrendingUp, DollarSign, Receipt } from "lucide-react";
import SeoHead from "../components/SeoHead";
import { NICHES } from "../config/nicheConfig";

const niches = Object.values(NICHES);

const FAQ_ITEMS = [
  {
    question: "How do I calculate labor cost for handmade products?",
    answer:
      "Multiply the total hours you spend making the product by your desired hourly wage. Include every phase \u2014 design, cutting, assembly, finishing, and packaging. MakerMargins does this math for you automatically.",
  },
  {
    question: "What profit margin should I use for handmade goods?",
    answer:
      "Most makers use 30\u201350% for wholesale and 50\u201370% for retail. Start with 50% and adjust based on your market, competition, and perceived value. Our calculator shows both retail and wholesale prices instantly.",
  },
  {
    question: "What counts as overhead for a craft business?",
    answer:
      "Overhead includes recurring costs not tied to a single product: workspace rent or utilities, equipment wear, packaging supplies, marketplace fees (Etsy, Shopify), insurance, and software subscriptions. A common starting point is 10\u201315% of your material-plus-labor total.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const FORMULA_PARTS = [
  {
    icon: Package,
    title: "Materials",
    text: "Every supply that goes into the finished product \u2014 yarn, wood, beads, flour, fabric.",
  },
  {
    icon: Clock,
    title: "Labor",
    text: "Your time has value. Multiply hours worked by a fair hourly wage.",
  },
  {
    icon: Building2,
    title: "Overhead",
    text: "Utilities, tools, packaging, Etsy fees \u2014 costs that aren\u2019t tied to a single product.",
  },
  {
    icon: TrendingUp,
    title: "Markup",
    text: "The margin that turns cost into profit. A 50% margin means you keep half.",
  },
];

export default function LandingPage() {
  const scrollToNiches = () => {
    document.getElementById("niche-grid")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <SeoHead />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      {/* ---- Hero ---- */}
      <section aria-labelledby="hero-heading" className="py-12 text-center sm:py-20">
        <h1
          id="hero-heading"
          className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl"
        >
          Stop Guessing. Start Pricing{" "}
          <span className="text-blue-600">Profitably.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          MakerMargins is a free calculator that turns material costs, labor hours,
          and overhead into retail and wholesale prices you can trust.
        </p>
        <button
          type="button"
          onClick={scrollToNiches}
          className="mt-8 inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Choose Your Craft
          <ArrowDown className="h-5 w-5" aria-hidden="true" />
        </button>
      </section>

      {/* ---- Niche Grid ---- */}
      <section id="niche-grid" aria-labelledby="niche-heading" className="py-12">
        <h2
          id="niche-heading"
          className="mb-8 text-center text-2xl font-bold tracking-tight text-slate-900"
        >
          Pick Your Craft
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {niches.map((niche) => {
            const Icon = niche.icon;
            return (
              <Link
                key={niche.slug}
                to={`/calc/${niche.slug}`}
                className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white"
                  aria-hidden="true"
                >
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{niche.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">{niche.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ---- The Maker's Math ---- */}
      <section aria-labelledby="formula-heading" className="py-12">
        <h2
          id="formula-heading"
          className="mb-8 text-center text-2xl font-bold tracking-tight text-slate-900"
        >
          The Maker&rsquo;s Math
        </h2>

        <div className="mx-auto max-w-2xl rounded-2xl bg-slate-900 p-6 text-center text-white shadow-lg">
          <p className="font-mono text-lg font-semibold sm:text-xl">
            Price = (Materials + Labor + Overhead) &times; Markup
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-3xl gap-6 sm:grid-cols-2">
          {FORMULA_PARTS.map((part) => {
            const Icon = part.icon;
            return (
              <div key={part.title} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600"
                  aria-hidden="true"
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-slate-900">{part.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{part.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---- Labor Rate Guide ---- */}
      <section aria-labelledby="labor-heading" className="py-12">
        <h2
          id="labor-heading"
          className="mb-8 text-center text-2xl font-bold tracking-tight text-slate-900"
        >
          What Is Your Time Worth?
        </h2>

        <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th scope="col" className="px-4 py-3 font-semibold text-slate-900 sm:px-6">Tier</th>
                <th scope="col" className="px-4 py-3 font-semibold text-slate-900 sm:px-6">Rate</th>
                <th scope="col" className="px-4 py-3 font-semibold text-slate-900 sm:px-6">Who</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="px-4 py-3 font-medium text-slate-900 sm:px-6">Hobbyist</td>
                <td className="px-4 py-3 tabular-nums text-slate-700 sm:px-6">$15&ndash;$20/hr</td>
                <td className="px-4 py-3 text-slate-500 sm:px-6">Learning the craft and building speed.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-slate-900 sm:px-6">Artisan</td>
                <td className="px-4 py-3 tabular-nums text-slate-700 sm:px-6">$25&ndash;$40/hr</td>
                <td className="px-4 py-3 text-slate-500 sm:px-6">Consistent quality and efficient production.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-slate-900 sm:px-6">Specialist</td>
                <td className="px-4 py-3 tabular-nums text-slate-700 sm:px-6">$50+/hr</td>
                <td className="px-4 py-3 text-slate-500 sm:px-6">High demand, rare skills, or custom design work.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mx-auto mt-6 flex max-w-3xl items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600" aria-hidden="true">
            <DollarSign className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-semibold text-slate-900">The Minimum Wage + 25% Rule</h3>
            <p className="mt-1 text-sm text-slate-600">
              At a minimum, pay yourself your local minimum wage <strong>plus 25%</strong>. The extra quarter covers self-employment taxes (Social Security + Medicare) that you owe as a sole proprietor. If minimum wage is $15/hr, start at $18.75/hr &mdash; then work up from there.
            </p>
          </div>
        </div>
      </section>

      {/* ---- Tax Deduction Callout ---- */}
      <section aria-labelledby="tax-heading" className="py-12">
        <div className="mx-auto max-w-3xl rounded-2xl border-2 border-slate-900 bg-slate-900 p-6 text-white shadow-lg">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15" aria-hidden="true">
              <Receipt className="h-6 w-6" />
            </span>
            <div>
              <h2 id="tax-heading" className="text-lg font-bold">Tax Tip: Materials Are Deductions</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Every material you track in MakerMargins &mdash; yarn, lumber, beads, flour, fabric &mdash; is a <strong className="text-white">business expense</strong> that reduces your taxable income. Keep your receipts, log your costs here, and export the PDF as a record for tax season.
              </p>
              <p className="mt-3 text-xs text-slate-400">
                This is educational content for informational purposes only and does not constitute professional tax, legal, or financial advice. Consult a qualified tax professional for guidance specific to your situation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section aria-labelledby="faq-heading" className="py-12">
        <h2
          id="faq-heading"
          className="mb-8 text-center text-2xl font-bold tracking-tight text-slate-900"
        >
          Frequently Asked Questions
        </h2>
        <div className="mx-auto max-w-2xl divide-y divide-slate-200">
          {FAQ_ITEMS.map((faq, i) => (
            <details key={i} className="group py-4">
              <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between text-base font-semibold text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 [&::-webkit-details-marker]:hidden">
                {faq.question}
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
