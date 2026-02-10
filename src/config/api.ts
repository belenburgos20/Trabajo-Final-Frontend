/**
 * URL base del backend.
 * En producción: definir VITE_API_URL (ej. en .env o en la plataforma de deploy).
 * En local sin variable: usa http://localhost:3000.
 */
export const API_BASE_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'http://localhost:3000';
