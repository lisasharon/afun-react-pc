import { test, expect } from './fixtures';

test('登录后进入已认证的娱乐城首页', async ({ loggedInPage }) => {
  await expect(loggedInPage).toHaveURL(/\/zh\/casino\/?$/);
  await expect(loggedInPage.getByRole('button', { name: '存款' }).first()).toBeVisible();
  await expect(loggedInPage.getByText('个人资料', { exact: true }).first()).toBeVisible();
});
