import fs from 'node:fs';
import path from 'node:path';
import type { Page } from '@playwright/test';
import { test, expect } from './fixtures';

const CLOUD_SHOT_DIR =
  '/cursor/stores/bc-337dae18-fc2a-4b82-a1aa-dd21a18d4256/media/transactions';

const tabs = [
  { name: '存款', url: /\/zh\/transactions\/deposits\/?$/, file: 'deposit.png' },
  { name: '提款', url: /\/zh\/transactions\/withdrawals\/?$/, file: 'withdraw.png' },
  { name: '其他', url: /\/zh\/transactions\/other\/?$/, file: 'other.png' },
] as const;

function shotDir(): string | undefined {
  const fromEnv = process.env.E2E_TX_SHOT_DIR;
  if (fromEnv) return fromEnv;
  const storeRoot = path.dirname(path.dirname(CLOUD_SHOT_DIR));
  if (fs.existsSync(storeRoot)) return CLOUD_SHOT_DIR;
  return undefined;
}

async function clearChrome(page: Page) {
  await page.evaluate((account) => {
    document
      .querySelectorAll(
        '.dialog2-background--flip-card, .flip-card-home-popup, .tg-notification-list',
      )
      .forEach((el) => el.remove());
    if (!account) return;
    const walk = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE && node.nodeValue?.includes(account)) {
        node.nodeValue = node.nodeValue.split(account).join('****');
      }
      node.childNodes.forEach(walk);
    };
    walk(document.body);
    document.querySelectorAll('input').forEach((el) => {
      if (el instanceof HTMLInputElement && el.value.includes(account)) {
        el.value = el.value.split(account).join('****');
      }
    });
  }, process.env.E2E_USER ?? '');
}

test('交易记录三个页签只读切换', async ({ loggedInPage: page }) => {
  const dir = shotDir();
  if (dir) fs.mkdirSync(dir, { recursive: true });

  await page.goto('/zh/transactions');
  await expect(page.getByText('交易记录', { exact: true }).first()).toBeVisible();
  await clearChrome(page);

  const main = page.locator('#TgMainContent');

  for (const tab of tabs) {
    await page.locator('a.link').filter({ hasText: new RegExp(`^${tab.name}$`) }).click();
    await expect(page).toHaveURL(tab.url);
    await expect(
      page.locator('a.link.active').filter({ hasText: new RegExp(`^${tab.name}$`) }),
    ).toBeVisible();

    const empty = main.getByText(/暂无/);
    const list = main.getByText('上一页');
    await expect(empty.or(list).first()).toBeVisible();

    if (dir) {
      await clearChrome(page);
      await page.screenshot({ path: path.join(dir, tab.file) });
    }
  }
});
