// @ts-check
import { test, expect, type Page } from "@playwright/test";

async function login(
  page: Page,
  phone: string = "0987654321",
  password: string = "Xuan123"
): Promise<void> {
  await page.goto("/login");
  await page.waitForLoadState("networkidle");

  await page.locator('input[name="phone"]').fill(phone);
  await page.locator('input[name="password"]').fill(password);
  await page.locator('button[type="submit"]').click();
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(1000);
}

test.describe("User Profile - Complete Test Suite", () => {
  test.use({
    actionTimeout: 10000,
  });

  // =====================================================
  // SECTION 1: THÔNG TIN CÁ NHÂN
  // =====================================================
  test.describe("Thông tin cá nhân", () => {
    test.beforeEach(async ({ page }) => {
      await login(page);
      // Navigate đến trang user profile
      await page.goto("/userProfile");
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(500);
    });

    test("TC01 - Truy cập trang thông tin cá nhân", async ({ page }) => {
      // Click vào tab Thông tin cá nhân
      await page.locator('a:has-text("Thông tin cá nhân")').click();
      await page.waitForTimeout(500);

      // Verify URL và heading
      const currentUrl = page.url();
      expect(currentUrl).toContain("/userProfile");
      expect(currentUrl).toContain("#thong-tin-ca-nhan");

      const heading = page.locator('h1:has-text("Thông tin cá nhân")');
      await expect(heading).toBeVisible();
    });

    test("TC02 - Hiển thị đầy đủ thông tin người dùng", async ({ page }) => {
      // Click vào tab Thông tin cá nhân
      await page.locator('a:has-text("Thông tin cá nhân")').click();
      await page.waitForTimeout(500);

      // Verify heading
      const heading = page.locator('h1:has-text("Thông tin cá nhân")');
      await expect(heading).toBeVisible();

      // Verify các label
      await expect(page.locator('label:has-text("Họ và tên")')).toBeVisible();
      await expect(page.locator('label:has-text("Ngày sinh")')).toBeVisible();
      await expect(page.locator('label:has-text("Giới tính")')).toBeVisible();
      await expect(page.locator('label:has-text("Email")')).toBeVisible();
      await expect(
        page.locator('label:has-text("Số điện thoại")')
      ).toBeVisible();
      await expect(page.locator('label:has-text("Địa chỉ")')).toBeVisible();

      // Verify inputs có thể tương tác
      const fullNameInput = page.locator('input[type="text"]').first();
      await expect(fullNameInput).toBeVisible();
      await expect(fullNameInput).toBeEnabled();
    });

    test("TC03 - Hiển thị avatar người dùng", async ({ page }) => {
      // Click vào tab Thông tin cá nhân
      await page.locator('a:has-text("Thông tin cá nhân")').click();
      await page.waitForTimeout(500);

      const avatar = page.locator('img[alt="User Avatar"]');
      await expect(avatar).toBeVisible();

      const avatarSrc = await avatar.getAttribute("src");
      expect(avatarSrc).toBeTruthy();
      expect(avatarSrc).not.toBe("");
    });

    test("TC04 - Cập nhật thông tin cá nhân", async ({ page }) => {
      // Click vào tab Thông tin cá nhân
      await page.locator('a:has-text("Thông tin cá nhân")').click();
      await page.waitForTimeout(500);

      const timestamp = Date.now();

      // Họ và tên
      const fullNameInput = page
        .locator('div:has(> label:has-text("Họ và tên"))')
        .locator('input[type="text"]')
        .first();
      await fullNameInput.clear();
      await fullNameInput.fill("Nguyễn Văn Test " + timestamp);

      // Email
      const emailInput = page
        .locator('div:has(> label:has-text("Email"))')
        .locator('input[type="email"]')
        .first();
      await emailInput.clear();
      await emailInput.fill(`test${timestamp}@test.com`);

      // Giới tính
      const genderSelect = page
        .locator('div:has(> label:has-text("Giới tính"))')
        .locator("select")
        .first();
      await genderSelect.selectOption({ label: "Nam" });

      // Ngày sinh
      const birthDateInput = page
        .locator('div:has(> label:has-text("Ngày sinh"))')
        .locator('input[type="date"]')
        .first();
      await birthDateInput.fill("1995-06-15");

      // Số điện thoại
      const phoneInput = page
        .locator('div:has(> label:has-text("Số điện thoại"))')
        .locator('input[type="text"]')
        .first();
      await phoneInput.clear();
      await phoneInput.fill("0987654321");

      // Địa chỉ
      const addressInput = page
        .locator('div:has(> label:has-text("Địa chỉ"))')
        .locator('input[type="text"]')
        .first();
      await addressInput.clear();
      await addressInput.fill("123 Đường ABC, Quận 1, TP.HCM");

      // Click nút cập nhật
      const updateButton = page.locator(
        'button:has-text("Cập nhật thông tin")'
      );
      await expect(updateButton).toBeVisible();
      await updateButton.click();
      await page.waitForTimeout(2000);
    });
  });

  // =====================================================
  // SECTION 2: ĐƠN HÀNG CỦA BẠN
  // =====================================================
  test.describe("Đơn hàng của bạn", () => {
    test.beforeEach(async ({ page }) => {
      await login(page);
      // Navigate đến trang user profile
      await page.goto("/userProfile");
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(500);
    });

    test("TC05 - Truy cập trang đơn hàng", async ({ page }) => {
      // Click vào tab Đơn hàng của bạn
      await page.locator('a:has-text("Đơn hàng của bạn")').click();
      await page.waitForTimeout(500);

      // Verify URL và heading
      const currentUrl = page.url();
      expect(currentUrl).toContain("/userProfile");
      expect(currentUrl).toContain("#don-hang-cua-ban");

      const heading = page.locator('h1:has-text("Đơn hàng của bạn")');
      await expect(heading).toBeVisible();
    });

    test("TC06 - Hiển thị thông báo khi chưa có đơn hàng", async ({ page }) => {
      // Click vào tab Đơn hàng của bạn
      await page.locator('a:has-text("Đơn hàng của bạn")').click();
      await page.waitForTimeout(500);

      const emptyMessage = page.locator(
        'p:has-text("Bạn chưa có đơn hàng nào đang xử lý.")'
      );
      const shopButton = page.locator('a:has-text("Mua sắm ngay")');

      const hasEmptyMessage = await emptyMessage.isVisible().catch(() => false);
      if (hasEmptyMessage) {
        await expect(emptyMessage).toBeVisible();
        await expect(shopButton).toBeVisible();
        await expect(shopButton).toHaveAttribute("href", "/");
      }
    });

    test("TC07 - Hiển thị danh sách đơn hàng chờ xử lý", async ({ page }) => {
      // Click vào tab Đơn hàng của bạn
      await page.locator('a:has-text("Đơn hàng của bạn")').click();
      await page.waitForTimeout(500);

      const pendingSection = page.locator('h2:has-text("Chờ xử lý")');
      const hasPendingOrders = await pendingSection
        .isVisible()
        .catch(() => false);

      if (hasPendingOrders) {
        await expect(pendingSection).toBeVisible();

        // Verify table headers
        await expect(
          page.locator('th:has-text("Mã đơn hàng")').first()
        ).toBeVisible();
        await expect(
          page.locator('th:has-text("Ngày đặt")').first()
        ).toBeVisible();
        await expect(
          page.locator('th:has-text("Tổng tiền")').first()
        ).toBeVisible();
        await expect(
          page.locator('th:has-text("Trạng thái")').first()
        ).toBeVisible();
        await expect(
          page.locator('th:has-text("Thao tác")').first()
        ).toBeVisible();

        const rows = page.locator("tbody tr").first();
        await expect(rows).toBeVisible();
      }
    });

    test("TC08 - Hiển thị danh sách đơn hàng đang xử lý", async ({ page }) => {
      // Click vào tab Đơn hàng của bạn
      await page.locator('a:has-text("Đơn hàng của bạn")').click();
      await page.waitForTimeout(500);

      const processingSection = page.locator('h2:has-text("Đang xử lý")');
      const hasProcessingOrders = await processingSection
        .isVisible()
        .catch(() => false);

      if (hasProcessingOrders) {
        await expect(processingSection).toBeVisible();

        const table = processingSection.locator("..").locator("table").first();
        await expect(table).toBeVisible();

        const rows = table.locator("tbody tr");
        const rowCount = await rows.count();
        expect(rowCount).toBeGreaterThan(0);
      }
    });

    test("TC09 - Hiển thị danh sách đơn hàng đang giao hàng", async ({
      page,
    }) => {
      // Click vào tab Đơn hàng của bạn
      await page.locator('a:has-text("Đơn hàng của bạn")').click();
      await page.waitForTimeout(500);

      const shippingSection = page.locator('h2:has-text("Đang giao hàng")');
      const hasShippingOrders = await shippingSection
        .isVisible()
        .catch(() => false);

      if (hasShippingOrders) {
        await expect(shippingSection).toBeVisible();

        const table = shippingSection.locator("..").locator("table").first();
        await expect(table).toBeVisible();

        const rows = table.locator("tbody tr");
        const rowCount = await rows.count();
        expect(rowCount).toBeGreaterThan(0);
      }
    });

    test("TC10 - Xem chi tiết đơn hàng", async ({ page }) => {
      // Click vào tab Đơn hàng của bạn
      await page.locator('a:has-text("Đơn hàng của bạn")').click();
      await page.waitForTimeout(500);

      const viewButton = page.locator('button[title="Xem chi tiết"]').first();
      const hasOrders = await viewButton.isVisible().catch(() => false);

      if (hasOrders) {
        await viewButton.click();
        await page.waitForTimeout(1000);

        // Verify modal chi tiết đơn hàng hiển thị
        const modalHeading = page.locator('h2:has-text("Chi tiết đơn hàng")');
        await expect(modalHeading).toBeVisible({ timeout: 5000 });

        // Verify các thông tin trong modal
        await expect(page.locator('p:has-text("Mã đơn hàng:")')).toBeVisible();
        await expect(page.locator('p:has-text("Ngày đặt:")')).toBeVisible();
        await expect(page.locator('p:has-text("Trạng thái:")')).toBeVisible();
        await expect(page.locator('p:has-text("Sản phẩm:")')).toBeVisible();
        await expect(page.locator('p:has-text("Tổng tiền:")')).toBeVisible();

        // Đóng modal
        const closeButton = page.locator('button:has-text("Đóng")');
        await expect(closeButton).toBeVisible();
        await closeButton.click();
        await page.waitForTimeout(500);
      }
    });

    test("TC11 - Hủy đơn hàng chờ xử lý", async ({ page }) => {
      // Click vào tab Đơn hàng của bạn
      await page.locator('a:has-text("Đơn hàng của bạn")').click();
      await page.waitForTimeout(500);

      const pendingSection = page.locator('h2:has-text("Chờ xử lý")');
      const hasPendingOrders = await pendingSection
        .isVisible()
        .catch(() => false);

      if (hasPendingOrders) {
        const cancelButton = pendingSection
          .locator("..")
          .locator('button[title="Hủy đơn hàng"]')
          .first();
        await expect(cancelButton).toBeVisible();

        // Setup dialog handler
        page.on("dialog", async (dialog) => {
          expect(dialog.message()).toContain(
            "Bạn có chắc chắn muốn hủy đơn hàng này?"
          );
          await dialog.accept();
        });

        await cancelButton.click();
        await page.waitForTimeout(2000);
      }
    });

    test("TC12 - Không hiển thị nút hủy ở đơn đang xử lý/đang giao", async ({
      page,
    }) => {
      // Click vào tab Đơn hàng của bạn
      await page.locator('a:has-text("Đơn hàng của bạn")').click();
      await page.waitForTimeout(500);

      // Kiểm tra section "Đang xử lý"
      const processingSection = page.locator('h2:has-text("Đang xử lý")');
      const hasProcessingOrders = await processingSection
        .isVisible()
        .catch(() => false);

      if (hasProcessingOrders) {
        const cancelButton = processingSection
          .locator("..")
          .locator('button[title="Hủy đơn hàng"]')
          .first();
        const hasCancelButton = await cancelButton
          .isVisible()
          .catch(() => false);
        expect(hasCancelButton).toBe(false);
      }

      // Kiểm tra section "Đang giao hàng"
      const shippingSection = page.locator('h2:has-text("Đang giao hàng")');
      const hasShippingOrders = await shippingSection
        .isVisible()
        .catch(() => false);

      if (hasShippingOrders) {
        const cancelButton = shippingSection
          .locator("..")
          .locator('button[title="Hủy đơn hàng"]')
          .first();
        const hasCancelButton = await cancelButton
          .isVisible()
          .catch(() => false);
        expect(hasCancelButton).toBe(false);
      }
    });

    test("TC13 - Tải hóa đơn", async ({ page }) => {
      // Click vào tab Đơn hàng của bạn
      await page.locator('a:has-text("Đơn hàng của bạn")').click();
      await page.waitForTimeout(500);

      const downloadButton = page
        .locator('button[title="Tải hóa đơn"]')
        .first();
      const hasOrders = await downloadButton.isVisible().catch(() => false);

      if (hasOrders) {
        const downloadPromise = page.waitForEvent("download");
        await downloadButton.click();

        const download = await downloadPromise;
        expect(download).toBeTruthy();

        const fileName = download.suggestedFilename();
        expect(fileName).toBeTruthy();
      }
    });

    test("TC14 - Verify định dạng mã đơn hàng", async ({ page }) => {
      // Click vào tab Đơn hàng của bạn
      await page.locator('a:has-text("Đơn hàng của bạn")').click();
      await page.waitForTimeout(500);

      const orderCode = page.locator("tbody tr td").first();
      const hasOrders = await orderCode.isVisible().catch(() => false);

      if (hasOrders) {
        const codeText = await orderCode.textContent();
        expect(codeText).toMatch(/^[A-Z0-9]{6}$/);
      }
    });

    test("TC15 - Verify định dạng tổng tiền", async ({ page }) => {
      // Click vào tab Đơn hàng của bạn
      await page.locator('a:has-text("Đơn hàng của bạn")').click();
      await page.waitForTimeout(500);

      const priceCell = page.locator('tbody tr td:has-text("VNĐ")').first();
      const hasOrders = await priceCell.isVisible().catch(() => false);

      if (hasOrders) {
        const priceText = await priceCell.textContent();
        expect(priceText).toContain("VNĐ");
        expect(priceText).toMatch(/[\d,]+\s*VNĐ/);
      }
    });

    test("TC16 - Click nút Mua sắm ngay", async ({ page }) => {
      // Click vào tab Đơn hàng của bạn
      await page.locator('a:has-text("Đơn hàng của bạn")').click();
      await page.waitForTimeout(500);

      const emptyMessage = page.locator(
        'p:has-text("Bạn chưa có đơn hàng nào đang xử lý.")'
      );
      const hasEmptyMessage = await emptyMessage.isVisible().catch(() => false);

      if (hasEmptyMessage) {
        const shopButton = page.locator('a:has-text("Mua sắm ngay")');
        await expect(shopButton).toBeVisible();
        await shopButton.click();
        await page.waitForLoadState("networkidle");

        const currentUrl = page.url();
        expect(currentUrl).toContain("/");
      }
    });
  });

  // =====================================================
  // SECTION 3: LỊCH SỬ MUA HÀNG
  // =====================================================
  test.describe("Lịch sử mua hàng", () => {
    test.beforeEach(async ({ page }) => {
      await login(page);
      // Navigate đến trang user profile
      await page.goto("/userProfile");
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(500);
    });

    test("TC17 - Truy cập trang lịch sử mua hàng", async ({ page }) => {
      // Click vào tab Lịch sử mua hàng
      await page.locator('a:has-text("Lịch sử mua hàng")').click();
      await page.waitForTimeout(500);

      // Verify URL và heading
      const currentUrl = page.url();
      expect(currentUrl).toContain("/userProfile");
      expect(currentUrl).toContain("#lich-su-mua-hang");

      const heading = page.locator('h1:has-text("Lịch sử mua hàng")');
      await expect(heading).toBeVisible();
    });

    test("TC18 - Hiển thị thông báo khi chưa có đơn hoàn thành", async ({
      page,
    }) => {
      // Click vào tab Lịch sử mua hàng
      await page.locator('a:has-text("Lịch sử mua hàng")').click();
      await page.waitForTimeout(500);

      const emptyMessage = page.locator(
        'p:has-text("Bạn chưa có đơn hàng nào đã hoàn thành.")'
      );
      const hasEmptyMessage = await emptyMessage.isVisible().catch(() => false);

      if (hasEmptyMessage) {
        await expect(emptyMessage).toBeVisible();
      }
    });

    test("TC19 - Hiển thị danh sách đơn đã giao hàng", async ({ page }) => {
      // Click vào tab Lịch sử mua hàng
      await page.locator('a:has-text("Lịch sử mua hàng")').click();
      await page.waitForTimeout(500);

      const deliveredSection = page.locator('h2:has-text("Đã giao hàng")');
      const hasDeliveredOrders = await deliveredSection
        .isVisible()
        .catch(() => false);

      if (hasDeliveredOrders) {
        await expect(deliveredSection).toBeVisible();

        // Verify table headers
        await expect(
          page.locator('th:has-text("Mã đơn hàng")').first()
        ).toBeVisible();
        await expect(
          page.locator('th:has-text("Ngày đặt")').first()
        ).toBeVisible();
        await expect(
          page.locator('th:has-text("Ngày hoàn thành")').first()
        ).toBeVisible();
        await expect(
          page.locator('th:has-text("Tổng tiền")').first()
        ).toBeVisible();
        await expect(
          page.locator('th:has-text("Trạng thái")').first()
        ).toBeVisible();

        const rows = deliveredSection.locator("..").locator("tbody tr");
        const rowCount = await rows.count();
        expect(rowCount).toBeGreaterThan(0);
      }
    });

    test("TC20 - Hiển thị danh sách đơn hoàn tất", async ({ page }) => {
      // Click vào tab Lịch sử mua hàng
      await page.locator('a:has-text("Lịch sử mua hàng")').click();
      await page.waitForTimeout(500);

      const completedSection = page.locator('h2:has-text("Hoàn tất")');
      const hasCompletedOrders = await completedSection
        .isVisible()
        .catch(() => false);

      if (hasCompletedOrders) {
        await expect(completedSection).toBeVisible();

        const table = completedSection.locator("..").locator("table").first();
        await expect(table).toBeVisible();

        const rows = table.locator("tbody tr");
        const rowCount = await rows.count();
        expect(rowCount).toBeGreaterThan(0);
      }
    });

    test("TC21 - Hiển thị danh sách đơn đã hủy", async ({ page }) => {
      // Click vào tab Lịch sử mua hàng
      await page.locator('a:has-text("Lịch sử mua hàng")').click();
      await page.waitForTimeout(500);

      const canceledSection = page.locator('h2:has-text("Đã hủy")');
      const hasCanceledOrders = await canceledSection
        .isVisible()
        .catch(() => false);

      if (hasCanceledOrders) {
        await expect(canceledSection).toBeVisible();

        // Verify table headers
        await expect(
          page.locator('th:has-text("Ngày hủy")').first()
        ).toBeVisible();

        const table = canceledSection.locator("..").locator("table").first();
        await expect(table).toBeVisible();

        const rows = table.locator("tbody tr");
        const rowCount = await rows.count();
        expect(rowCount).toBeGreaterThan(0);
      }
    });

    test("TC22 - Xem chi tiết đơn trong lịch sử", async ({ page }) => {
      // Click vào tab Lịch sử mua hàng
      await page.locator('a:has-text("Lịch sử mua hàng")').click();
      await page.waitForTimeout(500);

      const viewButton = page.locator('button[title="Xem chi tiết"]').first();
      const hasOrders = await viewButton.isVisible().catch(() => false);

      if (hasOrders) {
        await viewButton.click();
        await page.waitForTimeout(1000);

        const modalHeading = page.locator('h2:has-text("Chi tiết đơn hàng")');
        await expect(modalHeading).toBeVisible({ timeout: 5000 });

        // Đóng modal
        const closeButton = page.locator('button:has-text("Đóng")');
        await closeButton.click();
        await page.waitForTimeout(500);
      }
    });

    test("TC23 - Tải hóa đơn từ lịch sử", async ({ page }) => {
      // Click vào tab Lịch sử mua hàng
      await page.locator('a:has-text("Lịch sử mua hàng")').click();
      await page.waitForTimeout(500);

      const downloadButton = page
        .locator('button[title="Tải hóa đơn"]')
        .first();
      const hasOrders = await downloadButton.isVisible().catch(() => false);

      if (hasOrders) {
        const downloadPromise = page.waitForEvent("download");
        await downloadButton.click();

        const download = await downloadPromise;
        expect(download).toBeTruthy();
      }
    });

    test("TC24 - Không hiển thị nút tải hóa đơn cho đơn đã hủy", async ({
      page,
    }) => {
      // Click vào tab Lịch sử mua hàng
      await page.locator('a:has-text("Lịch sử mua hàng")').click();
      await page.waitForTimeout(500);

      const canceledSection = page.locator('h2:has-text("Đã hủy")');
      const hasCanceledOrders = await canceledSection
        .isVisible()
        .catch(() => false);

      if (hasCanceledOrders) {
        const downloadButton = canceledSection
          .locator("..")
          .locator('button[title="Tải hóa đơn"]')
          .first();
        const hasDownloadButton = await downloadButton
          .isVisible()
          .catch(() => false);

        // Đơn đã hủy không có nút tải hóa đơn
        expect(hasDownloadButton).toBe(false);
      }
    });
  });
});
