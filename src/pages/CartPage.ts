/**
 * Cart Page Object Model
 * Handles all cart interactions and validations
 */

import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { APP_URLS } from '../data/testdata';

export class CartPage extends BasePage {
  // Locators
  private readonly cartContainer = '.cart_list';
  private readonly cartItem = '.cart_item';
  private readonly itemName = '.inventory_item_name';
  private readonly itemPrice = '.inventory_item_price';
  private readonly itemQuantity = '.cart_quantity';
  private readonly removeButton = 'button[data-test*="remove"]';
  private readonly checkoutButton = 'button[data-test="checkout"]';
  private readonly continueShoppingButton = 'button[data-test="continue-shopping"]';
  private readonly emptyCartMessage = '.empty_cart';
  private readonly cartBadge = '.shopping_cart_badge';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to cart page
   */
  async navigateToCart(): Promise<void> {
    await this.goto(APP_URLS.cart);
  }

  /**
   * Verify cart page is displayed
   */
  async verifyCartPageDisplayed(): Promise<void> {
    await this.verifyUrl('cart.html');
  }

  /**
   * Get number of items in cart
   */
  async getCartItemCount(): Promise<number> {
    return this.count(this.cartItem);
  }

  /**
   * Get all product names in cart
   */
  async getCartProductNames(): Promise<string[]> {
    return this.getAllText(this.page.locator(this.itemName));
  }

  /**
   * Get all product prices in cart
   */
  async getCartProductPrices(): Promise<string[]> {
    return this.getAllText(this.page.locator(this.itemPrice));
  }

  /**
   * Remove item from cart by index
   */
  async removeItemByIndex(index: number): Promise<void> {
    const removeButtons = this.page.locator(this.removeButton);
    if (index >= await removeButtons.count()) {
      throw new Error(`Item index ${index} is out of range`);
    }
    await removeButtons.nth(index).click();
  }

  /**
   * Remove item from cart by product name
   */
  async removeItemByName(productName: string): Promise<void> {
    const cartItems = this.page.locator(this.cartItem);

    for (let i = 0; i < await cartItems.count(); i++) {
      const name = await cartItems.nth(i).locator(this.itemName).textContent();
      if (name?.trim() === productName.trim()) {
        const button = cartItems.nth(i).locator(this.removeButton);
        await button.click();
        return;
      }
    }

    throw new Error(`Product "${productName}" not found in cart`);
  }

  /**
   * Click checkout button
   */
  async clickCheckout(): Promise<void> {
    await this.click(this.checkoutButton, 'Checkout Button');
  }

  /**
   * Click continue shopping button
   */
  async clickContinueShopping(): Promise<void> {
    await this.click(this.continueShoppingButton, 'Continue Shopping Button');
  }

  /**
   * Verify item exists in cart
   */
  async verifyItemInCart(productName: string): Promise<void> {
    const productNames = await this.getCartProductNames();
    if (!productNames.some((name) => name.includes(productName))) {
      throw new Error(`Product "${productName}" not found in cart`);
    }
  }

  /**
   * Verify item does not exist in cart
   */
  async verifyItemNotInCart(productName: string): Promise<void> {
    const productNames = await this.getCartProductNames();
    if (productNames.some((name) => name.includes(productName))) {
      throw new Error(`Product "${productName}" should not be in cart`);
    }
  }

  /**
   * Verify cart is empty
   */
  async verifyCartEmpty(): Promise<void> {
    const itemCount = await this.getCartItemCount();
    if (itemCount > 0) {
      throw new Error(`Cart should be empty but has ${itemCount} items`);
    }
  }

  /**
   * Verify checkout button is visible
   */
  async verifyCheckoutButtonVisible(): Promise<void> {
    const isVisible = await this.isVisible(this.checkoutButton);
    if (!isVisible) {
      throw new Error('Checkout button should be visible');
    }
  }

  /**
   * Get subtotal
   */
  async getSubtotal(): Promise<string> {
    const subtotalElement = this.page.locator('.summary_subtotal_label');
    try {
      return await this.getText(subtotalElement);
    } catch {
      return 'N/A';
    }
  }

  /**
   * Get total tax
   */
  async getTax(): Promise<string> {
    const taxElement = this.page.locator('.summary_tax_label');
    try {
      return await this.getText(taxElement);
    } catch {
      return 'N/A';
    }
  }

  /**
   * Get total price
   */
  async getTotal(): Promise<string> {
    const totalElement = this.page.locator('.summary_total_label');
    try {
      return await this.getText(totalElement);
    } catch {
      return 'N/A';
    }
  }

  /**
   * Verify specific quantity for item
   */
  async verifyItemQuantity(itemIndex: number, expectedQuantity: string): Promise<void> {
    const quantities = this.page.locator(this.itemQuantity);
    const actualQuantity = await quantities.nth(itemIndex).textContent();
    if (actualQuantity?.trim() !== expectedQuantity) {
      throw new Error(`Expected quantity ${expectedQuantity}, got ${actualQuantity}`);
    }
  }
}
