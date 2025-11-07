import { test, expect } from "@playwright/test";

test.describe("Trang đăng ký - Register Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/register");
    await page.waitForLoadState("networkidle");
  });

  // Đăng ký thành công
  test("TC01: Đăng ký thành công với thông tin hợp lệ", async ({ page }) => {
    await page.fill('input[name="fullName"]', "Le Quoc Viet");
    await page.fill('input[name="phone"]', "0356908620");
    await page.fill('input[name="email"]', "testuserr@example.com");
    await page.fill('input[name="birthDate"]', "2000-01-01");
    await page.fill('input[name="password"]', "12345a");
    await page.fill('input[name="confirmPassword"]', "12345a");

    await page.click('button[type="submit"]');

    await page.waitForTimeout(2000);

    await page.waitForURL("/login", { timeout: 4000 });
  });

  // Validation toàn form
  test("TC02: Hiển thị lỗi khi để trống thông tin", async ({ page }) => {
    await page.click('button[type="submit"]');

    // Họ tên trống
    await expect(
      page.getByText("Họ và tên không được để trống.")
    ).toBeVisible();

    // Số điện thoại không hợp lệ
    await expect(page.getByText("Số điện thoại không hợp lệ.")).toBeVisible();

    // Ngày sinh trống
    await expect(
      page.getByText("Ngày sinh không được để trống.")
    ).toBeVisible();

    // Mật khẩu phải tối thiểu 6 ký tự, có ít nhất 1 chữ và 1 số
    await expect(
      page.getByText(
        "Mật khẩu phải tối thiểu 6 ký tự, có ít nhất 1 chữ và 1 số."
      )
    ).toBeVisible();

    // Confirm password rỗng -> báo Mật khẩu không khớp
    await expect(page.getByText("Mật khẩu không khớp.")).toBeVisible();
  });

  // Email sai định dạng
  test("TC03: Validation email không hợp lệ", async ({ page }) => {
    await page.fill('input[name="email"]', "abc123");
    await page.click('button[type="submit"]');

    await expect(page.getByText("Email không hợp lệ.")).toBeVisible();
  });

  // Password không đủ mạnh
  test("TC04: Password không đủ mạnh", async ({ page }) => {
    await page.fill('input[name="password"]', "12");
    await page.fill('input[name="confirmPassword"]', "12");
    await page.click('button[type="submit"]');

    await expect(
      page.getByText(
        "Mật khẩu phải tối thiểu 6 ký tự, có ít nhất 1 chữ và 1 số."
      )
    ).toBeVisible();
  });

  // Confirm password không khớp
  test("TC05: Confirm password không khớp", async ({ page }) => {
    await page.fill('input[name="password"]', "12345a");
    await page.fill('input[name="confirmPassword"]', "12345b");
    await page.click('button[type="submit"]');

    await expect(page.getByText("Mật khẩu không khớp.")).toBeVisible();
  });

  // SĐT đã tồn tại
  test("TC06: Kiểm tra số điện thoại đã tồn tại", async ({ page }) => {
    await page.fill('input[name="fullName"]', "Nguyen Van B");
    await page.fill('input[name="phone"]', "0123456789"); // phone tồn tại
    await page.fill('input[name="email"]', "exist@example.com");
    await page.fill('input[name="birthDate"]', "2000-01-01");
    await page.fill('input[name="password"]', "12345a");
    await page.fill('input[name="confirmPassword"]', "12345a");

    await page.click('button[type="submit"]');

    await expect(page.getByText("Số điện thoại đã tồn tại.")).toBeVisible();
  });

  // Terms phải tick
  test("TC07: Phải tick điều khoản trước khi đăng ký", async ({ page }) => {
    const checkbox = page.locator('[data-testid="terms-checkbox"]');
    // cố submit mà không tick
    await page.click('button[type="submit"]');
    await expect(page.getByText("Bạn phải đồng ý điều khoản")).toBeVisible();
  });
});
