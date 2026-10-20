import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

// betmaxpc.a79163.com currently answers 502. The same SPA is served at a79163.com;
// its brand config lists betmaxpc as the intended H5 host.
const baseURL = process.env.E2E_BASE_URL || 'https://a79163.com';

export default defineConfig({
  testDir: './e2e',
  timeout: 90_000,
  expect: { timeout: 20_000 },
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: 'list',
  use: {
    baseURL,
    locale: 'zh-CN',
    viewport: { width: 1440, height: 900 },
    trace: 'off',
    screenshot: 'off',
    video: 'off',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
