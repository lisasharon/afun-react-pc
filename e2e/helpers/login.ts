import type { Page } from '@playwright/test';

function requiredEnv(name: 'E2E_USER' | 'E2E_PASSWORD'): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name}. Copy .env.example to .env and fill it in.`);
  }
  return value;
}

export async function login(page: Page): Promise<void> {
  const username = requiredEnv('E2E_USER');
  const password = requiredEnv('E2E_PASSWORD');

  await page.goto('/');

  const loginDialog = page.locator('.dialog2-background').filter({
    has: page.getByPlaceholder('用户名/邮箱登入'),
  });

  if (!(await loginDialog.isVisible().catch(() => false))) {
    await page.getByRole('button', { name: '登录', exact: true }).first().click();
  }

  await loginDialog.waitFor({ state: 'visible' });
  await loginDialog.getByPlaceholder('用户名/邮箱登入').fill(username);
  await loginDialog.getByPlaceholder('登录密码').fill(password);
  await loginDialog.locator('button.default.secondary').click();
  await loginDialog.waitFor({ state: 'hidden' });
  await page.getByText('个人资料', { exact: true }).first().waitFor();
}
