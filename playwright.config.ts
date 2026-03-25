import { defineConfig, devices } from '@playwright/test';

/**
 * Sauce Demo Automation - Playwright Configuration
 * Comprehensive test configuration with multiple projects and reporters
 * 
 * This configuration is designed for the Sauce Demo e-commerce application
 * with support for multiple browsers and detailed reporting
 */

export default defineConfig({
  testDir: './tests/specs',
  outputDir: './test-results',
  
  // Test execution settings
  timeout: 30000,
  expect: {
    timeout: 10000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // Comprehensive reporting
  reporter: [
    ['html', { open: 'never' }],
    ['junit', { outputFile: './test-results/junit-report.xml' }],
    ['json', { outputFile: './test-results/test-results.json' }],
    ['list'],
  ],

  // Shared browser settings
  use: {
    baseURL: 'https://www.saucedemo.com/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    navigationTimeout: 15000,
    actionTimeout: 10000,
  },

  // Multi-browser testing
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
  ],

  // No local server needed - testing external site
  webServer: undefined,
});
