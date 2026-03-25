/**
 * Helper Utilities
 * Reusable functions for common automation tasks
 */

import { Page, Locator } from '@playwright/test';
import { Logger } from './logger';
import { MAX_RETRIES, RETRY_DELAY } from '../data/testdata';

export class HelperFunctions {
  /**
   * Retry wrapper for flaky operations
   */
  static async retryOperation<T>(
    operation: () => Promise<T>,
    operationName: string = 'Operation',
    maxRetries: number = MAX_RETRIES,
  ): Promise<T> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        Logger.debug(`${operationName} - Attempt ${attempt}/${maxRetries}`);
        return await operation();
      } catch (error) {
        lastError = error as Error;
        Logger.warning(`${operationName} failed on attempt ${attempt}. Retrying...`);

        if (attempt < maxRetries) {
          await this.delay(RETRY_DELAY);
        }
      }
    }

    throw new Error(`${operationName} failed after ${maxRetries} attempts: ${lastError?.message}`);
  }

  /**
   * Safe element click with retry and visibility check
   */
  static async safeClick(
    page: Page,
    locator: Locator | string,
    label: string = 'Element',
  ): Promise<void> {
    return this.retryOperation(
      async () => {
        const element = typeof locator === 'string' ? page.locator(locator) : locator;
        await element.waitFor({ state: 'visible', timeout: 5000 });
        await element.click({ force: false });
        Logger.success(`Clicked on ${label}`);
      },
      `Click ${label}`,
    );
  }

  /**
   * Safe text input with clear
   */
  static async safeFill(
    locator: Locator | string,
    text: string,
    label: string = 'Field',
    page?: Page,
  ): Promise<void> {
    return this.retryOperation(
      async () => {
        let element: Locator;
        if (typeof locator === 'string') {
          if (!page) throw new Error('Page parameter required for string locator');
          element = page.locator(locator);
        } else {
          element = locator;
        }

        await element.waitFor({ state: 'visible', timeout: 5000 });
        await element.clear();
        await element.fill(text);
        Logger.success(`Filled ${label} with: ${text}`);
      },
      `Fill ${label}`,
    );
  }

  /**
   * Safe text verification
   */
  static async verifyText(
    element: Locator | string,
    expectedText: string,
    page?: Page,
    partial: boolean = false,
  ): Promise<void> {
    let locator: Locator;
    if (typeof element === 'string') {
      if (!page) throw new Error('Page parameter required for string locator');
      locator = page.locator(element);
    } else {
      locator = element;
    }

    const actualText = await locator.textContent();

    if (partial) {
      if (!actualText?.includes(expectedText)) {
        throw new Error(
          `Expected text "${expectedText}" not found in "${actualText}"`,
        );
      }
    } else {
      if (actualText?.trim() !== expectedText.trim()) {
        throw new Error(
          `Expected text "${expectedText}", but got "${actualText}"`,
        );
      }
    }

    Logger.success(`Text verification passed: "${expectedText}"`);
  }

  /**
   * Wait for element visibility
   */
  static async waitForElement(
    locator: Locator | string,
    page?: Page,
    timeout: number = 10000,
  ): Promise<void> {
    let element: Locator;
    if (typeof locator === 'string') {
      if (!page) throw new Error('Page parameter required for string locator');
      element = page.locator(locator);
    } else {
      element = locator;
    }

    await element.waitFor({ state: 'visible', timeout });
    Logger.success(`Element became visible`);
  }

  /**
   * Wait for element to disappear
   */
  static async waitForElementGone(
    locator: Locator | string,
    page?: Page,
    timeout: number = 10000,
  ): Promise<void> {
    let element: Locator;
    if (typeof locator === 'string') {
      if (!page) throw new Error('Page parameter required for string locator');
      element = page.locator(locator);
    } else {
      element = locator;
    }

    try {
      await element.waitFor({ state: 'hidden', timeout });
      Logger.success(`Element disappeared`);
    } catch {
      Logger.warning('Element still visible after timeout');
    }
  }

  /**
   * Get element text content
   */
  static async getText(
    locator: Locator | string,
    page?: Page,
  ): Promise<string> {
    let element: Locator;
    if (typeof locator === 'string') {
      if (!page) throw new Error('Page parameter required for string locator');
      element = page.locator(locator);
    } else {
      element = locator;
    }

    const text = await element.textContent();
    return text || '';
  }

  /**
   * Get element attribute value
   */
  static async getAttribute(
    locator: Locator | string,
    attribute: string,
    page?: Page,
  ): Promise<string | null> {
    let element: Locator;
    if (typeof locator === 'string') {
      if (!page) throw new Error('Page parameter required for string locator');
      element = page.locator(locator);
    } else {
      element = locator;
    }

    return element.getAttribute(attribute);
  }

  /**
   * Check if element is visible
   */
  static async isElementVisible(
    locator: Locator | string,
    page?: Page,
  ): Promise<boolean> {
    let element: Locator;
    if (typeof locator === 'string') {
      if (!page) throw new Error('Page parameter required for string locator');
      element = page.locator(locator);
    } else {
      element = locator;
    }

    return element.isVisible();
  }

  /**
   * Check element is enabled
   */
  static async isElementEnabled(
    locator: Locator | string,
    page?: Page,
  ): Promise<boolean> {
    let element: Locator;
    if (typeof locator === 'string') {
      if (!page) throw new Error('Page parameter required for string locator');
      element = page.locator(locator);
    } else {
      element = locator;
    }

    return element.isEnabled();
  }

  /**
   * Count matching elements
   */
  static async countElements(
    locator: Locator | string,
    page?: Page,
  ): Promise<number> {
    let element: Locator;
    if (typeof locator === 'string') {
      if (!page) throw new Error('Page parameter required for string locator');
      element = page.locator(locator);
    } else {
      element = locator;
    }

    return element.count();
  }

  /**
   * Simple delay utility
   */
  static async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Get all text from multiple elements
   */
  static async getAllText(
    locator: Locator | string,
    page?: Page,
  ): Promise<string[]> {
    let element: Locator;
    if (typeof locator === 'string') {
      if (!page) throw new Error('Page parameter required for string locator');
      element = page.locator(locator);
    } else {
      element = locator;
    }

    return element.allTextContents();
  }

  /**
   * Navigate to URL
   */
  static async navigateTo(page: Page, url: string, waitUntil: 'load' | 'domcontentloaded' | 'networkidle' = 'load'): Promise<void> {
    await page.goto(url, { waitUntil });
    Logger.success(`Navigated to ${url}`);
  }
}
