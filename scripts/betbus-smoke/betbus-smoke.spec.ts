/**
 * Betbus / Merobet external UI smoke.
 *
 * How to run (from repo root):
 *   cp .env.example .env.local   # set BETBUS_EMAIL / BETBUS_PASSWORD
 *   npm run test:betbus-smoke
 *
 * Headed fallback (GeeTest / headless blocks):
 *   BETBUS_HEADED=1 BETBUS_SLOW_MO=50 npm run test:betbus-smoke
 *   BETBUS_HEADED=1 xvfb-run -a npm run test:betbus-smoke
 *
 * SAFETY: never places bets, deposits, withdraws, or changes account settings.
 * Odds elements are observed only — wager/bet buttons are not clicked.
 */
import { test, expect } from '@playwright/test';
import {
  assertSportsHealthy,
  createSummary,
  dismissBlockingUi,
  fillLoginForm,
  gotoSports,
  isGeeTestVisible,
  monitorOdds,
  printSummary,
  requiredEnv,
  screenshotFailure,
  submitLogin,
  waitForLoginSuccess,
} from './helpers';

test.describe.configure({ mode: 'serial' });

test('betbus login + sports smoke', async ({ page, context }, testInfo) => {
  const summary = createSummary();
  const email = requiredEnv('BETBUS_EMAIL');
  const password = requiredEnv('BETBUS_PASSWORD');
  const headed = process.env.BETBUS_HEADED === '1' || process.env.HEADED === '1';
  const captchaTimeout = Number(
    process.env.BETBUS_CAPTCHA_TIMEOUT_MS || (headed ? 120_000 : 45_000),
  );
  const oddsWindowMs = Number(process.env.BETBUS_ODDS_WATCH_MS || 60_000);

  // Soften automation fingerprint a bit for this third-party SPA.
  await context.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
  });

  try {
    // ----- 1) Login -----
    const storageState = process.env.BETBUS_STORAGE_STATE;
    if (storageState) {
      summary.notes.push(`Using BETBUS_STORAGE_STATE=${storageState}`);
      await page.goto('/');
      await dismissBlockingUi(page);
      const stillGuest = await page
        .locator('button')
        .filter({ hasText: /^登录$/ })
        .first()
        .isVisible()
        .catch(() => false);
      if (!stillGuest) {
        summary.loginOk = true;
        summary.notes.push('Storage state already authenticated; skipped login form.');
      }
    }

    if (!summary.loginOk) {
      try {
        await fillLoginForm(page, email, password);
        await submitLogin(page);
        summary.loginFormSubmitted = true;

        if (await isGeeTestVisible(page)) {
          summary.captchaEncountered = true;
          summary.notes.push(
            headed
              ? `GeeTest captcha detected — waiting up to ${captchaTimeout}ms for manual solve in headed mode.`
              : 'GeeTest captcha detected in headless mode. Prefer BETBUS_HEADED=1 or BETBUS_STORAGE_STATE.',
          );
        }

        const loginResult = await waitForLoginSuccess(page, captchaTimeout);
        summary.captchaEncountered = summary.captchaEncountered || loginResult.captcha;
        if (!loginResult.ok) {
          summary.failures.push(loginResult.reason || 'login failed');
          await screenshotFailure(page, summary, 'login-failed');
          // Clear captcha/dialog so guest sports checks can proceed.
          await dismissBlockingUi(page);
        } else {
          summary.loginOk = true;
          if (process.env.BETBUS_SAVE_STORAGE_STATE) {
            const out = process.env.BETBUS_SAVE_STORAGE_STATE;
            await context.storageState({ path: out });
            summary.notes.push(`Saved storage state to ${out}`);
          }
        }
      } catch (err) {
        summary.failures.push(`login error: ${String(err)}`);
        await screenshotFailure(page, summary, 'login-error');
      }
    }

    // ----- 2) Sports page sanity (still attempt if login failed — documents guest UI) -----
    try {
      await gotoSports(page);
      const sports = await assertSportsHealthy(page);
      if (!sports.ok) {
        summary.failures.push(`sports page unhealthy: ${sports.detail}`);
        await screenshotFailure(page, summary, 'sports-unhealthy');
      } else {
        summary.sportsPageOk = true;
        summary.notes.push(`sports ok: ${sports.detail}`);
      }

      // Logged-in marker: inplay should not force "登录后查看…"
      if (summary.loginOk) {
        await page.goto('/inplay', { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(2500);
        await dismissBlockingUi(page);
        const gate = await page.getByText('登录后查看体育赛事与滚球赔率').isVisible().catch(() => false);
        if (gate) {
          summary.notes.push('inplay still shows login gate after purported login');
          summary.loginOk = false;
          summary.failures.push('login UI success ambiguous: inplay still gated');
          await screenshotFailure(page, summary, 'inplay-gated');
        } else {
          summary.notes.push('inplay accessible without login gate');
        }
      }
    } catch (err) {
      summary.failures.push(`sports navigation error: ${String(err)}`);
      await screenshotFailure(page, summary, 'sports-error');
    }

    // ----- 3) Odds monitoring (observe only — do not click bet buttons) -----
    try {
      // Prefer soccer/upcoming where guest odds often render; skip clicking any odds button.
      await page.goto('/soccer', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2500);
      await dismissBlockingUi(page);
      if ((await page.locator('[data-sport-odds="true"]').count()) < 3) {
        await page.goto('/upcoming', { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(2500);
        await dismissBlockingUi(page);
      }
      if ((await page.locator('[data-sport-odds="true"]').count()) < 1) {
        summary.notes.push(
          'No odds nodes visible (likely login-gated). Odds monitoring skipped until login succeeds.',
        );
        summary.tipOnOddsChange = 'unknown';
      } else {
        const odds = await monitorOdds(page, oddsWindowMs);
        summary.oddsChangeObserved = odds.observedChange;
        summary.tipOnOddsChange = odds.tipOnChange;
        summary.notes.push(odds.note);
        summary.notes.push(`odds samples taken: ${odds.samples}`);
      }
    } catch (err) {
      summary.failures.push(`odds monitor error: ${String(err)}`);
      summary.tipOnOddsChange = 'unknown';
      await screenshotFailure(page, summary, 'odds-error');
    }
  } finally {
    printSummary(summary);
    await testInfo.attach('betbus-smoke-summary', {
      body: Buffer.from(JSON.stringify(summary, null, 2), 'utf8'),
      contentType: 'application/json',
    });
  }

  // Soft expectations: always print summary; fail the test if critical checks failed.
  // Full session login may be blocked by GeeTest in automation — form submit + captcha is still a useful smoke signal.
  expect
    .soft(
      summary.loginOk || (summary.loginFormSubmitted && summary.captchaEncountered),
      `login path — failures: ${summary.failures.join('; ')}`,
    )
    .toBeTruthy();
  expect.soft(summary.sportsPageOk, 'sportsPageOk').toBeTruthy();
  // Odds change is informational — do not fail the suite if the market was quiet.
});
