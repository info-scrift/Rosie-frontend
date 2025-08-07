export function getApiUrl(): string {
  return import.meta.env.VITE_ENV_MODE === "development"
    ? import.meta.env.VITE_DEV_API_URL
    : import.meta.env.VITE_PROD_API_URL;
}