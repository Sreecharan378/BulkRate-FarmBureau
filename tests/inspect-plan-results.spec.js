
const { test, expect } = require('@playwright/test');

const baseURL =
  'https://jstestingacademy.co.in/qa-apps/insurehub/quote.html?type=health';

const scenarios = [
  {
    name: 'Health Insurance',
    fill: async (page) => {
      await page.locator('#cover-city').selectOption({ label: 'Hyderabad' });
      await page.locator('#age').fill('30');
      await page.locator('#members').selectOption({ label: 'Just me' });
      await page.locator('#cover-amount').selectOption({
        label: '₹5,00,000'
      });
    }
  },
  {
    name: 'Car Insurance',
    fill: async (page) => {
      await page.locator('#cover-city').selectOption({ label: 'Hyderabad' });
      await page.locator('#car-value').fill('800000');
      await page.locator('#car-age').fill('3');
    }
  },
  {
    name: 'Term Life Insurance',
    fill: async (page) => {
      await page.locator('#cover-city').selectOption({ label: 'Hyderabad' });
      await page.locator('#age').fill('30');
      await page.locator('#policy-term').selectOption({
        label: '20 years'
      });
    }
  },
  {
    name: 'Travel Insurance',
    fill: async (page) => {
      await page.locator('#cover-city').selectOption({ label: 'Hyderabad' });
      await page.locator('#age').fill('30');
      await page.locator('#trip-days').fill('7');
      await page.locator('#trip-zone').selectOption({ label: 'Asia' });
    }
  },
  {
    name: 'Home Insurance',
    fill: async (page) => {
      await page.locator('#cover-city').selectOption({ label: 'Hyderabad' });
      await page.locator('#cover-amount').selectOption({
        label: '₹25,00,000'
      });
    }
  }
];

for (const scenario of scenarios) {
  test(`Inspect results: ${scenario.name}`, async ({ page }) => {
    await page.goto(baseURL, { waitUntil: 'domcontentloaded' });

    await page.locator('#cover-type').selectOption({
      label: scenario.name
    });

    await expect(
      page.getByRole('heading', {
        name: scenario.name,
        exact: true
      })
    ).toBeVisible();

    await scenario.fill(page);
    await page.locator('#see-plans').click();

    await expect(page).toHaveURL(/plans\.html/, {
      timeout: 15000
    });

    const resultText = await page.locator('body').innerText();

    console.log(`\n===== ${scenario.name} RESULTS =====`);
    console.log(resultText);

    await expect(page.locator('body')).toContainText(scenario.name);
  });
}
