/**
 * Base Page Class
 * Parent class for all page objects
 * Provides common functionality and initialization
 */

import { Page, Locator } from '@playwright/test';
import { HelperFunctions } from '../utils/helpers';
import { Logger } from '../utils/logger';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to URL
   */
  async goto(url: string): Promise<void> {
    await HelperFunctions.navigateTo(this.page, url);
  }

  /**
   * Safely click element
   */
  async click(locator: Locator | string, label: string = 'Element'): Promise<void> {
    if (typeof locator === 'string') {
      await HelperFunctions.safeClick(this.page, locator, label);
    } else {
      await HelperFunctions.safeClick(this.page, locator, label);
    }
  }

  /**
   * Safely fill input
   */
  async fill(locator: Locator | string, text: string, label: string = 'Field'): Promise<void> {
    await HelperFunctions.safeFill(locator, text, label, this.page);
  }

  /**
   * Verify text content
   */
  async verifyText(locator: Locator | string, text: string, partial: boolean = false): Promise<void> {
    await HelperFunctions.verifyText(locator, text, this.page, partial);
  }

  /**
   * Wait for element visibility
   */
  async waitForElement(locator: Locator | string, timeout: number = 10000): Promise<void> {
    await HelperFunctions.waitForElement(locator, this.page, timeout);
  }

  /**
   * Wait for element to be hidden
   */
  async waitForElementGone(locator: Locator | string, timeout: number = 10000): Promise<void> {
    await HelperFunctions.waitForElementGone(locator, this.page, timeout);
  }

  /**
   * Get element text
   */
  async getText(locator: Locator | string): Promise<string> {
    return HelperFunctions.getText(locator, this.page);
  }

  /**
   * Get element attribute
   */
  async getAttribute(locator: Locator | string, attribute: string): Promise<string | null> {
    return HelperFunctions.getAttribute(locator, attribute, this.page);
  }

  /**
   * Check if element is visible
   */
  async isVisible(locator: Locator | string): Promise<boolean> {
    return HelperFunctions.isElementVisible(locator, this.page);
  }

  /**
   * Check if element is enabled
   */
  async isEnabled(locator: Locator | string): Promise<boolean> {
    return HelperFunctions.isElementEnabled(locator, this.page);
  }

  /**
   * Count elements
   */
  async count(locator: Locator | string): Promise<number> {
    return HelperFunctions.countElements(locator, this.page);
  }

  /**
   * Get all text from multiple elements
   */
  async getAllText(locator: Locator | string): Promise<string[]> {
    return HelperFunctions.getAllText(locator, this.page);
  }

  /**
   * Page URL assertion
   */
  async verifyUrl(expectedUrl: string): Promise<void> {
    const currentUrl = this.page.url();
    if (!currentUrl.includes(expectedUrl)) {
      throw new Error(`Expected URL to contain "${expectedUrl}", but got "${currentUrl}"`);
    }
    Logger.success(`URL verification passed: ${currentUrl}`);
  }

  /**
   * Take screenshot
   */
  async takeScreenshot(fileName: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${fileName}.png`, fullPage: true });
    Logger.success(`Screenshot saved: ${fileName}`);
  }

  /**
   * Wait for page load
   */
  async waitForPageLoad(timeout: number = 10000): Promise<void> {
    await this.page.waitForLoadState('load', { timeout });
    Logger.success('Page fully loaded');
  }
}
