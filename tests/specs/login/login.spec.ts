/**
 * LOGIN TEST SUITE
 * Tests for user authentication, error handling, and validation
 */

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/LoginPage';
import { ProductPage } from '../../../src/pages/ProductPage';
import { LOGIN_CREDENTIALS, ERROR_MESSAGES, APP_URLS } from '../../../src/data/testdata';
import { Logger } from '../../../src/utils/logger';

test.describe('Login Scenarios', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    await loginPage.verifyLoginPageDisplayed();
    Logger.info('Login page loaded and ready');
  });

  test('[High Priority] Valid login with standard user', async ({ page }) => {
    // Arrange: Login page is displayed
    // Act: Perform valid login
    await loginPage.login(LOGIN_CREDENTIALS.valid.username, LOGIN_CREDENTIALS.valid.password);

    // Assert: User is redirected to products page
    const productPage = new ProductPage(page);
    await productPage.verifyProductsPageDisplayed();
    Logger.success('Valid login test passed');
  });

  test('[High Priority] Invalid credentials error display', async ({ page }) => {
    // Arrange: Login page is displayed
    // Act: Attempt login with invalid credentials
    await loginPage.login(LOGIN_CREDENTIALS.invalid.username, LOGIN_CREDENTIALS.invalid.password);

    // Assert: Error message is displayed
    await loginPage.verifyErrorMessage(ERROR_MESSAGES.invalidCredentials);
    Logger.success('Invalid credentials test passed');
  });

  

  test('[Medium Priority] Empty username field error', async ({ page }) => {
    // Arrange: Login page is displayed
    // Act: Attempt login with empty username
    await loginPage.clearUsernameField();
    await loginPage.fill('input[data-test="password"]', LOGIN_CREDENTIALS.valid.password, 'Password');
    await loginPage.page.locator('input[data-test="login-button"]').click();

    // Assert: Error message is displayed
    await loginPage.verifyErrorMessage(ERROR_MESSAGES.emptyusername);
    Logger.success('Empty username test passed');
  });

  test('[Medium Priority] Empty password field error', async ({ page }) => {
    // Arrange: Login page is displayed
    // Act: Attempt login with empty password
    await loginPage.fill('input[data-test="username"]', LOGIN_CREDENTIALS.valid.username, 'Username');
    await loginPage.clearPasswordField();
    await loginPage.page.locator('input[data-test="login-button"]').click();

    // Assert: Error message is displayed
    await loginPage.verifyErrorMessage(ERROR_MESSAGES.emptypassword);
    Logger.success('Empty password test passed');
  });

  test('[Medium Priority] Both fields empty error', async ({ page }) => {
    // Arrange: Login page is displayed with empty fields
    // Act: Click login button without entering credentials
    await loginPage.attemptLoginWithEmptyFields();

    // Assert: Error message is displayed
    await loginPage.verifyErrorMessage(ERROR_MESSAGES.emptyusername);
    Logger.success('Both fields empty test passed');
  });

  test('[Low Priority] Case sensitivity check - lowercase username', async ({ page }) => {
    // Arrange: Login page is displayed
    // Act: Attempt login with lowercase username
    await loginPage.login('standard_user', LOGIN_CREDENTIALS.valid.password);

    // Assert: User is logged in (lowercase should work)
    const productPage = new ProductPage(page);
    await productPage.verifyProductsPageDisplayed();
    Logger.success('Lowercase username test passed');
  });
})
