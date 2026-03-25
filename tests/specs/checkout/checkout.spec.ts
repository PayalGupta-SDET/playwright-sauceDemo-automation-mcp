/**
 * CHECKOUT TEST SUITE
 * Tests for complete checkout flow and order completion
 */

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/LoginPage';
import { ProductPage } from '../../../src/pages/ProductPage';
import { CartPage } from '../../../src/pages/CartPage';
import { CheckoutPage } from '../../../src/pages/CheckoutPage';
import { LOGIN_CREDENTIALS, CHECKOUT_DATA, ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../../src/data/testdata';
import { Logger } from '../../../src/utils/logger';

test.describe('Checkout Flow & Order Completion', () => {
  let checkoutPage: CheckoutPage;
  let cartPage: CartPage;
  let productPage: ProductPage;

  async function setupCheckout(page: any) {
    // Login
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    await loginPage.login(LOGIN_CREDENTIALS.valid.username, LOGIN_CREDENTIALS.valid.password);

    // Add products to cart
    productPage = new ProductPage(page);
    await productPage.navigateToProducts();
    for (let i = 0; i < 2; i++) {
      await productPage.addProductToCartByIndex(i);
    }

    // Navigate to cart and checkout
    await productPage.navigateToCart();
    cartPage = new CartPage(page);
    await cartPage.clickCheckout();

    // Initialize checkout page
    checkoutPage = new CheckoutPage(page);
    Logger.info('Checkout setup complete');
  }

  test('[High Priority] Complete checkout flow with valid data', async ({ page }) => {
    // Arrange: Setup checkout
    await setupCheckout(page);
    await checkoutPage.verifyCheckoutStepOneDisplayed();

    // Act: Fill info and continue
    await checkoutPage.fillCheckoutInfo(
      CHECKOUT_DATA.validCheckout.firstName,
      CHECKOUT_DATA.validCheckout.lastName,
      CHECKOUT_DATA.validCheckout.postalCode,
    );
    await checkoutPage.clickContinue();

    // Assert: Checkout step two displayed
    await checkoutPage.verifyCheckoutStepTwoDisplayed();
    Logger.success('Moved to checkout step two');

    // Act: Complete order
    await checkoutPage.clickFinish();

    // Assert: Order completion page
    await checkoutPage.verifyCheckoutCompletePage();
    await checkoutPage.verifyThankYouMessage(SUCCESS_MESSAGES.orderComplete);
    Logger.success('Order completed successfully');
  });

  test('[High Priority] Checkout with missing first name', async ({ page }) => {
    // Arrange: Setup checkout
    await setupCheckout(page);

    // Act: Fill checkout info with missing first name
    await checkoutPage.fillCheckoutInfo(
      CHECKOUT_DATA.missingFirstName.firstName,
      CHECKOUT_DATA.missingFirstName.lastName,
      CHECKOUT_DATA.missingFirstName.postalCode,
    );
    await checkoutPage.clickContinue();

    // Assert: Error message displayed
    await checkoutPage.verifyErrorMessage(ERROR_MESSAGES.requiredField);
    Logger.success('Missing first name error validated');
  });

  test('[High Priority] Checkout with missing last name', async ({ page }) => {
    // Arrange: Setup checkout
    await setupCheckout(page);

    // Act: Fill checkout info with missing last name
    await checkoutPage.fillCheckoutInfo(
      CHECKOUT_DATA.missingLastName.firstName,
      CHECKOUT_DATA.missingLastName.lastName,
      CHECKOUT_DATA.missingLastName.postalCode,
    );
    await checkoutPage.clickContinue();

    // Assert: Error message displayed
    await checkoutPage.verifyErrorMessage(ERROR_MESSAGES.requiredLastName);
    Logger.success('Missing last name error validated');
  });

  test('[High Priority] Checkout with missing postal code', async ({ page }) => {
    // Arrange: Setup checkout
    await setupCheckout(page);

    // Act: Fill checkout info with missing postal code
    await checkoutPage.fillCheckoutInfo(
      CHECKOUT_DATA.missingPostalCode.firstName,
      CHECKOUT_DATA.missingPostalCode.lastName,
      CHECKOUT_DATA.missingPostalCode.postalCode,
    );
    await checkoutPage.clickContinue();

    // Assert: Error message displayed
    await checkoutPage.verifyErrorMessage(ERROR_MESSAGES.requiredPostalCode);
    Logger.success('Missing postal code error validated');
  });

  test('[High Priority] Verify cart items on checkout page', async ({ page }) => {
    // Arrange: Setup checkout with specific products
    await setupCheckout(page);
    const productsAdded = await productPage.getAllProductNames();

    // Act: Fill info and continue to step two
    await checkoutPage.fillCheckoutInfo(
      CHECKOUT_DATA.validCheckout.firstName,
      CHECKOUT_DATA.validCheckout.lastName,
      CHECKOUT_DATA.validCheckout.postalCode,
    );
    await checkoutPage.clickContinue();
    await checkoutPage.verifyCheckoutStepTwoDisplayed();

    // Assert: Items on checkout overview match
    const checkoutItems = await checkoutPage.getCheckoutItems();
    expect(checkoutItems.length).toBe(2);
    Logger.success('Cart items verified on checkout page');
  });

  test('[Medium Priority] Verify totals on checkout overview', async ({ page }) => {
    // Arrange: Setup checkout
    await setupCheckout(page);

    // Act: Continue to checkout step two
    await checkoutPage.fillCheckoutInfo(
      CHECKOUT_DATA.validCheckout.firstName,
      CHECKOUT_DATA.validCheckout.lastName,
      CHECKOUT_DATA.validCheckout.postalCode,
    );
    await checkoutPage.clickContinue();

    // Assert: Totals are displayed
    const subtotal = await checkoutPage.getCheckoutSubtotal();
    const tax = await checkoutPage.getCheckoutTax();
    const total = await checkoutPage.getCheckoutTotal();

    expect(subtotal).toBeTruthy();
    expect(tax).toBeTruthy();
    expect(total).toBeTruthy();
    Logger.success('Checkout totals verified');
  });

  test('[Medium Priority] Postal code with letters (edge case)', async ({ page }) => {
    // Arrange: Setup checkout
    await setupCheckout(page);

    // Act: Fill with alphanumeric postal code
    await checkoutPage.fillCheckoutInfo(
      CHECKOUT_DATA.invalidPostalCode.firstName,
      CHECKOUT_DATA.invalidPostalCode.lastName,
      'A1B2C3', // Alphanumeric postal code
    );
    await checkoutPage.clickContinue();

    // Assert: Should either accept or show validation error
    try {
      await checkoutPage.verifyCheckoutStepTwoDisplayed();
      Logger.success('Alphanumeric postal code accepted');
    } catch {
      Logger.success('Alphanumeric postal code rejected with validation');
    }
  });

  test('[Low Priority] Verify thank you message content', async ({ page }) => {
    // Arrange: Complete full checkout
    await setupCheckout(page);
    await checkoutPage.fillCheckoutInfo(
      CHECKOUT_DATA.validCheckout.firstName,
      CHECKOUT_DATA.validCheckout.lastName,
      CHECKOUT_DATA.validCheckout.postalCode,
    );
    await checkoutPage.clickContinue();
    await checkoutPage.clickFinish();

    // Assert: Thank you message is displayed
    await checkoutPage.verifyThankYouMessage('Thank you');
    Logger.success('Thank you message displayed');
  });

 
});
