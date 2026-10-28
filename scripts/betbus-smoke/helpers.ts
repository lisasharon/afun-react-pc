import type { Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export type TipOnOddsChange = 'yes' | 'no' | 'unknown';

export interface SmokeSummary {
  loginOk: boolean;
  /** Credentials were entered and login was submitted (may still hit GeeTest). */
  loginFormSubmitted: boolean;
  sportsPageOk: boolean;
  oddsChangeObserved: boolean;
  tipOnOddsChange: TipOnOddsChange;
  captchaEncountered: boolean;
  failures: string[];
  notes: string[];
  screenshotPaths: string[];
}

export function requiredEnv(name: 'BETBUS_EMAIL' | 'BETBUS_PASSWORD'): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(
      `Missing ${name}. Copy .env.example to .env.local (gitignored) or export the variable. Never commit real credentials.`,
    );
  }
  return value;
}

export function createSummary(): SmokeSummary {
  return {
    loginOk: false,
    loginFormSubmitted: false,
    sportsPageOk: false,
    oddsChangeObserved: false,
    tipOnOddsChange: 'unknown',
    captchaEncountered: false,
    failures: [],
    notes: [],
    screenshotPaths: [],
  };
}

export function printSummary(summary: SmokeSummary): void {
  const json = {
    login_ok: summary.loginOk,
    login_form_submitted: summary.loginFormSubmitted,
    sports_page_ok: summary.sportsPageOk,
    odds_change_observed: summary.oddsChangeObserved,
    tip_on_odds_change: summary.tipOnOddsChange,
    captcha_encountered: summary.captchaEncountered,
    failures: summary.failures,
    notes: summary.notes,
    screenshots: summary.screenshotPaths,
  };
  console.log('\n===== BETBUS SMOKE SUMMARY =====');
  console.log(JSON.stringify(json, null, 2));
  console.log('===== END SUMMARY =====\n');
}

export async function screenshotFailure(
  page: Page,
  summary: SmokeSummary,
  label: string,
): Promise<void> {
  const dir = path.resolve(__dirname, '../../test-results/betbus-smoke');
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `${label}-${Date.now()}.png`);
  try {
    await page.screenshot({ path: file, fullPage: true });
    summary.screenshotPaths.push(file);
  } catch (err) {
    summary.notes.push(`screenshot failed for ${label}: ${String(err)}`);
  }
}

/** Open the login dialog from the sports shell (more reliable than /auth/login redirect). */
export async function openLoginUi(page: Page): Promise<void> {
  const dialog = page.locator('[class*="loginDialog"]').filter({
    has: page.getByLabel('电子邮箱 / 手机号码'),
  });
  if (await dialog.isVisible().catch(() => false)) return;

  await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 60_000 });
  await page.waitForTimeout(1500);
  await dismissBlockingUi(page);

  const headerLogin = page.locator('button[class*="_login_"]').filter({ hasText: /^登录$/ }).first();
  if (await headerLogin.isVisible().catch(() => false)) {
    await headerLogin.click({ timeout: 15_000 });
  } else {
    // Center CTA on gated home, or navigate to dedicated auth route.
    const centerLogin = page.getByRole('button', { name: '登录', exact: true }).last();
    if (await centerLogin.isVisible().catch(() => false)) {
      await centerLogin.click({ timeout: 15_000 });
    } else {
      await page.goto('/auth/login', { waitUntil: 'domcontentloaded' });
    }
  }

  await dialog.waitFor({ state: 'visible', timeout: 30_000 });
}

/** Password field is readonly until focused — anti-autofill quirk. */
export async function fillLoginForm(page: Page, email: string, password: string): Promise<void> {
  await openLoginUi(page);
  const dialog = page.locator('[class*="loginDialog"]').filter({
    has: page.getByLabel('电子邮箱 / 手机号码'),
  });
  // Avoid getByLabel('密码') — eye toggle button shares the same aria-label.
  const identity = dialog.locator('input[name="identity"]');
  const pass = dialog.locator('input[name="password"][type="password"]');

  await identity.click({ force: true });
  await identity.fill(email);

  await pass.click({ force: true });
  await pass.evaluate((el: HTMLInputElement) => {
    el.removeAttribute('readonly');
    el.readOnly = false;
  });
  try {
    await pass.fill(password, { force: true, timeout: 10_000 });
  } catch {
    await pass.evaluate((el: HTMLInputElement, value: string) => {
      el.focus();
      el.value = value;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    }, password);
  }
}

