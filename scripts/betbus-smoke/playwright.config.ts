import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

const root = path.resolve(__dirname, '../..');
dotenv.config({ path: path.join(root, '.env.local') });
dotenv.config({ path: path.join(root, '.env') });

const headed = process.env.BETBUS_HEADED === '1' || process.env.HEADED === '1';
const slowMo = Number(process.env.BETBUS_SLOW_MO || 0) || undefined;
const useChrome = process.env.BETBUS_CHANNEL === 'chrome' || headed;

export default defineConfig({
  testDir: __dirname,
  testMatch: /.*\.spec\.ts/,
  timeout: 3 * 60_000,
  expect: { timeout: 20_000 },
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [['list'], ['json', { outputFile: path.join(root, 'test-results/betbus-smoke-report.json') }]],
  outputDir: path.join(root, 'test-results/betbus-smoke'),
  use: {
    baseURL: process.env.BETBUS_BASE_URL || 'https://betbus-web.71j6cw89o01y.com',
    locale: 'zh-CN',
    viewport: { width: 1440, height: 900 },
    actionTimeout: 20_000,
    navigationTimeout: 60_000,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'off',
    headless: !headed,
    launchOptions: {
      slowMo,
      args: ['--disable-blink-features=AutomationControlled', '--no-sandbox'],
    },
    storageState: process.env.BETBUS_STORAGE_STATE || undefined,
    userAgent:
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  },
  projects: [
    {
      name: 'betbus-chromium',
      use: {
        ...devices['Desktop Chrome'],
        ...(useChrome ? { channel: 'chrome' as const } : {}),
      },
    },
  ],
});
