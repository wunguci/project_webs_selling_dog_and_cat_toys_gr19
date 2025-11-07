import { defineConfig, devices } from '@playwright/test';

/** @see https://playwright.dev/docs/test-configuration */
export default defineConfig({
  testDir: "./tests",
  timeout: 30 * 1000,
  expect: { timeout: 5000 },

  // Chạy song song
  fullyParallel: true,
  forbidOnly: false,
  retries: 0,
  workers: undefined,

  reporter: "html",

  use: {
    // Base URL cho page.goto('/path')
    baseURL: "http://127.0.0.1:5173",
    trace: "on-first-retry",
    // Video recording
    video: "on",
    screenshot: "only-on-failure"
  },

  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],

  // TỰ BẬT DEV SERVER React trước khi chạy test
  webServer: {
    command: "npm run dev",
    url: "http://127.0.0.1:5173",
    // eslint-disable-next-line no-undef
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
