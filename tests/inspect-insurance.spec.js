
const { test } = require('@playwright/test');

const insuranceTypes = [
  'Health Insurance',
  'Car Insurance',
  'Term Life Insurance',
  'Travel Insurance',
  'Home Insurance'
];

for (const insuranceType of insuranceTypes) {
  test(`Inspect fields: ${insuranceType}`, async ({ page }) => {
    await page.goto(
      'https://jstestingacademy.co.in/qa-apps/insurehub/quote.html?type=health'
    );

    await page.locator('#cover-type').selectOption({
      label: insuranceType
    });

    const fields = await page.locator(
      'input, select, textarea, button'
    ).evaluateAll(elements =>
      elements.map(element => ({
        tag: element.tagName,
        type: element.type || '',
        id: element.id,
        label: element.labels
          ? [...element.labels]
              .map(label => label.innerText.trim())
              .join(', ')
          : '',
        placeholder: element.placeholder || '',
        text: element.tagName === 'BUTTON'
          ? element.innerText.trim()
          : '',
        options: element.tagName === 'SELECT'
          ? [...element.options].map(option => option.text.trim())
          : []
      }))
    );

    console.log(`\n--- ${insuranceType} ---`);
    console.log(JSON.stringify(fields, null, 2));
  });
}
