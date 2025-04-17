import { expect, Locator, Page } from "@playwright/test";
import { PageObject } from "./PageObject";

export class CookiesDialog extends PageObject {
  private readonly approveAllButton: Locator;

  constructor(public readonly page: Page) {
    super(page);
    this.approveAllButton = this.page.getByRole("button", {
      name: "Godkänn alla",
    });
  }

  async checkElements() {
    await expect(this.approveAllButton).toBeVisible();
  }

  async acceptCookies() {
    await this.approveAllButton.click();
  }
}
