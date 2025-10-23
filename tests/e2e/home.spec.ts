import { test, expect } from "@playwright/test";

test.describe("Trang chủ - Home Page", () => {
  test("Kiểm tra trang chủ load thành công", async ({ page }) => {
    await page.goto("/");

    // Kiểm tra header xuất hiện
    await expect(page.locator("header")).toBeVisible();

    // Kiểm tra logo hiển thị
    const logo = page.locator('img[alt*="Logo"], img[alt*="logo"]').first();
    await expect(logo).toBeVisible();
  });

  test("Kiểm tra navigation menu hoạt động", async ({ page }) => {
    await page.goto("/");

    // Kiểm tra các link chính
    const homeLink = page.getByRole("link", { name: /trang chủ|home/i });
    await expect(homeLink).toBeVisible();
  });

  test("Kiểm tra banner/slider hiển thị", async ({ page }) => {
    await page.goto("/");

    // Đợi trang load xong
    await page.waitForLoadState("networkidle");

    // Kiểm tra có sản phẩm hiển thị
    const products = page.locator('[class*="product"], [class*="Product"]');
    await expect(products.first()).toBeVisible({ timeout: 10000 });
  });

  test("Kiểm tra footer hiển thị thông tin", async ({ page }) => {
    await page.goto("/");

    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });

  test("Kiểm tra responsive trên mobile", async ({ page }) => {
    // Set viewport mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Kiểm tra trang vẫn hiển thị tốt
    await expect(page.locator("header")).toBeVisible();
  });
});
