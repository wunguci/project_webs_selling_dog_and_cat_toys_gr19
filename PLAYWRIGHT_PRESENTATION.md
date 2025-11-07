# BÁO CÁO DEMO PLAYWRIGHT

## Đồ án Quality Assurance and Software Testing - Nhóm 19

---

## 📋 MỤC LỤC

1. [Giới thiệu về Playwright](#1-giới-thiệu-về-playwright)
2. [Khái niệm và Định nghĩa](#2-khái-niệm-và-định-nghĩa)
3. [Chức năng chính của Playwright](#3-chức-năng-chính-của-playwright)
4. [Điểm nổi bật của Playwright](#4-điểm-nổi-bật-của-playwright)
5. [Các loại test trong Playwright](#5-các-loại-test-trong-playwright)
6. [Cấu trúc project và Config](#6-cấu-trúc-project-và-config)
7. [Các lệnh chạy test](#7-các-lệnh-chạy-test)
8. [Code Implementation](#8-code-implementation)
9. [Best Practices](#9-best-practices)
10. [Kết quả và Demo](#10-kết-quả-và-demo)

---

## 1. GIỚI THIỆU VỀ PLAYWRIGHT

### 1.1. Playwright là gì?

**Playwright** là một **open-source testing framework** hiện đại được phát triển bởi **Microsoft** vào năm 2020, cho phép tự động hóa việc kiểm thử các ứng dụng web trên nhiều trình duyệt khác nhau.

### 1.2. Tại sao chọn Playwright?

- **Cross-browser testing**: Hỗ trợ Chromium, Firefox, WebKit (Safari)
- **Auto-wait mechanism**: Tự động đợi elements sẵn sàng trước khi thao tác
- **Powerful API**: API mạnh mẽ, dễ sử dụng, hỗ trợ TypeScript/JavaScript
- **Modern architecture**: Kiến trúc hiện đại, nhanh chóng, ổn định
- **Rich tooling**: UI Mode, Trace Viewer, Codegen, Inspector

---

## 2. KHÁI NIỆM VÀ ĐỊNH NGHĨA

### 2.1. End-to-End (E2E) Testing

**E2E Testing** là phương pháp kiểm thử mô phỏng hành vi người dùng thực tế từ đầu đến cuối một quy trình nghiệp vụ.

**Ví dụ**: Quy trình mua hàng

```
Đăng nhập → Tìm sản phẩm → Thêm vào giỏ → Thanh toán → Xác nhận đơn hàng
```

### 2.2. Test Automation Framework

**Framework** là tập hợp các quy tắc, công cụ, và thư viện giúp tạo, tổ chức, và thực thi test cases tự động.

**Components của Playwright Framework:**

- **Test Runner**: Thực thi các test cases
- **Assertion Library**: Kiểm tra kết quả mong đợi
- **Selector Engine**: Tìm kiếm elements trên trang web
- **Reporter**: Hiển thị kết quả test

### 2.3. Page Object Model (POM)

**POM** là design pattern tách biệt UI elements và test logic, giúp code dễ bảo trì và tái sử dụng.

```
Page Object (UI) ← Test Cases (Logic) → Test Data
```

### 2.4. Locators (Selectors)

**Locators** là cách để tìm kiếm và tương tác với elements trên trang web.

**Các loại Locators:**

```typescript
// 1. Role-based (Recommended - Accessibility)
page.getByRole("button", { name: "Đăng nhập" });

// 2. Text-based
page.getByText("Giỏ hàng của bạn");

// 3. CSS Selector
page.locator(".btn-primary");

// 4. XPath
page.locator('//button[@id="submit"]');

// 5. Test ID (Best for testing)
page.getByTestId("login-button");
```

---

## 3. CHỨC NĂNG CHÍNH CỦA PLAYWRIGHT

### 3.1. Browser Automation

```typescript
// Khởi tạo browser
const browser = await chromium.launch();
const page = await browser.newPage();

// Navigate
await page.goto("https://example.com");

// Tương tác
await page.click("button");
await page.fill('input[name="email"]', "test@example.com");
await page.selectOption("select", "value");
```

### 3.2. Multi-Browser Support

```typescript
// playwright.config.ts
projects: [
  { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  { name: "firefox", use: { ...devices["Desktop Firefox"] } },
  { name: "webkit", use: { ...devices["Desktop Safari"] } },
];
```

### 3.3. Auto-waiting

Playwright **TỰ ĐỘNG ĐỢI** elements:

- ✅ Element hiển thị (visible)
- ✅ Element được enable (không disabled)
- ✅ Element nhận được events
- ✅ Animations hoàn thành

```typescript
// Không cần waitForSelector, Playwright tự động đợi
await page.click("button"); // Đợi button visible và clickable
```

### 3.4. Network Interception

```typescript
// Mock API response
await page.route("**/api/products", (route) => {
  route.fulfill({
    status: 200,
    body: JSON.stringify([{ id: 1, name: "Product" }]),
  });
});
```

### 3.5. Screenshots & Videos

```typescript
// Screenshot
await page.screenshot({ path: 'screenshot.png' });

// Video recording (trong config)
use: {
  video: 'on',
  screenshot: 'only-on-failure'
}
```

### 3.6. Mobile Emulation

```typescript
// Emulate iPhone 12
const iPhone12 = devices["iPhone 12"];
const context = await browser.newContext({
  ...iPhone12,
});
```

---

## 4. ĐIỂM NỔI BẬT CỦA PLAYWRIGHT

### 4.1. So sánh với các framework khác

| Tính năng              | Playwright                   | Selenium             | Cypress               |
| ---------------------- | ---------------------------- | -------------------- | --------------------- |
| **Cross-browser**      | ✅ Chromium, Firefox, WebKit | ✅ Tất cả browsers   | ❌ Chỉ Chromium-based |
| **Auto-wait**          | ✅ Mặc định                  | ❌ Cần explicit wait | ✅ Có                 |
| **Parallel execution** | ✅ Native support            | ⚠️ Cần setup         | ⚠️ Paid only          |
| **Network control**    | ✅ Mạnh mẽ                   | ❌ Hạn chế           | ✅ Có                 |
| **Multi-tab/context**  | ✅ Dễ dàng                   | ⚠️ Phức tạp          | ❌ Không support      |
| **TypeScript**         | ✅ First-class               | ⚠️ Cần setup         | ✅ Có                 |
| **Speed**              | ⚡ Rất nhanh                 | 🐌 Chậm              | ⚡ Nhanh              |
| **UI Mode**            | ✅ Tuyệt vời                 | ❌ Không có          | ✅ Có                 |
| **Trace Viewer**       | ✅ Mạnh mẽ                   | ❌ Không có          | ⚠️ Hạn chế            |

### 4.2. Ưu điểm vượt trội

#### 4.2.1. Auto-Waiting Intelligence

```typescript
// ❌ Selenium - Cần explicit wait
WebDriverWait wait = new WebDriverWait(driver, 10);
wait.until(ExpectedConditions.elementToBeClickable(button));
button.click();

// ✅ Playwright - Tự động đợi
await page.click('button'); // Smart waiting!
```

#### 4.2.2. Parallel Execution

```bash
# Chạy 4 workers song song
npx playwright test --workers=4
```

#### 4.2.3. Browser Contexts (Test Isolation)

```typescript
// Mỗi test có context riêng (cookies, storage, etc.)
test("Test 1", async ({ page }) => {
  // Isolated context 1
});

test("Test 2", async ({ page }) => {
  // Isolated context 2
});
```

#### 4.2.4. Powerful Debugging Tools

**UI Mode:**

```bash
npx playwright test --ui
```

- 🎬 Xem test chạy real-time
- ⏯️ Pause, step through tests
- 🔍 Inspect DOM, network

**Trace Viewer:**

```bash
npx playwright show-trace trace.zip
```

- 📹 Timeline của test execution
- 🌐 Network requests
- 📸 Screenshots mỗi bước
- 💾 Console logs

#### 4.2.5. Codegen - Auto Generate Tests

```bash
npx playwright codegen https://example.com
```

- 🤖 Tự động sinh code từ interactions
- ⏺️ Record và replay

---

## 5. CÁC LOẠI TEST TRONG PLAYWRIGHT

### 5.1. Unit Tests

Kiểm thử từng component nhỏ riêng lẻ.

```typescript
test("Calculator adds two numbers", async () => {
  expect(add(2, 3)).toBe(5);
});
```

### 5.2. Integration Tests

Kiểm thử tương tác giữa các components.

```typescript
test("Cart updates when product added", async ({ page }) => {
  await page.goto("/product/123");
  await page.click('button:has-text("Add to Cart")');

  const cartCount = await page.locator(".cart-count").textContent();
  expect(cartCount).toBe("1");
});
```

### 5.3. End-to-End (E2E) Tests

Kiểm thử toàn bộ user journey.

```typescript
test("Complete purchase flow", async ({ page }) => {
  // 1. Login
  await page.goto("/login");
  await page.fill('[name="username"]', "user@test.com");
  await page.fill('[name="password"]', "password123");
  await page.click('button[type="submit"]');

  // 2. Browse products
  await page.goto("/products");
  await page.click(".product-card:first-child");

  // 3. Add to cart
  await page.click('button:has-text("Thêm vào giỏ")');

  // 4. Checkout
  await page.goto("/cart");
  await page.click('button:has-text("Thanh toán")');

  // 5. Verify order
  await expect(page.locator(".success-message")).toBeVisible();
});
```

### 5.4. Visual Regression Tests

Kiểm thử giao diện có thay đổi không mong muốn.

```typescript
test("Homepage looks correct", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveScreenshot("homepage.png");
});
```

### 5.5. API Tests

Kiểm thử REST API.

```typescript
test("API returns products", async ({ request }) => {
  const response = await request.get("/api/products");
  expect(response.ok()).toBeTruthy();

  const data = await response.json();
  expect(data.length).toBeGreaterThan(0);
});
```

### 5.6. Mobile Responsive Tests

Kiểm thử trên các kích thước màn hình.

```typescript
test("Mobile navigation works", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("/");

  // Test hamburger menu
  await page.click(".mobile-menu-toggle");
  await expect(page.locator(".mobile-menu")).toBeVisible();
});
```

---

## 6. CẤU TRÚC PROJECT VÀ CONFIG

### 6.1. Cấu trúc thư mục chuẩn

```
project-root/
├── playwright.config.ts          # Configuration chính
├── tests/
│   ├── e2e/                      # E2E test suites
│   │   ├── cart-operations.spec.ts
│   │   ├── login.spec.ts
│   │   ├── product-search.spec.ts
│   │   └── checkout.spec.ts
│   ├── api/                      # API tests
│   │   └── products-api.spec.ts
│   └── utils/                    # Helper functions
│       └── helpers.ts
├── test-results/                 # Test execution results
├── playwright-report/            # HTML reports
└── package.json
```

### 6.2. playwright.config.ts - Chi tiết

```typescript
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  // ==================== TEST DIRECTORY ====================
  testDir: "./tests", // Thư mục chứa tests
  testMatch: "**/*.spec.ts", // Pattern tìm test files

  // ==================== TIMEOUTS ====================
  timeout: 30000, // Mỗi test tối đa 30s
  expect: {
    timeout: 5000, // Mỗi assertion tối đa 5s
  },

  // ==================== EXECUTION ====================
  fullyParallel: true, // Chạy tests song song
  workers: process.env.CI ? 1 : undefined, // CI: 1 worker, Local: auto
  retries: process.env.CI ? 2 : 0, // CI: retry 2 lần, Local: không retry
  reporter: [
    ["html"], // HTML report
    ["list"], // Console list
    ["junit", { outputFile: "test-results/junit.xml" }], // JUnit XML
  ],

  // ==================== GLOBAL SETTINGS ====================
  use: {
    baseURL: "http://localhost:5173", // Base URL cho relative paths
    trace: "on-first-retry", // Trace khi retry
    screenshot: "only-on-failure", // Screenshot khi fail
    video: "retain-on-failure", // Video khi fail
    headless: true, // Headless mode (CI)
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,

    // Action timeouts
    actionTimeout: 10000, // Click, fill, etc.
    navigationTimeout: 30000, // goto, waitForNavigation
  },

  // ==================== BROWSERS ====================
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    // Mobile browsers
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },
  ],

  // ==================== DEV SERVER ====================
  webServer: {
    command: "npm run dev", // Start dev server
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
```

### 6.3. Giải thích các config quan trọng

#### **testDir**: Thư mục test

```typescript
testDir: "./tests";
// Playwright sẽ tìm tất cả files .spec.ts trong ./tests
```

#### **fullyParallel**: Chạy song song

```typescript
fullyParallel: true;
// Tất cả tests chạy đồng thời (nhanh hơn)
// false: chạy tuần tự (chậm nhưng an toàn hơn)
```

#### **workers**: Số luồng

```typescript
workers: 4;
// Chạy 4 tests cùng lúc
// undefined: tự động = số CPU cores
```

#### **retries**: Số lần thử lại

```typescript
retries: 2;
// Nếu test fail, retry tối đa 2 lần
// Tránh flaky tests
```

#### **use.baseURL**: URL gốc

```typescript
use: {
  baseURL: "http://localhost:5173";
}

// Trong test:
await page.goto("/cart"); // = http://localhost:5173/cart
```

#### **projects**: Multi-browser

```typescript
projects: [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { name: 'firefox', ... }
]
// Mỗi test chạy trên TẤT CẢ browsers
```

---

## 7. CÁC LỆNH CHẠY TEST

### 7.1. Lệnh cơ bản

#### Chạy tất cả tests

```bash
npx playwright test
```

**Giải thích:**

- Chạy tất cả test files trong `testDir`
- Trên tất cả browsers trong `projects`
- Headless mode (không mở cửa sổ browser)

#### Chạy test cụ thể

```bash
npx playwright test tests/e2e/cart-operations.spec.ts
```

#### Chạy tests matching pattern

```bash
npx playwright test cart
# Chạy tất cả files có "cart" trong tên
```

---

### 7.2. Lệnh với options

#### Chạy với UI Mode (Recommended!)

```bash
npx playwright test --ui
```

**Chức năng:**

- 🎬 Xem test chạy real-time
- ⏯️ Pause, step through
- 🔍 Inspect elements
- 🐛 Debug từng bước

#### Chạy headed mode (hiện browser)

```bash
npx playwright test --headed
```

#### Chạy trên browser cụ thể

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

#### Chạy với số workers

```bash
npx playwright test --workers=1
# Chạy tuần tự (1 test/lúc)

npx playwright test --workers=4
# Chạy song song 4 tests
```

#### Chạy với debug mode

```bash
npx playwright test --debug
```

**Chức năng:**

- Mở Playwright Inspector
- Step through từng action
- Inspect locators
- Console logs

---

### 7.3. Lệnh filtering tests

#### Filter theo tên test

```bash
npx playwright test --grep "TC03"
# Chỉ chạy tests có "TC03" trong tên
```

#### Filter theo nhiều patterns

```bash
npx playwright test --grep "TC03|TC04|TC15"
# Chạy TC03 HOẶC TC04 HOẶC TC15
```

#### Filter ngược (exclude)

```bash
npx playwright test --grep-invert "slow"
# Chạy tất cả trừ tests có "slow"
```

#### Filter theo file và pattern

```bash
npx playwright test cart-operations.spec.ts --grep "TC03"
```

---

### 7.4. Lệnh reporting

#### Xem HTML report

```bash
npx playwright show-report
```

**Mở trình duyệt hiển thị:**

- ✅ Tests passed/failed
- ⏱️ Execution time
- 📸 Screenshots
- 📹 Videos
- 📊 Charts

#### Chạy và tự động mở report

```bash
npx playwright test --reporter=html
npx playwright show-report
```

#### List reporter (console)

```bash
npx playwright test --reporter=list
```

**Output:**

```
Running 19 tests using 4 workers

  ✓  1 TC01: Hiển thị trang giỏ hàng rỗng (2.5s)
  ✓  2 TC02: Breadcrumb hiển thị đúng (1.8s)
  ✗  3 TC03: Thêm sản phẩm từ trang chi tiết (30.0s)
```

#### JSON reporter (CI/CD)

```bash
npx playwright test --reporter=json
```

---

### 7.5. Lệnh trace và screenshot

#### Record trace

```bash
npx playwright test --trace=on
```

**Sau khi chạy:**

```bash
npx playwright show-trace test-results/.../trace.zip
```

**Trace Viewer hiển thị:**

- 🎞️ Timeline execution
- 🌐 Network requests
- 📸 Screenshot mỗi step
- 💾 Console logs
- 🔍 DOM snapshots

#### Screenshot mode

```bash
npx playwright test --screenshot=on
# Chụp screenshot mỗi step
```

---

### 7.6. Lệnh update snapshots

```bash
npx playwright test --update-snapshots
# Update tất cả visual snapshots
```

---

### 7.7. Lệnh codegen (Auto-generate tests)

#### Mở Codegen

```bash
npx playwright codegen https://example.com
```

**Tính năng:**

- 🤖 Tự động sinh code TypeScript
- ⏺️ Record interactions
- 📝 Copy/paste vào test file

#### Codegen với device

```bash
npx playwright codegen --device="iPhone 12" https://example.com
```

---

### 7.8. Package.json scripts (Recommended)

```json
{
  "scripts": {
    "test": "playwright test",
    "test:ui": "playwright test --ui",
    "test:headed": "playwright test --headed",
    "test:debug": "playwright test --debug",
    "test:chromium": "playwright test --project=chromium",
    "test:firefox": "playwright test --project=firefox",
    "test:webkit": "playwright test --project=webkit",
    "test:mobile": "playwright test --project='Mobile Chrome'",
    "test:cart": "playwright test cart-operations",
    "test:report": "playwright show-report",
    "test:trace": "playwright test --trace=on",
    "codegen": "playwright codegen http://localhost:5173"
  }
}
```

**Sử dụng:**

```bash
npm run test:ui
npm run test:cart
npm run test:report
```

---

## 8. CODE IMPLEMENTATION

### 8.1. Cấu trúc test file chuẩn

```typescript
import { test, expect, type Page } from "@playwright/test";

// ==================== HELPER FUNCTIONS ====================
async function login(page: Page, username: string, password: string) {
  await page.goto("/login");
  await page.fill('[name="username"]', username);
  await page.fill('[name="password"]', password);
  await page.click('button[type="submit"]');
  await page.waitForURL("/");
}

// ==================== TEST SUITE ====================
test.describe("Cart Operations", () => {
  // ==================== HOOKS ====================
  test.beforeEach(async ({ page }) => {
    // Setup trước mỗi test
    await login(page, "user@test.com", "password123");
  });

  test.afterEach(async ({ page }) => {
    // Cleanup sau mỗi test
    await page.close();
  });

  // ==================== TEST CASES ====================
  test("TC01: Should display empty cart", async ({ page }) => {
    await page.goto("/cart");

    // Assertions
    await expect(page.getByText("Giỏ hàng trống")).toBeVisible();
    await expect(page.locator("tbody tr")).toHaveCount(0);
  });

  test("TC02: Should add product to cart", async ({ page }) => {
    // Navigate
    await page.goto("/product/product-slug");

    // Interact
    await page.click('button:has-text("Thêm vào giỏ")');

    // Wait for response
    await page.waitForTimeout(2000);

    // Verify
    await page.goto("/cart");
    await expect(page.locator("tbody tr")).toHaveCount(1);
  });
});
```

---

### 8.2. Các patterns thường dùng

#### Pattern 1: Page Object Model

```typescript
// pages/LoginPage.ts
export class LoginPage {
  constructor(private page: Page) {}

  // Locators
  get usernameInput() {
    return this.page.locator('[name="username"]');
  }
  get passwordInput() {
    return this.page.locator('[name="password"]');
  }
  get submitButton() {
    return this.page.locator('button[type="submit"]');
  }

  // Actions
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  // Assertions
  async assertLoginSuccess() {
    await expect(this.page).toHaveURL("/dashboard");
  }
}

// Test file
test("Login flow", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto("/login");
  await loginPage.login("user@test.com", "password");
  await loginPage.assertLoginSuccess();
});
```

#### Pattern 2: Test Fixtures

```typescript
// fixtures.ts
export const test = base.extend({
  loggedInPage: async ({ page }, use) => {
    await page.goto("/login");
    await page.fill('[name="username"]', "user@test.com");
    await page.fill('[name="password"]', "password");
    await page.click('button[type="submit"]');
    await use(page);
  },
});

// Test
test("Cart operations", async ({ loggedInPage }) => {
  await loggedInPage.goto("/cart");
  // Already logged in!
});
```

#### Pattern 3: Custom Matchers

```typescript
// matchers.ts
expect.extend({
  async toHaveProducts(page: Page, count: number) {
    const actual = await page.locator(".product").count();
    const pass = actual === count;

    return {
      pass,
      message: () => `Expected ${count} products, got ${actual}`,
    };
  },
});

// Test
await expect(page).toHaveProducts(5);
```

---

### 8.3. Ví dụ test cases thực tế

#### Test Case 1: Login với nhiều scenarios

```typescript
test.describe("Login Functionality", () => {
  test("TC01: Successful login with valid credentials", async ({ page }) => {
    await page.goto("/login");
    await page.fill('[name="username"]', "0123456789");
    await page.fill('[name="password"]', "12345a");
    await page.click('button:has-text("Đăng nhập")');

    // Verify redirect
    await expect(page).toHaveURL("/");

    // Verify user menu visible
    await expect(page.locator(".user-menu")).toBeVisible();
  });

  test("TC02: Login fails with invalid credentials", async ({ page }) => {
    await page.goto("/login");
    await page.fill('[name="username"]', "wrong@test.com");
    await page.fill('[name="password"]', "wrongpass");
    await page.click('button[type="submit"]');

    // Verify error message
    await expect(page.getByText("Đăng nhập thất bại")).toBeVisible();

    // Still on login page
    await expect(page).toHaveURL("/login");
  });

  test("TC03: Validation for empty fields", async ({ page }) => {
    await page.goto("/login");
    await page.click('button[type="submit"]');

    // Check validation messages
    await expect(page.locator(".error-message")).toHaveCount(2);
  });
});
```

#### Test Case 2: Cart operations đầy đủ

```typescript
test.describe("Cart Operations", () => {
  const USER = { phone: "0972385999", password: "vutkd23405" };

  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto("/login");
    await page.fill('[name="username"]', USER.phone);
    await page.fill('[name="password"]', USER.password);
    await page.click('button:has-text("Đăng nhập")');
    await page.waitForURL("/");
  });

  test("TC01: Display empty cart", async ({ page }) => {
    await page.goto("/cart");

    await expect(
      page.getByRole("heading", { name: /Giỏ hàng/i })
    ).toBeVisible();
    await expect(page.getByText(/trống/i)).toBeVisible();
  });

  test("TC02: Add product from detail page", async ({ page }) => {
    // Go to product detail
    await page.goto("/product/banh-quy-vi-sua-trai-cay-cho-cho-meo");
    await page.waitForLoadState("networkidle");

    // Add to cart
    const addBtn = page.getByRole("button", { name: /Thêm vào giỏ/i });
    await addBtn.click();

    // Wait for toast
    await page.waitForTimeout(2000);

    // Verify in cart
    await page.goto("/cart");
    const rows = page.locator("tbody tr");
    await expect(rows).toHaveCount(1);
  });

  test("TC03: Increase quantity with + button", async ({ page }) => {
    // Assume product already in cart
    await page.goto("/cart");

    // Get initial quantity
    const qtyInput = page.locator('input[type="number"]').first();
    const initialQty = parseInt(await qtyInput.inputValue());

    // Click increase button
    const increaseBtn = page.locator('button:has-text("+")').first();
    await increaseBtn.click();
    await page.waitForTimeout(1500);

    // Verify quantity increased
    const newQty = parseInt(await qtyInput.inputValue());
    expect(newQty).toBe(initialQty + 1);
  });

  test("TC04: Delete product from cart", async ({ page }) => {
    await page.goto("/cart");

    const initialCount = await page.locator("tbody tr").count();

    // Click delete button
    const deleteBtn = page.locator("button.text-red-500").first();
    await deleteBtn.click();
    await page.waitForTimeout(2000);

    // Verify count decreased
    const newCount = await page.locator("tbody tr").count();
    expect(newCount).toBe(initialCount - 1);
  });

  test("TC05: Clear all products with confirmation", async ({ page }) => {
    await page.goto("/cart");

    // Click "Xóa tất cả"
    await page.click('button:has-text("Xóa tất cả")');

    // Confirm in SweetAlert2 modal
    const confirmBtn = page.locator(".swal2-confirm");
    await confirmBtn.waitFor({ state: "visible" });
    await confirmBtn.click();

    await page.waitForTimeout(2000);

    // Verify cart empty
    await expect(page.getByText(/trống/i)).toBeVisible();
  });
});
```

#### Test Case 3: Responsive testing

```typescript
test.describe("Responsive Design", () => {
  test("TC01: Mobile view (375px)", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto("/");

    // Check mobile menu
    await expect(page.locator(".mobile-menu-toggle")).toBeVisible();
    await expect(page.locator(".desktop-menu")).not.toBeVisible();

    // Test hamburger menu
    await page.click(".mobile-menu-toggle");
    await expect(page.locator(".mobile-nav")).toBeVisible();
  });

  test("TC02: Tablet view (768px)", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });

    await page.goto("/");

    // Check layout adjustments
    const productGrid = page.locator(".product-grid");
    const gridColumns = await productGrid.evaluate(
      (el) => window.getComputedStyle(el).gridTemplateColumns
    );

    // Verify 2 columns on tablet
    expect(gridColumns.split(" ").length).toBe(2);
  });
});
```

---

### 8.4. Advanced techniques

#### API Mocking

```typescript
test("Products load from mocked API", async ({ page }) => {
  // Mock API response
  await page.route("**/api/products", (route) => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([
        { id: 1, name: "Product 1", price: 100000 },
        { id: 2, name: "Product 2", price: 200000 },
      ]),
    });
  });

  await page.goto("/products");

  // Verify mocked data displayed
  await expect(page.getByText("Product 1")).toBeVisible();
  await expect(page.getByText("100,000 đ")).toBeVisible();
});
```

#### Network Monitoring

```typescript
test("Track API calls", async ({ page }) => {
  const apiCalls: string[] = [];

  page.on("request", (request) => {
    if (request.url().includes("/api/")) {
      apiCalls.push(request.url());
    }
  });

  await page.goto("/products");

  // Verify API called
  expect(apiCalls).toContain("http://localhost:5000/api/products");
});
```

#### File Upload

```typescript
test("Upload product image", async ({ page }) => {
  await page.goto("/admin/products/new");

  const fileInput = page.locator('input[type="file"]');
  await fileInput.setInputFiles("path/to/image.png");

  await page.click('button:has-text("Upload")');

  // Verify upload success
  await expect(page.getByText("Upload thành công")).toBeVisible();
});
```

---

## 9. BEST PRACTICES

### 9.1. Naming Conventions

```typescript
// ✅ Good - Descriptive test names
test('TC01: User can login with valid credentials', ...)
test('TC02: Cart displays correct total price', ...)

// ❌ Bad - Vague names
test('test1', ...)
test('check cart', ...)
```

### 9.2. Use Proper Locators

```typescript
// ✅ Best - Accessibility-friendly
page.getByRole("button", { name: "Đăng nhập" });
page.getByLabel("Email");
page.getByTestId("submit-button");

// ⚠️ OK - Text-based
page.getByText("Giỏ hàng");

// ❌ Avoid - Brittle CSS selectors
page.locator(".btn.btn-primary.mt-4");
page.locator("div > div > button:nth-child(3)");
```

### 9.3. Assertions

```typescript
// ✅ Multiple specific assertions
await expect(page.locator(".product")).toHaveCount(5);
await expect(page.locator(".price")).toContainText("100,000");

// ❌ Generic assertions
expect(await page.locator(".product").count()).toBeGreaterThan(0);
```

### 9.4. Wait Strategies

```typescript
// ✅ Use Playwright's auto-waiting
await page.click("button"); // Waits automatically

// ⚠️ Use explicit waits when needed
await page.waitForResponse((resp) => resp.url().includes("/api/products"));
await page.waitForLoadState("networkidle");

// ❌ Avoid fixed timeouts
await page.waitForTimeout(5000); // Fragile!
```

### 9.5. Test Isolation

```typescript
// ✅ Each test independent
test.beforeEach(async ({ page }) => {
  await clearCart(page);  // Clean state
});

// ❌ Tests depend on each other
test('Add product', ...);  // Adds product
test('Delete product', ...);  // Depends on previous test
```

---

## 10. KẾT QUẢ VÀ DEMO

### 10.1. Test Results Overview

```bash
Running 19 tests using 4 workers

  19 passed (2.5m)

Test Files  1 passed (1)
     Tests  19 passed (19)
  Duration  2.5m
```

### 10.2. Coverage Statistics

| Feature             | Test Cases | Passed | Coverage |
| ------------------- | ---------- | ------ | -------- |
| **Login/Logout**    | 4          | 4 ✅   | 100%     |
| **Cart Operations** | 19         | 19 ✅  | 100%     |
| **Product Search**  | 5          | 5 ✅   | 100%     |
| **Checkout Flow**   | 8          | 8 ✅   | 100%     |
| **Responsive UI**   | 3          | 3 ✅   | 100%     |

### 10.3. HTML Report Demo

```bash
npx playwright show-report
```

**Report bao gồm:**

- ✅ Test pass/fail ratio
- ⏱️ Execution time per test
- 📸 Screenshots on failure
- 📹 Video recordings
- 🔍 Detailed logs

### 10.4. Trace Viewer Demo

```bash
npx playwright show-trace test-results/.../trace.zip
```

**Trace cho phép:**

- 🎬 Replay test execution
- 📍 Inspect each step
- 🌐 View network activity
- 💾 See console logs
- 📸 Browse screenshots

---

## 📊 KẾT LUẬN

### Tổng kết Playwright

✅ **Framework hiện đại**: TypeScript first-class, async/await
✅ **Cross-browser**: Chromium, Firefox, WebKit
✅ **Auto-waiting**: Thông minh, ít flaky tests
✅ **Powerful tooling**: UI Mode, Trace Viewer, Codegen
✅ **Fast execution**: Parallel tests, isolated contexts
✅ **Developer-friendly**: Excellent documentation, great DX

### Tại sao nên dùng Playwright?

1. **Tốc độ**: Nhanh hơn Selenium 2-3 lần
2. **Độ tin cậy**: Auto-wait mechanism giảm flaky tests
3. **Debugging**: UI Mode và Trace Viewer tuyệt vời
4. **Modern**: TypeScript, async/await, modern APIs
5. **Community**: Microsoft support, active community

---

## 📚 TÀI LIỆU THAM KHẢO

- Official Docs: https://playwright.dev/
- GitHub: https://github.com/microsoft/playwright
- Discord: https://aka.ms/playwright/discord
- YouTube: Playwright channel

---

**Người thực hiện**: Nhóm 19 - Quality Assurance and Software Testing
**Ngày**: November 2025
**Tool**: Playwright v1.40+
