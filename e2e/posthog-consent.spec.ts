import { expect, test } from '@playwright/test';

test.describe('PostHog consent', () => {
  test.use({
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  });

  test.beforeEach(async ({ context }) => {
    // PostHog drops events from automated browsers by default.
    await context.addInitScript(() => {
      Object.defineProperty(navigator, 'webdriver', { get: () => false });
      Object.defineProperty(navigator, 'userAgentData', { get: () => undefined });
    });
  });

  test('does not contact PostHog before consent or after rejection, reload, and a new tab', async ({ page, context }) => {
    const requests: string[] = [];
    await context.route(/https:\/\/[^/]*posthog\.com\//, async (route) => {
      requests.push(route.request().url());
      await route.fulfill({ json: {} });
    });

    await page.goto('/');
    const banner = page.getByRole('dialog', { name: 'We value your privacy' });
    await expect(banner).toBeVisible();
    await page.waitForTimeout(1000);
    expect(requests).toEqual([]);

    await banner.getByRole('button', { name: 'Reject All' }).click();
    await expect(banner).not.toBeVisible();
    await page.reload();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await page.waitForTimeout(1000);
    expect(requests).toEqual([]);

    const newTab = await context.newPage();
    await newTab.goto('/');
    await expect(newTab.getByRole('heading', { level: 1 })).toBeVisible();
    await page.waitForTimeout(1000);
    expect(requests).toEqual([]);
  });

  test('captures a pageview after measurement consent and on reload', async ({ page, context }) => {
    const requests: string[] = [];
    await context.route(/https:\/\/[^/]*posthog\.com\//, async (route) => {
      requests.push(route.request().url());
      await route.fulfill({ json: {} });
    });

    await page.goto('/');
    const banner = page.getByRole('dialog', { name: 'We value your privacy' });
    await expect(banner).toBeVisible();
    await page.waitForTimeout(1000);
    expect(requests).toEqual([]);

    await banner.getByRole('button', { name: 'Accept All' }).click();
    await expect.poll(() => requests.some((url) => new URL(url).pathname === '/e/')).toBe(true);
    requests.length = 0;
    await page.reload();
    await expect.poll(() => requests.some((url) => new URL(url).pathname === '/e/')).toBe(true);
    await expect(banner).not.toBeVisible();
  });

  test('does not start PostHog when only marketing is allowed', async ({ page, context }) => {
    const requests: string[] = [];
    await context.route(/https:\/\/[^/]*posthog\.com\//, async (route) => {
      requests.push(route.request().url());
      await route.fulfill({ json: {} });
    });

    await page.goto('/');
    await page.getByRole('button', { name: 'Customize' }).click();
    const settings = page.getByRole('dialog', { name: 'Privacy Settings' });
    await settings.getByRole('switch', { name: 'Marketing' }).click();
    await settings.getByRole('button', { name: 'Save Settings' }).click();
    await expect(settings).not.toBeVisible();
    await page.reload();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await page.waitForTimeout(1000);
    expect(requests).toEqual([]);
  });

  test('stops PostHog and clears its analytics storage when measurement consent is withdrawn', async ({ page, context }) => {
    const requests: string[] = [];
    await context.route(/https:\/\/[^/]*posthog\.com\//, async (route) => {
      requests.push(route.request().url());
      await route.fulfill({ json: {} });
    });

    await page.goto('/');
    await page.getByRole('button', { name: 'Accept All' }).click();
    await expect.poll(() => requests.some((url) => new URL(url).pathname === '/e/')).toBe(true);

    await page.getByRole('button', { name: 'Privacy Settings' }).click();
    const settings = page.getByRole('dialog', { name: 'Privacy Settings' });
    const analytics = settings.getByRole('switch', { name: 'Analytics' });
    await expect(analytics).toHaveAttribute('aria-checked', 'true');
    await analytics.click();
    await Promise.all([
      page.waitForEvent('load'),
      settings.getByRole('button', { name: 'Save Settings' }).click(),
    ]);

    requests.length = 0;
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await page.waitForTimeout(1000);
    expect(requests).toEqual([]);
    expect((await context.cookies()).filter((cookie) => cookie.name.startsWith('ph_'))).toEqual([]);
    expect(
      await page.evaluate(() => Object.keys(localStorage).filter((key) => key.startsWith('ph_'))),
    ).toEqual([]);
  });
});
