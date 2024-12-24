import { SWRConfig } from 'swr';

import { App } from './App';

export const AppWithSharedProviders = () => (
  <>
    <SWRConfig
      value={{
        fetcher: (resource: string | URL, init: RequestInit) => {
          let url = resource;
          if (import.meta.env.SSR) {
            url = new URL(resource, 'http://localhost:3000');
          }
          return fetch(url, init).then((response) => response.json());
        },
      }}
    >
      <App />
    </SWRConfig>
  </>
);
