import { createContext, useContext, useState, useCallback, useRef } from "react";

const CURRENCIES = [
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "\u20ac" },
  { code: "GBP", symbol: "\u00a3" },
];

const STORAGE_KEY = "cp_currency";

function loadCurrency() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved?.code && saved?.symbol) return saved;
  } catch { /* ignore */ }
  return CURRENCIES[0];
}

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [currency, setCurrencyState] = useState(loadCurrency);
  const announcementRef = useRef(null);

  const setCurrency = useCallback((next) => {
    setCurrencyState(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    // Announce to screen readers
    if (announcementRef.current) {
      announcementRef.current.textContent = `Currency changed to ${next.code}`;
    }
  }, []);

  const formatPrice = useCallback(
    (value) => `${currency.symbol}${value.toFixed(2)}`,
    [currency.symbol]
  );

  return (
    <SettingsContext.Provider value={{ currency, setCurrency, formatPrice, CURRENCIES }}>
      {children}
      <div
        ref={announcementRef}
        aria-live="assertive"
        role="status"
        className="sr-only"
      />
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
