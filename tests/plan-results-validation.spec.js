
const { test, expect } = require('@playwright/test');

const BASE_URL =
  'https://jstestingacademy.co.in/qa-apps/insurehub/quote.html?type=health';

const scenarios = [
  {
    name: 'Health Insurance',
    quoteDetails: ['₹5,00,000 cover', 'Hyderabad', 'age 30'],
    firstPlan: 'Value Health',
    premium: '₹3,680',
    planCount: 4,
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
    quoteDetails: ['IDV ₹8,00,000', 'Hyderabad'],
    firstPlan: 'EasyDrive Saver',
    premium: '₹17,024',
    planCount: 3,
    fill: async (page) => {
      await page.locator('#cover-city').selectOption({ label: 'Hyderabad' });
      await page.locator('#car-value').fill('800000');
      await page.locator('#car-age').fill('3');
    }
  },
  {
    name: 'Term Life Insurance',
    quoteDetails: ['₹25,00,000 cover', 'Hyderabad', 'age 30'],
    firstPlan: 'Bharat Raksha Term',
    premium: '₹185',
    planCount: 3,
    fill: async (page) => {
      await page.locator('#cover-city').selectOption({ label: 'Hyderabad' });
      await page.locator('#age').fill('30');
      await page.locator('#policy-term').selectOption({
        label: '20 years'
      });
      await page.locator('#cover-amount').selectOption({
        label: '₹25,00,000'
      });
    }
  },
  {
    name: 'Travel Insurance',
    quoteDetails: ['7 day trip', 'Hyderabad', 'age 30'],
    firstPlan: 'Budget Trip Cover',
    premium: '₹770',
    planCount: 3,
    fill: async (page) => {
      await page.locator('#cover-city').selectOption({ label: 'Hyderabad' });
      await page.locator('#age').fill('30');
      await page.locator('#trip-days').fill('7');
      await page.locator('#trip-zone').selectOption({ label: 'Asia' });
    }
  },
  {
    name: 'Home Insurance',
    quoteDetails: ['₹25,00,000 cover', 'Hyderabad'],
    firstPlan: 'BasicHome Cover',
    premium: '₹10,000',
    planCount: 3,
    fill: async (page) => {
      await page.locator('#cover-city').selectOption({ label: 'Hyderabad' });
      await page.locator('#cover-amount').selectOption({
        label: '₹25,00,000'
      });
    }
  }
];

for (const scenario of scenarios) {
  test(`${scenario.name}: validate quote results`, async ({ page }) => {
    await page.goto(BASE_URL, {
      waitUntil: 'domcontentloaded'
    });

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

    const body = page.locator('body');

    // Verify insurance type and submitted quote details.
    await expect(body).toContainText(scenario.name);

    for (const detail of scenario.quoteDetails) {
      await expect(body).toContainText(detail);
    }

    // Verify the first displayed plan and its premium.
    await expect(body).toContainText(scenario.firstPlan);
    await expect(body).toContainText(scenario.premium);

    // Verify the number of plans offered.
    await expect(
      page.getByRole('button', { name: 'Buy this plan' })
    ).toHaveCount(scenario.planCount);

    // Confirm the premium is identified as before GST.
    await expect(body).toContainText('before GST');

    console.log(
      `${scenario.name}: details, first plan, premium and plan count verified`
    );
  });
}
