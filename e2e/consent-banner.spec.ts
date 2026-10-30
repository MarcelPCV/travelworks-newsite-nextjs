import { expect, test } from '@playwright/test';

for (const locale of [
  { path: '/', logo: 'TravelWorks' },
  { path: '/fr', logo: 'PcVoyages' },
  { path: '/en-au', logo: 'TravelWorks' },
]) {
  test(`centers the consent banner and displays the ${locale.logo} logo on ${locale.path}`, async ({
    page,
  }) => {
    await page.goto(locale.path);
    const banner = page.getByTestId('consent-banner-card');
    await expect(banner).toBeVisible();
    await expect(banner.getByRole('img', { name: locale.logo })).toBeVisible();

    const overlay = page.getByTestId('consent-banner-overlay');
    await expect(overlay).toBeVisible();
    await expect(overlay).toHaveCSS('background-color', 'rgba(0, 0, 0, 0.5)');

    await expect
      .poll(async () => {
        const box = await banner.boundingBox();
        const viewport = page.viewportSize();
        if (!box || !viewport) return false;
        return (
          Math.abs(box.x + box.width / 2 - viewport.width / 2) < 2 &&
          Math.abs(box.y + box.height / 2 - viewport.height / 2) < 2
        );
      })
      .toBe(true);

    const buttons = banner.getByRole('button');
    await expect(buttons).toHaveCount(3);
    await expect(buttons.nth(0)).toHaveAttribute('data-testid', 'consent-banner-customize-button');
    await expect(buttons.nth(1)).toHaveAttribute('data-testid', 'consent-banner-reject-button');
    await expect(buttons.nth(2)).toHaveAttribute('data-testid', 'consent-banner-accept-button');
  });
}

test('keeps the banner usable on a narrow screen and centers the settings dialog', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/fr');
  const banner = page.getByTestId('consent-banner-card');
  await expect(banner).toBeVisible();
  await expect(banner.getByRole('img', { name: 'PcVoyages' })).toBeVisible();

  const box = await banner.boundingBox();
  if (!box) throw new Error('Consent banner has no bounding box');
  expect(box.x).toBeGreaterThanOrEqual(0);
  expect(box.x + box.width).toBeLessThanOrEqual(375);
  expect(box.y).toBeGreaterThanOrEqual(0);
  expect(box.y + box.height).toBeLessThanOrEqual(667);

  await banner.getByTestId('consent-banner-customize-button').click();
  await expect(page.getByTestId('consent-dialog-overlay')).toHaveCSS(
    'background-color',
    'rgba(0, 0, 0, 0.5)',
  );
  await expect(page.getByRole('dialog')).toBeVisible();
});

for (const viewport of [
  { width: 375, height: 667, logoWidth: 105.6 },
  { width: 1280, height: 800, logoWidth: 134.4 },
]) {
  test(`matches settings width and text sizes and sizes the logo at ${viewport.width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto('/');
    const banner = page.getByTestId('consent-banner-card');
    await expect(banner).toBeVisible();
    const logo = await banner.getByRole('img', { name: 'TravelWorks' }).boundingBox();
    if (!logo) throw new Error('Consent logo has no bounding box');
    expect(logo.width).toBeCloseTo(viewport.logoWidth, 1);
    const bannerBox = await banner.boundingBox();
    if (!bannerBox) throw new Error('Consent banner has no bounding box');

    const titleSize = await page.getByTestId('consent-banner-title').evaluate(
      (element) => getComputedStyle(element).fontSize,
    );
    const descriptionSize = await page.getByTestId('consent-banner-description').evaluate(
      (element) => getComputedStyle(element).fontSize,
    );

    await banner.getByTestId('consent-banner-customize-button').click();
    const settings = page.getByTestId('consent-dialog-card');
    await expect(settings).toBeVisible();
    await expect
      .poll(async () => {
        const settingsBox = await settings.boundingBox();
        return settingsBox ? Math.abs(settingsBox.width - bannerBox.width) : Infinity;
      })
      .toBeLessThan(0.5);
    await expect(page.getByTestId('consent-dialog-title')).toHaveCSS('font-size', titleSize);
    await expect(page.getByTestId('consent-dialog-description')).toHaveCSS(
      'font-size',
      descriptionSize,
    );
  });
}

test('uses French for the banner and privacy settings on the French site', async ({ page }) => {
  await page.goto('/fr');
  const banner = page.getByRole('dialog', { name: 'Nous respectons votre vie privée' });
  await expect(banner).toBeVisible();
  await expect(banner.getByTestId('consent-banner-description')).toHaveText(
    "Ce site utilise des cookies pour améliorer votre expérience de navigation, analyser le trafic du site et afficher du contenu personnalisé. Veuillez consulter notre Politique de confidentialité pour plus d'informations.",
  );
  await expect(banner.getByRole('link', { name: 'Politique de confidentialité' })).toHaveAttribute(
    'href',
    '/fr/politique-de-confidentialite',
  );
  await expect(banner.getByRole('button', { name: 'Personnaliser' })).toBeVisible();
  await expect(banner.getByRole('button', { name: 'Tout refuser' })).toBeVisible();
  await expect(banner.getByRole('button', { name: 'Tout accepter' })).toBeVisible();

  await banner.getByRole('button', { name: 'Personnaliser' }).click();
  const settings = page.getByRole('dialog', { name: 'Paramètres de confidentialité' });
  await expect(settings).toBeVisible();
  await expect(settings.getByRole('switch', { name: 'Strictement nécessaires' })).toBeVisible();
  await expect(settings.getByRole('switch', { name: 'Analyse' })).toBeVisible();
  await expect(settings.getByRole('button', { name: 'Tout refuser' })).toBeVisible();
  await expect(settings.getByRole('button', { name: 'Tout accepter' })).toBeVisible();
  await expect(settings.getByRole('button', { name: 'Enregistrer les paramètres' })).toBeVisible();
});

test('updates consent settings when changing the site language', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Reject All' }).click();
  await page.locator('button[aria-controls="language-menu"]').click();
  await page.getByRole('menuitem', { name: 'French' }).click();
  await expect(page).toHaveURL(/\/fr\/?$/);

  await page.getByRole('button', { name: 'Paramètres de confidentialité' }).click();
  const frenchSettings = page.getByRole('dialog', { name: 'Paramètres de confidentialité' });
  await expect(frenchSettings).toBeVisible();
  await frenchSettings.getByRole('button', { name: 'Tout refuser' }).click();
  await expect(frenchSettings).not.toBeVisible();

  await page.locator('button[aria-controls="language-menu"]').click();
  await page.getByRole('menuitem', { name: 'Anglais', exact: true }).click();
  await expect(page).toHaveURL('/');
  await page.getByRole('button', { name: 'Privacy Settings' }).click();
  await expect(page.getByRole('dialog', { name: 'Privacy Settings' })).toBeVisible();
});

test.describe('English site with a French browser', () => {
  test.use({ locale: 'fr-CA' });

  test('uses the site language instead of the browser language', async ({ page }) => {
    await page.goto('/');
    const banner = page.getByRole('dialog', { name: 'We value your privacy' });
    await expect(banner).toBeVisible();
    await expect(banner.getByRole('button', { name: 'Customize' })).toBeVisible();
    await expect(banner.getByRole('button', { name: 'Reject All' })).toBeVisible();
    await expect(banner.getByRole('button', { name: 'Accept All' })).toBeVisible();
  });
});
