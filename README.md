# 🧪 Sauce Demo - Complete Playwright Automation Suite

A comprehensive, production-ready automation framework for testing the Sauce Demo e-commerce application using Playwright with TypeScript, Page Object Model design pattern, and advanced testing practices.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Test Coverage](#test-coverage)
- [Framework Architecture](#framework-architecture)
- [Best Practices](#best-practices)
- [CI/CD Integration](#cicd-integration)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

This project provides a complete automation solution for **https://www.saucedemo.com/** covering:

✅ **45+ Automated Tests**
- Login Scenarios (10 tests)
- Product Interactions (12 tests)
- Shopping Cart Operations (8 tests)
- Checkout Process (8 tests)
- Edge Cases & Advanced Scenarios (12 tests)

✅ **Multi-Browser Testing**
- Chromium
- Firefox
- WebKit
- Mobile (Pixel 5)

✅ **Comprehensive Reporting**
- HTML Reports
- JUnit XML
- JSON Results
- Video/Screenshot Artifacts

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn
- Windows, macOS, or Linux

### Setup

```bash
# Navigate to project directory
cd "Playwright Automation"

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Run all tests
npm test

# Run specific test file
npm test -- tests/specs/login/login.spec.ts

# Open test report
npm run report
```

---

## 📁 Project Structure

```
Playwright Automation/
├── src/
│   ├── pages/
│   │   ├── BasePage.ts           # Base class for all page objects
│   │   ├── LoginPage.ts          # Login page interactions
│   │   ├── ProductPage.ts        # Product listing & sorting
│   │   ├── CartPage.ts           # Shopping cart operations
│   │   └── CheckoutPage.ts       # Checkout flow
│   ├── utils/
│   │   ├── logger.ts             # Custom logging utility
│   │   └── helpers.ts            # Reusable utility functions
│   └── data/
│       └── testdata.ts           # Test data & constants
├── tests/
│   └── specs/
│       ├── login/
│       │   └── login.spec.ts     # Login test suite
│       ├── products/
│       │   └── product.spec.ts   # Product test suite
│       ├── cart/
│       │   └── cart.spec.ts      # Cart test suite
│       ├── checkout/
│       │   └── checkout.spec.ts  # Checkout test suite
│       └── edgecases/
│           └── edgecases.spec.ts # Edge cases test suite
├── playwright.config.ts           # Playwright configuration
├── package.json                   # Dependencies & scripts
├── TEST_PLAN.md                   # Comprehensive test plan
└── README.md                      # This file
```

---

## 💻 Installation

### 1. Clone or Setup Project

```bash
git clone <repository-url>
cd "Playwright Automation"
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Playwright Browsers

```bash
npx playwright install
```

### 4. Verify Installation

```bash
npx playwright --version
```

---

## 🎮 Usage

### Run All Tests

```bash
npm test
```

### Run Specific Test Suite

```bash
# Login tests only
npm test -- tests/specs/login/login.spec.ts

# Product tests only
npm test -- tests/specs/products/product.spec.ts

# Cart tests only
npm test -- tests/specs/cart/cart.spec.ts

# Checkout tests only
npm test -- tests/specs/checkout/checkout.spec.ts

# Edge cases only
npm test -- tests/specs/edgecases/edgecases.spec.ts
```

### Run Specific Test

```bash
npm test -- --grep "Valid login with standard user"
```

### Run Tests with Debugging

```bash
# Debug mode (opens Playwright Inspector)
npx playwright test --debug

# Headed mode (visible browser)
npx playwright test --headed

# Single browser (Chromium only)
npx playwright test --project=chromium
```

### Generate Reports

```bash
# View HTML report
npm run report

# Or manually
npx playwright show-report
```

---

## 📊 Test Coverage

### Login Scenarios (10 tests)
- ✅ Valid login with standard user
- ✅ Invalid credentials error
- ✅ Locked out user error
- ✅ Empty username field validation
- ✅ Empty password field validation
- ✅ Both fields empty validation
- ✅ SQL injection prevention
- ✅ Case sensitivity handling
- ✅ Whitespace handling
- ✅ Error recovery flow

### Product Interactions (12 tests)
- ✅ View product list
- ✅ Add single product to cart
- ✅ Add multiple products to cart
- ✅ Add product by name
- ✅ Remove product from cart
- ✅ Sort by price (low to high)
- ✅ Sort by price (high to low)
- ✅ Sort by name (A to Z)
- ✅ Sort by name (Z to A)
- ✅ Verify product details
- ✅ Product images loaded
- ✅ Cart button states

### Cart Operations (8 tests)
- ✅ Navigate to cart
- ✅ Verify added items
- ✅ Remove items from cart
- ✅ Cart persistence
- ✅ Continue shopping
- ✅ Cart totals calculation
- ✅ Remove item by name
- ✅ Empty cart handling

### Checkout Flow (8 tests)
- ✅ Complete checkout with valid data
- ✅ Missing first name validation
- ✅ Missing last name validation
- ✅ Missing postal code validation
- ✅ Verify order overview
- ✅ Cancel checkout
- ✅ Order completion message
- ✅ Multiple retry attempts

### Edge Cases (12 tests)
- ✅ Direct URL access without login
- ✅ Rapid add/remove operations
- ✅ Multiple rapid sorts
- ✅ Browser back button
- ✅ Very long names
- ✅ Tab key navigation
- ✅ Logout during checkout
- ✅ Add-Remove-Add cycle
- ✅ Page refresh during actions
- ✅ Performance user (slow loading)
- ✅ Problem user (visual glitches)
- ✅ Accessibility features

---

## 🏗️ Framework Architecture

### Page Object Model (POM) Pattern

Each page is represented as a class with:
- **Locators** - CSS/XPath selectors
- **Methods** - Actions on the page
- **Assertions** - Validations

**Example: LoginPage.ts**
```typescript
export class LoginPage extends BasePage {
  private readonly usernameInput = 'input[data-test="username"]';
  private readonly passwordInput = 'input[data-test="password"]';
  private readonly loginButton = 'input[data-test="login-button"]';

  async login(username: string, password: string): Promise<void> {
    await this.fill(this.usernameInput, username, 'Username');
    await this.fill(this.passwordInput, password, 'Password');
    await this.click(this.loginButton, 'Login Button');
  }
}
```

### Helper Functions

Reusable utilities for common operations:
- **retryOperation** - Retry logic for flaky operations
- **safeClick** - Click with visibility check
- **safeFill** - Fill with field clearing
- **verifyText** - Text validation
- **waitForElement** - Element visibility waiting

### Test Data Management

Centralized test data in `/src/data/testdata.ts`:
```typescript
export const LOGIN_CREDENTIALS = {
  valid: { username: 'standard_user', password: 'secret_sauce' },
  invalid: { username: 'invalid_user', password: 'wrong_password' },
  // ...
};
```

### Logging

Custom logger for visibility:
```typescript
Logger.info('Test started');
Logger.success('Login successful');
Logger.warning('Element not found, retrying...');
Logger.error('Test failed with error');
```

---

## ✨ Best Practices

### 1. **Robust Locators**
- Use `data-test` attributes when available
- Avoid brittle XPath expressions
- Use role-based selectors when possible

### 2. **Wait Strategies**
- Always wait for element visibility before interaction
- Use appropriate timeouts
- Implement retry logic for flaky operations

### 3. **Error Handling**
- Gracefully handle missing elements
- Provide meaningful error messages
- Log all operations for debugging

### 4. **Test Independence**
- Each test is independent
- Proper setup and teardown
- No shared state between tests

### 5. **Maintainability**
- Use Page Object Model pattern
- Keep tests DRY (Don't Repeat Yourself)
- Use descriptive test names
- Add comments for complex logic

### 6. **Performance**
- Use `waitForLoadState` instead of hard delays
- Implement retry mechanisms
- Parallel execution where possible

---

## 🔄 CI/CD Integration

### GitHub Actions Example

```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

### Running on CI

```bash
npm test -- --reporter=junit
```

---

## 🐛 Troubleshooting

### Browser Installation Issues

```bash
# Reinstall browsers
npx playwright install --with-deps
```

### Test Timeouts

Increase timeout in `playwright.config.ts`:
```typescript
timeout: 60000, // 60 seconds
```

### Element Not Found

1. Check if element selector is correct
2. Verify element is visible on page
3. Check for dynamic content loading
4. Use browser DevTools to confirm selector

### Flaky Tests

1. Increase retry attempts in config
2. Add explicit waits for loading states
3. Use `waitForLoadState('networkidle')`
4. Verify test data consistency

### Debug Mode

```bash
# Run with Inspector
npx playwright test --debug

# Run headed (see browser)
npx playwright test --headed

# Generate trace file
npx playwright test --trace on
```

---

## 📈 Test Metrics & Reporting

### HTML Report
```bash
npm run report
```

Includes:
- Test execution timeline
- Pass/Fail statistics
- Screenshots on failure
- Video recordings
- Browser compatibility matrix

### JUnit XML Report
Generated at: `test-results/junit-report.xml`

### JSON Report
Generated at: `test-results/test-results.json`

---

## 🔐 Security Considerations

- ✅ No hardcoded passwords in test code
- ✅ Test credentials from public demo (safe to use)
- ✅ SQL injection prevention tested
- ✅ XSS protection validated
- ✅ Session handling tested

---

## 📚 Test Data Reference

### User Accounts
| Username | Password | Type |
|----------|----------|------|
| standard_user | secret_sauce | Standard |
| locked_out_user | secret_sauce | Locked |
| performance_glitch_user | secret_sauce | Slow |
| problem_user | secret_sauce | Visual Issues |

### Products
1. Sauce Labs Backpack - $29.99
2. Sauce Labs Bike Light - $9.99
3. Sauce Labs Bolt T-Shirt - $15.99
4. Sauce Labs Fleece Jacket - $49.99
5. Sauce Labs Onesie - $7.99
6. Test.allTheThings() T-Shirt - $15.99

---

## 🎓 Learning Resources

### Playwright Documentation
- [Playwright Official Docs](https://playwright.dev/)
- [Assertion Library](https://playwright.dev/docs/test-assertions)
- [Best Practices](https://playwright.dev/docs/best-practices)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Page Object Model Pattern](https://wiki.saucelabs.com/display/DOCS/Page+Object+Model)

### Testing Concepts
- [Test Automation Pyramid](https://martinfowler.com/bliki/TestPyramid.html)
- [SOLID Principles in Testing](https://www.sitepoint.com/solid-principles-in-test-automation/)

---

## 🤝 Contributing

To add new tests:

1. Create test file in appropriate directory
2. Follow existing test structure
3. Use Page Object Model
4. Add comprehensive assertions
5. Document test purpose
6. Run tests locally before committing

---

## 📝 License

This project is for educational and demonstration purposes.

---

## 👥 Support

For issues, questions, or suggestions:

1. Check existing documentation
2. Review test files for similar scenarios
3. Check Playwright documentation
4. Enable debug mode for troubleshooting

---

## 📞 Contact & Version Info

**Framework Version:** 1.0  
**Playwright Version:** Latest  
**TypeScript Version:** Latest  
**Node Version:** 16+  
**Created:** March 23, 2026  

---

## ✅ Quick Verification Checklist

After setup, verify everything works:

- [ ] Dependencies installed (`npm install`)
- [ ] Browsers installed (`npx playwright install`)
- [ ] Tests run successfully (`npm test`)
- [ ] Report generates (`npm run report`)
- [ ] All 45+ tests pass
- [ ] No console errors

---

**Happy Testing! 🎉**

For detailed test scenarios, see [TEST_PLAN.md](TEST_PLAN.md)
