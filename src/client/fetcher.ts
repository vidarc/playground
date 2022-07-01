import type * as Undici from 'undici';

export default async function fetcher<JSON = unknown>(
  request: RequestInfo & Undici.RequestInfo,
  options?: RequestInit & Undici.RequestInit
): Promise<JSON> {
  if (import.meta.env.SSR) {
    const undici = await import('undici');
    const url = new URL(request.toString(), 'http://localhost:3000');
    const response = await undici.fetch(url, options);
    const data = await response.json();
    // @ts-expect-error this is fine
    return data;
  }

  const response = await fetch(request, options);
  const data = await response.json();
  return data;
}
