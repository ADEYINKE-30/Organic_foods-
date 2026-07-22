import axios from 'axios';
import { getApiUrl } from '~/lib/env';

export const apiClient = axios.create({
  baseURL: getApiUrl(),
  headers: { 'Content-Type': 'application/json' },
  timeout: 10_000,
});

apiClient.interceptors.request.use((config) => {
  if (typeof window === 'undefined') return config;

  try {
    const raw = localStorage.getItem('freshmart-auth');
    if (!raw) return config;
    const parsed = JSON.parse(raw) as { state?: { accessToken?: string | null } };
    const token = parsed.state?.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    // ignore malformed auth storage
  }

  return config;
});

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string } | undefined;
    return data?.message ?? error.message;
  }
  if (error instanceof Error) return error.message;
  return 'Something went wrong';
}
