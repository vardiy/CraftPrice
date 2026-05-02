import { useEffect, useState } from "react";
import { acceptConsent, declineConsent, hasRespondedToConsent } from "../hooks/useAnalytics";

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!hasRespondedToConsent()) setVisible(true);
  }, []);

  if (!visible) return null;

  const handle = (accept) => {
    if (accept) {
      acceptConsent();
    } else {
      declineConsent();
    }
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-slate-900 px-4 py-4 shadow-lg"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-sm text-slate-200">
          We use cookies to understand how you use MakerMargins and improve your experience.
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => handle(false)}
            className="min-h-[44px] rounded-lg border border-slate-500 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => handle(true)}
            className="min-h-[44px] rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
