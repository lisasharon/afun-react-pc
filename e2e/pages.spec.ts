import fs from 'node:fs';
import path from 'node:path';
import type { Page } from '@playwright/test';
import { test as base, expect } from '@playwright/test';
import { test as authTest } from './fixtures';

const PAGE_DIR =
  '/cursor/stores/bc-337dae18-fc2a-4b82-a1aa-dd21a18d4256/media/pages';

function shotDir(): string | undefined {
  const fromEnv = process.env.E2E_PAGE_SHOT_DIR;
  if (fromEnv) return fromEnv;
  const storeRoot = path.dirname(path.dirname(PAGE_DIR));
  if (fs.existsSync(storeRoot)) return PAGE_DIR;
  return undefined;
}

async function concealPromo(page: Page) {
  await page.evaluate(() => {
    const style = document.getElementById('e2e-hide-promo') || document.createElement('style');
    style.id = 'e2e-hide-promo';
    style.textContent =
      '.dialog2-background--flip-card,.flip-card-home-popup,.tg-base-dialog.no-padding,.tg-notification-list{display:none!important;pointer-events:none!important;}';
    document.head.appendChild(style);
  });
}

async function shot(page: Page, file: string) {
  const dir = shotDir();
  if (!dir) return;
  fs.mkdirSync(dir, { recursive: true });
  await concealPromo(page);
  await page.evaluate((account) => {
    if (!account) return;
    const walk = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE && node.nodeValue?.includes(account)) {
        node.nodeValue = node.nodeValue.split(account).join('****');
      }
      node.childNodes.forEach(walk);
    };
    walk(document.body);
  }, process.env.E2E_USER ?? '');
  await page.screenshot({ path: path.join(dir, file) });
}

base('登录框在提交前可见', async ({ page }) => {
  await page.goto('/');
  const dialog = page.locator('.dialog2-background').filter({
    has: page.getByPlaceholder('用户名/邮箱登入'),
  });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByPlaceholder('用户名/邮箱登入')).toBeVisible();
  await expect(dialog.getByPlaceholder('登录密码')).toBeVisible();
  await expect(dialog.locator('button.default.secondary')).toBeVisible();
  await shot(page, 'login.png');
});

async function dismissLoginDialog(page: Page) {
  const dialog = page.locator('.dialog2-background').filter({
    has: page.getByPlaceholder('用户名/邮箱登入'),
  });
  if (!(await dialog.isVisible().catch(() => false))) return;
  await dialog.evaluate((root) => {
    const box = root.getBoundingClientRect();
    const closer = [...root.querySelectorAll('button')]
      .map((button) => ({ button, rect: button.getBoundingClientRect() }))
      .filter((item) => item.rect.width > 0 && item.rect.top < box.top + 80 && item.rect.left > box.left + box.width * 0.55)
      .sort((a, b) => a.rect.top - b.rect.top)[0];
    closer?.button.click();
  });
  await expect(dialog).toBeHidden();
}

authTest('只读打开首页、体育、个人中心、投注、优惠、奖金、充值和提现', async ({ loggedInPage: page }) => {
  authTest.setTimeout(180_000);

  await dismissLoginDialog(page);
  await expect(page).toHaveURL(/\/zh\/casino\/?$/);
  await expect(page.getByText('热门游戏').first()).toBeVisible();
  await expect(page.getByText('个人资料', { exact: true }).first()).toBeVisible();
  await expect(page.getByPlaceholder('用户名/邮箱登入')).toBeHidden();
  await shot(page, 'home.png');

  await page.goto('/zh/sports/402');
  await expect(page).toHaveURL(/\/zh\/sports\/402/);
  const board = page.locator('#TgMainContent');
  const odds = board.getByText(/over\s*\d/).first();
  await expect(board.getByText('热门赛事').first()).toBeVisible({ timeout: 30_000 });
  await expect(odds).toBeVisible();
  await odds.scrollIntoViewIfNeeded();
  await shot(page, 'sports.png');

  await page.goto('/zh/settings');
  await expect(page).toHaveURL(/\/zh\/settings/);
  await expect(page.getByText('联系方式').first()).toBeVisible();
  await expect(page.getByText('登录日志').first()).toBeVisible();
  await shot(page, 'profile.png');

  await page.goto('/zh/casino');
  await concealPromo(page);
  await page.locator('.big-side').getByText('我的投注', { exact: true }).first().click();
  await expect(page).toHaveURL(/my-bets/);
  await expect(page.getByText('我的投注').first()).toBeVisible();
  await expect(page.getByText(/暂无|今日/).first()).toBeVisible();
  await shot(page, 'bets.png');

  await page.goto('/zh/promotion');
  await expect(page).toHaveURL(/\/zh\/promotion\/?$/);
  await expect(page.getByText('活动', { exact: true }).first()).toBeVisible({ timeout: 30_000 });
  await shot(page, 'promos.png');

  await page.goto('/zh/vip');
  await expect(page).toHaveURL(/\/zh\/vip\/?$/);
  await expect(page.getByText(/VIP福利|VIP\d/).first()).toBeVisible({ timeout: 30_000 });
  await shot(page, 'bonus.png');

  await page.goto('/zh/casino');
  await concealPromo(page);
  await page.locator('button.wallet-right-btn').click();
  const wallet = page.locator('.tg-base-dialog').last();
  await expect(wallet.getByText('在线支付').or(wallet.getByText('加密货币')).first()).toBeVisible();
  await shot(page, 'deposit.png');

  await page.goto('/zh/casino');
  await concealPromo(page);
  await page.locator('button.wallet-right-btn').click();
  const walletAgain = page.locator('.tg-base-dialog').last();
  await walletAgain.getByText('提款', { exact: true }).first().click();
  await expect(walletAgain.getByText(/资金密码|提款金额|可提/).first()).toBeVisible();
  await shot(page, 'withdraw.png');
});
