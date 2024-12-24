// server
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: string;
    readonly SSR: boolean;
    readonly PORT: string;
  }
}

declare module 'http' {
  interface ServerResponse {
    scriptNonce: string;
  }
}
