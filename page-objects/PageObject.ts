import type { Page } from "@playwright/test";

interface PageObjectInterface {
  checkElements(): Promise<void>;
}

export abstract class PageObject implements PageObjectInterface {
  constructor(public readonly page: Page) {}
  abstract checkElements(): Promise<void>;
}
