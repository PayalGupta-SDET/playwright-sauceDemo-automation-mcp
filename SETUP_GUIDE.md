# 🔧 Setup & Installation Guide

## Complete Installation Instructions for Sauce Demo Automation

---

## Prerequisites

Before starting, ensure you have:

- **Node.js** 16.x or higher
- **npm** 8.x or higher (comes with Node.js)
- **Git** (optional, for version control)
- **Visual Studio Code** (recommended editor)
- **Windows, macOS, or Linux**

### Verify Prerequisites

```bash
# Check Node.js version
node --version

# Check npm version
npm --version
```

Expected output: Node v16+ and npm 8+

---

## Step 1: Organize Workspace

Navigate to your project directory:

```bash
cd "Playwright Automation"
```

---

## Step 2: Install Dependencies

Install all required npm packages:

```bash
npm install
```

This installs:
- `@playwright/test` - Playwright testing library
- `@types/node` - TypeScript types for Node.js
- `typescript` - TypeScript compiler

**Expected output:**
```
added 200+ packages in 30s
```

---

## Step 3: Install Playwright Browsers

Download and install Playwright browsers (required for testing):

```bash
npx playwright install
```

This installs:
- ✅ Chromium
- ✅ Firefox
- ✅ WebKit

**Note:** This may take 5-10 minutes depending on internet speed and disk space.

---

## Step 4: Verify Installation

Run verification commands:

```bash
# Check Playwright installation
npx playwright --version

# Check TypeScript compilation
npx tsc --version

# Try a simple test run
npm test
```

---

## Step 5: Generate TypeScript Types (Optional)

If using VS Code, improve IntelliSense:

```bash
npm run lint
```

---

## Project Structure Verification

After installation, verify this structure exists:

```
Playwright Automation/
├── src/
│   ├── pages/
│   │   ├── BasePage.ts
│   │   ├── LoginPage.ts
│   │   ├── ProductPage.ts
│   │   ├── CartPage.ts
│   │   └── CheckoutPage.ts
│   ├── utils/
│   │   ├── logger.ts
│   │   ├── helpers.ts
│   │   └── mcp-integration.ts
│   └── data/
│       └── testdata.ts
├── tests/
│   └── specs/
│       ├── login/
│       │   └── login.spec.ts
│       ├── products/
│       │   └── product.spec.ts
│       ├── cart/
│       │   └── cart.spec.ts
│       ├── checkout/
│       │   └── checkout.spec.ts
│       └── edgecases/
│           └── edgecases.spec.ts
├── .playwright/
│   └── [browser files]
├── node_modules/
│   └── [dependencies]
├── playwright.config.ts
├── tsconfig.json
├── package.json
├── TEST_PLAN.md
└── README.md
```

---

## First Test Run

Run all tests:

```bash
npm test
```

Expected behavior:
- Tests execute across browsers
- HTML report generates at: `playwright-report/index.html`
- Summary shows: "45+ tests, X passed, Y failed"

---

## Troubleshooting Installation

### Issue: Cannot find module '@playwright/test'

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npx playwright install
```

### Issue: Browser installation fails

**Solution:**
```bash
# Install dependencies (Linux/Mac)
npx playwright install-deps

# Or Windows: Use admin prompt
npx playwright install --with-deps
```

### Issue: TestTimeout - Tests running too slow

**Solution:** Add to `playwright.config.ts`:
```typescript
timeout: 60000, // 60 seconds
```

### Issue: Permission denied errors

**Solution (Linux/Mac):**
```bash
chmod +x node_modules/.bin/*
npx playwright install
```

---

## IDE Configuration (VS Code)

### Extensions to Install

1. **Playwright Test for VSCode**
   - ID: `ms-playwright.playwright`
   - Provides test runners, execution, and debugging

2. **TypeScript Vue Plugin**
   - ID: `Vue.volar`
   - Better TypeScript support

3. **Prettier - Code formatter**
   - ID: `esbenp.prettier-vscode`
   - Auto-format code

### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "playwright.timeout": 30000,
  "playwright.headless": true
}
```

---

## Running Tests from VS Code

### Method 1: Extension UI
1. Install "Playwright Test for VSCode" extension
2. Open test file
3. Click "▶️ Run" next to test name

### Method 2: Terminal
1. Open terminal (Ctrl + `)
2. Run: `npm test`
3. View results in terminal

### Method 3: Debug
1. Set breakpoint in test
2. Click "🐛 Debug" next to test
3. Step through execution

---

## System Requirements

### Minimum
- RAM: 4GB
- Disk Space: 2GB (for browsers + dependencies)
- Network: Required for initial download

### Recommended
- RAM: 8GB+
- Disk Space: 5GB+
- Network: Fast internet (for CI/CD)
- CPU: Multi-core preferred

---

## Network Configuration

### Behind Corporate Proxy

Set npm proxy:
```bash
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080
```

### Behind VPN

Ensure VPN is connected before:
```bash
npm install
npx playwright install
npm test
```

---

## Docker Installation (Optional)

Run Playwright in Docker for isolation:

```dockerfile
FROM mcr.microsoft.com/playwright:v1.40.0-jammy

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

CMD ["npm", "test"]
```

Build and run:
```bash
docker build -t sauce-demo-tests .
docker run sauce-demo-tests
```

---

## CI/CD Setup

### GitHub Actions

Create `.github/workflows/tests.yml`:

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
      - run: npx playwright install
      - run: npm test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: test-results
          path: test-results/
```

### GitLab CI

Create `.gitlab-ci.yml`:

```yaml
test:
  image: mcr.microsoft.com/playwright:v1.40.0-jammy
  script:
    - npm install
    - npm test
  artifacts:
    paths:
      - test-results/
    reports:
      junit: test-results/junit-report.xml
```

---

## Performance Tips

### 1. Parallel Execution
```bash
# Run tests in parallel (faster)
npm test -- --workers=4
```

### 2. Single Browser Test
```bash
# Test only Chromium (faster)
npm run test:chromium
```

### 3. Headless Mode
```bash
# Default - faster, no UI
npm test
```

### 4. Filter Tests
```bash
# Run only login tests
npm test -- --grep "login"
```

---

## Security Checklist

Before committing to version control:

- ✅ Remove `.env` files from git
- ✅ Don't commit sensitive data
- ✅ Use secrets in CI/CD pipelines
- ✅ Keep dependencies updated
- ✅ Review test data for sensitive info

---

## Next Steps

After successful installation:

1. **Read TEST_PLAN.md** - Understand test coverage
2. **Review README.md** - Learn framework structure
3. **Run first test** - `npm test`
4. **Explore code** - Review page objects in `src/pages/`
5. **Run with debug** - `npx playwright test --debug`
6. **Add custom tests** - Follow existing patterns

---

## Support & Help

- **Playwright Docs:** https://playwright.dev/
- **TypeScript Docs:** https://www.typescriptlang.org/docs/
- **Node.js Docs:** https://nodejs.org/docs/

---

## Installation Checklist

After following all steps, verify:

- [ ] Node.js installed (16+)
- [ ] npm install completed
- [ ] Playwright browsers installed
- [ ] npm test runs successfully
- [ ] Report generates at playwright-report/index.html
- [ ] All 45+ tests visible in report
- [ ] No console errors

---

**✅ Installation Complete!**

You're ready to run comprehensive Playwright tests. Start with: `npm test`

For detailed usage, see [README.md](README.md)
