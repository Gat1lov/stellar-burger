import { defineConfig } from "cypress";

export default defineConfig({
  projectId: '9dnfht',
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: 'http://localhost:4000',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});
