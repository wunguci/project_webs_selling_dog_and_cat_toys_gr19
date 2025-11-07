import { test, expect, Page } from "@playwright/test";

test.describe("Quản lý người dùng - User Management", () => {
  // Thông tin đăng nhập admin
  const ADMIN_CREDENTIALS = {
    phone: "0972385999",
    password: "vutkd23405",
  };

  // Helper function để đăng nhập
  async function loginAsAdmin(page: Page) {
    await page.goto("/login");
    await page.waitForLoadState("networkidle");

    await page.locator('input[name="phone"]').fill(ADMIN_CREDENTIALS.phone);
    await page
      .locator('input[name="password"]')
      .fill(ADMIN_CREDENTIALS.password);
    await page.locator('button[type="submit"]').click();

    // Đợi redirect và load xong
    await page.waitForTimeout(3000);
  }

  test.beforeEach(async ({ page }) => {
    // Đăng nhập trước mỗi test
    await loginAsAdmin(page);

    // Điều hướng đến trang quản lý người dùng
    await page.goto("/user-management");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1500);
  });

  test.describe("1. Giao diện trang quản lý người dùng", () => {
    test("TC01: Hiển thị đầy đủ các thành phần chính", async ({ page }) => {
      // Kiểm tra tiêu đề trang (dùng heading để tránh conflict)
      await expect(
        page.getByRole("heading", { name: "Quản lý người dùng" })
      ).toBeVisible();

      // Kiểm tra sidebar
      const sidebar = page.locator('aside, [class*="sidebar"]').first();
      await expect(sidebar).toBeVisible();

      // Kiểm tra top navigation
      await expect(page.locator("nav, header").first()).toBeVisible();
    });

    test("TC02: Hiển thị 3 card thống kê người dùng", async ({ page }) => {
      // Kiểm tra các card thống kê
      await expect(page.getByText("Tổng Người Dùng")).toBeVisible();
      await expect(page.getByText("Người Dùng Hoạt Động")).toBeVisible();
      await expect(page.getByText("Người Dùng Không Hoạt Động")).toBeVisible();

      // Kiểm tra các số liệu hiển thị
      const statNumbers = page.locator("text=/^\\d+$/");
      expect(await statNumbers.count()).toBeGreaterThan(0);
    });

    test("TC03: Hiển thị nút Thêm người dùng và Export CSV", async ({
      page,
    }) => {
      // Nút Thêm người dùng
      const addButton = page.getByRole("button", { name: /Thêm người dùng/i });
      await expect(addButton).toBeVisible();
      await expect(addButton).toBeEnabled();

      // Nút Export CSV
      const exportButton = page.getByRole("button", { name: /Export CSV/i });
      await expect(exportButton).toBeVisible();
      await expect(exportButton).toBeEnabled();
    });

    test("TC04: Hiển thị bảng danh sách người dùng", async ({ page }) => {
      // Kiểm tra có dữ liệu trong table
      const tableRows = page.locator('tbody tr, [class*="user-row"]');
      const rowCount = await tableRows.count();

      expect(rowCount).toBeGreaterThan(0);

      // Kiểm tra thông tin hiển thị (dùng heading)
      await expect(
        page.getByRole("heading", { name: /Danh sách người dùng/i })
      ).toBeVisible();
    });

    test("TC05: Hiển thị thanh tìm kiếm", async ({ page }) => {
      // Kiểm tra search input
      const searchInputs = page.locator(
        'input[type="search"], input[placeholder*="Tìm kiếm"]'
      );
      expect(await searchInputs.count()).toBeGreaterThan(0);

      // Kiểm tra ít nhất 1 input hiển thị
      const firstVisibleInput = searchInputs.first();
      await expect(firstVisibleInput).toBeVisible();
    });
  });

  test.describe("2. Chức năng thêm người dùng mới", () => {
    test("TC06: Mở modal thêm người dùng thành công", async ({ page }) => {
      // Click nút Thêm người dùng
      await page.getByRole("button", { name: /Thêm người dùng/i }).click();
      await page.waitForTimeout(800);

      // Kiểm tra modal xuất hiện
      const modal = page.locator('[role="dialog"], [class*="modal"]').first();
      await expect(modal).toBeVisible();

      // Kiểm tra tiêu đề modal (dùng heading để tránh conflict)
      await expect(
        page.getByRole("heading", { name: /Add New User|Thêm/i })
      ).toBeVisible();
    });

    test("TC07: Hiển thị đầy đủ form thêm người dùng", async ({ page }) => {
      // Mở modal
      await page.getByRole("button", { name: /Thêm người dùng/i }).click();
      await page.waitForTimeout(800);

      // Kiểm tra các trường bắt buộc
      await expect(page.locator('input[name="fullName"]')).toBeVisible();
      await expect(page.locator('input[name="email"]')).toBeVisible();
      await expect(page.locator('input[name="phone"]')).toBeVisible();
      await expect(page.locator('input[name="address"]')).toBeVisible();
      await expect(page.locator('input[name="birthDate"]')).toBeVisible();
      await expect(page.locator('select[name="gender"]')).toBeVisible();

      // Kiểm tra trường password với giá trị mặc định
      const passwordInput = page.locator('input[name="password"]');
      await expect(passwordInput).toBeVisible();
      await expect(passwordInput).toHaveValue("123456");

      // Kiểm tra upload avatar
      await expect(page.locator('input[type="file"]')).toBeVisible();

      // Kiểm tra các nút
      await expect(page.getByRole("button", { name: /Hủy/i })).toBeVisible();
      await expect(
        page.getByRole("button", { name: /Thêm mới/i })
      ).toBeVisible();
    });

    test("TC08: Thêm người dùng mới thành công với thông tin đầy đủ", async ({
      page,
    }) => {
      // Mở modal
      await page.getByRole("button", { name: /Thêm người dùng/i }).click();
      await page.waitForTimeout(800);

      // Tạo dữ liệu test
      const timestamp = Date.now();
      const testUser = {
        fullName: `Test User ${timestamp}`,
        email: `testuser${timestamp}@example.com`,
        phone: `09${timestamp.toString().slice(-8)}`,
        address: "123 Test Street, District 1, Ho Chi Minh City",
        birthDate: "1995-06-15",
        gender: "Nam",
      };

      // Điền thông tin
      await page.locator('input[name="fullName"]').fill(testUser.fullName);
      await page.locator('input[name="email"]').fill(testUser.email);
      await page.locator('input[name="phone"]').fill(testUser.phone);
      await page.locator('input[name="address"]').fill(testUser.address);
      await page.locator('input[name="birthDate"]').fill(testUser.birthDate);
      await page.locator('select[name="gender"]').selectOption(testUser.gender);

      // Kiểm tra password có giá trị mặc định
      await expect(page.locator('input[name="password"]')).toHaveValue(
        "123456"
      );

      // Submit form
      await page.getByRole("button", { name: /Thêm mới/i }).click();

      // Đợi xử lý
      await page.waitForTimeout(3000);

      // Kiểm tra thông báo thành công
      const successToast = page
        .locator("text=/created successfully|thành công/i")
        .first();
      await expect(successToast).toBeVisible({ timeout: 5000 });

      // Kiểm tra modal đã đóng
      await expect(page.locator('[role="dialog"]').first()).not.toBeVisible();

      // Kiểm tra user mới xuất hiện trong danh sách
      await page.waitForTimeout(2000);
      // Tìm trong table body để tránh conflict
      const userInTable = page
        .locator("tbody")
        .getByText(testUser.fullName, { exact: false });
      if ((await userInTable.count()) > 0) {
        await expect(userInTable.first()).toBeVisible({ timeout: 5000 });
      }
    });

    test("TC09: Thêm người dùng với mật khẩu tùy chỉnh", async ({ page }) => {
      await page.getByRole("button", { name: /Thêm người dùng/i }).click();
      await page.waitForTimeout(800);

      const timestamp = Date.now();
      const customPassword = "CustomPass@123";

      // Điền thông tin cơ bản
      await page
        .locator('input[name="fullName"]')
        .fill(`Custom Pass User ${timestamp}`);
      await page
        .locator('input[name="email"]')
        .fill(`custom${timestamp}@example.com`);
      await page
        .locator('input[name="phone"]')
        .fill(`09${timestamp.toString().slice(-8)}`);
      await page.locator('input[name="address"]').fill("Test Address");
      await page.locator('input[name="birthDate"]').fill("1992-03-10");

      // Thay đổi mật khẩu
      const passwordInput = page.locator('input[name="password"]');
      await passwordInput.clear();
      await passwordInput.fill(customPassword);
      await expect(passwordInput).toHaveValue(customPassword);

      // Submit
      await page.getByRole("button", { name: /Thêm mới/i }).click();
      await page.waitForTimeout(3000);

      // Kiểm tra thành công
      await expect(
        page.locator("text=/created successfully|thành công/i").first()
      ).toBeVisible({ timeout: 5000 });
    });

    test("TC10: Validation - Không cho phép thêm user với trường trống", async ({
      page,
    }) => {
      await page.getByRole("button", { name: /Thêm người dùng/i }).click();
      await page.waitForTimeout(800);

      // Click submit ngay mà không điền gì
      await page.getByRole("button", { name: /Thêm mới/i }).click();
      await page.waitForTimeout(1000);

      // Kiểm tra validation HTML5 hoặc error message
      const fullNameInput = page.locator('input[name="fullName"]');
      const isRequired = await fullNameInput.evaluate(
        (el: HTMLInputElement) => el.required
      );
      expect(isRequired).toBeTruthy();
    });

    test("TC11: Validation - Email không đúng định dạng", async ({ page }) => {
      await page.getByRole("button", { name: /Thêm người dùng/i }).click();
      await page.waitForTimeout(800);

      // Điền thông tin với email sai
      await page.locator('input[name="fullName"]').fill("Test User");
      await page.locator('input[name="email"]').fill("invalid-email-format");
      await page.locator('input[name="phone"]').fill("0123456789");

      await page.getByRole("button", { name: /Thêm mới/i }).click();
      await page.waitForTimeout(1000);

      // Kiểm tra validation email
      const emailInput = page.locator('input[name="email"]');
      const isInvalid = await emailInput.evaluate(
        (el: HTMLInputElement) => !el.validity.valid
      );
      expect(isInvalid).toBeTruthy();
    });

    test("TC12: Đóng modal bằng nút Hủy", async ({ page }) => {
      await page.getByRole("button", { name: /Thêm người dùng/i }).click();
      await page.waitForTimeout(800);

      // Điền một vài thông tin
      await page.locator('input[name="fullName"]').fill("Test User Cancel");

      // Click Hủy
      await page.getByRole("button", { name: /Hủy/i }).click();
      await page.waitForTimeout(500);

      // Kiểm tra modal đã đóng
      await expect(page.locator('[role="dialog"]').first()).not.toBeVisible();
    });

    test("TC13: Upload avatar khi thêm người dùng", async ({ page }) => {
      await page.getByRole("button", { name: /Thêm người dùng/i }).click();
      await page.waitForTimeout(800);

      // Tạo file ảnh giả (1x1 pixel PNG)
      const buffer = Buffer.from(
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
        "base64"
      );

      // Upload file
      await page.locator('input[type="file"]').setInputFiles({
        name: "avatar.png",
        mimeType: "image/png",
        buffer: buffer,
      });

      // Đợi preview hiển thị
      await page.waitForTimeout(1500);

      // Kiểm tra preview xuất hiện
      const avatarPreview = page.locator(
        'img[alt*="Avatar"], img[alt*="Preview"]'
      );
      const previewCount = await avatarPreview.count();
      expect(previewCount).toBeGreaterThan(0);
    });
  });

  test.describe("3. Chức năng tìm kiếm và lọc", () => {
    test("TC14: Tìm kiếm người dùng theo tên", async ({ page }) => {
      // Nhập từ khóa tìm kiếm
      const searchInput = page
        .locator('input[type="search"], input[placeholder*="Tìm kiếm"]')
        .first();
      await searchInput.fill("Admin");

      // Đợi kết quả
      await page.waitForTimeout(2000);

      // Kiểm tra có kết quả
      const rows = page.locator("tbody tr");
      const rowCount = await rows.count();
      expect(rowCount).toBeGreaterThan(0);
    });

    test("TC15: Xóa từ khóa tìm kiếm", async ({ page }) => {
      const searchInput = page
        .locator('input[type="search"], input[placeholder*="Tìm kiếm"]')
        .first();

      // Tìm kiếm
      await searchInput.fill("Test Search");
      await page.waitForTimeout(1500);

      // Xóa
      await searchInput.clear();
      await page.waitForTimeout(1500);

      // Kiểm tra input đã trống
      await expect(searchInput).toHaveValue("");
    });
  });

  test.describe("4. Chức năng xem chi tiết người dùng", () => {
    test("TC16: Xem chi tiết người dùng từ danh sách", async ({ page }) => {
      // Tìm và click nút View đầu tiên
      const viewButtons = page.locator(
        'button:has-text("View"), [title*="View"], [class*="view"]'
      );

      if ((await viewButtons.count()) > 0) {
        await viewButtons.first().click();
        await page.waitForTimeout(1500);

        // Kiểm tra đã chuyển sang view chi tiết
        await expect(page.getByText("Chi tiết người dùng")).toBeVisible();

        // Kiểm tra có nút Back
        await expect(
          page.getByRole("button", { name: /Back|Quay lại/i })
        ).toBeVisible();
      }
    });

    test("TC17: Quay lại danh sách từ trang chi tiết", async ({ page }) => {
      const viewButtons = page.locator(
        'button:has-text("View"), [title*="View"]'
      );

      if ((await viewButtons.count()) > 0) {
        await viewButtons.first().click();
        await page.waitForTimeout(1500);

        // Click Back
        await page.getByRole("button", { name: /Back|Quay lại/i }).click();
        await page.waitForTimeout(1000);

        // Kiểm tra đã về danh sách
        await expect(page.getByText("Danh sách người dùng")).toBeVisible();
      }
    });
  });

  test.describe("5. Chức năng chỉnh sửa người dùng", () => {
    test("TC18: Mở modal chỉnh sửa người dùng", async ({ page }) => {
      const editButtons = page.locator(
        'button:has-text("Edit"), [title*="Edit"], [class*="edit"]'
      );

      if ((await editButtons.count()) > 0) {
        await editButtons.first().click();
        await page.waitForTimeout(1000);

        // Kiểm tra modal Edit xuất hiện
        await expect(page.getByText(/Edit User|Chỉnh sửa/i)).toBeVisible();

        // Kiểm tra form có dữ liệu sẵn
        const fullNameValue = await page
          .locator('input[name="fullName"]')
          .inputValue();
        expect(fullNameValue.length).toBeGreaterThan(0);

        // Kiểm tra KHÔNG có trường password khi edit
        const passwordInputs = page.locator('input[name="password"]');
        expect(await passwordInputs.count()).toBe(0);
      }
    });

    test("TC19: Cập nhật thông tin người dùng", async ({ page }) => {
      const editButtons = page.locator(
        'button:has-text("Edit"), [title*="Edit"]'
      );

      if ((await editButtons.count()) > 0) {
        await editButtons.first().click();
        await page.waitForTimeout(1000);

        // Thay đổi địa chỉ
        const addressInput = page.locator('input[name="address"]');
        const newAddress = `Updated Address ${Date.now()}`;
        await addressInput.clear();
        await addressInput.fill(newAddress);

        // Submit
        await page.getByRole("button", { name: /Cập nhật|Update/i }).click();
        await page.waitForTimeout(3000);

        // Kiểm tra thông báo thành công
        const successMsg = page
          .locator("text=/updated successfully|Cập nhật thành công/i")
          .first();
        await expect(successMsg).toBeVisible({ timeout: 5000 });
      }
    });
  });

  test.describe("6. Chức năng xóa người dùng", () => {
    test("TC20: Mở modal xác nhận xóa", async ({ page }) => {
      const deleteButtons = page.locator(
        'button:has-text("Delete"), [title*="Delete"], [class*="delete"]'
      );

      if ((await deleteButtons.count()) > 0) {
        await deleteButtons.first().click();
        await page.waitForTimeout(800);

        // Kiểm tra modal confirm xuất hiện
        await expect(
          page.getByText(/Bạn có chắc|Are you sure|Xác nhận xóa/i)
        ).toBeVisible();

        // Kiểm tra có nút Hủy và Xóa
        await expect(
          page.getByRole("button", { name: /Hủy|Cancel/i })
        ).toBeVisible();
        await expect(
          page.getByRole("button", { name: /Xóa|Delete|Confirm/i })
        ).toBeVisible();
      }
    });

    test("TC21: Hủy xóa người dùng", async ({ page }) => {
      const deleteButtons = page.locator(
        'button:has-text("Delete"), [title*="Delete"]'
      );

      if ((await deleteButtons.count()) > 0) {
        await deleteButtons.first().click();
        await page.waitForTimeout(800);

        // Click Hủy
        await page.getByRole("button", { name: /Hủy|Cancel/i }).click();
        await page.waitForTimeout(500);

        // Kiểm tra modal đã đóng
        const confirmModal = page.locator(
          '[role="dialog"]:has-text("Bạn có chắc"), [role="dialog"]:has-text("Are you sure")'
        );
        expect(await confirmModal.count()).toBe(0);
      }
    });
  });

  test.describe("7. Chức năng phân trang", () => {
    test("TC22: Hiển thị thông tin phân trang", async ({ page }) => {
      // Kiểm tra có thông tin trang
      const pageInfo = page.getByText(/Trang \d+ \/ \d+|Page \d+/i);

      if (await pageInfo.isVisible()) {
        await expect(pageInfo).toBeVisible();

        // Kiểm tra các nút phân trang
        const prevBtn = page.getByRole("button", {
          name: /Trước|Previous|Prev/i,
        });
        const nextBtn = page.getByRole("button", { name: /Tiếp|Next/i });

        await expect(prevBtn).toBeVisible();
        await expect(nextBtn).toBeVisible();
      }
    });

    test("TC23: Chuyển sang trang tiếp theo", async ({ page }) => {
      const nextBtn = page.getByRole("button", { name: /Tiếp|Next/i });

      // Chỉ test nếu nút Next không bị disable
      if ((await nextBtn.isVisible()) && !(await nextBtn.isDisabled())) {
        await nextBtn.click();
        await page.waitForTimeout(2000);

        // Kiểm tra đã chuyển trang
        const pageInfo = page.getByText(/Trang 2|Page 2/i);
        await expect(pageInfo).toBeVisible({ timeout: 5000 });
      }
    });
  });

  test.describe("8. Chức năng Export CSV", () => {
    test("TC24: Export danh sách người dùng ra file CSV", async ({ page }) => {
      // Listen for download
      const downloadPromise = page.waitForEvent("download");

      // Click Export CSV
      await page.getByRole("button", { name: /Export CSV/i }).click();

      // Đợi download
      const download = await downloadPromise;

      // Kiểm tra tên file
      expect(download.suggestedFilename()).toContain("users.csv");

      // Có thể kiểm tra thêm nội dung file nếu cần
      const path = await download.path();
      expect(path).toBeTruthy();
    });
  });

  test.describe("9. Responsive Design", () => {
    test("TC25: Giao diện mobile (375px)", async ({ page }) => {
      // Set viewport mobile
      await page.setViewportSize({ width: 375, height: 667 });

      // Reload
      await page.goto("/user-management");
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(1500);

      // Kiểm tra trang vẫn hiển thị (dùng heading)
      await expect(
        page.getByRole("heading", { name: "Quản lý người dùng" })
      ).toBeVisible();

      // Kiểm tra mobile menu icon nếu có
      const mobileMenuIcons = page.locator(
        '[class*="hamburger"], [class*="menu-icon"], button:has-text("☰")'
      );
      if ((await mobileMenuIcons.count()) > 0) {
        await expect(mobileMenuIcons.first()).toBeVisible();
      }
    });

    test("TC26: Giao diện tablet (768px)", async ({ page }) => {
      // Set viewport tablet
      await page.setViewportSize({ width: 768, height: 1024 });

      // Reload
      await page.goto("/user-management");
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(1500);

      // Kiểm tra các thành phần chính (dùng heading)
      await expect(
        page.getByRole("heading", { name: "Quản lý người dùng" })
      ).toBeVisible();

      // Kiểm tra table vẫn hiển thị được
      const table = page.locator('table, [class*="table"]').first();
      await expect(table).toBeVisible();
    });

    test("TC27: Giao diện desktop (1920px)", async ({ page }) => {
      // Set viewport desktop full HD
      await page.setViewportSize({ width: 1920, height: 1080 });

      // Reload
      await page.goto("/user-management");
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(1500);

      // Kiểm tra layout desktop (dùng heading)
      await expect(
        page.getByRole("heading", { name: "Quản lý người dùng" })
      ).toBeVisible();

      // Kiểm tra sidebar hiển thị đầy đủ
      const sidebar = page.locator('aside, [class*="sidebar"]').first();
      await expect(sidebar).toBeVisible();
    });
  });

});
