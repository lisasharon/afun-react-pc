# Betbus UI smoke (login + sports)

Playwright smoke against the **external** Merobet/Betbus site. It never places bets, deposits, withdraws, or changes account settings. Odds buttons are observed only — never clicked for wagering.

## Setup

```bash
# from repo root
cp .env.example .env.local
# edit .env.local and set:
#   BETBUS_EMAIL=...
#   BETBUS_PASSWORD=...

npm install
npx playwright install chromium
# optional: system Chrome for headed fallback
```

Or export without a file:

```bash
export BETBUS_EMAIL='your@email.com'
export BETBUS_PASSWORD='your-password'
```

## Run

```bash
npm run test:betbus-smoke
```

Headed / slowMo (recommended when GeeTest appears):

```bash
BETBUS_HEADED=1 BETBUS_SLOW_MO=50 npm run test:betbus-smoke
# under CI/Xvfb:
BETBUS_HEADED=1 xvfb-run -a npm run test:betbus-smoke
```

Manual captcha window (default 120s when headed):

```bash
BETBUS_HEADED=1 BETBUS_CAPTCHA_TIMEOUT_MS=180000 npm run test:betbus-smoke
```

Reuse a saved session (skips login form when valid):

```bash
BETBUS_STORAGE_STATE=scripts/betbus-smoke/.auth/user.json npm run test:betbus-smoke
```

## What it checks

1. Open login, fill email/password from env, submit.
2. Confirm logged-in UI (header login/register gone, or session markers).
3. Open Sports (`/` / `体育`) and sanity-check main content.
4. Watch `[data-sport-odds="true"]` odds for ~60s; record whether values change and whether a toast/modal/highlight appears.
5. Print a JSON summary to the console; screenshots on failure under `test-results/`.

## Site quirks

- Login is a dialog (`[class*=loginDialog]`) opened from header `登录` (class `_login_*`). `/auth/login` may redirect to `/`.
- Submit button text is often `登录` plus a reward badge (`登录\n最高 $100`); target `button[type=submit]` / `[class*=_submit_]`.
- Login often shows a **GeeTest** slide captcha after submit. Headless/automated runs usually cannot pass it — use `BETBUS_HEADED=1` and solve manually within `BETBUS_CAPTCHA_TIMEOUT_MS`, or provide `BETBUS_STORAGE_STATE`. The smoke treats “form submitted → captcha shown” as a successful login-*path* check when a full session is not available.
- Password input starts as `readonly` until focused; eye-toggle button also has `aria-label="密码"` — use `input[name=password]`.
- Sports home is `/` (nav label `体育`). `/soccer` and `/upcoming` often expose odds as a guest; `/` and `/inplay` may gate odds behind login.
- Odds markup: `button[data-sport-odds=true]` / `[class*=oddsButton]` with `<small>1</small><strong>+210</strong>` (American format by default). **Do not click** these buttons (would open a bet slip).
