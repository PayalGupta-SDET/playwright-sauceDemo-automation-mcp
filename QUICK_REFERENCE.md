# Quick Reference Guide - Sauce Demo Automation

## 🚀 Quick Commands

```bash
# Install & Setup
npm install                          # Install dependencies
npx playwright install              # Install browsers
npm test                            # Run all tests
npm run report                      # View HTML report

# Run Specific Tests
npm test -- tests/specs/login/login.spec.ts           # Login only
npm test -- --grep "Valid login"                      # Pattern match
npm test -- --project=chromium                        # Single browser

# Debug & Development
npx playwright test --debug         # Interactive debugger
npx playwright test --headed        # Visible browser
npx playwright codegen https://www.saucedemo.com/    # Record tests

# Utilities
npx tsc --noEmit                   # Check TypeScript
npm run lint                        # Verify types
```

---

## 📊 Test Counts by Suite

| Suite | Count | Focus |
|-------|-------|-------|
| Login | 10 | Authentication, validation, security |
| Products | 12 | Listing, sorting, add to cart |
| Cart | 8 | Management, persistence, totals |
| Checkout | 8 | Flow, validation, completion |
| Edge Cases | 12 | Unusual scenarios, accessibility |
| **TOTAL** | **45+** | **Complete coverage** |

---

## 🏗️ Key Classes & Methods

### BasePage
```typescript
await page.click(selector, label)           // Safe click
await page.fill(selector, text, label)      // Safe fill
await page.verifyText(selector, text)       // Verify text
await page.waitForElement(selector)         // Wait visibility
await page.verifyUrl(expectedUrl)           // Verify URL
```

### LoginPage
```typescript
await loginPage.navigateToLogin()           // Navigate
await loginPage.login(username, password)   // Perform login
await loginPage.verifyErrorMessage(msg)     // Check error
```

### ProductPage
```typescript
await productPage.navigateToProducts()      // Navigate
await productPage.addProductToCartByIndex(0)   // Add product
await productPage.sortProducts('lohi')      // Sort products
await productPage.getAllProductNames()      // Get names
```

### CartPage
```typescript
await cartPage.navigateToCart()             // Navigate
await cartPage.getCartItemCount()           // Count items
await cartPage.removeItemByIndex(0)         // Remove item
await cartPage.clickCheckout()              // Go to checkout
```

### CheckoutPage
```typescript
await checkoutPage.navigateToCheckoutStepOne()
await checkoutPage.fillCheckoutInfo(first, last, zip)
await checkoutPage.clickContinue()
await checkoutPage.clickFinish()
await checkoutPage.verifyCheckoutCompletePage()
```

---

## 📋 Test Data Reference

### Login Credentials
- **standard_user** / secret_sauce → Normal user
- **locked_out_user** / secret_sauce → Locked account
- **performance_glitch_user** / secret_sauce → Slow loading
- **problem_user** / secret_sauce → Visual glitches

### Checkout Info (Valid)
- First Name: John
- Last Name: Doe
- Postal Code: 12345

### URL Endpoints
- Login: https://www.saucedemo.com/
- Products: https://www.saucedemo.com/inventory.html
- Cart: https://www.saucedemo.com/cart.html
- Checkout Step 1: https://www.saucedemo.com/checkout-step-one.html
- Checkout Step 2: https://www.saucedemo.com/checkout-step-two.html

---

## 🎯 Common Test Patterns

### Test a Login Flow
```typescript
test('Login test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLogin();
  await loginPage.login('standard_user', 'secret_sauce');
  
  const productPage = new ProductPage(page);
  await productPage.verifyProductsPageDisplayed();
});
```

### Test Adding to Cart
```typescript
const productPage = new ProductPage(page);
await productPage.navigateToProducts();
await productPage.addProductToCartByIndex(0);
const badgeCount = await productPage.getCartBadgeCount();
expect(parseInt(badgeCount)).toBe(1);
```

### Test Checkout
```typescript
const checkoutPage = new CheckoutPage(page);
await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');
await checkoutPage.clickContinue();
await checkoutPage.verifyCheckoutStepTwoDisplayed();
await checkoutPage.clickFinish();
await checkoutPage.verifyThankYouMessage('Thank you for your order!');
```

