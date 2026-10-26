
const { test, expect } = require('@playwright/test');

test('Playwright opens Example Domain', async ({ page }) => {
  await page.goto('https://example.com', {
    waitUntil: 'domcontentloaded',
    timeout: 30000
  });

  console.log('Current URL:', page.url());
  console.log('Page title:', await page.title());

  await expect(page).toHaveTitle('Example Domain');
});
