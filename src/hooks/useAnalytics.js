import { useCallback } from "react";
import ReactGA from "react-ga4";

const GA_ID = "G-7409PQ6GLE";
const CONSENT_KEY = "mm_analytics_consent";

// --- Consent Mode v2 helpers -------------------------------------------

function getConsent() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(CONSENT_KEY); // "granted" | "denied" | null
}

function pushConsent(value) {
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: value,
    });
  }
}

// Regions that require opt-in consent (EEA + UK + Switzerland). Google
// resolves the visitor's region by IP and the most specific default wins.
const CONSENT_REGIONS = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR",
  "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK",
  "SI", "ES", "SE", "IS", "LI", "NO", "GB", "CH",
];

// Set default consent before GA loads: denied in consent regions, granted elsewhere
if (typeof window !== "undefined" && typeof window.gtag !== "function") {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag("consent", "default", {
    analytics_storage: "denied",
    region: CONSENT_REGIONS,
  });
  window.gtag("consent", "default", {
    analytics_storage: "granted",
  });
}

// The banner can't see the IP-based region, so approximate it with the
// browser time zone. Errs toward showing it (e.g. all of Europe/*).
const CONSENT_TIMEZONE_PREFIXES = [
  "Europe/",
  "Atlantic/Canary",
  "Atlantic/Madeira",
  "Atlantic/Azores",
  "Atlantic/Reykjavik",
  "Atlantic/Faroe",
  "Arctic/Longyearbyen",
];

function inConsentRegion() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    return CONSENT_TIMEZONE_PREFIXES.some((p) => tz.startsWith(p));
  } catch {
    return true;
  }
}

// --- Initialization ----------------------------------------------------

let initialized = false;

export function initAnalytics() {
  if (initialized) return;
  initialized = true;

  ReactGA.initialize(GA_ID, {
    gaOptions: { send_page_view: false },
  });

  // If user previously granted consent, update consent state
  if (getConsent() === "granted") {
    pushConsent("granted");
  }
}

// --- Consent actions ---------------------------------------------------

export function acceptConsent() {
  if (typeof window === "undefined") return;
  localStorage.setItem(CONSENT_KEY, "granted");
  pushConsent("granted");
}

export function declineConsent() {
  if (typeof window === "undefined") return;
  localStorage.setItem(CONSENT_KEY, "denied");
  pushConsent("denied");
}

export function hasRespondedToConsent() {
  return getConsent() !== null;
}

export function shouldShowConsentBanner() {
  return inConsentRegion() && !hasRespondedToConsent();
}

// --- Page tracking -----------------------------------------------------

export function trackPageView(path) {
  ReactGA.send({ hitType: "pageview", page: path });
}

// --- Hook --------------------------------------------------------------

export function useAnalytics() {
  const trackEvent = useCallback((action, params) => {
    ReactGA.event(action, params);
  }, []);

  return { trackEvent };
}
