
const { test, expect } = require('@playwright/test');

const QUOTE_URL =
  'https://jstestingacademy.co.in/qa-apps/insurehub/quote.html?type=health';

const insuranceTypes = [
  'Health Insurance',
  'Car Insurance',
  'Term Life Insurance',
  'Travel Insurance',
  'Home Insurance'
];

// Test 1–5: Empty-form submission for each insurance type.
for (const insuranceType of insuranceTypes) {
  test(`${insuranceType}: prevent empty-form submission`, async ({
    page
  }) => {
    await page.goto(QUOTE_URL, {
      waitUntil: 'domcontentloaded'
    });

    await page.locator('#cover-type').selectOption({
      label: insuranceType
    });

    await expect(
      page.getByRole('heading', {
        name: insuranceType,
        exact: true
      })
    ).toBeVisible();

    await page.locator('#see-plans').click();

    await expect(page).not.toHaveURL(/plans\.html/);
  });
}

// Test 6: Negative age.
test('Health Insurance: negative age does not open plans', async ({
  page
}) => {
  await page.goto(QUOTE_URL, {
    waitUntil: 'domcontentloaded'
  });

  await page.locator('#cover-type').selectOption({
    label: 'Health Insurance'
  });

  await page.locator('#cover-city').selectOption({
    label: 'Hyderabad'
  });
  await page.locator('#age').fill('-1');
  await page.locator('#members').selectOption({
    label: 'Just me'
  });
  await page.locator('#cover-amount').selectOption({
    label: '₹5,00,000'
  });

  await page.locator('#see-plans').click();

  await expect(page).not.toHaveURL(/plans\.html/);
});

// Tests 7–12: Health Insurance age Boundary Value Analysis.
// The observed HTML input limits are min=18 and max=80.
const ageBoundaryCases = [
  { age: 17, expectedValid: false, label: 'below minimum' },
  { age: 18, expectedValid: true, label: 'minimum boundary' },
  { age: 19, expectedValid: true, label: 'above minimum' },
  { age: 79, expectedValid: true, label: 'below maximum' },
  { age: 80, expectedValid: true, label: 'maximum boundary' },
  { age: 81, expectedValid: false, label: 'above maximum' }
];

for (const scenario of ageBoundaryCases) {
  test(
    `Health Insurance: age ${scenario.age} (${scenario.label})`,
    async ({ page }) => {
      await page.goto(QUOTE_URL, {
        waitUntil: 'domcontentloaded'
      });

      await page.locator('#cover-type').selectOption({
        label: 'Health Insurance'
      });

      const ageInput = page.locator('#age');

      await ageInput.fill(String(scenario.age));

      await expect(ageInput).toHaveValue(String(scenario.age));

      const isValid = await ageInput.evaluate(
        (element) => element.validity.valid
      );

      expect(isValid).toBe(scenario.expectedValid);

      console.log(
        `Age ${scenario.age}: expected valid = ${scenario.expectedValid}, actual valid = ${isValid}`
      );
    }
  );
}
