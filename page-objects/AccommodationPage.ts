import { expect, Locator, Page } from "@playwright/test";
import { PageObject } from "./PageObject";
import { DateHelper } from "../helpers/DateHelper";

export class AccommodationPage extends PageObject {
  private readonly fromCalendarDropdown: Locator;
  private readonly nextMonth: Locator;
  private readonly numberOfAdultsDropdown: Locator;
  private readonly searchButton: Locator;

  constructor(public readonly page: Page) {
    super(page);
    this.fromCalendarDropdown = this.page.locator("#Citybreak_trigger_from");
    this.nextMonth = this.page.locator("a.cb-ui-datepicker-next");
    this.numberOfAdultsDropdown = this.page.locator("#cb_numadults1");
    this.searchButton = this.page.locator("#CB_SearchButton");
  }

  async goto(url: string) {
    await this.page.goto(url);
    await this.page.waitForLoadState("networkidle");
  }

  async checkElements() {
    await expect(this.page).toHaveTitle(/Gotland/);
    await expect(this.fromCalendarDropdown).toBeVisible();
  }

  async searchAccommodationForTomorrowAndNumOfAdults(numAdults: number) {
    await this.fromCalendarDropdown.click();

    const tomorrow = DateHelper.getTomorrowDate();
    const nextDayLocator: Locator = this.page.locator(
      `td.selen-cal-target-date-${tomorrow.day}:not(.cb-ui-datepicker-disabled)[data-month="${tomorrow.month}"][data-year="${tomorrow.year}"]`
    );

    const isVisibleNextDay = await nextDayLocator.isVisible();

    // Check if the tomorrow's day isn't currently visible on the datepicker
    // and click next month arrow in that case
    if (!isVisibleNextDay) {
      await this.nextMonth.click();
    }

    await nextDayLocator.click();

    await this.numberOfAdultsDropdown.click();
    await this.numberOfAdultsDropdown.selectOption({
      label: `${numAdults} adults`,
    });

    await Promise.all([
      this.page.waitForURL("**/accommodation?search=**"),
      this.searchButton.click(),
    ]);
  }
}
