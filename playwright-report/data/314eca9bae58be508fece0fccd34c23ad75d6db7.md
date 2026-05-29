# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: locale-page.spec.ts >> locale page renders for fr-ca
- Location: e2e\locale-page.spec.ts:10:7

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('h1')
Expected substring: "Bienvenue (Canada - FR)"
Received string:    "TravelWorks Travel Management Platform"
Timeout: 5000ms

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for locator('h1')
    14 × locator resolved to <h1 class="sr-only">TravelWorks Travel Management Platform</h1>
       - unexpected value "TravelWorks Travel Management Platform"

```

```yaml
- heading "TravelWorks Travel Management Platform" [level=1]
```

# Test source

```ts
  1  | import fs from 'fs';
  2  | import path from 'path';
  3  | import { test, expect } from '@playwright/test';
  4  | 
  5  | const messagesDir = path.join(process.cwd(), 'messages');
  6  | const files = fs.readdirSync(messagesDir).filter((f) => f.endsWith('.json'));
  7  | const locales = files.map((f) => path.basename(f, '.json'));
  8  | 
  9  | for (const locale of locales) {
  10 |   test(`locale page renders for ${locale}`, async ({ page }) => {
  11 |     await page.goto(`/${locale}`);
  12 |     await expect(page).toHaveURL(`/${locale}`);
  13 |     const messages = JSON.parse(fs.readFileSync(path.join(messagesDir, `${locale}.json`), 'utf8'));
> 14 |     await expect(page.locator('h1')).toContainText(messages.title);
     |                                      ^ Error: expect(locator).toContainText(expected) failed
  15 |   });
  16 | }
  17 | 
```