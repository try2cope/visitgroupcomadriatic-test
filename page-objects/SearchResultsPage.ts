import { expect, Locator, Page } from "@playwright/test";
import { PageObject } from "./PageObject";

export class SearchResultsPage extends PageObject {
  private readonly errorMessage: Locator;
  private readonly preferredHotelsHeading: Locator;
  private readonly bookNowLink: Locator;
  private readonly bookButton: Locator;

  constructor(public readonly page: Page) {
    super(page);
    this.errorMessage = this.page.locator("div.cb-message-box", {
      hasText: "There are no rooms available on the selected date(s)",
    });
    this.preferredHotelsHeading = this.page.locator("h3", {
      hasText: "Preferred Hotels",
    });
    this.bookNowLink = page.locator("a", { hasText: "Book now" });
    this.bookButton = page
      .locator('input[type="button"][value="Book"]')
      .first();
  }

  async checkElements() {
    try {
      await expect(this.errorMessage).not.toBeVisible();
    } catch (error) {
      throw new Error(
        "Can't book accommodation as no rooms are available - 0 results."
      );
    }
    await expect(this.preferredHotelsHeading).toBeVisible();
  }

  async clickFirstBookNowLink() {
    await this.bookNowLink.first().click();
  }

  async clickFirstBookButton() {
    await this.bookButton.waitFor({ state: "visible" });
    await this.bookButton.click();
  }
}