export async function submitLogin(page: Page): Promise<void> {
  // Live UI: submit label is often "登录\n最高 $100" (reward badge), type=submit.
  const dialog = page.locator('[class*="loginDialog"]').filter({
    has: page.locator('input[name="identity"]'),
  });
  const pass = dialog.locator('input[name="password"][type="password"]');
  if (await pass.isVisible().catch(() => false)) {
    await pass.press('Enter').catch(() => undefined);
    await page.waitForTimeout(800);
    if (await isGeeTestVisible(page)) return;
    if (!(await dialog.isVisible().catch(() => false))) return;
  }

  const dialogSubmit = dialog.locator('button[type="submit"], button[class*="_submit_"]').first();
  await dialogSubmit.click({ force: true, timeout: 15_000 });
}

export async function isGeeTestVisible(page: Page): Promise<boolean> {
  return (await page.locator('[class*="geetest_captcha"], [class*="geetest_box"]').count()) > 0;
}

export async function waitForLoginSuccess(page: Page, timeoutMs: number): Promise<{
  ok: boolean;
  captcha: boolean;
  reason?: string;
}> {
  const deadline = Date.now() + timeoutMs;
  let sawCaptcha = false;

  while (Date.now() < deadline) {
    if (await isGeeTestVisible(page)) {
      sawCaptcha = true;
    }

    const loggedIn = await page.evaluate(() => {
      const body = document.body?.innerText || '';
      const headerLogin = [...document.querySelectorAll('button')].some(
        (b) => b.innerText.trim() === '登录' && !b.closest('[class*="loginDialog"]'),
      );
      const headerJoin = [...document.querySelectorAll('button')].some((b) =>
        /立即注册/.test(b.innerText),
      );
      const loginDialog = !!document.querySelector('[class*="loginDialog"]');
      const hasAccountUi =
        /我的账户|钱包|余额|退出|Deposit|Withdraw|个人/i.test(body) && !headerLogin;
      return {
        onLoginRoute: location.pathname.includes('/auth/login'),
        headerLogin,
        headerJoin,
        loginDialog,
        hasAccountUi,
      };
    });

    const captchaGone = !(await isGeeTestVisible(page));
    if (
      (!loggedIn.onLoginRoute && !loggedIn.loginDialog && (!loggedIn.headerLogin || loggedIn.hasAccountUi)) ||
      (captchaGone && !loggedIn.loginDialog && !loggedIn.headerLogin)
    ) {
      return { ok: true, captcha: sawCaptcha };
    }

    // Explicit success: left /auth/login and register CTA gone
    if (!loggedIn.onLoginRoute && !loggedIn.headerJoin && !loggedIn.headerLogin) {
      return { ok: true, captcha: sawCaptcha };
    }

    await page.waitForTimeout(1000);
  }

  return {
    ok: false,
    captcha: sawCaptcha,
    reason: sawCaptcha
      ? 'GeeTest captcha still present / login not completed within timeout'
      : 'Login did not complete within timeout',
  };
}

export async function dismissBlockingUi(page: Page): Promise<void> {
  // Close GeeTest if present so it does not intercept later navigation clicks.
  const geeClose = page.locator('[class*="geetest_close"]').first();
  if (await geeClose.isVisible().catch(() => false)) {
    await geeClose.click({ force: true }).catch(() => undefined);
    await page.waitForTimeout(500);
  }
  await page.keyboard.press('Escape').catch(() => undefined);
  const retry = page.locator('button.browser-fallback__retry');
  if (await retry.isVisible().catch(() => false)) {
    await retry.click().catch(() => undefined);
    await page.waitForTimeout(1500);
  }
  for (const sel of [
    '[aria-label="关闭"]',
    '[aria-label="Close"]',
    'button:has-text("关闭")',
    '[class*="loginDialog"] button[class*="_close_"]',
  ]) {
    const btn = page.locator(sel).first();
    if (await btn.isVisible().catch(() => false)) {
      await btn.click({ force: true }).catch(() => undefined);
    }
  }
}

export async function gotoSports(page: Page): Promise<void> {
  // Prefer direct navigation — overlays (GeeTest) often intercept nav link clicks.
  await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 60_000 });
  await page.waitForTimeout(2000);
  await dismissBlockingUi(page);
}

