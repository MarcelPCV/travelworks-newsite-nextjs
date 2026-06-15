import { expect, test } from '@playwright/test';

test.describe('Navbar mega menu', () => {
  test('opens Products mega menu on hover and switches category content', async ({ page }) => {
    await page.goto('/en-us');

    const productsTrigger = page.getByRole('button', { name: 'Products' });
    await productsTrigger.hover();

    const megaMenu = page.locator('#products-mega-menu');
    await expect(megaMenu).toBeVisible();
    await expect(page.getByRole('link', { name: 'Backoffice System' })).toBeVisible();

    await page.getByRole('button', { name: 'TourOnline' }).hover();

    await expect(page.getByRole('link', { name: 'Try It' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Backoffice System' })).toHaveCount(0);
  });

  test('shows About Us and Training dropdown menus', async ({ page }) => {
    await page.goto('/en-us');

    await page.getByRole('button', { name: 'About Us' }).hover();
    await expect(page.getByRole('menu', { name: 'About Us' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Travelworks' })).toBeVisible();

    await page.getByRole('button', { name: 'Training' }).hover();
    await expect(page.getByRole('menu', { name: 'Training' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Knowledge Base' })).toBeVisible();
  });

  test('supports keyboard open and escape close for products menu', async ({ page }) => {
    await page.goto('/en-us');

    const productsTrigger = page.getByRole('button', { name: 'Products' });
    await productsTrigger.focus();
    await page.keyboard.press('ArrowDown');

    const megaMenu = page.locator('#products-mega-menu');
    await expect(megaMenu).toBeVisible();
    await expect(page.getByRole('button', { name: 'Travelworks' })).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(megaMenu).not.toBeVisible();
  });
});
