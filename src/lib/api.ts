const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8787/api';

export async function api(path: string, opts: RequestInit = {}) {
  const res = await fetch(`${BASE}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
    ...opts,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export const Auth = {
  me: () => api('/user/me'),
  register: (email: string, password: string) => api('/auth/register', { method: 'POST', body: JSON.stringify({ email, password }) }),
  login: (email: string, password: string) => api('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  logout: () => api('/auth/logout', { method: 'POST' }),
};

export const Watchlists = {
  list: () => api('/watchlists'),
  create: (name: string, symbols: string[]) => api('/watchlists', { method: 'POST', body: JSON.stringify({ name, symbols }) }),
  remove: (id: string) => api(`/watchlists/${id}`, { method: 'DELETE' }),
};

export const Backtests = {
  list: () => api('/backtests'),
  create: (payload: any) => api('/backtests', { method: 'POST', body: JSON.stringify(payload) }),
};
