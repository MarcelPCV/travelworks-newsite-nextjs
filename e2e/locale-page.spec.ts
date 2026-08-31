import fs from 'fs';
import path from 'path';
import { test, expect } from '@playwright/test';

const messagesDir = path.join(process.cwd(), 'messages');
const locales = [
  { messageLocale: 'en-us', path: '/' },
  { messageLocale: 'fr-ca', path: '/fr' },
  { messageLocale: 'en-au', path: '/en-au' },
];

for (const locale of locales) {
  test(`locale page renders for ${locale.messageLocale}`, async ({ page }) => {
    await page.goto(locale.path);
    await expect(page).toHaveURL(locale.path);
    const messages = JSON.parse(
      fs.readFileSync(path.join(messagesDir, `${locale.messageLocale}.json`), 'utf8'),
    );
    await expect(page.locator('h1')).toContainText(messages.title);
  });
}
