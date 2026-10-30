import { expect, test } from '@playwright/test';

const gtm = 'GTM-WPWFTW8H';
const ga = 'G-R82T2VWRR5';
const clarity = 'z5bmx5lajm';

test.describe('Google and Clarity consent', () => {
  test.beforeEach(async ({ context }) => {
    await context.route('https://www.googletagmanager.com/**', async (route) => {
      if (route.request().url().includes('/gtm.js?')) {
        await route.fulfill({
          contentType: 'application/javascript',
          body: `var s = document.createElement('script'); s.src = 'https://www.clarity.ms/tag/${clarity}'; document.head.appendChild(s);`,
        });
      } else {
        await route.fulfill({ contentType: 'application/javascript', body: '' });
      }
    });
    await context.route('https://www.clarity.ms/**', async (route) => {
      await route.fulfill({ contentType: 'application/javascript', body: '' });
    });
  });

  test('does not load tags before consent or after rejection, reload and a new tab', async ({
    page,
    context,
  }) => {
    const requests: string[] = [];
    context.on('request', (request) => {
      if (/googletagmanager\.com|clarity\.ms/.test(request.url())) requests.push(request.url());
    });

    await page.goto('/');
    await expect(page.getByRole('dialog', { name: 'We value your privacy' })).toBeVisible();
    await page.waitForTimeout(500);
    expect(requests).toEqual([]);
    await page.getByRole('button', { name: 'Reject All' }).click();
    await page.reload();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    const newTab = await context.newPage();
    await newTab.goto('/');
    await expect(newTab.getByRole('heading', { level: 1 })).toBeVisible();
    await page.waitForTimeout(500);
    expect(requests).toEqual([]);
  });

  test('starts GA and GTM with consent before the Clarity tag and restores it on reload', async ({
    page,
  }) => {
    const requests: string[] = [];
    page.on('request', (request) => requests.push(request.url()));
    await page.goto('/');
    await page.getByRole('button', { name: 'Accept All' }).click();
    await expect.poll(() => requests.some((url) => url.includes(`/gtag/js?id=${ga}`))).toBe(true);
    await expect.poll(() => requests.some((url) => url.includes(`/gtm.js?id=${gtm}`))).toBe(true);
    await expect.poll(() => requests.some((url) => url.includes(`/tag/${clarity}`))).toBe(true);

    const state = await page.evaluate(() => ({
      google: window.dataLayer?.map((entry) =>
        Object.prototype.toString.call(entry) === '[object Arguments]' ? Array.from(entry as IArguments) : entry,
      ),
      clarity: window.clarity?.q?.map((entry) => Array.from(entry)),
    }));
    expect(state.google?.slice(0, 3)).toEqual([
      ['consent', 'default', {
        analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
      }],
      ['consent', 'update', {
        analytics_storage: 'granted', ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted',
      }],
      ['js', expect.anything()],
    ]);
    expect(state.clarity?.[0]).toEqual(['consentv2', {
      analytics_Storage: 'granted', ad_Storage: 'granted',
    }]);

    requests.length = 0;
    await page.reload();
    await expect.poll(() => requests.some((url) => url.includes(`/tag/${clarity}`))).toBe(true);
    await expect(page.getByRole('dialog', { name: 'We value your privacy' })).not.toBeVisible();
  });

  test('does not load tags with marketing consent alone', async ({ page }) => {
    const requests: string[] = [];
    page.on('request', (request) => {
      if (/googletagmanager\.com|clarity\.ms/.test(request.url())) requests.push(request.url());
    });
    await page.goto('/');
    await page.getByRole('button', { name: 'Customize' }).click();
    const settings = page.getByRole('dialog', { name: 'Privacy Settings' });
    await settings.getByRole('switch', { name: 'Marketing' }).click();
    await settings.getByRole('button', { name: 'Save Settings' }).click();
    await page.reload();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await page.waitForTimeout(500);
    expect(requests).toEqual([]);
  });

  test('passes analytics-only consent and stops loading tags after withdrawal', async ({ page }) => {
    const requests: string[] = [];
    page.on('request', (request) => requests.push(request.url()));
    await page.goto('/');
    await page.getByRole('button', { name: 'Customize' }).click();
    let settings = page.getByRole('dialog', { name: 'Privacy Settings' });
    await settings.getByRole('switch', { name: 'Analytics' }).click();
    await settings.getByRole('button', { name: 'Save Settings' }).click();
    await expect.poll(() => requests.some((url) => url.includes(`/tag/${clarity}`))).toBe(true);
    await expect.poll(() => page.evaluate(() => window.clarity?.q?.map((entry) => Array.from(entry))))
      .toContainEqual(['consentv2', { analytics_Storage: 'granted', ad_Storage: 'denied' }]);

    await page.evaluate(() => {
      window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('test-consent-before-reload', JSON.stringify({
          google: window.dataLayer?.map((entry) =>
            Object.prototype.toString.call(entry) === '[object Arguments]' ? Array.from(entry as IArguments) : entry,
          ),
          clarity: window.clarity?.q?.map((entry) => Array.from(entry)),
        }));
      });
    });
    await page.getByRole('button', { name: 'Privacy Settings' }).click();
    settings = page.getByRole('dialog', { name: 'Privacy Settings' });
    await settings.getByRole('switch', { name: 'Analytics' }).click();
    await Promise.all([
      page.waitForEvent('load'),
      settings.getByRole('button', { name: 'Save Settings' }).click(),
    ]);
    const beforeReload = JSON.parse((await page.evaluate(() =>
      sessionStorage.getItem('test-consent-before-reload'),
    )) ?? 'null');
    expect(beforeReload.google).toContainEqual(['consent', 'update', {
      analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
    }]);
    expect(beforeReload.clarity).toContainEqual(['consentv2', {
      analytics_Storage: 'denied', ad_Storage: 'denied',
    }]);
    requests.length = 0;
    await page.reload();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await page.waitForTimeout(500);
    expect(requests.filter((url) => /googletagmanager\.com|clarity\.ms/.test(url))).toEqual([]);
  });
});
