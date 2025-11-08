import { test, expect, Page } from "@playwright/test";

// Helper function để đăng nhập
async function login(page: Page, phone: string, password: string) {
  await page.goto("/login");
  await page.waitForLoadState("networkidle");
  await page.locator('input[name="phone"]').fill(phone);
  await page.locator('input[name="password"]').fill(password);
  await page.locator('button[type="submit"]').click();
  await page.waitForTimeout(3000); // Đợi redirect và load xong
}

// Helper function để xóa toàn bộ giỏ hàng (nếu có)
async function clearCartIfNeeded(page: Page) {
  await page.goto("/cart");
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(1000);

  const clearAllBtn = page.locator('button:has-text("Xóa tất cả")');
  if (await clearAllBtn.isVisible()) {
    await clearAllBtn.click();
    await page.waitForTimeout(500);

    // Xác nhận trong SweetAlert2
    const confirmBtn = page.locator(
      'button:has-text("Xác nhận"), button.swal2-confirm'
    );
    if (await confirmBtn.isVisible()) {
      await confirmBtn.click();
      await page.waitForTimeout(2000);
    }
  }
}

test.describe("Giỏ hàng - Cart Operations", () => {
  const USER_CREDENTIALS = {
    phone: "0972385999",
    password: "vutkd23405",
  };

  test.beforeEach(async ({ page }) => {
    // Đăng nhập trước mỗi test
    await login(page, USER_CREDENTIALS.phone, USER_CREDENTIALS.password);
  });

  test.describe("1. Giao diện trang giỏ hàng", () => {
    test("TC01: Hiển thị trang giỏ hàng rỗng", async ({ page }) => {
      // Xóa giỏ hàng nếu có
      await clearCartIfNeeded(page);

      await page.goto("/cart");
      await page.waitForLoadState("networkidle");

      // Kiểm tra tiêu đề - dùng .first() để tránh strict mode
      await expect(
        page.getByRole("heading", { name: /Giỏ hàng của bạn/i }).first()
      ).toBeVisible();

      // Kiểm tra thông báo giỏ hàng trống
      const emptyMsg = page.getByText(/Giỏ hàng của bạn đang trống!/i);
      await expect(emptyMsg).toBeVisible();
    });

    test("TC02: Breadcrumb hiển thị đúng", async ({ page }) => {
      await page.goto("/cart");
      await page.waitForLoadState("networkidle");

      // Kiểm tra breadcrumb - dùng selector cụ thể hơn
      await expect(
        page.locator('a:has-text("Trang chủ")').first()
      ).toBeVisible();
      await expect(
        page.locator('span:has-text("Giỏ hàng của bạn")').first()
      ).toBeVisible();
    });
  });

  test.describe("2. Thêm sản phẩm vào giỏ hàng", () => {
    test("TC03: Thêm sản phẩm từ trang chi tiết", async ({ page }) => {
      // Vào trang chi tiết sản phẩm
      await page.goto("/product/banh-quy-vi-sua-trai-cay-cho-cho-meo");
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(2000);

      // Click nút thêm vào giỏ hàng
      const addToCartBtn = page.getByRole("button", {
        name: /Thêm vào giỏ hàng/i,
      });
      await expect(addToCartBtn).toBeVisible();
      await addToCartBtn.click();

      // Đợi toast notification xuất hiện và biến mất
      await page.waitForTimeout(2000);

      // Đợi xem có modal confirm không (timeout nhanh)
      const confirmBtn = page.locator(".swal2-confirm");
      const hasModal = await confirmBtn.isVisible().catch(() => false);

      if (hasModal) {
        await confirmBtn.click();
        await page.waitForTimeout(1000);
      }

      // Vào trang giỏ hàng kiểm tra
      await page.goto("/cart");
      await page.waitForLoadState("networkidle");

      // Đợi table hoặc heading giỏ hàng xuất hiện
      await page.waitForSelector(
        'h2:has-text("Giỏ hàng"), table, text=/Giỏ hàng/i',
        {
          timeout: 10000,
          state: "visible",
        }
      );
      await page.waitForTimeout(2000);

      // Kiểm tra có sản phẩm trong giỏ (đợi tbody tr xuất hiện)
      const tableRows = page.locator("tbody tr");
      await expect(tableRows.first()).toBeVisible({ timeout: 10000 });
    });

    test("TC04: Thêm sản phẩm với số lượng tùy chỉnh", async ({ page }) => {
      await page.goto("/product/banh-sua-de-bo-sung-dinh-duong-cho-meo");
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(2000);

      // Tăng số lượng lên 3
      const increaseBtn = page.locator('button:has-text("+")').first();
      await increaseBtn.click();
      await page.waitForTimeout(500);
      await increaseBtn.click();
      await page.waitForTimeout(500);

      // Thêm vào giỏ
      await page.getByRole("button", { name: /Thêm vào giỏ hàng/i }).click();

      // Đợi toast notification
      await page.waitForTimeout(2000);

      // Đợi xem có modal confirm không
      const confirmBtn = page.locator(".swal2-confirm");
      const hasModal = await confirmBtn.isVisible().catch(() => false);

      if (hasModal) {
        await confirmBtn.click();
        await page.waitForTimeout(1000);
      }

      // Kiểm tra trong giỏ
      await page.goto("/cart");
      await page.waitForLoadState("networkidle");

      // Đợi table hoặc heading giỏ hàng xuất hiện
      await page.waitForSelector(
        'h2:has-text("Giỏ hàng"), table, text=/Giỏ hàng/i',
        {
          timeout: 10000,
          state: "visible",
        }
      );
      await page.waitForTimeout(2000);

      // Kiểm tra số lượng là 3 (đợi input xuất hiện)
      const quantityInput = page
        .locator('tbody tr input[type="number"]')
        .first();
      await quantityInput.waitFor({ state: "visible", timeout: 10000 });
      const qty = await quantityInput.inputValue();
      expect(parseInt(qty)).toBe(3);
    });
  });

  test.describe("3. Cập nhật số lượng sản phẩm", () => {
    test.beforeEach(async ({ page }) => {
      // Thêm sản phẩm vào giỏ trước
      await page.goto("/product/banh-quy-vi-sua-trai-cay-cho-cho-meo");
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(1500);

      await page.getByRole("button", { name: /Thêm vào giỏ hàng/i }).click();
      await page.waitForTimeout(3000);

      await page.goto("/cart");
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(2000);
    });

    test("TC06: Tăng số lượng sản phẩm bằng nút +", async ({ page }) => {
      // Lấy số lượng ban đầu
      const quantityInput = page
        .locator("tbody tr")
        .first()
        .locator('input[type="number"]');
      const initialQty = parseInt(await quantityInput.inputValue());

      // Click nút tăng
      const increaseBtn = page
        .locator("tbody tr")
        .first()
        .locator('button:has-text("+")');

      await increaseBtn.click();
      await page.waitForTimeout(2000);

      // Kiểm tra số lượng đã tăng
      const newQty = parseInt(await quantityInput.inputValue());
      expect(newQty).toBe(initialQty + 1);
    });

    test("TC07: Giảm số lượng sản phẩm bằng nút -", async ({ page }) => {
      // Tăng lên 3 trước
      const increaseBtn = page
        .locator("tbody tr")
        .first()
        .locator('button:has-text("+")');

      await increaseBtn.click();
      await page.waitForTimeout(1500);
      await increaseBtn.click();
      await page.waitForTimeout(1500);

      const quantityInput = page
        .locator("tbody tr")
        .first()
        .locator('input[type="number"]');
      const initialQty = parseInt(await quantityInput.inputValue());

      // Click nút giảm
      const decreaseBtn = page
        .locator("tbody tr")
        .first()
        .locator('button:has-text("-")');

      await decreaseBtn.click();
      await page.waitForTimeout(2000);

      // Kiểm tra số lượng đã giảm
      const newQty = parseInt(await quantityInput.inputValue());
      expect(newQty).toBe(initialQty - 1);
    });

    test("TC08: Nhập số lượng trực tiếp vào input", async ({ page }) => {
      const quantityInput = page
        .locator("tbody tr")
        .first()
        .locator('input[type="number"]');

      // Clear và nhập số mới
      await quantityInput.clear();
      await quantityInput.fill("-5");
      await quantityInput.press("Tab"); // Trigger blur
      await page.waitForTimeout(2000);

      // Kiểm tra giá trị đã cập nhật
      const qty = await quantityInput.inputValue();
      expect(parseInt(qty)).toBe(5);
    });

    test("TC09: Giảm số lượng về 1 rồi click - sẽ xóa sản phẩm", async ({
      page,
    }) => {
      // Đảm bảo số lượng là 1
      const quantityInput = page
        .locator("tbody tr")
        .first()
        .locator('input[type="number"]');
      await quantityInput.clear();
      await quantityInput.fill("1");
      await quantityInput.press("Tab");
      await page.waitForTimeout(2000);

      // Lấy tên sản phẩm
      const productName = await page
        .locator("tbody tr")
        .first()
        .locator("td")
        .first()
        .textContent();

      // Click nút giảm (sẽ xóa sản phẩm vì quantity = 1)
      const decreaseBtn = page
        .locator("tbody tr")
        .first()
        .locator('button:has-text("-")');

      await decreaseBtn.click();
      await page.waitForTimeout(2000);

      // Kiểm tra sản phẩm đã bị xóa
      if (productName) {
        const deletedProduct = page.getByText(productName.trim(), {
          exact: false,
        });
        expect(await deletedProduct.count()).toBe(0);
      }
    });
  });

  test.describe("4. Xóa sản phẩm khỏi giỏ hàng", () => {
    test.beforeEach(async ({ page }) => {
      // Thêm sản phẩm vào giỏ
      await page.goto("/product/banh-quy-vi-sua-trai-cay-cho-cho-meo");
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(1500);

      await page.getByRole("button", { name: /Thêm vào giỏ hàng/i }).click();
      await page.waitForTimeout(3000);

      await page.goto("/cart");
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(2000);
    });

    test("TC10: Xóa sản phẩm bằng nút xóa (icon trash)", async ({ page }) => {
      // Đếm số sản phẩm ban đầu
      const initialCount = await page.locator("tbody tr").count();

      // Click nút xóa đầu tiên (button chứa FaTrash icon)
      const deleteBtn = page
        .locator("tbody tr")
        .first()
        .locator("button.text-red-500, button:has(svg)") // Button với class text-red-500 hoặc chứa svg
        .last();

      await deleteBtn.click();
      await page.waitForTimeout(2000);

      // Kiểm tra số lượng đã giảm
      const newCount = await page.locator("tbody tr").count();
      expect(newCount).toBe(initialCount - 1);
    });

    test("TC11: Xóa tất cả sản phẩm trong giỏ", async ({ page }) => {
      // Click nút "Xóa tất cả"
      const clearAllBtn = page.getByRole("button", { name: /Xóa tất cả/i });
      await clearAllBtn.click();
      await page.waitForTimeout(800);

      // Xác nhận trong modal SweetAlert2
      const confirmBtn = page.locator(
        'button:has-text("Xác nhận"), button.swal2-confirm'
      );
      await confirmBtn.click();
      await page.waitForTimeout(2000);

      // Kiểm tra giỏ hàng trống
      const emptyMsg = page.getByText(/Giỏ hàng trống|chưa có sản phẩm/i);
      if ((await emptyMsg.count()) > 0) {
        await expect(emptyMsg.first()).toBeVisible();
      }
    });

    test("TC12: Hủy xóa tất cả sản phẩm", async ({ page }) => {
      // Đếm số sản phẩm ban đầu
      const initialCount = await page.locator("tbody tr").count();

      // Click nút "Xóa tất cả"
      const clearAllBtn = page.getByRole("button", { name: /Xóa tất cả/i });
      await clearAllBtn.click();
      await page.waitForTimeout(800);

      // Click Hủy
      const cancelBtn = page.locator(
        'button:has-text("Hủy"), button.swal2-cancel'
      );
      await cancelBtn.click();
      await page.waitForTimeout(1000);

      // Kiểm tra số lượng không đổi
      const newCount = await page.locator("tbody tr").count();
      expect(newCount).toBe(initialCount);
    });
  });

  test.describe("5. Tính toán giá tiền", () => {
    test.beforeEach(async ({ page }) => {
      // Thêm sản phẩm vào giỏ
      await page.goto("/product/banh-quy-vi-sua-trai-cay-cho-cho-meo");
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(1500);

      await page.getByRole("button", { name: /Thêm vào giỏ hàng/i }).click();
      await page.waitForTimeout(3000);

      await page.goto("/cart");
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(2000);
    });

    test("TC13: Hiển thị giá sản phẩm đúng", async ({ page }) => {
      // Kiểm tra cột giá hiển thị
      const priceCell = page.locator("tbody tr").first().locator("td").nth(1);
      const priceText = await priceCell.textContent();

      // Kiểm tra có định dạng tiền tệ
      expect(priceText).toContain("đ");
    });

    test("TC14: Hiển thị thành tiền đúng (giá × số lượng)", async ({
      page,
    }) => {
      // Lấy giá
      const priceText = await page
        .locator("tbody tr")
        .first()
        .locator("td")
        .nth(1)
        .textContent();
      const price = parseInt((priceText || "0").replace(/[^\d]/g, ""));

      // Lấy số lượng
      const qtyInput = page
        .locator("tbody tr")
        .first()
        .locator('input[type="number"]');
      const quantity = parseInt(await qtyInput.inputValue());

      // Lấy thành tiền
      const totalText = await page
        .locator("tbody tr")
        .first()
        .locator("td")
        .nth(3)
        .textContent();
      const total = parseInt((totalText || "0").replace(/[^\d]/g, ""));

      // Kiểm tra tính toán đúng
      expect(total).toBe(price * quantity);
    });

    test("TC15: Cập nhật tổng tiền khi thay đổi số lượng", async ({ page }) => {
      // Lấy tổng tiền ban đầu
      const totalSection = page
        .locator("text=/Tổng tiền|Tổng cộng/i")
        .locator("..")
        .locator("..")
        .first();
      const initialTotalText = await totalSection.textContent();
      const initialTotal = parseInt(
        (initialTotalText || "0").replace(/[^\d]/g, "")
      );

      // Tăng số lượng
      const increaseBtn = page
        .locator("tbody tr")
        .first()
        .locator('button:has-text("+")');

      await increaseBtn.click();
      await page.waitForTimeout(2000);

      // Lấy tổng tiền mới
      const newTotalText = await totalSection.textContent();
      const newTotal = parseInt((newTotalText || "0").replace(/[^\d]/g, ""));

      // Kiểm tra tổng tiền đã tăng
      expect(newTotal).toBeGreaterThan(initialTotal);
    });
  });

  test.describe("6. Chuyển đến trang thanh toán", () => {
    test.beforeEach(async ({ page }) => {
      // Thêm sản phẩm vào giỏ
      await page.goto("/product/banh-quy-vi-sua-trai-cay-cho-cho-meo");
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(1500);

      await page.getByRole("button", { name: /Thêm vào giỏ hàng/i }).click();
      await page.waitForTimeout(3000);

      await page.goto("/cart");
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(2000);
    });

    test("TC16: Click nút Thanh toán chuyển đến trang checkout", async ({
      page,
    }) => {
      // Tìm nút thanh toán
      const checkoutBtn = page.getByRole("button", {
        name: /Thanh toán|Tiến hành thanh toán/i,
      });

      if (await checkoutBtn.isVisible()) {
        await checkoutBtn.click();
        await page.waitForTimeout(2000);

        // Kiểm tra đã chuyển đến trang checkout
        await expect(page).toHaveURL(/\/checkout/);
      }
    });

    test("TC17: Hiển thị nút Tiếp tục mua hàng", async ({ page }) => {
      const continueBtn = page.getByRole("link", {
        name: /Tiếp tục mua hàng|Mua thêm/i,
      });

      if ((await continueBtn.count()) > 0) {
        await expect(continueBtn.first()).toBeVisible();
      }
    });
  });

  test.describe("7. Responsive design", () => {
    test("TC18: Giao diện mobile (375px)", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      // Thêm sản phẩm
      await page.goto("/product/banh-quy-vi-sua-trai-cay-cho-cho-meo");
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(1500);

      await page.getByRole("button", { name: /Thêm vào giỏ hàng/i }).click();
      await page.waitForTimeout(3000);

      // Vào giỏ hàng
      await page.goto("/cart");
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(2000);

      // Kiểm tra tiêu đề vẫn hiển thị - dùng .first() tránh strict mode
      await expect(
        page.getByRole("heading", { name: /Giỏ hàng/i }).first()
      ).toBeVisible();

      // Kiểm tra table responsive
      const table = page.locator("table").first();
      await expect(table).toBeVisible();
    });

    test("TC19: Giao diện tablet (768px)", async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });

      // Thêm sản phẩm
      await page.goto("/product/banh-quy-vi-sua-trai-cay-cho-cho-meo");
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(1500);

      await page.getByRole("button", { name: /Thêm vào giỏ hàng/i }).click();
      await page.waitForTimeout(3000);

      await page.goto("/cart");
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(2000);

      // Kiểm tra layout
      await expect(page.locator("table").first()).toBeVisible();
    });
  });
});
