export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  actions: {argTypesRegex: '^on[A-Z].*'},
};
