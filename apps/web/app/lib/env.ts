export function getApiUrl(): string {
  return import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api';
}

export function useLiveApi(): boolean {
  return import.meta.env.VITE_USE_API === 'true';
}