export async function assertSportsHealthy(page: Page): Promise<{ ok: boolean; detail: string }> {
  // Soccer / upcoming usually render event lists; home may gate odds behind login.
  const candidates = ['/soccer', '/upcoming', '/'];
  let lastDetail = '';
  for (const path of candidates) {
    await page.goto(path, { waitUntil: 'domcontentloaded', timeout: 60_000 });
    await page.waitForTimeout(3000);
    await dismissBlockingUi(page);

    const result = await page.evaluate(() => {
      const text = document.body?.innerText || '';
      const blank = text.trim().length < 80;
      const hasNav = [...document.querySelectorAll('a')].some((a) => /体育|滚球|即将/.test(a.innerText));
      const loginGate = /登录后查看体育赛事与滚球赔率/.test(text);
      const hasEvents =
        (!loginGate &&
          (/焦点赛事|近期赛事|即将开始|Premier|比赛|全场赛果|Coppa|LaLiga/i.test(text) ||
            document.querySelectorAll('[data-sport-odds="true"]').length > 0)) ||
        document.querySelectorAll('[data-sport-odds="true"]').length > 0;
      const errorOverlay = [...document.querySelectorAll('[role="alert"], [class*="error"]')]
        .map((e) => (e as HTMLElement).innerText?.trim())
        .filter((t) => t && /error|失败|出错|unavailable|not found/i.test(t))
        .slice(0, 3);
      const oddsCount = document.querySelectorAll('[data-sport-odds="true"]').length;
      return { blank, hasNav, hasEvents, loginGate, errorOverlay, oddsCount, url: location.href };
    });

    lastDetail = JSON.stringify(result);
    const ok =
      !result.blank &&
      result.hasNav &&
      result.errorOverlay.length === 0 &&
      (result.hasEvents || result.oddsCount > 0);
    if (ok) return { ok: true, detail: lastDetail };
  }

  return { ok: false, detail: lastDetail || 'no sports candidate rendered content' };
}

const TIP_SELECTORS = [
  '[class*="toast" i]',
  '[class*="Toast"]',
  '[class*="snack" i]',
  '[class*="notification" i]',
  '[class*="Message"]',
  '[role="alert"]',
  '[role="status"]',
  '[class*="modal" i]',
  '[class*="popup" i]',
];

export async function monitorOdds(
  page: Page,
  windowMs: number,
): Promise<{
  observedChange: boolean;
  tipOnChange: TipOnOddsChange;
  samples: number;
  note: string;
}> {
  // Ensure we are on a page with odds
  let odds = page.locator('[data-sport-odds="true"]');
  if ((await odds.count()) < 3) {
    await page.goto('/upcoming');
    await page.waitForTimeout(3000);
    await dismissBlockingUi(page);
    odds = page.locator('[data-sport-odds="true"]');
  }

  await odds.first().waitFor({ state: 'attached', timeout: 30_000 }).catch(() => undefined);

  const readSnapshot = async () =>
    page.locator('[data-sport-odds="true"]').evaluateAll((els) =>
      els.slice(0, 60).map((el) => {
        const strong = el.querySelector('strong');
        return (strong?.textContent || el.textContent || '').replace(/\s+/g, ' ').trim();
      }),
    );

  const readTipSignals = async () =>
    page.evaluate((selectors) => {
      const tips: string[] = [];
      for (const sel of selectors) {
        for (const el of document.querySelectorAll(sel)) {
          const style = getComputedStyle(el);
          if (style.display === 'none' || style.visibility === 'hidden') continue;
          const t = (el as HTMLElement).innerText?.trim();
          if (t && t.length < 200 && !/Navegador no compatible|正在准备 Merobet|browser-fallback/i.test(t)) {
            tips.push(`${sel}:${t.slice(0, 80)}`);
          }
        }
      }
      const highlights = [...document.querySelectorAll('[data-sport-odds="true"]')]
        .filter((el) =>
          /up|down|flash|change|pulse|highlight|increase|decrease|green|red|anim/i.test(
            el.className?.toString?.() || '',
          ),
        )
        .map((el) => el.className.toString())
        .slice(0, 5);
      return { tips: tips.slice(0, 10), highlights };
    }, TIP_SELECTORS);

  let prev = (await readSnapshot()).join('||');
  let observedChange = false;
  let tipSeenAfterChange = false;
  let tipChecked = false;
  const start = Date.now();
  let samples = 1;

  while (Date.now() - start < windowMs) {
    await page.waitForTimeout(2000);
    const nextArr = await readSnapshot();
    const next = nextArr.join('||');
    samples += 1;
    if (prev && next && next !== prev) {
      observedChange = true;
      tipChecked = true;
      // brief window to catch toast/highlight after change
      for (let i = 0; i < 3; i++) {
        const signals = await readTipSignals();
        if (signals.tips.length > 0 || signals.highlights.length > 0) {
          tipSeenAfterChange = true;
          break;
        }
        await page.waitForTimeout(400);
      }
    }
    prev = next || prev;
  }

  let tipOnChange: TipOnOddsChange = 'unknown';
  let note = '';
  if (!observedChange) {
    tipOnChange = 'unknown';
    note =
      'No odds text/value change during the watch window; tip assertion skipped (site may update infrequently).';
  } else if (tipChecked) {
    tipOnChange = tipSeenAfterChange ? 'yes' : 'no';
    note = tipSeenAfterChange
      ? 'Odds changed and a toast/modal/highlight signal was detected.'
      : 'Odds changed; no user-visible tip/toast/modal/highlight detected in the immediate follow-up window.';
  }

  return { observedChange, tipOnChange, samples, note };
}
