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

// Set default consent to denied before GA loads
if (typeof window !== "undefined" && typeof window.gtag !== "function") {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag("consent", "default", {
    analytics_storage: "denied",
  });
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
