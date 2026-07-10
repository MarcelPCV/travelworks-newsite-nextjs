import { expect, test } from '@playwright/test';

test.describe('Navbar mega menu', () => {
  test('opens Products mega menu on click only', async ({ page }) => {
    await page.goto('/en-us');

    const productsTrigger = page.getByRole('button', { name: 'Products' });
    const megaMenu = page.locator('#products-mega-menu');

    await productsTrigger.hover();
    await expect(megaMenu).not.toBeVisible();

    await productsTrigger.click();
    await expect(megaMenu).toBeVisible();
    await expect(page.getByRole('link', { name: 'Backoffice System' })).toBeVisible();
  });

  test('shows About Us and Training dropdown menus on click only', async ({ page }) => {
    await page.goto('/en-us');

    const aboutUsTrigger = page.getByRole('button', { name: 'About Us' });
    const trainingTrigger = page.getByRole('button', { name: 'Training' });

    await aboutUsTrigger.hover();
    await expect(page.getByRole('menu', { name: 'About Us' })).not.toBeVisible();

    await aboutUsTrigger.click();
    await expect(page.getByRole('menu', { name: 'About Us' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Travelworks' })).toBeVisible();

    await trainingTrigger.hover();
    await expect(page.getByRole('menu', { name: 'Training' })).not.toBeVisible();

    await trainingTrigger.click();
    await expect(page.getByRole('menu', { name: 'Training' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Knowledge Base' })).toBeVisible();
  });

  test('supports keyboard activation and escape close for products menu', async ({ page }) => {
    await page.goto('/en-us');

    const productsTrigger = page.getByRole('button', { name: 'Products' });
    const megaMenu = page.locator('#products-mega-menu');

    await productsTrigger.focus();
    await page.keyboard.press('Enter');

    await expect(megaMenu).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(megaMenu).not.toBeVisible();
  });

  test('keeps login and language dropdowns click-only', async ({ page }) => {
    await page.goto('/en-us');

    const loginTrigger = page.getByRole('button', { name: /log in/i }).first();
    const languageTrigger = page.getByRole('button', { name: /language/i });

    await expect(loginTrigger).toHaveAttribute('aria-expanded', 'false');
    await loginTrigger.hover();
    await expect(loginTrigger).toHaveAttribute('aria-expanded', 'false');

    await loginTrigger.click();
    await expect(loginTrigger).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByRole('menuitem', { name: /travelworks/i }).first()).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(loginTrigger).toHaveAttribute('aria-expanded', 'false');

    await expect(languageTrigger).toHaveAttribute('aria-expanded', 'false');
    await languageTrigger.hover();
    await expect(languageTrigger).toHaveAttribute('aria-expanded', 'false');

    await languageTrigger.click();
    await expect(languageTrigger).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('#language-menu')).toBeVisible();
  });
});
