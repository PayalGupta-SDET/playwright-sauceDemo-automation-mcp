/**
 * MCP / AGENTIC INTEGRATION EXAMPLES
 * Demonstrates how AI agents can interact with Playwright test framework
 * 
 * These are example functions showing how an AI system could
 * dynamically generate and execute test steps
 */

import { Page } from '@playwright/test';
import { HelperFunctions } from '../utils/helpers';
import { Logger } from '../utils/logger';

/**
 * MCP Tool: Open a web page
 * AI Agent Call: { "tool": "openPage", "url": "https://www.saucedemo.com/" }
 */
export async function openPage(page: Page, url: string): Promise<void> {
  try {
    await HelperFunctions.navigateTo(page, url);
    Logger.success(`Opened page: ${url}`);
  } catch (error) {
    Logger.error(`Failed to open page: ${error}`);
    throw error;
  }
}

/**
 * MCP Tool: Click an element
 * AI Agent Call: { "tool": "clickElement", "selector": "button.login-btn", "label": "Login Button" }
 */
export async function clickElement(
  page: Page,
  selector: string,
  label: string = 'Element',
): Promise<void> {
  try {
    await HelperFunctions.safeClick(page, selector, label);
    Logger.success(`Clicked: ${label}`);
  } catch (error) {
    Logger.error(`Failed to click element: ${error}`);
    throw error;
  }
}

/**
 * MCP Tool: Fill input field
 * AI Agent Call: { "tool": "fillInput", "selector": "input#username", "text": "standard_user", "label": "Username" }
 */
export async function fillInput(
  page: Page,
  selector: string,
  text: string,
  label: string = 'Input Field',
): Promise<void> {
  try {
    await HelperFunctions.safeFill(selector, text, label, page);
    Logger.success(`Filled ${label}: ${text}`);
  } catch (error) {
    Logger.error(`Failed to fill input: ${error}`);
    throw error;
  }
}

/**
 * MCP Tool: Validate text on page
 * AI Agent Call: { "tool": "validateText", "selector": "h1.title", "expectedText": "Products", "partial": true }
 */
export async function validateText(
  page: Page,
  selector: string,
  expectedText: string,
  partial: boolean = false,
): Promise<boolean> {
  try {
    await HelperFunctions.verifyText(selector, expectedText, page, partial);
    Logger.success(`Text validation passed: ${expectedText}`);
    return true;
  } catch (error) {
    Logger.error(`Text validation failed: ${error}`);
    return false;
  }
}

/**
 * MCP Tool: Wait for element to appear
 * AI Agent Call: { "tool": "waitForElement", "selector": ".inventory_container", "timeout": 10000 }
 */
export async function waitForElement(
  page: Page,
  selector: string,
  timeout: number = 10000,
  shouldAppear: boolean = true,
): Promise<boolean> {
  try {
    if (shouldAppear) {
      await HelperFunctions.waitForElement(selector, page, timeout);
      Logger.success(`Element appeared: ${selector}`);
    } else {
      await HelperFunctions.waitForElementGone(selector, page, timeout);
      Logger.success(`Element disappeared: ${selector}`);
    }
    return true;
  } catch (error) {
    Logger.error(`Wait operation failed: ${error}`);
    return false;
  }
}

/**
 * MCP Tool: Get element text
 * AI Agent Call: { "tool": "getElementText", "selector": ".product-name" }
 */
export async function getElementText(page: Page, selector: string): Promise<string> {
  try {
    const text = await HelperFunctions.getText(selector, page);
    Logger.success(`Retrieved text: ${text}`);
    return text;
  } catch (error) {
    Logger.error(`Failed to get text: ${error}`);
    return '';
  }
}

/**
 * MCP Tool: Execute action with retry
 * AI Agent Call: { "tool": "executeWithRetry", "action": "addToCart", "retries": 3 }
 */
export async function executeWithRetry(
  page: Page,
  action: string,
  retries: number = 3,
): Promise<boolean> {
  return HelperFunctions.retryOperation(
    async () => {
      switch (action) {
        case 'addToCart':
          await page.locator('button[data-test*="add-to-cart"]').nth(0).click();
          return true;
        case 'checkout':
          await page.locator('button[data-test="checkout"]').click();
          return true;
        case 'login':
          await page.locator('input[data-test="login-button"]').click();
          return true;
        default:
          throw new Error(`Unknown action: ${action}`);
      }
    },
    `Execute ${action}`,
    retries,
  ).then(() => true).catch(() => false);
}

/**
 * MCP Tool: Take screenshot
 * AI Agent Call: { "tool": "takeScreenshot", "fileName": "login_page_error" }
 */
