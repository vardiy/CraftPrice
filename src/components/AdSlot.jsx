import { useEffect, useRef } from "react";

export default function AdSlot({ slot, format = "auto", className = "" }) {
  const adRef = useRef(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      if (window.adsbygoogle && adRef.current) {
        window.adsbygoogle.push({});
        pushed.current = true;
      }
    } catch { /* AdSense not loaded — graceful fallback */ }
  }, []);

  return (
    <aside
      aria-label="Advertisement"
      className={`flex min-h-[100px] items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-100 ${className}`}
    >
      <ins
        ref={adRef}
        className="adsbygoogle block"
        style={{ display: "block", minHeight: 100 }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
      {/* Skeleton placeholder shown until AdSense loads — prevents CLS */}
      <noscript>
        <div className="flex h-[100px] w-full items-center justify-center text-sm text-slate-400">
          Ad
        </div>
      </noscript>
    </aside>
  );
}
