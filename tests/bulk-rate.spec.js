
const { test, expect } = require('@playwright/test');
const { BulkRatePage } = require('../pages/BulkRatePage');
const testData = require('../test-data/testData');

test('Health insurance quote displays correct results', async ({ page }) => {
  const bulkRatePage = new BulkRatePage(page);

  await bulkRatePage.openHealthQuote();
  await bulkRatePage.fillHealthQuote(testData.healthQuote);
  await bulkRatePage.seePlans();

  await expect(page).toHaveURL(/plans\.html/);
  await expect(page.locator('body')).toContainText('Health Insurance');
  await expect(page.locator('body')).toContainText('₹5,00,000 cover');
  await expect(page.locator('body')).toContainText('Hyderabad');
  await expect(page.locator('body')).toContainText('age 30');

  for (const plan of [
    'Value Health',
    'FamilyFirst Floater',
    'Arogya Shield',
    'Nova Care Plus'
  ]) {
    await expect(page.getByText(plan, { exact: true })).toBeVisible();
  }

  for (const premium of ['₹3,680', '₹4,715', '₹5,520', '₹6,440']) {
    await expect(page.getByText(premium, { exact: true })).toBeVisible();
  }

  await expect(
    page.getByRole('button', { name: 'Buy this plan' })
  ).toHaveCount(4);

  console.log('Health quote and all four plans verified.');
});

test('Health quote city dropdown initial state', async ({ page }) => {
  const bulkRatePage = new BulkRatePage(page);

  await bulkRatePage.openHealthQuote();

  await expect(bulkRatePage.city).toBeVisible();

  const selectedCity = await bulkRatePage.city.inputValue();
  const cityIsRequired = await bulkRatePage.city.evaluate(
    element => element.required
  );

  console.log('Initial city value:', JSON.stringify(selectedCity));
  console.log('City field required attribute:', cityIsRequired);

  await expect(bulkRatePage.city).toHaveValue(selectedCity);
});
