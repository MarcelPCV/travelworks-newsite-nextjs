# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navbar-menu.spec.ts >> Navbar mega menu >> supports keyboard activation and escape close for products menu
- Location: e2e\navbar-menu.spec.ts:39:7

# Error details

```
Error: locator.focus: Page crashed
Call log:
  - waiting for getByRole('button', { name: 'Products' })

```

# Test source

```ts
  1  | import { expect, test } from '@playwright/test';
  2  |
  3  | test.describe('Navbar mega menu', () => {
  4  |   test('opens Products mega menu on click only', async ({ page }) => {
  5  |     await page.goto('/en-us');
  6  |
  7  |     const productsTrigger = page.getByRole('button', { name: 'Products' });
  8  |     const megaMenu = page.locator('#products-mega-menu');
  9  |
  10 |     await productsTrigger.hover();
  11 |     await expect(megaMenu).not.toBeVisible();
  12 |
  13 |     await productsTrigger.click();
  14 |     await expect(megaMenu).toBeVisible();
  15 |     await expect(page.getByRole('link', { name: 'Backoffice System' })).toBeVisible();
  16 |   });
  17 |
  18 |   test('shows About Us and Training dropdown menus on click only', async ({ page }) => {
  19 |     await page.goto('/en-us');
  20 |
  21 |     const aboutUsTrigger = page.getByRole('button', { name: 'About Us' });
  22 |     const trainingTrigger = page.getByRole('button', { name: 'Training' });
  23 |
  24 |     await aboutUsTrigger.hover();
  25 |     await expect(page.getByRole('menu', { name: 'About Us' })).not.toBeVisible();
  26 |
  27 |     await aboutUsTrigger.click();
  28 |     await expect(page.getByRole('menu', { name: 'About Us' })).toBeVisible();
  29 |     await expect(page.getByRole('link', { name: 'Travelworks' })).toBeVisible();
  30 |
  31 |     await trainingTrigger.hover();
  32 |     await expect(page.getByRole('menu', { name: 'Training' })).not.toBeVisible();
  33 |
  34 |     await trainingTrigger.click();
  35 |     await expect(page.getByRole('menu', { name: 'Training' })).toBeVisible();
  36 |     await expect(page.getByRole('link', { name: 'Knowledge Base' })).toBeVisible();
  37 |   });
  38 |
  39 |   test('supports keyboard activation and escape close for products menu', async ({ page }) => {
  40 |     await page.goto('/en-us');
  41 |
  42 |     const productsTrigger = page.getByRole('button', { name: 'Products' });
  43 |     const megaMenu = page.locator('#products-mega-menu');
  44 |
> 45 |     await productsTrigger.focus();
     |                           ^ Error: locator.focus: Page crashed
  46 |     await page.keyboard.press('Enter');
  47 |
  48 |     await expect(megaMenu).toBeVisible();
  49 |
  50 |     await page.keyboard.press('Escape');
  51 |     await expect(megaMenu).not.toBeVisible();
  52 |   });
  53 |
  54 |   test('keeps login and language dropdowns click-only', async ({ page }) => {
  55 |     await page.goto('/en-us');
  56 |
  57 |     const loginTrigger = page.getByRole('button', { name: /log in/i }).first();
  58 |     const languageTrigger = page.getByRole('button', { name: /language/i });
  59 |
  60 |     await expect(loginTrigger).toHaveAttribute('aria-expanded', 'false');
  61 |     await loginTrigger.hover();
  62 |     await expect(loginTrigger).toHaveAttribute('aria-expanded', 'false');
  63 |
  64 |     await loginTrigger.click();
  65 |     await expect(loginTrigger).toHaveAttribute('aria-expanded', 'true');
  66 |     await expect(page.getByRole('menuitem', { name: /travelworks/i }).first()).toBeVisible();
  67 |
  68 |     await page.keyboard.press('Escape');
  69 |     await expect(loginTrigger).toHaveAttribute('aria-expanded', 'false');
  70 |
  71 |     await expect(languageTrigger).toHaveAttribute('aria-expanded', 'false');
  72 |     await languageTrigger.hover();
  73 |     await expect(languageTrigger).toHaveAttribute('aria-expanded', 'false');
  74 |
  75 |     await languageTrigger.click();
  76 |     await expect(languageTrigger).toHaveAttribute('aria-expanded', 'true');
  77 |     await expect(page.locator('#language-menu')).toBeVisible();
  78 |   });
  79 | });
  80 |
```
