export interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';
const DEFAULT_REQUEST_ERROR = 'Request failed.';
const DEFAULT_RESPONSE_ERROR = 'Invalid server response.';

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const readErrorMessage = (payload: unknown, fallback: string) => {
  if (isObject(payload) && typeof payload.message === 'string' && payload.message.trim()) {
    return payload.message;
  }

  return fallback;
};

export async function requestJson<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  if (init.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers,
    credentials: 'include',
  });

  const payload = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(readErrorMessage(payload, DEFAULT_REQUEST_ERROR));
  }

  if (!isObject(payload)) {
    throw new Error(DEFAULT_RESPONSE_ERROR);
  }

  const envelope = payload as unknown as ApiEnvelope<T>;
  if (!envelope.success) {
    throw new Error(readErrorMessage(payload, DEFAULT_REQUEST_ERROR));
  }

  return envelope.data;
}
