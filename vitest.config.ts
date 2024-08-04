import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    browser: {
      enabled: true,
      name: "chrome",
      headless: true,
      provider: "webdriverio",
    },
    coverage: {
      provider: "istanbul",
      reporter: ["text", "html", "json", "lcov"],
      include: ["src/**/*"],
    },
  },
});
