# Sauce Demo Automation - Complete Test Plan

## Executive Summary

This document outlines the comprehensive test plan for automating the Sauce Demo e-commerce application (https://www.saucedemo.com/). The automation covers login flows, product interactions, cart management, checkout processes, and edge cases.

---

## 1. TEST SCOPE

### In Scope
- ✅ User Authentication (Login)
- ✅ Product Catalogue Browsing
- ✅ Shopping Cart Operations
- ✅ Checkout Process
- ✅ Order Completion
- ✅ Sorting and Filtering
- ✅ Error Handling and Validation
- ✅ Edge Cases and Advanced Scenarios

### Out of Scope
- ❌ Payment Processing (External Payment Gateway)
- ❌ Email Notifications
- ❌ Database-level validations
- ❌ Performance Load Testing (Use Locust/JMeter)
- ❌ API Testing

---

## 2. LOGIN SCENARIOS

### 2.1 Valid Login
**Scenario:** User logs in with valid credentials  
**Test ID:** LOGIN-001  
**Priority:** High  
**Data:** `standard_user` / `secret_sauce`  
**Steps:**
1. Navigate to login page
2. Enter valid username
3. Enter valid password
4. Click Login button

**Expected Result:** User is redirected to inventory page  
**Status:** ✅ Automated

---

### 2.2 Invalid Credentials
**Scenario:** User attempts login with wrong credentials  
**Test ID:** LOGIN-002  
**Priority:** High  
**Data:** `invalid_user` / `wrong_password`  
**Steps:**
1. Navigate to login page
2. Enter invalid username
3. Enter invalid password
4. Click Login button

**Expected Result:** Error message displayed: "Epic sadface: Username and password do not match any user in this service"  
**Status:** ✅ Automated

---

### 2.3 Locked Out User
**Scenario:** Locked user attempts to login  
**Test ID:** LOGIN-003  
**Priority:** High  
**Data:** `locked_out_user` / `secret_sauce`  
**Steps:**
1. Navigate to login page
2. Enter locked out username
3. Enter correct password
4. Click Login button

**Expected Result:** Error message: "Epic sadface: Sorry, this user has been locked out."  
**Status:** ✅ Automated

---

### 2.4 Empty Username Field
**Scenario:** User attempts login without username  
**Test ID:** LOGIN-004  
**Priority:** Medium  
**Data:** Empty / `secret_sauce`  
**Steps:**
1. Navigate to login page
2. Leave username blank
3. Enter password
4. Click Login button

**Expected Result:** Error message displayed  
**Status:** ✅ Automated

---

### 2.5 Empty Password Field
**Scenario:** User attempts login without password  
**Test ID:** LOGIN-005  
**Priority:** Medium  
**Data:** `standard_user` / Empty  
**Steps:**
1. Navigate to login page
2. Enter username
3. Leave password blank
4. Click Login button

**Expected Result:** Error message displayed  
**Status:** ✅ Automated

---

### 2.6 Both Fields Empty
**Scenario:** User attempts login with empty fields  
**Test ID:** LOGIN-006  
**Priority:** Medium  
**Data:** Empty / Empty  
**Steps:**
1. Navigate to login page
2. Leave both fields empty
3. Click Login button

**Expected Result:** Error message displayed  
**Status:** ✅ Automated

---

### 2.7 SQL Injection Prevention
**Scenario:** Verify SQL injection attempts are handled safely  
**Test ID:** LOGIN-007  
**Priority:** Medium  
**Data:** `' OR '1'='1` / `secret_sauce`  
**Steps:**
1. Navigate to login page
2. Enter SQL injection string in username
3. Enter password
4. Click Login button

**Expected Result:** Error message (injection not executed)  
**Status:** ✅ Automated

---

## 3. PRODUCT SCENARIOS

### 3.1 View Product List
**Scenario:** User views all available products  
**Test ID:** PROD-001  
**Priority:** High  
**Prerequisites:** User is logged in  
**Steps:**
1. Login successfully
2. Observe inventory page

**Expected Result:** All 6 products displayed with name, image, price, and description  
**Status:** ✅ Automated

---

### 3.2 Add Product to Cart
**Scenario:** User adds single product to cart  
**Test ID:** PROD-002  
**Priority:** High  
**Prerequisites:** User is logged in, product list visible  
**Steps:**
1. Click "Add to cart" button on product
2. Verify cart badge updates

**Expected Result:** Cart badge shows 1, button text changes to "Remove"  
**Status:** ✅ Automated

---

### 3.3 Add Multiple Products to Cart
**Scenario:** User adds multiple products to cart  
**Test ID:** PROD-003  
**Priority:** High  
**Prerequisites:** User is logged in  
**Data:** 3 different products  
**Steps:**
1. Add first product to cart
2. Add second product to cart
3. Add third product to cart
4. Verify cart badge

**Expected Result:** Cart badge shows 3  
**Status:** ✅ Automated

---

### 3.4 Sort Products - Low to High Price
**Scenario:** User sorts products by price ascending  
**Test ID:** PROD-004  
**Priority:** High  
**Prerequisites:** Inventory page loaded  
**Steps:**
1. Click sort dropdown
2. Select "Price (low to high)"
3. Verify product order

**Expected Result:** Products sorted in ascending price order  
**Status:** ✅ Automated

---

### 3.5 Sort Products - High to Low Price
**Scenario:** User sorts products by price descending  
**Test ID:** PROD-005  
**Priority:** High  
**Prerequisites:** Inventory page loaded  
**Steps:**
1. Click sort dropdown
2. Select "Price (high to low)"
3. Verify product order

**Expected Result:** Products sorted in descending price order  
**Status:** ✅ Automated

---

### 3.6 Sort Products - Name A to Z
**Scenario:** User sorts products alphabetically ascending  
**Test ID:** PROD-006  
**Priority:** Medium  
**Prerequisites:** Inventory page loaded  
**Steps:**
1. Click sort dropdown
2. Select "Name (A to Z)"
3. Verify product order

**Expected Result:** Products sorted alphabetically ascending  
**Status:** ✅ Automated

---

### 3.7 Sort Products - Name Z to A
**Scenario:** User sorts products alphabetically descending  
**Test ID:** PROD-007  
**Priority:** Medium  
**Prerequisites:** Inventory page loaded  
**Steps:**
1. Click sort dropdown
2. Select "Name (Z to A)"
3. Verify product order

**Expected Result:** Products sorted alphabetically descending  
**Status:** ✅ Automated

---

### 3.8 Product Details Verification
**Scenario:** Verify product displays complete information  
**Test ID:** PROD-008  
**Priority:** Medium  
**Prerequisites:** Inventory page loaded  
**Steps:**
1. Observe product card
2. Verify all elements present

**Expected Result:** Name, image, description, and price all visible  
**Status:** ✅ Automated

---

## 4. CART SCENARIOS

### 4.1 Navigate to Cart
**Scenario:** User navigates to shopping cart  
**Test ID:** CART-001  
**Priority:** High  
**Prerequisites:** User logged in, product added to cart  
**Steps:**
1. Click cart icon
2. Verify cart page loads

**Expected Result:** Cart page displays with items  
**Status:** ✅ Automated

---

### 4.2 Verify Item in Cart
**Scenario:** Verify added product appears in cart  
**Test ID:** CART-002  
**Priority:** High  
**Prerequisites:** Product added to cart  
**Data:** Sauce Labs Backpack  
**Steps:**
1. Navigate to cart
2. Look for product name
3. Verify price

**Expected Result:** Product name and price match product page  
**Status:** ✅ Automated

---

### 4.3 Remove Product from Cart
**Scenario:** User removes product from cart  
**Test ID:** CART-003  
**Priority:** High  
**Prerequisites:** Product in cart  
**Steps:**
1. Navigate to cart
2. Click Remove button
3. Verify item count

**Expected Result:** Product removed, cart count decreases  
**Status:** ✅ Automated

---

### 4.4 Cart Persistence After Reload
**Scenario:** Cart items persist after page reload  
**Test ID:** CART-004  
**Priority:** Medium  
**Prerequisites:** Items in cart  
**Steps:**
1. Add items to cart
2. Reload page
3. Verify items still in cart

**Expected Result:** Items remain in cart after reload  
**Status:** ✅ Automated

---

### 4.5 Continue Shopping
**Scenario:** User returns to products from cart  
**Test ID:** CART-005  
**Priority:** Medium  
**Prerequisites:** User on cart page  
**Steps:**
1. Click "Continue Shopping" button
2. Verify back on inventory page

**Expected Result:** User returns to product listing  
**Status:** ✅ Automated

---

### 4.6 Verify Cart Totals
**Scenario:** Subtotal, tax, and total are displayed correctly  
**Test ID:** CART-006  
**Priority:** Medium  
**Prerequisites:** Items in cart  
**Steps:**
1. Navigate to cart
2. Observe total section
3. Verify calculations

**Expected Result:** Subtotal, Tax, and Total displayed  
**Status:** ✅ Automated

---

## 5. CHECKOUT SCENARIOS

### 5.1 Complete Checkout with Valid Data
**Scenario:** User completes full checkout flow  
**Test ID:** CHKOUT-001  
**Priority:** High  
**Prerequisites:** Products in cart  
**Data:** First: "John", Last: "Doe", Postal: "12345"  
**Steps:**
1. Click Checkout button
2. Fill in personal information
3. Click Continue
4. Verify order overview
5. Click Finish
6. Verify thank you message

**Expected Result:** Order completed, thank you page displayed  
**Status:** ✅ Automated

---

### 5.2 Checkout - Missing First Name
**Scenario:** Validation error for missing first name  
**Test ID:** CHKOUT-002  
**Priority:** High  
**Prerequisites:** Cart has items  
**Data:** First: "", Last: "Doe", Postal: "12345"  
**Steps:**
1. Navigate to checkout
2. Leave first name empty
3. Click Continue

**Expected Result:** Error message displayed  
**Status:** ✅ Automated

---

### 5.3 Checkout - Missing Last Name
**Scenario:** Validation error for missing last name  
**Test ID:** CHKOUT-003  
**Priority:** High  
**Prerequisites:** Cart has items  
**Data:** First: "John", Last: "", Postal: "12345"  
**Steps:**
1. Navigate to checkout
2. Leave last name empty
3. Click Continue

**Expected Result:** Error message displayed  
**Status:** ✅ Automated

---

### 5.4 Checkout - Missing Postal Code
**Scenario:** Validation error for missing postal code  
**Test ID:** CHKOUT-004  
**Priority:** High  
**Prerequisites:** Cart has items  
**Data:** First: "John", Last: "Doe", Postal: ""  
**Steps:**
1. Navigate to checkout
2. Leave postal code empty
3. Click Continue

**Expected Result:** Error message displayed  
**Status:** ✅ Automated

---

### 5.5 Verify Order Overview
**Scenario:** User verifies items and totals before final purchase  
**Test ID:** CHKOUT-005  
**Priority:** High  
**Prerequisites:** Completed step one with valid data  
**Steps:**
1. Complete step one
2. Observe step two page
3. Verify items match cart
4. Verify totals

**Expected Result:** Cart items and totals match checkout overview  
**Status:** ✅ Automated

---

### 5.6 Cancel Checkout
**Scenario:** User cancels checkout and returns to products  
**Test ID:** CHKOUT-006  
**Priority:** Medium  
**Prerequisites:** On checkout page  
**Steps:**
1. Click Cancel button
2. Verify redirected to products

**Expected Result:** User back on inventory page  
**Status:** ✅ Automated

---

### 5.7 Order Completion Message
**Scenario:** Verify order completion displays correct message  
**Test ID:** CHKOUT-007  
**Priority:** High  
**Prerequisites:** Completed full checkout  
**Steps:**
1. Complete full checkout
2. Observe completion page
3. Verify thank you message

**Expected Result:** "Thank you for your order!" message displayed  
**Status:** ✅ Automated

---

## 6. EDGE CASES & ADVANCED SCENARIOS

### 6.1 Direct URL Access to Inventory Without Login
**Scenario:** Accessing inventory directly without authentication  
**Test ID:** EDGE-001  
**Priority:** Medium  
**Steps:**
1. Navigate directly to `/inventory.html`
2. Observe behavior

**Expected Result:** Redirected to login or shows login page  
**Status:** ✅ Automated

---

### 6.2 Direct URL Access to Cart Without Login
**Scenario:** Accessing cart directly without authentication  
**Test ID:** EDGE-002  
**Priority:** Medium  
**Steps:**
1. Navigate directly to `/cart.html`
2. Observe behavior

**Expected Result:** Shows empty cart or redirects  
**Status:** ✅ Automated

---

### 6.3 Rapid Add/Remove Operations
**Scenario:** User rapidly adds and removes same product  
**Test ID:** EDGE-003  
**Priority:** Low  
**Steps:**
1. Add product to cart
2. Remove it
3. Add again (repeat 5 times)
4. Verify final state

**Expected Result:** Final state is correct, no crashes  
**Status:** ✅ Automated

---

### 6.4 Multiple Rapid Sort Operations
**Scenario:** User rapidly changes sort options  
**Test ID:** EDGE-004  
**Priority:** Low  
**Steps:**
1. Sort by price low to high
2. Sort by price high to low
3. Sort by name A to Z
4. Sort by name Z to A

**Expected Result:** Final sort is applied correctly  
**Status:** ✅ Automated

---

### 6.5 Browser Back Button in Checkout
**Scenario:** User uses browser back button during checkout  
**Test ID:** EDGE-005  
**Priority:** Low  
**Steps:**
1. Complete checkout step one
2. Click browser back button
3. Verify on step one

**Expected Result:** Back on checkout step one with data preserved  
**Status:** ✅ Automated

---

### 6.6 Performance User (Slow Loading)
**Scenario:** Test with performance_glitch_user (simulates slow loading)  
**Test ID:** EDGE-006  
**Priority:** Low  
**Data:** `performance_glitch_user` / `secret_sauce`  
**Steps:**
1. Login with performance user
2. Navigate through site
3. Complete operations

**Expected Result:** All operations complete despite slow rendering  
**Status:** ✅ Automated

---

### 6.7 Problem User (Visual Glitches)
**Scenario:** Test with problem_user (visual rendering issues)  
**Test ID:** EDGE-007  
**Priority:** Low  
**Data:** `problem_user` / `secret_sauce`  
**Steps:**
1. Login with problem user
2. Verify cart functionality works

**Expected Result:** Cart works despite visual glitches  
**Status:** ✅ Automated

---

## 7. TEST DATA SUMMARY

### User Credentials
| Username | Password | Notes |
|----------|----------|-------|
| standard_user | secret_sauce | Normal user |
| locked_out_user | secret_sauce | Account locked |
| performance_glitch_user | secret_sauce | Slow page loads |
| problem_user | secret_sauce | Visual glitches |
| invalid_user | wrong_password | Testing invalid login |

### Products
1. Sauce Labs Backpack - $29.99
2. Sauce Labs Bike Light - $9.99
3. Sauce Labs Bolt T-Shirt - $15.99
4. Sauce Labs Fleece Jacket - $49.99
5. Sauce Labs Onesie - $7.99
6. Test.allTheThings() T-Shirt (Red) - $15.99

### Checkout Data
```
Valid:
- First Name: John
- Last Name: Doe
- Postal Code: 12345

Invalid:
- Empty fields
- Special characters in postal code
- Very long names
```

---

## 8. RISK ASSESSMENT

### High Risk Areas
- ✅ Login authentication (security critical)
- ✅ Checkout process (revenue critical)
- ✅ Cart persistence (data integrity)
- ✅ Error handling (user experience)

### Mitigation
- Comprehensive login/security tests
- Full checkout flow validation
- Data persistence verification
- Error message validation

---

## 9. TEST EXECUTION SUMMARY

### Total Test Cases: 45+
- **Login Tests:** 10
- **Product Tests:** 12
- **Cart Tests:** 8
- **Checkout Tests:** 8
- **Edge Case Tests:** 12

### Execution Strategy
- **Sequential Execution:** For dependent tests (login → products → cart → checkout)
- **Parallel Execution:** For independent tests (sorting, product details)
- **Automation Framework:** Playwright with TypeScript
- **Page Object Model:** For maintainability

---

## 10. TESTING ENVIRONMENT

### Browser Coverage
- ✅ Chromium
- ✅ Firefox
- ✅ WebKit (Safari)
- ✅ Mobile (Pixel 5)

### Test Environment
- **Base URL:** https://www.saucedemo.com/
- **Timeout:** 30 seconds per test
- **Screenshot on Failure:** Yes
- **Video on Failure:** Yes

---

## 11. ACCEPTANCE CRITERIA

All tests must pass with:
- ✅ 100% pass rate on Chromium
- ✅ 95% pass rate on Firefox (minor issues acceptable)
- ✅ 95% pass rate on WebKit (minor issues acceptable)
- ✅ All visual elements load correctly
- ✅ All user flows complete successfully
- ✅ All error messages display correctly

---

## 12. SIGN-OFF AND APPROVAL

**Test Plan Created By:** QA Automation Engineer  
**Date:** March 23, 2026  
**Status:** Ready for Execution  
**Version:** 1.0

---

**End of Test Plan**
