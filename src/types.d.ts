declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

interface ImportMeta {
  env: {
    SSR: boolean;
    NODE_ENV: 'production' | 'development';
  };
}
