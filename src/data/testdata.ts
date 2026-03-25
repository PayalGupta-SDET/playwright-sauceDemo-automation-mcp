/**
 * Test Data Management
 * Centralized test data for all automation scenarios
 */

export const LOGIN_CREDENTIALS = {
  valid: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  invalid: {
    username: 'invalid_user',
    password: 'wrong_password',
  },
  lockedUser: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
  performanceUser: {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
  },
  problemUser: {
    username: 'problem_user',
    password: 'secret_sauce',
  },
};

export const CHECKOUT_DATA = {
  validCheckout: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345',
  },
  missingFirstName: {
    firstName: '',
    lastName: 'Doe',
    postalCode: '12345',
  },
  missingLastName: {
    firstName: 'John',
    lastName: '',
    postalCode: '12345',
  },
  missingPostalCode: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '',
  },
  invalidPostalCode: {
    firstName: 'Jane',
    lastName: 'Smith',
    postalCode: 'INVALID',
  },
};

export const PRODUCT_SORT_OPTIONS = {
  nameLowToHigh: 'Name (A to Z)',
  nameHighToLow: 'Name (Z to A)',
  priceLowToHigh: 'Price (low to high)',
  priceHighToLow: 'Price (high to low)',
};

export const APP_URLS = {
  base: 'https://www.saucedemo.com/',
  login: 'https://www.saucedemo.com/',
  inventory: 'https://www.saucedemo.com/inventory.html',
  cart: 'https://www.saucedemo.com/cart.html',
  checkout: 'https://www.saucedemo.com/checkout-step-one.html',
  checkoutTwo: 'https://www.saucedemo.com/checkout-step-two.html',
  checkoutComplete: 'https://www.saucedemo.com/checkout-complete.html',
};

export const ERROR_MESSAGES = {
  invalidCredentials: 'Epic sadface: Username and password do not match any user in this service',
  lockedOutUser: 'Epic sadface: Sorry, this user has been locked out.',
  requiredField: 'Error: First Name is required',
  requiredLastName: 'Error: Last Name is required',
  requiredPostalCode: 'Error: Postal Code is required',
  emptyusername: 'Epic sadface: Username is required',
  emptypassword: 'Epic sadface: Password is required',
};

export const SUCCESS_MESSAGES = {
  orderComplete: 'Thank you for your order!',
  logoutSuccess: 'Accepted usernames are:',
};

export const EXPECTED_PRODUCTS = [
  'Sauce Labs Backpack',
  'Sauce Labs Bike Light',
  'Sauce Labs Bolt T-Shirt',
  'Sauce Labs Fleece Jacket',
  'Sauce Labs Onesie',
  'Test.allTheThings() T-Shirt (Red)',
];

export const MAX_RETRIES = 3;
export const RETRY_DELAY = 500; // ms
export const TIMEOUT_DEFAULT = 10000; // ms
export const TIMEOUT_LONG = 30000; // ms
