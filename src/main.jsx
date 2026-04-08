import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { SettingsProvider } from "./context/SettingsContext";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <SettingsProvider>
          <App />
        </SettingsProvider>
      </HelmetProvider>
    </BrowserRouter>
  </StrictMode>
);
