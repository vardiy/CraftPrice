import { DollarSign, TrendingUp, Package } from "lucide-react";

export default function ResultCard({ totalCost, retailPrice, wholesalePrice, profitMargin }) {
  return (
    <section aria-label="Pricing results" className="rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-6 text-white shadow-lg">
      <h2 className="mb-5 text-lg font-semibold tracking-tight text-blue-100">
        Your Prices
      </h2>

      <div className="grid gap-4">
        {/* Total Cost */}
        <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/15" aria-hidden="true">
            <Package className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="text-sm text-blue-200">Total Cost</p>
            <p className="truncate text-xl font-bold tabular-nums">${totalCost.toFixed(2)}</p>
          </div>
        </div>

        {/* Retail Price */}
        <div className="flex items-center gap-3 rounded-xl bg-white/20 px-4 py-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/20" aria-hidden="true">
            <DollarSign className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="text-sm text-blue-100">Retail Price <span className="text-blue-200">({profitMargin}% margin)</span></p>
            <p className="truncate text-2xl font-extrabold tabular-nums">${retailPrice.toFixed(2)}</p>
          </div>
        </div>

        {/* Wholesale Price */}
        <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/15" aria-hidden="true">
            <TrendingUp className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="text-sm text-blue-200">Wholesale Price <span className="text-blue-300">(1.5× cost)</span></p>
            <p className="truncate text-xl font-bold tabular-nums">${wholesalePrice.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
