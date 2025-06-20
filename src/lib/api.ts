const baseURL = `${process.env.NEXT_PUBLIC_BASE_URL}/api`;

export async function api<T = any>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${baseURL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.message || res.statusText);
  }

  return res.json() as Promise<T>;
}
