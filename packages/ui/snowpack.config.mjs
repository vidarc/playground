export default {
  plugins: [
    [
      '@snowpack/plugin-babel',
      {
        input: ['.tsx'],
        transformOptions: {
          plugins: ['@compiled/babel-plugin'],
        },
      },
    ],
  ],
};
