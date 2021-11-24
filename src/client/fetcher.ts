import * as Undici from 'undici';

export const fetcher = async (
  request: RequestInfo & Undici.RequestInfo,
  options?: RequestInit & Undici.RequestInit
): Promise<Response | Undici.Response> => {
  if (import.meta.env.SSR) {
    const undici = await import('undici');
    return undici.fetch(request, options);
  }

  return fetch(request, options);
};
