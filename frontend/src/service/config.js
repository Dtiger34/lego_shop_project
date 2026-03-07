// API Configuration
// Auto-detect: localhost for dev, Azure for production
const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

export const API_BASE_URL = isLocalhost
  ? "http://localhost:8080/api/v1"
  : "https://viettich.store/api/v1";
