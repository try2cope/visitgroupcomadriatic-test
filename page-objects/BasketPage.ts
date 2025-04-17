import { expect, Locator, Page } from "@playwright/test";
import { PageObject } from "./PageObject";

export class BasketPage extends PageObject {
  private readonly basketHeading: Locator;

  constructor(public readonly page: Page) {
    super(page);
    this.basketHeading = this.page.locator("h1", {
      hasText: "Your Basket",
    });
  }

  async checkElements() {
    await expect(this.basketHeading).toBeVisible();
  }
}
