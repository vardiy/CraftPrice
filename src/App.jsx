import { useState, useEffect } from "react";
import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import { Scissors, Settings } from "lucide-react";
import SettingsModal from "./components/SettingsModal";
import ConsentBanner from "./components/ConsentBanner";
import LandingPage from "./pages/LandingPage";
import NicheCalculatorPage from "./pages/NicheCalculatorPage";
import { useSettings } from "./context/SettingsContext";
import { initAnalytics, trackPageView } from "./hooks/useAnalytics";

// Initialize GA4 on app load (consent defaults to denied)
initAnalytics();

function PageTracker() {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);
  return null;
}

function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { currency } = useSettings();

  return (
    <div className="min-h-screen bg-slate-50">
      <PageTracker />

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-4">
          <Link to="/" className="flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white" aria-hidden="true">
              <Scissors className="h-5 w-5" />
            </span>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              MakerMargins
            </span>
          </Link>

          <div className="ml-auto flex items-center gap-2">
            <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
              {currency.symbol} {currency.code}
            </span>
            <button
              type="button"
              onClick={() => setSettingsOpen(true)}
              aria-label="Open settings"
              className="flex h-[44px] w-[44px] items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <Settings className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/calc/:niche" element={<NicheCalculatorPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="border-t border-slate-200 bg-white py-4 text-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} MakerMargins. Built for makers.</p>
      </footer>

      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <ConsentBanner />
    </div>
  );
}

export default App;
