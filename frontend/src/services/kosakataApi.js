const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';
const KOSAKATA_URL = `${API_URL}/kosakata`;

async function request(path = '', options = {}) {
  let response;
  try {
    response = await fetch(`${KOSAKATA_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
  } catch {
    throw new Error('Tidak dapat terhubung ke server. Pastikan backend sudah berjalan.');
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const pesan = Array.isArray(data?.message)
      ? data.message.join(', ')
      : data?.message;
    throw new Error(pesan ?? `Permintaan gagal (${response.status})`);
  }

  return data;
}

export const kosakataApi = {
  getAll: () => request(),
  create: (kosakata) =>
    request('', { method: 'POST', body: JSON.stringify(kosakata) }),
  update: (id, perubahan) =>
    request(`/${id}`, { method: 'PATCH', body: JSON.stringify(perubahan) }),
  remove: (id) => request(`/${id}`, { method: 'DELETE' }),
};