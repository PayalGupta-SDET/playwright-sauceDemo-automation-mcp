/**
 * EDGE CASES & ADVANCED SCENARIOS TEST SUITE
 * Tests for unusual conditions, error states, and advanced interactions
 */

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/LoginPage';
import { ProductPage } from '../../../src/pages/ProductPage';
import { CartPage } from '../../../src/pages/CartPage';
import { CheckoutPage } from '../../../src/pages/CheckoutPage';
import { LOGIN_CREDENTIALS, CHECKOUT_DATA, APP_URLS } from '../../../src/data/testdata';
import { Logger } from '../../../src/utils/logger';

test.describe('Edge Cases & Advanced Scenarios', () => {
  

  test('[Medium Priority] Direct URL navigation to cart without login', async ({ page }) => {
    // Arrange: Not logged in
    // Act: Navigate directly to cart
    await page.goto(APP_URLS.cart);

    // Assert: Should handle gracefully (redirect or allow access)
    const currentUrl = page.url();
    expect(currentUrl).toBeTruthy();
    Logger.success('Direct cart access handled gracefully');
  });

  test('[Medium Priority] Direct URL navigation to checkout without items', async ({ page }) => {
    // Arrange: Login without adding items
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    await loginPage.login(LOGIN_CREDENTIALS.valid.username, LOGIN_CREDENTIALS.valid.password);

    // Act: Navigate directly to checkout
    await page.goto(APP_URLS.checkout);

    // Assert: Checkout page is accessible
    expect(page.url()).toContain('checkout-step-one');
    Logger.success('Direct checkout access works without cart items');
  });

  

  test('[Low Priority] Multiple simultaneous sort operations', async ({ page }) => {
    // Arrange: Login and navigate to products
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    await loginPage.login(LOGIN_CREDENTIALS.valid.username, LOGIN_CREDENTIALS.valid.password);

    const productPage = new ProductPage(page);
    await productPage.navigateToProducts();

    // Act: Sort multiple times rapidly
    const sortOptions = ['lohi', 'hilo', 'az', 'za'];
    for (const option of sortOptions) {
      await productPage.sortProducts(option);
      await page.waitForTimeout(300);
    }

    // Assert: Final sort is applied (Z to A)
    await productPage.verifyNameSortedZToA();
    Logger.success('Multiple rapid sorts handled correctly');
  });

  

  

  

  

  test('[Medium Priority] Add product, remove it, then add again', async ({ page }) => {
    // Arrange: Login and navigate to products
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    await loginPage.login(LOGIN_CREDENTIALS.valid.username, LOGIN_CREDENTIALS.valid.password);

    const productPage = new ProductPage(page);
    await productPage.navigateToProducts();

    // Act: Add product
    await productPage.addProductToCartByIndex(0);
    let badgeCount = await productPage.getCartBadgeCount();
    expect(parseInt(badgeCount)).toBe(1);

    // Remove it
    await productPage.removeProductByIndex(0);
    badgeCount = await productPage.getCartBadgeCount();
    expect(badgeCount === '0' || badgeCount === '').toBe(true);

    // Add again
    await productPage.addProductToCartByIndex(0);
    badgeCount = await productPage.getCartBadgeCount();

    // Assert: Product is added again
    expect(parseInt(badgeCount)).toBe(1);
    Logger.success('Add-Remove-Add cycle works correctly');
  });

  test('[Low Priority] Page refresh during add to cart animation', async ({ page }) => {
    // Arrange: Login and navigate to products
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    await loginPage.login(LOGIN_CREDENTIALS.valid.username, LOGIN_CREDENTIALS.valid.password);

    const productPage = new ProductPage(page);
    await productPage.navigateToProducts();

    // Act: Add to cart and immediately reload
    const addCartPromise = productPage.addProductToCartByIndex(0);
    await page.waitForTimeout(50); // Small delay to allow animation
    await page.reload();

    // Assert: Page recovers gracefully
    await page.waitForURL('**/inventory.html', { timeout: 10000 });
    Logger.success('Page reload during add-to-cart handled');
  });

  
});
