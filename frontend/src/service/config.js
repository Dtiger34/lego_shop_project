// API Configuration
// Auto-detect: localhost for dev, Azure for production
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

export const API_BASE_URL = isLocalhost 
  ? 'http://localhost:5000/api/v1'
  : 'https://legoshop-hnc3bfebeza6ejak.southeastasia-01.azurewebsites.net/api/v1';

// Base URL for static files (images, uploads)
export const STATIC_BASE_URL = isLocalhost
  ? 'http://localhost:5000'
  : 'https://legoshop-hnc3bfebeza6ejak.southeastasia-01.azurewebsites.net';