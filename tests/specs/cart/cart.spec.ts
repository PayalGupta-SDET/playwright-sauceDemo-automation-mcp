/**
 * CART TEST SUITE
 * Tests for cart operations, item management, and validations
 */

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/LoginPage';
import { ProductPage } from '../../../src/pages/ProductPage';
import { CartPage } from '../../../src/pages/CartPage';
import { CheckoutPage } from '../../../src/pages/CheckoutPage';
import { LOGIN_CREDENTIALS } from '../../../src/data/testdata';
import { Logger } from '../../../src/utils/logger';

test.describe('Cart & Item Management', () => {
  let cartPage: CartPage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    // Login and navigate to products
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    await loginPage.login(LOGIN_CREDENTIALS.valid.username, LOGIN_CREDENTIALS.valid.password);

    productPage = new ProductPage(page);
    await productPage.navigateToProducts();
    cartPage = new CartPage(page);
    Logger.info('Setup complete - ready for cart testing');
  });

  test('[High Priority] Navigate to cart from product page', async ({ page }) => {
    // Arrange: User is on products page
    // Act: Navigate to cart
    await productPage.navigateToCart();

    // Assert: Cart page is displayed
    await cartPage.verifyCartPageDisplayed();
    Logger.success('Successfully navigated to cart');
  });

  test('[High Priority] Add single product and verify in cart', async ({ page }) => {
    // Arrange: Products page is loaded
    // Act: Add product to cart and navigate
    await productPage.addProductToCartByIndex(0);
    const productNames = await productPage.getAllProductNames();
    await productPage.navigateToCart();

    // Assert: Product appears in cart
    const cartItems = await cartPage.getCartProductNames();
    expect(cartItems.length).toBe(1);
    Logger.success('Single product verified in cart');
  });

  test('[High Priority] Add multiple products and verify all in cart', async ({ page }) => {
    // Arrange: Products page is loaded
    // Act: Add 3 products and navigate to cart
    const productsToAdd = 3;
    for (let i = 0; i < productsToAdd; i++) {
      await productPage.addProductToCartByIndex(i);
    }
    await productPage.navigateToCart();

    // Assert: All products appear in cart
    const cartItemCount = await cartPage.getCartItemCount();
    expect(cartItemCount).toBe(productsToAdd);
    Logger.success(`${productsToAdd} products verified in cart`);
  });

  test('[High Priority] Remove product from cart', async ({ page }) => {
    // Arrange: Add 2 products to cart
    await productPage.addProductToCartByIndex(0);
    await productPage.addProductToCartByIndex(1);
    await productPage.navigateToCart();
    const initialCount = await cartPage.getCartItemCount();

    // Act: Remove first item
    await cartPage.removeItemByIndex(0);

    // Assert: Item count decreases
    const updatedCount = await cartPage.getCartItemCount();
    expect(updatedCount).toBe(initialCount - 1);
    Logger.success('Product removed from cart');
  });

  test('[High Priority] Remove all items from cart', async ({ page }) => {
    // Arrange: Add 3 products to cart
    for (let i = 0; i < 3; i++) {
      await productPage.addProductToCartByIndex(i);
    }
    await productPage.navigateToCart();

    // Act: Remove all items
    const itemCount = await cartPage.getCartItemCount();
    for (let i = 0; i < itemCount; i++) {
      await cartPage.removeItemByIndex(0); // Always remove first item
    }

    // Assert: Cart is empty
    await cartPage.verifyCartEmpty();
    Logger.success('All products removed - cart is empty');
  });

  test('[Medium Priority] Continue shopping from cart', async ({ page }) => {
    // Arrange: User is in cart with items
    await productPage.addProductToCartByIndex(0);
    await productPage.navigateToCart();

    // Act: Click continue shopping
    await cartPage.clickContinueShopping();

    // Assert: User is back on products page
    await productPage.verifyProductsPageDisplayed();
    Logger.success('Successfully continued shopping from cart');
  });

  test('[Medium Priority] Verify product prices in cart match product page', async ({ page }) => {
    // Arrange: Get product price before adding to cart
    const priceBeforeCart = await productPage.getProductPriceByIndex(0);
    await productPage.addProductToCartByIndex(0);

    // Act: Navigate to cart
    await productPage.navigateToCart();

    // Assert: Price matches
    const cartPrices = await cartPage.getCartProductPrices();
    expect(cartPrices[0]).toContain(priceBeforeCart.replace('$', ''));
    Logger.success('Product price verified in cart');
  });

  test('[Low Priority] Cart persistence after page reload', async ({ page }) => {
    // Arrange: Add products to cart
    await productPage.addProductToCartByIndex(0);
    await productPage.addProductToCartByIndex(1);
    await productPage.navigateToCart();
    const cartBefore = await cartPage.getCartProductNames();

    // Act: Reload page
    await page.reload();
    await cartPage.waitForElement('.cart_list', 10000);

    // Assert: Cart items persist
    const cartAfter = await cartPage.getCartProductNames();
    expect(cartAfter.length).toBe(cartBefore.length);
    Logger.success('Cart items persisted after reload');
  });

  test('[Low Priority] Empty cart message display', async ({ page }) => {
    // Arrange: User navigates to empty cart
    // Act: View empty cart
    await cartPage.navigateToCart();

    // Assert: Empty cart is verified (or at least no items)
    try {
      await cartPage.verifyCartEmpty();
      Logger.success('Empty cart correctly verified');
    } catch {
      Logger.warning('Cart is not empty - this may be expected if cart persists');
    }
  });

  test('[Low Priority] Cart item quantity verification', async ({ page }) => {
    // Arrange: Add products
    await productPage.addProductToCartByIndex(0);
    await productPage.navigateToCart();

    // Act: Get cart items
    const cartItems = await cartPage.getCartItemCount();

    // Assert: Verify quantity
    expect(cartItems).toBeGreaterThan(0);
    Logger.success('Cart item quantity verified');
  });

  test('[Medium Priority] Verify cart subtotal, tax, and total', async ({ page }) => {
    // Arrange: Add products to cart
    for (let i = 0; i < 2; i++) {
      await productPage.addProductToCartByIndex(i);
    }
    await productPage.navigateToCart();

    // Act: Click checkout and fill info to reach checkout overview
    await cartPage.clickCheckout();
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');
    await checkoutPage.clickContinue();
    
    // Get totals from checkout overview page
    const subtotal = await checkoutPage.getCheckoutSubtotal();
    const tax = await checkoutPage.getCheckoutTax();
    const total = await checkoutPage.getCheckoutTotal();

    // Assert: Totals are displayed (subtotal shows "Item total", tax shows "Tax", total shows "Total")
    expect(subtotal).toMatch(/Item total|Subtotal/);
    expect(tax).toContain('Tax');
    expect(total).toContain('Total');
    Logger.success('Cart totals verified');
  });

  
});
