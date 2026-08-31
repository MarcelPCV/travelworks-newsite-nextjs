import { test, expect } from '@playwright/test';

const locales = [
  { name: 'en-us', path: '/' },
  { name: 'fr-ca', path: '/fr' },
  { name: 'en-au', path: '/en-au' },
];

for (const locale of locales) {
  test(`locale page renders for ${locale.name}`, async ({ page }) => {
    await page.goto(locale.path);
    await expect(page).toHaveURL(locale.path);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
}
