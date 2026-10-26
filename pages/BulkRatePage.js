
class BulkRatePage {
  constructor(page) {
    this.page = page;

    this.coverType = page.locator('#cover-type');
    this.city = page.locator('#cover-city');
    this.age = page.locator('#age');
    this.members = page.locator('#members');
    this.coverAmount = page.locator('#cover-amount');
    this.smoker = page.locator('#smoker');

    this.seePlansButton = page.getByRole('button', {
      name: 'See plans'
    });
  }

  async openHealthQuote() {
    await this.page.goto(
      'https://jstestingacademy.co.in/qa-apps/insurehub/quote.html?type=health'
    );
  }

  async openQuote(type) {
    await this.page.goto(
      `https://jstestingacademy.co.in/qa-apps/insurehub/quote.html?type=${type}`
    );
  }

  async fillHealthQuote(data) {
    await this.city.selectOption({ label: data.city });
    await this.age.fill(String(data.age));
    await this.members.selectOption({ label: data.members });
    await this.coverAmount.selectOption({
      label: data.coverAmount
    });

    if (data.smoker) {
      await this.smoker.check();
    } else {
      await this.smoker.uncheck();
    }
  }

  async seePlans() {
    await this.seePlansButton.click();
  }
}

module.exports = { BulkRatePage };
