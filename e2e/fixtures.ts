import { test as base, expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import { login } from './helpers/login';

type AuthFixtures = {
  loggedInPage: Page;
};

export const test = base.extend<AuthFixtures>({
  loggedInPage: async ({ page }, use) => {
    await login(page);
    await use(page);
  },
});

export { expect };
