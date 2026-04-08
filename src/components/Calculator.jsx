import { useReducer, useEffect, useCallback, useId, useMemo } from "react";
import { Plus, Trash2, FileDown } from "lucide-react";
import ResultCard from "./ResultCard";
import AdSlot from "./AdSlot";
import { useSettings } from "../context/SettingsContext";
import { exportPdf } from "../utils/exportPdf";

// --- Reducer -----------------------------------------------------------

function newMaterialRow(placeholder) {
  return { id: crypto.randomUUID(), name: "", quantity: "", unitCost: "", placeholder: placeholder ?? "e.g. Yarn" };
}

function buildInitialState(nicheConfig) {
  const savedWage = localStorage.getItem("cp_hourlyWage");
  const defaultWage = nicheConfig?.defaultHourlyWage;

  return {
    materials: [newMaterialRow(nicheConfig?.materialPlaceholder)],
    laborHours: "",
    hourlyWage: savedWage ?? (defaultWage != null ? String(defaultWage) : ""),
    overheadPercent: "10",
    profitMargin: localStorage.getItem("cp_profitMargin") ?? "50",
  };
}

function reducer(state, action) {
  switch (action.type) {
    case "ADD_MATERIAL":
      return { ...state, materials: [...state.materials, newMaterialRow(action.placeholder)] };
    case "REMOVE_MATERIAL":
      return {
        ...state,
        materials: state.materials.length > 1
          ? state.materials.filter((m) => m.id !== action.id)
          : state.materials,
      };
    case "UPDATE_MATERIAL":
      return {
        ...state,
        materials: state.materials.map((m) =>
          m.id === action.id ? { ...m, [action.field]: action.value } : m
        ),
      };
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
}

// --- Helpers -----------------------------------------------------------

const num = (v) => parseFloat(v) || 0;

function calculate(state) {
  const totalMaterialCost = state.materials.reduce(
    (sum, m) => sum + num(m.quantity) * num(m.unitCost),
    0
  );
  const laborCost = num(state.laborHours) * num(state.hourlyWage);
  const subtotal = totalMaterialCost + laborCost;
  const overheadCost = subtotal * (num(state.overheadPercent) / 100);
  const totalCost = subtotal + overheadCost;
  const margin = num(state.profitMargin);
  const retailPrice = margin >= 100 ? Infinity : totalCost / (1 - margin / 100);
  const wholesalePrice = totalCost * 1.5;
  return { totalMaterialCost, laborCost, overheadCost, totalCost, retailPrice, wholesalePrice };
}

// --- Shared input classes ----------------------------------------------

const inputClass =
  "block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 placeholder:text-slate-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 min-h-[44px]";

const labelClass = "block text-sm font-medium text-slate-700 mb-1";

// --- Component ---------------------------------------------------------

export default function Calculator({ nicheConfig }) {
  const initialState = useMemo(() => buildInitialState(nicheConfig), [nicheConfig]);
  const [state, dispatch] = useReducer(reducer, initialState);
  const uid = useId();
  const results = calculate(state);
  const { currency } = useSettings();

  const materialPlaceholder = nicheConfig?.materialPlaceholder ?? "e.g. Yarn";

  // Persist settings to localStorage
  useEffect(() => {
    localStorage.setItem("cp_hourlyWage", state.hourlyWage);
  }, [state.hourlyWage]);

  useEffect(() => {
    localStorage.setItem("cp_profitMargin", state.profitMargin);
  }, [state.profitMargin]);

  const setField = useCallback(
    (field) => (e) => dispatch({ type: "SET_FIELD", field, value: e.target.value }),
    []
  );

  const handleExport = () => {
    exportPdf({
      materials: state.materials,
      laborHours: num(state.laborHours),
      hourlyWage: num(state.hourlyWage),
      overheadPercent: num(state.overheadPercent),
      profitMargin: num(state.profitMargin),
      currencySymbol: currency.symbol,
      currencyCode: currency.code,
      nicheName: nicheConfig?.name,
      ...results,
    });
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:items-start">
      {/* ---- Left Column: Inputs ---- */}
      <div className="grid gap-8">
        {/* Materials */}
        <section aria-labelledby={`${uid}-mat`}>
          <h2 id={`${uid}-mat`} className="mb-3 text-lg font-semibold text-slate-900">
            Materials
          </h2>

          <div className="grid gap-3" role="list" aria-label="Material rows">
            {state.materials.map((m, i) => (
              <fieldset
                key={m.id}
                role="listitem"
                className="grid grid-cols-[1fr_5rem_5.5rem_auto] items-end gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3"
              >
                <legend className="sr-only">Material {i + 1}</legend>

                <div>
                  <label htmlFor={`${uid}-name-${m.id}`} className={labelClass}>
                    Name
                  </label>
                  <input
                    id={`${uid}-name-${m.id}`}
                    type="text"
                    placeholder={m.placeholder}
                    className={inputClass}
                    value={m.name}
                    onChange={(e) =>
                      dispatch({ type: "UPDATE_MATERIAL", id: m.id, field: "name", value: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label htmlFor={`${uid}-qty-${m.id}`} className={labelClass}>
                    Qty
                  </label>
                  <input
                    id={`${uid}-qty-${m.id}`}
                    type="text"
                    inputMode="decimal"
                    placeholder="0"
                    className={inputClass}
                    value={m.quantity}
                    onChange={(e) =>
                      dispatch({ type: "UPDATE_MATERIAL", id: m.id, field: "quantity", value: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label htmlFor={`${uid}-cost-${m.id}`} className={labelClass}>
                    Unit {currency.symbol}
                  </label>
                  <input
                    id={`${uid}-cost-${m.id}`}
                    type="text"
                    inputMode="decimal"
                    placeholder="0.00"
                    className={inputClass}
                    value={m.unitCost}
                    onChange={(e) =>
                      dispatch({ type: "UPDATE_MATERIAL", id: m.id, field: "unitCost", value: e.target.value })
                    }
                  />
                </div>

                <button
                  type="button"
                  aria-label={`Remove material ${m.name || i + 1}`}
                  onClick={() => dispatch({ type: "REMOVE_MATERIAL", id: m.id })}
                  disabled={state.materials.length === 1}
                  className="flex h-[44px] w-[44px] items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400"
                >
                  <Trash2 className="h-5 w-5" aria-hidden="true" />
                </button>
              </fieldset>
            ))}
          </div>

          <button
            type="button"
            onClick={() => dispatch({ type: "ADD_MATERIAL", placeholder: materialPlaceholder })}
            className="mt-3 inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add Material
          </button>
        </section>

        {/* Labor & Overhead */}
        <section aria-labelledby={`${uid}-labor`}>
          <h2 id={`${uid}-labor`} className="mb-3 text-lg font-semibold text-slate-900">
            Labor &amp; Overhead
          </h2>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor={`${uid}-hours`} className={labelClass}>
                Hours Worked
              </label>
              <input
                id={`${uid}-hours`}
                type="text"
                inputMode="decimal"
                placeholder="0"
                className={inputClass}
                value={state.laborHours}
                onChange={setField("laborHours")}
              />
            </div>

            <div>
              <label htmlFor={`${uid}-wage`} className={labelClass}>
                Hourly Wage ({currency.symbol})
              </label>
              <input
                id={`${uid}-wage`}
                type="text"
                inputMode="decimal"
                placeholder="0.00"
                className={inputClass}
                value={state.hourlyWage}
                onChange={setField("hourlyWage")}
              />
            </div>

            <div>
              <label htmlFor={`${uid}-overhead`} className={labelClass}>
                Overhead (%)
              </label>
              <input
                id={`${uid}-overhead`}
                type="text"
                inputMode="decimal"
                placeholder="10"
                className={inputClass}
                value={state.overheadPercent}
                onChange={setField("overheadPercent")}
              />
            </div>
          </div>
        </section>

        {/* Profit Margin */}
        <section aria-labelledby={`${uid}-margin`}>
          <h2 id={`${uid}-margin`} className="mb-3 text-lg font-semibold text-slate-900">
            Profit Margin
          </h2>

          <div className="max-w-xs">
            <label htmlFor={`${uid}-pm`} className={labelClass}>
              Target Margin (%)
            </label>
            <input
              id={`${uid}-pm`}
              type="text"
              inputMode="decimal"
              placeholder="50"
              className={inputClass}
              value={state.profitMargin}
              onChange={setField("profitMargin")}
            />
          </div>
        </section>

        {/* Ad slot above calculate area */}
        <AdSlot slot="1234567890" />
      </div>

      {/* ---- Right Column: Results ---- */}
      <div className="grid gap-4 lg:sticky lg:top-6">
        <ResultCard
          totalCost={results.totalCost}
          retailPrice={results.retailPrice === Infinity ? 0 : results.retailPrice}
          wholesalePrice={results.wholesalePrice}
          profitMargin={num(state.profitMargin)}
        />

        {/* Ad slot below results */}
        <AdSlot slot="0987654321" />

        <button
          type="button"
          onClick={handleExport}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border-2 border-blue-600 px-4 py-2.5 text-sm font-medium text-blue-600 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <FileDown className="h-5 w-5" aria-hidden="true" />
          Export PDF
        </button>
      </div>
    </div>
  );
}