---

## 🔧 Debugging Tips

### Enable Logging
```typescript
import { Logger } from '../../src/utils/logger';

Logger.info('Starting test...');
Logger.success('✅ Step passed');
Logger.error('❌ Step failed');
Logger.debug('Debug info');
```

### Use Screenshots
```typescript
await page.screenshot({ path: 'screenshots/test-name.png', fullPage: true });
```

### Wait for Element
```typescript
await page.waitForSelector('.inventory_item', { timeout: 10000 });
```

### Get Element Visibility
```typescript
const isVisible = await page.locator('.error-message').isVisible();
```

### Debug Mode
```bash
npx playwright test --debug
# Step through tests interactively
```

---

## 📁 File Quick Links

| File | Purpose |
|------|---------|
| `src/pages/BasePage.ts` | Base class for all pages |
| `src/utils/helpers.ts` | Reusable utility functions |
| `src/utils/logger.ts` | Logging functionality |
| `src/data/testdata.ts` | Test data & constants |
| `tests/specs/login/login.spec.ts` | Login tests |
| `tests/specs/products/product.spec.ts` | Product tests |
| `tests/specs/cart/cart.spec.ts` | Cart tests |
| `tests/specs/checkout/checkout.spec.ts` | Checkout tests |
| `playwright.config.ts` | Test configuration |
| `package.json` | Dependencies & scripts |

---

## ⚙️ Configuration Quick Edits

### Change Test Timeout
In `playwright.config.ts`:
```typescript
timeout: 60000, // Change from 30000
```

### Add New Locator Strategy
In Page Object:
```typescript
private readonly newElement = 'selector-here';

async interactWithElement(): Promise<void> {
  await this.click(this.newElement, 'Element Label');
}
```

### Create New Test File
```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';

test.describe('New Feature', () => {
  test('Test case', async ({ page }) => {
    const loginPage = new LoginPage(page);
    // ... test code
  });
});
```

---

## 📊 Report Location

After running tests:
- **HTML Report**: `playwright-report/index.html`
- **JUnit Report**: `test-results/junit-report.xml`
- **JSON Report**: `test-results/test-results.json`
- **Screenshots**: `test-results/` (on failure)
- **Videos**: `test-results/` (on failure)

---

## 🐛 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| Browser not found | `npx playwright install --with-deps` |
| Timeout errors | Increase timeout in `playwright.config.ts` |
| Element not found | Check selector in browser DevTools |
| Flaky tests | Enable retries, add explicit waits |
| Port in use | Kill process or change port in config |

---

## 📈 Performance Tips

```bash
# Run tests in parallel
npm test -- --workers=4

# Run single browser (faster)
npm run test:chromium

# Run specific test (faster)
npm test -- --grep "login"

# Run headless (default, faster)
npm test
```

---

## 🔐 Security Checklist

- ✅ No credentials committed to code
- ✅ Use test data from `testdata.ts`
- ✅ Don't store sensitive files in repo
- ✅ Use CI/CD secrets for sensitive data
- ✅ Review test data before committing

---

## 📚 Documentation Links

- **Playwright Docs**: https://playwright.dev/
- **TypeScript Docs**: https://www.typescriptlang.org/
- **Page Object Model**: https://wiki.saucelabs.com/display/DOCS/Page+Object+Model
- **Test Best Practices**: https://martinfowler.com/bliki/TestPyramid.html

---

## 🎯 Next Steps

1. Run setup: `npm install && npx playwright install`
2. Try a test: `npm test -- --heading`
3. Explore code: Check `src/pages/`
4. Review docs: Read TEST_PLAN.md
5. Add custom tests following existing patterns

---

## ✅ One-Minute Test Run

```bash
# 1. Install (one-time)
npm install
npx playwright install

# 2. Run tests
npm test

# 3. View report
npm run report

# Total time: ~2-3 minutes
```

---

**Happy Testing! 🎉**

For detailed help, see:
- [README.md](README.md) - Framework guide
- [TEST_PLAN.md](TEST_PLAN.md) - Test scenarios
- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Installation
