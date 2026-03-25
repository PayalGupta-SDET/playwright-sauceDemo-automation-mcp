/**
 * Checkout Page Object Model
 * Handles checkout flow and validations
 */

import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { APP_URLS } from '../data/testdata';

export class CheckoutPage extends BasePage {
  // Step One Locators
  private readonly firstNameInput = 'input[data-test="firstName"]';
  private readonly lastNameInput = 'input[data-test="lastName"]';
  private readonly postalCodeInput = 'input[data-test="postalCode"]';
  private readonly continueButton = 'input[data-test="continue"]';
  private readonly cancelButton = 'button[data-test="cancel"]';
  private readonly errorMessage = 'h3[data-test="error"]';
  private readonly checkoutTitle = '.title';

  // Step Two Locators
  private readonly overviewContainer = '.checkout_summary_container';
  private readonly cartItem = '.cart_item';
  private readonly itemName = '.inventory_item_name';
  private readonly itemPrice = '.inventory_item_price';
  private readonly subtotalLabel = '.summary_subtotal_label';
  private readonly taxLabel = '.summary_tax_label';
  private readonly totalLabel = '.summary_total_label';
  private readonly finishButton = 'button[data-test="finish"]';

  // Complete Locators
  private readonly completeContainer = '.checkout_complete_container';
  private readonly completeMessage = '.complete-header';
  private readonly backToProductsButton = 'button[data-test="back-to-products"]';
  private readonly thankYouMessage = 'h2.complete-header';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to checkout step one
   */
  async navigateToCheckoutStepOne(): Promise<void> {
    await this.goto(APP_URLS.checkout);
    await this.waitForElement(this.firstNameInput);
  }

  /**
   * Verify checkout step one is displayed
   */
  async verifyCheckoutStepOneDisplayed(): Promise<void> {
    await this.verifyUrl('checkout-step-one');
    await this.waitForElement(this.firstNameInput);
    await this.waitForElement(this.lastNameInput);
    await this.waitForElement(this.postalCodeInput);
  }

  /**
   * Fill checkout info
   */
  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.fill(this.firstNameInput, firstName, 'First Name');
    await this.fill(this.lastNameInput, lastName, 'Last Name');
    await this.fill(this.postalCodeInput, postalCode, 'Postal Code');
  }

  /**
   * Click continue button
   */
  async clickContinue(): Promise<void> {
    await this.click(this.continueButton, 'Continue Button');
  }

  /**
   * Click cancel button
   */
  async clickCancel(): Promise<void> {
    await this.click(this.cancelButton, 'Cancel Button');
  }

  /**
   * Verify error message
   */
  async verifyErrorMessage(expectedError: string): Promise<void> {
    await this.waitForElement(this.errorMessage);
    const errorText = await this.getText(this.errorMessage);
    if (!errorText.includes(expectedError)) {
      throw new Error(`Expected error "${expectedError}" but got "${errorText}"`);
    }
  }

  /**
   * Verify no error message
   */
  async verifyNoErrorMessage(): Promise<void> {
    const isVisible = await this.isVisible(this.errorMessage);
    if (isVisible) {
      throw new Error('Error message should not be visible');
    }
  }

  /**
   * Verify checkout step two is displayed
   */
  async verifyCheckoutStepTwoDisplayed(): Promise<void> {
    await this.verifyUrl('checkout-step-two');
    await this.waitForElement(this.overviewContainer);
    await this.waitForElement(this.finishButton);
  }

  /**
   * Get items in checkout overview
   */
  async getCheckoutItems(): Promise<string[]> {
    return this.getAllText(this.page.locator(this.itemName));
  }

  /**
   * Get checkout subtotal
   */
  async getCheckoutSubtotal(): Promise<string> {
    return this.getText(this.subtotalLabel);
  }

  /**
   * Get checkout tax
   */
  async getCheckoutTax(): Promise<string> {
    return this.getText(this.taxLabel);
  }

  /**
   * Get checkout total
   */
  async getCheckoutTotal(): Promise<string> {
    return this.getText(this.totalLabel);
  }

  /**
   * Click finish button to complete order
   */
  async clickFinish(): Promise<void> {
    await this.click(this.finishButton, 'Finish Button');
  }

  /**
   * Verify checkout complete page
   */
  async verifyCheckoutCompletePage(): Promise<void> {
    await this.verifyUrl('checkout-complete');
    await this.waitForElement(this.completeContainer);
    await this.waitForElement(this.thankYouMessage);
  }

  /**
   * Verify thank you message
   */
  async verifyThankYouMessage(expectedMessage: string): Promise<void> {
    await this.verifyText(this.thankYouMessage, expectedMessage, true);
  }

  /**
   * Click back to products button
   */
  async clickBackToProducts(): Promise<void> {
    await this.click(this.backToProductsButton, 'Back To Products Button');
  }

  /**
   * Verify item exists in checkout overview
   */
  async verifyItemInCheckoutOverview(productName: string): Promise<void> {
    const items = await this.getCheckoutItems();
    if (!items.some((item) => item.includes(productName))) {
      throw new Error(`Product "${productName}" not found in checkout overview`);
    }
  }

  /**
   * Verify specific item price in checkout
   */
  async verifyItemPriceInCheckout(itemIndex: number, expectedPrice: string): Promise<void> {
    const prices = this.page.locator(this.itemPrice);
    const actualPrice = await prices.nth(itemIndex).textContent();
    if (!actualPrice?.includes(expectedPrice)) {
      throw new Error(`Expected price ${expectedPrice}, got ${actualPrice}`);
    }
  }

  /**
   * Get first name input value
   */
  async getFirstNameValue(): Promise<string> {
    return this.getAttribute(this.firstNameInput, 'value') || '';
  }

  /**
   * Get last name input value
   */
  async getLastNameValue(): Promise<string> {
    return this.getAttribute(this.lastNameInput, 'value') || '';
  }

  /**
   * Get postal code input value
   */
  async getPostalCodeValue(): Promise<string> {
    return this.getAttribute(this.postalCodeInput, 'value') || '';
  }

  /**
   * Clear all checkout fields
   */
  async clearAllFields(): Promise<void> {
    const firstNameElement = this.page.locator(this.firstNameInput);
    const lastNameElement = this.page.locator(this.lastNameInput);
    const postalCodeElement = this.page.locator(this.postalCodeInput);

    await firstNameElement.clear();
    await lastNameElement.clear();
    await postalCodeElement.clear();
  }

  /**
   * Verify checkout title
   */
  async verifyCheckoutTitle(expectedTitle: string): Promise<void> {
    await this.verifyText(this.checkoutTitle, expectedTitle, true);
  }
}
