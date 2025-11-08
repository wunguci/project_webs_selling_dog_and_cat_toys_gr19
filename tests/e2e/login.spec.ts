import { test, expect } from "@playwright/test";

test.describe("Trang đăng nhập - Login Page", () => {
  // Chạy trước mỗi test
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
    await page.waitForLoadState("networkidle");
  });

  // - Đăng nhập thành công
  test("TC01: Đăng nhập thành công với tài khoản hợp lệ", async ({ page }) => {
    await page.fill('input[name="phone"]', "0972385999");
    await page.fill('input[name="password"]', "vutkd23405");
    await page.click('button[type="submit"]');

    // Chờ toast hoặc điều hướng
    await page.waitForTimeout(2000);

    // Kiểm tra về trang chủ
    await expect(page).toHaveURL(/\/$/);
  });

  //Đăng nhập thất bại
  test("TC02: Đăng nhập thất bại với thông tin sai", async ({ page }) => {
    await page.fill('input[name="phone"]', "0000000000");
    await page.fill('input[name="password"]', "sai");
    await page.click('button[type="submit"]');

    await page.waitForTimeout(1500);

    // mong muốn: vẫn ở trang /login
    await expect(page).toHaveURL(/\/login$/);
  });

  //- Validation form
  test("TC03: Kiểm tra validation - trường trống và số điện thoại không hợp lệ", async ({
    page,
  }) => {
    // Không nhập gì
    await page.click('button[type="submit"]');

    await expect(
      page.getByText("Số điện thoại không được để trống.")
    ).toBeVisible();
    await expect(page.getByText("Mật khẩu không được để trống.")).toBeVisible();

    // Số điện thoại sai định dạng
    await page.fill('input[name="phone"]', "abc123");
    await page.fill('input[name="password"]', "123456a");
    await page.click('button[type="submit"]');

    await expect(page.getByText("Số điện thoại không hợp lệ.")).toBeVisible();
  });

  // - Hiển thị / Ẩn mật khẩu
  test("TC04: Hiển thị/ẩn mật khẩu khi click icon mắt", async ({ page }) => {
    const passwordInput = page.locator('input[name="password"]');
    const toggleBtn = page.locator('[data-testid="toggle-password"]');

    await passwordInput.fill("123456a");
    await expect(passwordInput).toHaveAttribute("type", "password");
    await toggleBtn.click();
    await expect(passwordInput).toHaveAttribute("type", "text");
    await toggleBtn.click();
    await expect(passwordInput).toHaveAttribute("type", "password");
  });

  //- Kiểm tra chuyển hướng
  test("TC05: Chuyển hướng về trang chủ sau khi đăng nhập thành công", async ({
    page,
  }) => {
    await page.fill('input[name="phone"]', "0123456789");
    await page.fill('input[name="password"]', "12345a");
    await page.click('button[type="submit"]');

    await page.waitForTimeout(2000);
    await expect(page).toHaveURL(/\/$/);
  });
});