export async function takeScreenshot(page: Page, fileName: string): Promise<boolean> {
  try {
    await page.screenshot({ path: `screenshots/${fileName}.png`, fullPage: true });
    Logger.success(`Screenshot saved: ${fileName}`);
    return true;
  } catch (error) {
    Logger.error(`Failed to take screenshot: ${error}`);
    return false;
  }
}

/**
 * MCP Tool: Check element visibility
 * AI Agent Call: { "tool": "isElementVisible", "selector": ".error-message" }
 */
export async function isElementVisible(page: Page, selector: string): Promise<boolean> {
  try {
    const visible = await HelperFunctions.isElementVisible(selector, page);
    Logger.info(`Element visibility: ${selector} = ${visible}`);
    return visible;
  } catch (error) {
    Logger.error(`Failed to check visibility: ${error}`);
    return false;
  }
}

/**
 * MCP Tool: Get all matching elements count
 * AI Agent Call: { "tool": "countElements", "selector": ".product-item" }
 */
export async function countElements(page: Page, selector: string): Promise<number> {
  try {
    const count = await HelperFunctions.countElements(selector, page);
    Logger.success(`Found ${count} elements matching: ${selector}`);
    return count;
  } catch (error) {
    Logger.error(`Failed to count elements: ${error}`);
    return 0;
  }
}

/**
 * MCP Tool: Dynamic test execution from AI-generated instructions
 * Example: AI Agent generates test steps and this function executes them
 */
export interface TestStep {
  action: 'click' | 'fill' | 'validate' | 'wait' | 'screen';
  selector?: string;
  text?: string;
  label?: string;
  timeout?: number;
}

export async function executeTestSteps(page: Page, steps: TestStep[]): Promise<boolean> {
  try {
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      Logger.info(`Executing step ${i + 1}/${steps.length}: ${step.action}`);

      switch (step.action) {
        case 'click':
          if (!step.selector) throw new Error('Selector required for click');
          await clickElement(page, step.selector, step.label);
          break;

        case 'fill':
          if (!step.selector || !step.text) throw new Error('Selector and text required for fill');
          await fillInput(page, step.selector, step.text, step.label);
          break;

        case 'validate':
          if (!step.selector || !step.text) throw new Error('Selector and text required for validate');
          await validateText(page, step.selector, step.text);
          break;

        case 'wait':
          if (!step.selector) throw new Error('Selector required for wait');
          await waitForElement(page, step.selector, step.timeout || 10000);
          break;

        case 'screen':
          await takeScreenshot(page, step.label || `step-${i + 1}`);
          break;

        default:
          throw new Error(`Unknown action: ${step.action}`);
      }
    }

    Logger.success('All steps executed successfully');
    return true;
  } catch (error) {
    Logger.error(`Test execution failed: ${error}`);
    return false;
  }
}

/**
 * MCP Tool: Natural language to test execution
 * Example: AI Agent converts natural language to structured test steps
 * 
 * Example Input:
 * "Login with standard_user, then add first product to cart, and verify it appears"
 * 
 * Converted to Steps:
 * [
 *   { action: 'fill', selector: 'input[data-test="username"]', text: 'standard_user' },
 *   { action: 'fill', selector: 'input[data-test="password"]', text: 'secret_sauce' },
 *   { action: 'click', selector: 'input[data-test="login-button"]' },
 *   { action: 'wait', selector: '.inventory_container' },
 *   { action: 'click', selector: 'button[data-test*="add-to-cart"]' },
 * ]
 */
export async function executeNLCommand(page: Page, nlCommand: string): Promise<boolean> {
  Logger.info(`Executing natural language command: ${nlCommand}`);

  try {
    if (nlCommand.includes('login')) {
      await fillInput(page, 'input[data-test="username"]', 'standard_user', 'Username');
      await fillInput(page, 'input[data-test="password"]', 'secret_sauce', 'Password');
      await clickElement(page, 'input[data-test="login-button"]', 'Login Button');
    }

    if (nlCommand.includes('add to cart')) {
      await clickElement(
        page,
        'button[data-test*="add-to-cart"]',
        'Add to Cart',
      );
    }

    if (nlCommand.includes('cart')) {
      await clickElement(page, 'a.shopping_cart_link', 'Cart');
    }

    if (nlCommand.includes('checkout')) {
      await clickElement(page, 'button[data-test="checkout"]', 'Checkout');
    }

    Logger.success(`Command executed: ${nlCommand}`);
    return true;
  } catch (error) {
    Logger.error(`Command execution failed: ${error}`);
    return false;
  }
}
