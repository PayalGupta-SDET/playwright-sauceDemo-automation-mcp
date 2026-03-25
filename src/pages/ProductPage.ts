/**
 * Product (Inventory) Page Object Model
 * Handles all product listing, sorting, and interaction
 */

import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { APP_URLS } from '../data/testdata';

export class ProductPage extends BasePage {
  // Locators
  private readonly inventoryContainer = '.inventory_container';
  private readonly productItems = '.inventory_item';
  private readonly productName = '.inventory_item_name';
  private readonly productPrice = '.inventory_item_price';
  private readonly productDescription = '.inventory_item_desc';
  private readonly addToCartButtons = 'button[data-test*="add-to-cart"]';
  private readonly removeButtons = 'button[data-test*="remove"]';
  private readonly sortDropdown = '[data-test="product-sort-container"]';
  private readonly cartBadge = '.shopping_cart_badge';
  private readonly cartLink = 'a.shopping_cart_link';
  private readonly productImage = '.inventory_item_img img';
  private readonly nextButton = 'button.next-button';
  private readonly previousButton = 'button.previous-button';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to products page
   */
  async navigateToProducts(): Promise<void> {
    await this.goto(APP_URLS.inventory);
    await this.waitForElement(this.inventoryContainer);
  }

  /**
   * Verify products page is displayed
   */
  async verifyProductsPageDisplayed(): Promise<void> {
    await this.waitForElement(this.inventoryContainer);
    await this.verifyUrl('inventory.html');
  }

  /**
   * Get all product names
   */
  async getAllProductNames(): Promise<string[]> {
    return this.getAllText(this.page.locator(this.productName));
  }

  /**
   * Get product count
   */
  async getProductCount(): Promise<number> {
    return this.count(this.productItems);
  }

  /**
   * Add product to cart by index (0-based)
   */
  async addProductToCartByIndex(index: number): Promise<void> {
    const buttons = this.page.locator(this.addToCartButtons);
    if (index >= await buttons.count()) {
      throw new Error(`Product index ${index} is out of range`);
    }
    await buttons.nth(index).click();
  }

  /**
   * Add product to cart by name
   */
  async addProductToCartByName(productName: string): Promise<void> {
    const productElement = this.page.locator(this.productItems).filter({
      has: this.page.locator(this.productName),
    });

    for (let i = 0; i < await productElement.count(); i++) {
      const name = await productElement.nth(i).locator(this.productName).textContent();
      if (name?.trim() === productName.trim()) {
        const button = productElement.nth(i).locator(this.addToCartButtons);
        await button.click();
        return;
      }
    }

    throw new Error(`Product "${productName}" not found`);
  }

  /**
   * Remove product from cart by index
   */
  async removeProductByIndex(index: number): Promise<void> {
    const buttons = this.page.locator(this.removeButtons);
    if (index >= await buttons.count()) {
      throw new Error(`Product index ${index} is out of range`);
    }
    await buttons.nth(index).click();
  }

  /**
   * Sort products by option
   */
  async sortProducts(sortOption: string): Promise<void> {
    await this.click(this.sortDropdown, 'Sort Dropdown');
    // For combobox, use selectOption if available, otherwise click the option
    try {
      await this.page.selectOption(this.sortDropdown, sortOption);
    } catch {
      // If selectOption fails, try clicking the option directly
      await this.page.click(`${this.sortDropdown} >> text="${this.getOptionText(sortOption)}"`);
    }
  }

  /**
   * Helper to get display text for sort option
   */
  private getOptionText(sortOption: string): string {
    const optionMap: { [key: string]: string } = {
      'az': 'Name (A to Z)',
      'za': 'Name (Z to A)',
      'lohi': 'Price (low to high)',
      'hilo': 'Price (high to low)',
    };
    return optionMap[sortOption] || sortOption;
  }

  /**
   * Get cart badge count
   */
  async getCartBadgeCount(): Promise<string> {
    const isVisible = await this.isVisible(this.cartBadge);
    if (!isVisible) {
      return '0';
    }
    return this.getText(this.cartBadge);
  }

  /**
   * Navigate to cart
   */
  async navigateToCart(): Promise<void> {
    await this.click(this.cartLink, 'Cart Link');
  }

  /**
   * Get product price by index
   */
  async getProductPriceByIndex(index: number): Promise<string> {
    const prices = this.page.locator(this.productPrice);
    if (index >= await prices.count()) {
      throw new Error(`Product index ${index} is out of range`);
    }
    return prices.nth(index).textContent() || '';
  }

  /**
   * Verify product details displayed
   */
  async verifyProductDetailsDisplayed(productIndex: number): Promise<void> {
    const items = this.page.locator(this.productItems);
    await items.nth(productIndex).locator(this.productName).isVisible();
    await items.nth(productIndex).locator(this.productPrice).isVisible();
    await items.nth(productIndex).locator(this.productDescription).isVisible();
  }

  /**
   * Verify sorted order (price low to high)
   */
  async verifyPriceSortedLowToHigh(): Promise<void> {
    const priceTexts = await this.getAllText(this.page.locator(this.productPrice));
    const prices = priceTexts.map((price) => {
      const match = price.match(/\$(\d+\.\d+)/);
      return match ? parseFloat(match[1]) : 0;
    });

    for (let i = 1; i < prices.length; i++) {
      if (prices[i] < prices[i - 1]) {
        throw new Error(`Prices not sorted in ascending order: ${prices}`);
      }
    }
  }

  /**
   * Verify sorted order (price high to low)
   */
  async verifyPriceSortedHighToLow(): Promise<void> {
    const priceTexts = await this.getAllText(this.page.locator(this.productPrice));
    const prices = priceTexts.map((price) => {
      const match = price.match(/\$(\d+\.\d+)/);
      return match ? parseFloat(match[1]) : 0;
    });

    for (let i = 1; i < prices.length; i++) {
      if (prices[i] > prices[i - 1]) {
        throw new Error(`Prices not sorted in descending order: ${prices}`);
      }
    }
  }

  /**
   * Verify sorted order (name A to Z)
   */
  async verifyNameSortedAToZ(): Promise<void> {
    const names = await this.getAllProductNames();
    const sorted = [...names].sort();

    for (let i = 0; i < names.length; i++) {
      if (names[i] !== sorted[i]) {
        throw new Error(`Names not sorted A to Z: ${names}`);
      }
    }
  }

  /**
   * Verify sorted order (name Z to A)
   */
  async verifyNameSortedZToA(): Promise<void> {
    const names = await this.getAllProductNames();
    const sorted = [...names].sort().reverse();

    for (let i = 0; i < names.length; i++) {
      if (names[i] !== sorted[i]) {
        throw new Error(`Names not sorted Z to A: ${names}`);
      }
    }
  }

  /**
   * Check if product is in cart (button shows "Remove")
   */
  async isProductInCart(productIndex: number): Promise<boolean> {
    const items = this.page.locator(this.productItems);
    const button = items.nth(productIndex).locator(this.addToCartButtons);
    const buttonText = await button.textContent();
    return buttonText?.toLowerCase().includes('remove') || false;
  }
}
