import { test, expect, Page } from "@playwright/test";
import { CookiesDialog } from "../page-objects/CookiesDialog";
import { AccommodationPage } from "../page-objects/AccommodationPage";
import { SearchResultsPage } from "../page-objects/SearchResultsPage";
import { BasketPage } from "../page-objects/BasketPage";

var cookiesDialog: CookiesDialog;
var accommodationPage: AccommodationPage;
var searchResultsPage: SearchResultsPage;
var basketPage: BasketPage;

test.describe("Accommodations Destination Gotland", () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    cookiesDialog = new CookiesDialog(page);
    accommodationPage = new AccommodationPage(page);
    searchResultsPage = new SearchResultsPage(page);
    basketPage = new BasketPage(page);
  });

  test.afterAll(async ({ browser }) => {
    browser.close();
  });

  test("Booking accommodation for tomorrow and 2 adults", async () => {
    await accommodationPage.goto(
      process.env.BASE_URL ?? "http://localhost:3000"
    );

    // Click "Accept All" cookies button on a pop up dialog
    await cookiesDialog.checkElements();
    await cookiesDialog.acceptCookies();

    await accommodationPage.checkElements();
    await accommodationPage.searchAccommodationForTomorrowAndNumOfAdults(2);

    await searchResultsPage.checkElements();
    await searchResultsPage.clickFirstBookNowLink();
    await searchResultsPage.clickFirstBookButton();

    await basketPage.checkElements();
  });
});
