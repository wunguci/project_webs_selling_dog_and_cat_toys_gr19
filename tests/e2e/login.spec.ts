import { test, expect } from "@playwright/test";

test.describe("Trang đăng nhập - Login Page", () => {
  test.beforeEach(async ({ page }) => {
    // Điều hướng đến trang đăng nhập trước mỗi test
    await page.goto("/login");
    // Chờ trang load hoàn tất
    await page.waitForLoadState("networkidle");
  });

  test.describe("Kiểm tra chức năng đăng nhập", () => {
    test("Kiểm tra đăng nhập với tài khoản không tồn tại", async ({
      page,
    }) => {
      // Nhập thông tin tài khoản không tồn tại
      await page.locator('input[name="phone"]').fill("0999999999");
      await page.locator('input[name="password"]').fill("wrong123");
      await page.locator('button[type="submit"]').click();

      // Chờ response
      await page.waitForTimeout(2000);

      // Kiểm tra thông báo lỗi
      const error = page.locator(
        "text=/Số điện thoại hoặc mật khẩu không chính xác/i, .bg-red-100"
      );
      await expect(error.first()).toBeVisible({ timeout: 5000 });
    });

    test("Kiểm tra đăng nhập với mật khẩu sai", async ({ page }) => {
      // Nhập thông tin với mật khẩu sai
      await page.locator('input[name="phone"]').fill("0123456789");
      await page.locator('input[name="password"]').fill("wrongpass123");
      await page.locator('button[type="submit"]').click();

      // Chờ response
      await page.waitForTimeout(2000);

      // Kiểm tra thông báo lỗi
      const error = page.locator(
        "text=/Số điện thoại hoặc mật khẩu không chính xác/i, .bg-red-100"
      );
      await expect(error.first()).toBeVisible({ timeout: 5000 });
    });

    test("Kiểm tra input phone có thể nhập", async ({ page }) => {
      const phoneInput = page.locator('input[name="phone"]');
      await phoneInput.fill("0123456789");
      await expect(phoneInput).toHaveValue("0123456789");
    });

    test("Kiểm tra input password có thể nhập", async ({ page }) => {
      const passwordInput = page.locator('input[name="password"]');
      await passwordInput.fill("123456a");
      await expect(passwordInput).toHaveValue("123456a");
    });

    test("Kiểm tra xóa lỗi khi người dùng nhập lại", async ({
      page,
    }) => {
      // Trigger lỗi
      await page.locator('button[type="submit"]').click();
      await page.waitForTimeout(500);

      // Nhập lại số điện thoại
      await page.locator('input[name="phone"]').fill("0123456789");

      // Lỗi số điện thoại phải biến mất
      const error = page.locator("text=/Số điện thoại không được để trống/i");
      await expect(error).toBeHidden({ timeout: 2000 });
    });
  });
});
