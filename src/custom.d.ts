declare module '*.svg' {
  const content: string;
  export default content;
}

interface ImportMeta {
  env: {
    SSR: boolean;
  };
}
