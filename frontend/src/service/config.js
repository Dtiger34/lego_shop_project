// API Configuration
// Auto-detect: localhost for dev, Azure for production
const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

const DEFAULT_API_URL = isLocalhost
  ? "http://localhost:5000/api/v1"
  : "https://viettich.store/api/v1";

export const API_BASE_URL = import.meta.env.VITE_API_URL || DEFAULT_API_URL;

// Base URL for static files (uploads)
const DEFAULT_BASE_URL = isLocalhost
  ? "http://localhost:5000"
  : "https://viettich.store";

export const BASE_URL =
  import.meta.env.VITE_BASE_URL ||
  API_BASE_URL.replace(/\/api\/v1\/?$/, "") ||
  DEFAULT_BASE_URL;
