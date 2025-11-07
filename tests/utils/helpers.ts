import { Page, expect } from "@playwright/test";

/**
 * Helper function để đăng nhập
 */
export async function login(page: Page, phone: string, password: string) {
  await page.goto("/login");
  await page.waitForLoadState("networkidle");

  await page.locator('input[name="phone"]').fill(phone);
  await page.locator('input[name="password"]').fill(password);
  await page.locator('button[type="submit"]').click();

  // Đợi redirect
  await page.waitForTimeout(3000);
}

/**
 * Helper function để đăng nhập admin
 */
export async function loginAsAdmin(page: Page) {
  await login(page, "0972385999", "vutkd23405");
}

/**
 * Helper function để đăng xuất
 */
export async function logout(page: Page) {
  // Tìm nút logout hoặc user menu
  const userMenu = page.locator('[class*="user"], [class*="avatar"]').first();
  if (await userMenu.isVisible()) {
    await userMenu.click();
    await page.waitForTimeout(500);
  }

  const logoutBtn = page.getByRole("button", { name: /Đăng xuất|Logout/i });
  if (await logoutBtn.isVisible()) {
    await logoutBtn.click();
    await page.waitForTimeout(1000);
  }
}

/**
 * Helper để đợi toast message
 */
export async function waitForToast(
  page: Page,
  message: string | RegExp,
  timeout = 5000
) {
  const toast = page
    .locator(`text=${message instanceof RegExp ? message.source : message}`)
    .first();
  await expect(toast).toBeVisible({ timeout });
}

/**
 * Helper để kiểm tra element visible với retry
 */
export async function expectVisible(
  page: Page,
  selector: string,
  timeout = 5000
) {
  await expect(page.locator(selector).first()).toBeVisible({ timeout });
}

/**
 * Helper để tạo user data ngẫu nhiên
 */
export function generateRandomUser() {
  const timestamp = Date.now();
  return {
    fullName: `Test User ${timestamp}`,
    email: `testuser${timestamp}@example.com`,
    phone: `09${timestamp.toString().slice(-8)}`,
    address: `${Math.floor(
      Math.random() * 1000
    )} Test Street, Ho Chi Minh City`,
    birthDate: "1990-01-15",
    gender: "Nam",
    password: "123456",
  };
}

/**
 * Helper để clear và fill input
 */
export async function fillInput(page: Page, selector: string, value: string) {
  const input = page.locator(selector);
  await input.clear();
  await input.fill(value);
}
