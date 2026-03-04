export function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^|;\\s*)' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[2]) : null;
}

async function ensureCsrf() {
  const has = getCookie('XSRF-TOKEN');
  if (!has) {
    await fetch('/', { credentials: 'include' });
  }
}

export async function apiGet(path) {
  await ensureCsrf();
  const res = await fetch(path, { credentials: 'include' });
  if (!res.ok) throw new Error(`GET ${path} failed`);
  return res.json();
}

export async function apiSend(method, path, body) {
  await ensureCsrf();
  const token = getCookie('XSRF-TOKEN');
  const res = await fetch(path, {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': token || '',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `${method} ${path} failed`);
  }
  return res.json().catch(() => ({}));
}

export const api = {
  get: apiGet,
  post: (p, b) => apiSend('POST', p, b),
  put: (p, b) => apiSend('PUT', p, b),
  del: (p) => apiSend('DELETE', p),
  checkAuth: async () => {
    try {
      // Endpoint /api/user (provided by Laravel Sanctum by default usually, or we can use a custom one)
      // Since no dedicated user endpoint, we can rely on reading a specific cookie or catching 401 on protected routes
      const token = getCookie('XSRF-TOKEN')
      return !!token;
    } catch {
      return false;
    }
  }
};
