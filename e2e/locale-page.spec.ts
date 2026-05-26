import fs from 'fs';
import path from 'path';
import { test, expect } from '@playwright/test';

const messagesDir = path.join(process.cwd(), 'messages');
const files = fs.readdirSync(messagesDir).filter((f) => f.endsWith('.json'));
const locales = files.map((f) => path.basename(f, '.json'));

for (const locale of locales) {
  test(`locale page renders for ${locale}`, async ({ page }) => {
    await page.goto(`/${locale}`);
    await expect(page).toHaveURL(`/${locale}`);
    const messages = JSON.parse(fs.readFileSync(path.join(messagesDir, `${locale}.json`), 'utf8'));
    await expect(page.locator('h1')).toContainText(messages.title);
  });
}
