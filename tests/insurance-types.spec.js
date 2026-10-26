
const { test, expect } = require('@playwright/test');

const insuranceTypes = [
  { label: 'Health Insurance', heading: 'Health Insurance' },
  { label: 'Car Insurance', heading: 'Car Insurance' },
  { label: 'Term Life Insurance', heading: 'Term Life Insurance' },
  { label: 'Travel Insurance', heading: 'Travel Insurance' },
  { label: 'Home Insurance', heading: 'Home Insurance' }
];

for (const insurance of insuranceTypes) {
  test(`${insurance.label} form displays correctly`, async ({ page }) => {
    await page.goto(
      'https://jstestingacademy.co.in/qa-apps/insurehub/quote.html?type=health'
    );

    const coverType = page.locator('#cover-type');

    await expect(coverType).toBeVisible();

    await coverType.selectOption({ label: insurance.label });

    await expect(
      page.getByRole('heading', {
        name: insurance.heading,
        exact: true
      })
    ).toBeVisible();

    console.log(`${insurance.label} form verified`);
  });
}
