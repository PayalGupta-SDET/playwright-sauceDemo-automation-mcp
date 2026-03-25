/**
 * Login Page Object Model
 * Handles all login interactions and validations
 */

import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { APP_URLS } from '../data/testdata';

export class LoginPage extends BasePage {
  // Locators
  private readonly usernameInput = 'input[data-test="username"]';
  private readonly passwordInput = 'input[data-test="password"]';
  private readonly loginButton = 'input[data-test="login-button"]';
  private readonly errorMessage = 'h3[data-test="error"]';
  private readonly loginContainer = '.login_container';
  private readonly appLogo = '.login_logo';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to login page
   */
  async navigateToLogin(): Promise<void> {
    await this.goto(APP_URLS.login);
    await this.waitForElement(this.loginContainer);
  }

  /**
   * Verify login page is displayed
   */
  async verifyLoginPageDisplayed(): Promise<void> {
    await this.waitForElement(this.appLogo);
    await this.waitForElement(this.usernameInput);
    await this.waitForElement(this.passwordInput);
    await this.waitForElement(this.loginButton);
  }

  /**
   * Perform login with credentials
   */
  async login(username: string, password: string): Promise<void> {
    await this.fill(this.usernameInput, username, 'Username');
    await this.fill(this.passwordInput, password, 'Password');
    await this.click(this.loginButton, 'Login Button');
  }

  /**
   * Verify error message is displayed
   */
  async verifyErrorMessage(expectedError: string): Promise<void> {
    await this.waitForElement(this.errorMessage);
    const errorText = await this.getText(this.errorMessage);
    if (!errorText.includes(expectedError)) {
      throw new Error(`Expected error "${expectedError}" but got "${errorText}"`);
    }
  }

  /**
   * Verify specific error message
   */
  async verifyErrorText(expectedText: string): Promise<void> {
    await this.verifyText(this.errorMessage, expectedText, true);
  }

  /**
   * Login with empty fields
   */
  async attemptLoginWithEmptyFields(): Promise<void> {
    // Username and password fields should be empty by default
    await this.click(this.loginButton, 'Login Button');
  }

  /**
   * Click username field
   */
  async clickUsernameField(): Promise<void> {
    await this.click(this.usernameInput, 'Username Field');
  }

  /**
   * Click password field
   */
  async clickPasswordField(): Promise<void> {
    await this.click(this.passwordInput, 'Password Field');
  }

  /**
   * Clear username field
   */
  async clearUsernameField(): Promise<void> {
    await this.page.locator(this.usernameInput).clear();
  }

  /**
   * Clear password field
   */
  async clearPasswordField(): Promise<void> {
    await this.page.locator(this.passwordInput).clear();
  }

  /**
   * Get current username value
   */
  async getUsernameValue(): Promise<string> {
    return this.getAttribute(this.usernameInput, 'value') || '';
  }

  /**
   * Get current password value
   */
  async getPasswordValue(): Promise<string> {
    return this.getAttribute(this.passwordInput, 'value') || '';
  }

  /**
   * Verify error message is not displayed
   */
  async verifyNoErrorMessage(): Promise<void> {
    const isVisible = await this.isVisible(this.errorMessage);
    if (isVisible) {
      throw new Error('Error message should not be visible');
    }
  }
}
