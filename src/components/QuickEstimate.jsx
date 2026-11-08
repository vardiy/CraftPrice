import { useState, useEffect, useRef, useId } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calculator as CalcIcon } from "lucide-react";
import { useSettings } from "../context/SettingsContext";
import { useAnalytics } from "../hooks/useAnalytics";

const OVERHEAD = 0.1;
const num = (v) => parseFloat(v) || 0;

// Compact in-article estimator: materials + hours + wage -> retail/wholesale.
// Uses the same math as Calculator.jsx with 10% overhead.
export default function QuickEstimate({ niche, article }) {
  const id = useId();
  const { currency, formatPrice } = useSettings();
  const { trackEvent } = useAnalytics();

  const [materials, setMaterials] = useState("");
  const [hours, setHours] = useState("");
  const [wage, setWage] = useState(String(niche.defaultHourlyWage ?? 20));
  // Fixed defaults (not the visitor's saved calculator settings) so the
  // pre-rendered HTML matches the first client render.
  const margin = 50;

  const totalCost = (num(materials) + num(hours) * num(wage)) * (1 + OVERHEAD);
  const retail = totalCost / (1 - margin / 100);
  const wholesale = totalCost * 1.5;
  const hasResult = num(materials) > 0 || num(hours) > 0;

  const fired = useRef(false);
  useEffect(() => {
    if (hasResult && !fired.current) {
      fired.current = true;
      trackEvent("calculate", { niche: niche.slug, source: "article_quick", article: article.slug });
    }
  }, [hasResult, trackEvent, niche.slug, article.slug]);

  const field =
    "w-full min-h-[44px] rounded-lg border border-slate-300 bg-white px-3 py-2 text-base tabular-nums text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20";

  return (
    <section
      aria-labelledby={`${id}-title`}
      className="mb-10 rounded-2xl border border-blue-200 bg-blue-50/60 p-5 sm:p-6"
    >
      <div className="mb-4 flex items-center gap-2">
        <CalcIcon className="h-5 w-5 text-blue-700" aria-hidden="true" />
        <h2 id={`${id}-title`} className="text-lg font-bold text-slate-900">
          Quick price check: what should your {niche.name.toLowerCase()} piece sell for?
        </h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <label className="text-sm font-medium text-slate-700">
          Materials ({currency.symbol})
          <input
            type="number" inputMode="decimal" min="0" step="any" placeholder="e.g. 25"
            value={materials} onChange={(e) => setMaterials(e.target.value)} className={`mt-1 ${field}`}
          />
        </label>
        <label className="text-sm font-medium text-slate-700">
          Hours of work
          <input
            type="number" inputMode="decimal" min="0" step="any" placeholder="e.g. 4"
            value={hours} onChange={(e) => setHours(e.target.value)} className={`mt-1 ${field}`}
          />
        </label>
        <label className="text-sm font-medium text-slate-700">
          Your hourly wage ({currency.symbol})
          <input
            type="number" inputMode="decimal" min="0" step="any"
            value={wage} onChange={(e) => setWage(e.target.value)} className={`mt-1 ${field}`}
          />
        </label>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 rounded-xl bg-white p-4 text-center shadow-sm" aria-live="polite">
        <div>
          <p className="text-xs text-slate-500">Total cost</p>
          <p className="text-lg font-bold tabular-nums text-slate-900">{hasResult ? formatPrice(totalCost) : "—"}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Retail ({margin}% margin)</p>
          <p className="text-xl font-extrabold tabular-nums text-blue-700">{hasResult ? formatPrice(retail) : "—"}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Wholesale</p>
          <p className="text-lg font-bold tabular-nums text-slate-900">{hasResult ? formatPrice(wholesale) : "—"}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-500">Includes 10% overhead. Itemize materials, adjust margin and export a PDF in the full calculator.</p>
        <Link
          to={`/calc/${niche.slug}`}
          onClick={() => trackEvent("article_quick_cta_click", { article: article.slug, niche: niche.slug, had_result: hasResult })}
          className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Open full {niche.name.toLowerCase()} calculator
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
