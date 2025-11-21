import productosMock from '../mocks/productos.json';
import presupuestosMock from '../mocks/presupuestos.json';
import clientesMock from '../mocks/clientes.json';

const API_URL: string = (import.meta as any).env?.VITE_API_URL ?? 'http://localhost:3000/api';

type FetchInit = RequestInit;

function buildUrl(endpoint: string) {
  const base = API_URL.replace(/\/$/, '');
  const path = endpoint.replace(/^\//, '');
  return `${base}/${path}`;
}

export async function apiGet<T>(endpoint: string, init?: FetchInit): Promise<T> {
  const url = buildUrl(endpoint);
  try {
    const res = await fetch(url, { ...init, method: 'GET' });
    if (!res.ok) throw new Error(`GET ${endpoint} failed: ${res.status}`);
    return (await res.json()) as T;
  } catch (error) {
    const mock = fallbackMock<T>(endpoint);
    if (mock !== undefined) return mock;
    throw error;
  }
}

export async function apiPost<T, B = unknown>(
  endpoint: string,
  body: B,
  init?: FetchInit
): Promise<T> {
  const url = buildUrl(endpoint);
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    body: JSON.stringify(body),
    ...init,
  });
  if (!res.ok) throw new Error(`POST ${endpoint} failed: ${res.status}`);
  return (await res.json()) as T;
}

function fallbackMock<T>(endpoint: string): T | undefined {
  const key = endpoint.replace(/^\//, '').split('?')[0];
  if (key.startsWith('productos')) return productosMock as unknown as T;
  if (key.startsWith('presupuestos')) return presupuestosMock as unknown as T;
  if (key.startsWith('clientes')) return clientesMock as unknown as T;
  return undefined;
}
