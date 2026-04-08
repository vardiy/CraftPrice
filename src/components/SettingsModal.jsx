import { useEffect, useRef, useState, useId } from "react";
import { X } from "lucide-react";
import { useSettings } from "../context/SettingsContext";

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function SettingsModal({ open, onClose }) {
  const { currency, setCurrency, CURRENCIES } = useSettings();
  const dialogRef = useRef(null);
  const previousFocus = useRef(null);
  const uid = useId();

  const [customSymbol, setCustomSymbol] = useState("");
  const [customCode, setCustomCode] = useState("");

  // Focus trap + restore focus
  useEffect(() => {
    if (!open) return;
    previousFocus.current = document.activeElement;
    const dialog = dialogRef.current;
    if (!dialog) return;

    // Focus the first focusable element
    const first = dialog.querySelector(FOCUSABLE);
    first?.focus();

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const focusable = [...dialog.querySelectorAll(FOCUSABLE)];
      if (focusable.length === 0) return;

      const firstEl = focusable[0];
      const lastEl = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const isPreset = CURRENCIES.some((c) => c.code === currency.code);

  const handlePresetSelect = (c) => {
    setCurrency(c);
  };

  const handleCustomApply = () => {
    if (customSymbol.trim() && customCode.trim()) {
      setCurrency({ symbol: customSymbol.trim(), code: customCode.trim().toUpperCase() });
    }
  };

  const inputClass =
    "block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 placeholder:text-slate-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 min-h-[44px]";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${uid}-title`}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 id={`${uid}-title`} className="text-lg font-semibold text-slate-900">
            Settings
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close settings"
            className="flex h-[44px] w-[44px] items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Currency presets */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium text-slate-700">Currency</legend>
          <div className="grid grid-cols-3 gap-2">
            {CURRENCIES.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => handlePresetSelect(c)}
                aria-pressed={currency.code === c.code}
                className={`min-h-[44px] rounded-lg border-2 px-3 py-2 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                  currency.code === c.code
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {c.symbol} {c.code}
              </button>
            ))}
          </div>
        </fieldset>

        {/* Custom currency */}
        <fieldset className="mt-5 rounded-xl border border-slate-200 p-4">
          <legend className="px-1 text-sm font-medium text-slate-700">Custom Currency</legend>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor={`${uid}-sym`} className="mb-1 block text-sm text-slate-600">
                Symbol
              </label>
              <input
                id={`${uid}-sym`}
                type="text"
                placeholder="e.g. \u20b9"
                maxLength={4}
                className={inputClass}
                value={customSymbol}
                onChange={(e) => setCustomSymbol(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor={`${uid}-code`} className="mb-1 block text-sm text-slate-600">
                Code
              </label>
              <input
                id={`${uid}-code`}
                type="text"
                placeholder="e.g. INR"
                maxLength={5}
                className={inputClass}
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value)}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleCustomApply}
            disabled={!customSymbol.trim() || !customCode.trim()}
            className="mt-3 min-h-[44px] w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-40"
          >
            Apply Custom Currency
          </button>
        </fieldset>

        <p className="mt-4 text-center text-xs text-slate-500">
          Active: <strong>{currency.symbol} {currency.code}</strong> &mdash; saved automatically
        </p>
      </div>
    </div>
  );
}
