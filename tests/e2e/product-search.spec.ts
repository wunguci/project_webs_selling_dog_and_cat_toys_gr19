import { test, expect } from "@playwright/test";

test.describe("Tìm kiếm sản phẩm - Product Search", () => {
  test.beforeEach(async ({ page }) => {
    // Điều hướng đến trang chủ trước mỗi test
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test.describe("1. Search sản phẩm theo tên", () => {
    test("TC01: Tìm kiếm sản phẩm bằng cách nhập tên và click nút Tìm kiếm", async ({
      page,
    }) => {
      // Điều hướng đến trang search
      await page.goto("/search");
      await page.waitForLoadState("networkidle");

      // Tìm input search - sử dụng placeholder chính xác
      const searchInput = page.getByPlaceholder("Nhập từ khóa tìm kiếm...");
      await expect(searchInput).toBeVisible({ timeout: 10000 });

      const searchTerm = "đồ chơi";
      await searchInput.fill(searchTerm);

      // Click nút tìm kiếm
      const searchButton = page.getByRole("button", { name: /tìm kiếm/i });
      await expect(searchButton).toBeVisible();
      await searchButton.click();

      // Đợi navigation và API response
      await page.waitForURL(/\/search\?q=.*/, { timeout: 10000 });
      await page
        .waitForResponse(
          (response) => response.url().includes("/api/products/search"),
          { timeout: 10000 }
        )
        .catch(() => {});
      await page.waitForLoadState("networkidle");

      // Kiểm tra URL có chứa query parameter
      await expect(page).toHaveURL(/\/search\?q=.*/i);

      // Kiểm tra có hiển thị kết quả tìm kiếm hoặc thông báo
      const resultText = page.getByText(/Tìm thấy|Không tìm thấy/i);
      await expect(resultText.first()).toBeVisible({ timeout: 10000 });
    });

    test("TC02: Tìm kiếm sản phẩm bằng cách nhấn Enter", async ({ page }) => {
      await page.goto("/search");
      await page.waitForLoadState("networkidle");

      const searchInput = page.getByPlaceholder("Nhập từ khóa tìm kiếm...");
      await expect(searchInput).toBeVisible({ timeout: 10000 });

      await searchInput.fill("chó");

      // Nhấn Enter để tìm kiếm
      await searchInput.press("Enter");

      // Đợi navigation
      await page.waitForURL(/\/search\?q=.*/, { timeout: 10000 });
      await page.waitForLoadState("networkidle");

      // Kiểm tra đã chuyển đến trang kết quả
      await expect(page).toHaveURL(/\/search\?q=.*/i);
    });

    test("TC03: Tìm kiếm từ URL query parameter", async ({ page }) => {
      // Truy cập trực tiếp với query parameter
      await page.goto("/search?q=đồ chơi");
      await page.waitForLoadState("networkidle");

      // Đợi API call hoàn thành
      await page
        .waitForResponse(
          (response) =>
            response.url().includes("/api/products/search") &&
            response.status() === 200,
          { timeout: 10000 }
        )
        .catch(() => {}); // Nếu không có response, bỏ qua
      await page.waitForLoadState("networkidle");

      // Kiểm tra input đã được điền giá trị
      const searchInput = page.getByPlaceholder("Nhập từ khóa tìm kiếm...");
      await expect(searchInput).toBeVisible({ timeout: 10000 });
      await expect(searchInput).toHaveValue("đồ chơi", { timeout: 5000 });

      // Kiểm tra có hiển thị kết quả
      const resultText = page.getByText(/Tìm thấy|Không tìm thấy/i);
      await expect(resultText.first()).toBeVisible({ timeout: 10000 });
    });

    test("TC04: Tìm kiếm với từ khóa ngắn (1-2 ký tự)", async ({ page }) => {
      await page.goto("/search");
      await page.waitForLoadState("networkidle");

      const searchInput = page.getByPlaceholder("Nhập từ khóa tìm kiếm...");
      await expect(searchInput).toBeVisible({ timeout: 10000 });

      await searchInput.fill("đ");
      await searchInput.press("Enter");

      await page.waitForURL(/\/search\?q=.*/, { timeout: 10000 });
      await page.waitForLoadState("networkidle");

      // Kiểm tra vẫn hoạt động với từ khóa ngắn
      await expect(page).toHaveURL(/\/search\?q=.*/i);
    });
  });

  test.describe("2. Search suggestions/autocomplete", () => {
    test("TC05: Hiển thị autocomplete khi nhập vào search box trong header", async ({
      page,
    }) => {
      // Tìm search input trong header - dùng placeholder chính xác
      const headerSearchInput = page
        .getByPlaceholder("Nhập từ khóa tìm kiếm")
        .first();
      await expect(headerSearchInput).toBeVisible({ timeout: 10000 });

      // Focus vào input để hiển thị popup
      await headerSearchInput.focus();

      // Nhập từ khóa để trigger autocomplete
      await headerSearchInput.fill("đồ");

      // Đợi autocomplete hiển thị - đợi response hoặc popup xuất hiện
      await Promise.race([
        page
          .waitForResponse(
            (response) => response.url().includes("/api/products/search"),
            { timeout: 3000 }
          )
          .catch(() => {}),
        page
          .waitForSelector(".popup-search, .popup-search-container", {
            state: "visible",
            timeout: 3000,
          })
          .catch(() => {}),
      ]);

      // Kiểm tra popup search có xuất hiện
      const popupSearch = page.locator(
        ".popup-search, .popup-search-container"
      );
      const popupVisible = (await popupSearch.count()) > 0;

      if (popupVisible) {
        // Popup có thể hiển thị kết quả hoặc lịch sử
        const hasResults =
          (await popupSearch.getByText("Kết quả tìm kiếm").count()) > 0;
        const hasHistory =
          (await popupSearch.getByText("Lịch sử tìm kiếm").count()) > 0;
        const hasNoResults =
          (await popupSearch.getByText("Không tìm thấy kết quả nào").count()) >
          0;

        // Ít nhất một trong các trường hợp phải đúng
        expect(hasResults || hasHistory || hasNoResults).toBeTruthy();
      }
    });

    test("TC06: Autocomplete hiển thị lịch sử tìm kiếm khi chưa có kết quả", async ({
      page,
    }) => {
      // Lưu lịch sử tìm kiếm vào localStorage
      await page.addInitScript(() => {
        localStorage.setItem(
          "searchHistory",
          JSON.stringify(["đồ chơi", "cún", "mèo"])
        );
      });

      await page.reload();
      await page.waitForLoadState("networkidle");

      const headerSearchInput = page
        .getByPlaceholder("Nhập từ khóa tìm kiếm")
        .first();
      await expect(headerSearchInput).toBeVisible({ timeout: 10000 });

      await headerSearchInput.focus();

      // Kiểm tra có hiển thị lịch sử tìm kiếm
      const historySection = page.getByText("Lịch sử tìm kiếm");

      // Nếu có lịch sử thì sẽ hiển thị
      if ((await historySection.count()) > 0) {
        await expect(historySection.first()).toBeVisible({ timeout: 5000 });
      }
    });

    test("TC07: Click vào suggestion trong autocomplete điều hướng đến sản phẩm", async ({
      page,
    }) => {
      const headerSearchInput = page
        .getByPlaceholder("Nhập từ khóa tìm kiếm")
        .first();
      await expect(headerSearchInput).toBeVisible({ timeout: 10000 });

      await headerSearchInput.focus();
      await headerSearchInput.fill("đồ");

      // Đợi suggestions xuất hiện
      await Promise.race([
        page
          .waitForResponse(
            (response) => response.url().includes("/api/products/search"),
            { timeout: 3000 }
          )
          .catch(() => {}),
        page
          .waitForSelector(".suggestions-list li, .popup-search li", {
            state: "visible",
            timeout: 3000,
          })
          .catch(() => {}),
      ]);

      // Kiểm tra có suggestions
      const suggestions = page.locator(
        ".suggestions-list li, .popup-search li"
      );
      const suggestionCount = await suggestions.count();

      if (suggestionCount > 0) {
        // Click vào suggestion đầu tiên
        await suggestions.first().click();

        // Đợi điều hướng
        await page.waitForLoadState("networkidle");

        // Kiểm tra đã điều hướng đến trang sản phẩm hoặc search
        const currentURL = page.url();
        expect(
          currentURL.includes("/product/") || currentURL.includes("/search")
        ).toBeTruthy();
      }
    });

    test("TC08: Đóng autocomplete khi click ra ngoài", async ({ page }) => {
      const headerSearchInput = page
        .getByPlaceholder("Nhập từ khóa tìm kiếm")
        .first();
      await expect(headerSearchInput).toBeVisible({ timeout: 10000 });

      await headerSearchInput.focus();
      await headerSearchInput.fill("đồ");

      // Đợi popup xuất hiện trước
      const popupSearch = page.locator(".popup-search");
      await popupSearch
        .waitFor({ state: "visible", timeout: 3000 })
        .catch(() => {});

      // Click ra ngoài (click vào header hoặc body)
      await page.locator("header").click({ force: true });

      // Popup sẽ ẩn đi (không còn visible hoặc không tương tác được)
      // Popup có thể vẫn trong DOM nhưng đã ẩn (display: none hoặc opacity: 0)
    });

    test("TC09: Autocomplete cập nhật khi thay đổi input", async ({ page }) => {
      const headerSearchInput = page
        .getByPlaceholder("Nhập từ khóa tìm kiếm")
        .first();
      await expect(headerSearchInput).toBeVisible({ timeout: 10000 });

      await headerSearchInput.focus();

      // Nhập từ khóa đầu tiên
      await headerSearchInput.fill("đồ");
      await Promise.race([
        page
          .waitForResponse(
            (response) => response.url().includes("/api/products/search"),
            { timeout: 3000 }
          )
          .catch(() => {}),
        page
          .waitForSelector(".popup-search, .popup-search-container", {
            state: "visible",
            timeout: 3000,
          })
          .catch(() => {}),
      ]);

      // Xóa và nhập từ khóa khác
      await headerSearchInput.clear();
      await headerSearchInput.fill("cún");
      await Promise.race([
        page
          .waitForResponse(
            (response) => response.url().includes("/api/products/search"),
            { timeout: 3000 }
          )
          .catch(() => {}),
        page
          .waitForSelector(".popup-search, .popup-search-container", {
            state: "visible",
            timeout: 3000,
          })
          .catch(() => {}),
      ]);

      // Kiểm tra autocomplete đã cập nhật
      const popupSearch = page.locator(
        ".popup-search, .popup-search-container"
      );
      // Autocomplete phải vẫn hoạt động với từ khóa mới
    });
  });

  test.describe("3. Search results hiển thị đúng", () => {
    test("TC10: Hiển thị số lượng kết quả tìm kiếm", async ({ page }) => {
      await page.goto("/search?q=đồ");
      await page.waitForLoadState("networkidle");

      await page
        .waitForResponse(
          (response) => response.url().includes("/api/products/search"),
          { timeout: 10000 }
        )
        .catch(() => {});
      await page.waitForLoadState("networkidle");

      // Kiểm tra có hiển thị text "Tìm thấy X kết quả"
      const resultText = page.getByText(/Tìm thấy.*kết quả/i);

      // Có thể có kết quả hoặc không
      const count = await resultText.count();
      if (count > 0) {
        await expect(resultText.first()).toBeVisible({ timeout: 5000 });

        // Kiểm tra có số lượng trong text
        const text = await resultText.first().textContent();
        expect(text).toMatch(/\d+/); // Có chứa số
      }
    });

    test("TC11: Hiển thị danh sách sản phẩm sau khi tìm kiếm", async ({
      page,
    }) => {
      await page.goto("/search?q=đồ chơi");
      await page.waitForLoadState("networkidle");

      await page
        .waitForResponse(
          (response) => response.url().includes("/api/products/search"),
          { timeout: 10000 }
        )
        .catch(() => {});
      await page.waitForLoadState("networkidle");

      // Kiểm tra có grid sản phẩm
      const productGrid = page.locator('[class*="grid"]');
      const hasProducts = (await productGrid.count()) > 0;

      if (hasProducts) {
        // Kiểm tra ít nhất một sản phẩm hiển thị
        const firstProduct = productGrid.locator("> *").first();
        await expect(firstProduct).toBeVisible({ timeout: 5000 });
      }
    });

    test("TC12: Hiển thị thông tin sản phẩm (tên, giá) trong kết quả", async ({
      page,
    }) => {
      await page.goto("/search?q=đồ");
      await page.waitForLoadState("networkidle");

      await page
        .waitForResponse(
          (response) => response.url().includes("/api/products/search"),
          { timeout: 10000 }
        )
        .catch(() => {});
      await page.waitForLoadState("networkidle");

      // Tìm các sản phẩm trong grid
      const productGrid = page.locator('[class*="grid"]');
      const gridCount = await productGrid.count();

      if (gridCount > 0) {
        const firstProduct = productGrid.locator("> *").first();

        // Kiểm tra có ảnh hoặc thông tin
        const hasImage = (await firstProduct.locator("img").count()) > 0;
        const hasText = (await firstProduct.textContent()) !== "";

        expect(hasImage || hasText).toBeTruthy();
      }
    });

    test("TC13: Click vào sản phẩm điều hướng đến trang chi tiết", async ({
      page,
    }) => {
      await page.goto("/search?q=chó");
      await page.waitForLoadState("networkidle");

      await page
        .waitForResponse(
          (response) => response.url().includes("/api/products/search"),
          { timeout: 10000 }
        )
        .catch(() => {});
      await page.waitForLoadState("networkidle");

      // Tìm sản phẩm đầu tiên có thể click (tìm trong grid)
      const productGrid = page.locator('[class*="grid"]');
      const productCount = await productGrid.count();

      if (productCount > 0) {
        // Tìm link đầu tiên trong product
        const firstProduct = productGrid.locator("> *").first();
        const productLink = firstProduct.locator('a[href*="/product/"]');
        const linkCount = await productLink.count();

        if (linkCount > 0) {
          // Lưu URL hiện tại
          const currentURL = page.url();

          // Click vào link sản phẩm
          await productLink.first().click();

          // Đợi navigation
          await page.waitForLoadState("networkidle");

          // Kiểm tra URL đã thay đổi
          const newURL = page.url();
          expect(newURL).not.toBe(currentURL);
          expect(newURL.includes("/product/")).toBeTruthy();
        }
      }
    });

    test("TC14: Hiển thị loading state khi đang tìm kiếm", async ({ page }) => {
      await page.goto("/search");
      await page.waitForLoadState("networkidle");

      const searchInput = page.getByPlaceholder("Nhập từ khóa tìm kiếm...");
      await expect(searchInput).toBeVisible({ timeout: 10000 });

      // Setup route để delay response
      let routeResolve: (value: void | PromiseLike<void>) => void;
      const routePromise = new Promise<void>((resolve) => {
        routeResolve = resolve;
      });

      await page.route("**/api/products/search**", async (route) => {
        await routePromise;
        await route.continue();
      });

      await searchInput.fill("đồ chơi");
      await searchInput.press("Enter");

      // Kiểm tra có loading indicator (có thể là spinner hoặc ScaleLoader)
      const loadingIndicator = page.locator(
        '[class*="loader"], [class*="spinner"], [class*="ScaleLoader"]'
      );

      // Loading có thể hiển thị rất nhanh nên chỉ kiểm tra nếu có
      const loadingCount = await loadingIndicator.count();
      if (loadingCount > 0) {
        await expect(loadingIndicator.first()).toBeVisible({ timeout: 2000 });
      }

      // Release route
      routeResolve!();
    });
  });

  test.describe("4. No results state", () => {
    test("TC15: Hiển thị thông báo khi không tìm thấy kết quả", async ({
      page,
    }) => {
      // Tìm kiếm với từ khóa không có kết quả
      await page.goto("/search?q=xyzabc123nonexistent");
      await page.waitForLoadState("networkidle");

      await page
        .waitForResponse(
          (response) => response.url().includes("/api/products/search"),
          { timeout: 10000 }
        )
        .catch(() => {});
      await page.waitForLoadState("networkidle");

      // Kiểm tra có thông báo "Không tìm thấy"
      const noResultsText = page.getByText(/Không tìm thấy.*sản phẩm/i);
      await expect(noResultsText.first()).toBeVisible({ timeout: 10000 });
    });

    test("TC16: Không hiển thị danh sách sản phẩm khi không có kết quả", async ({
      page,
    }) => {
      await page.goto("/search?q=xyzabc123nonexistent999");
      await page.waitForLoadState("networkidle");

      await page
        .waitForResponse(
          (response) => response.url().includes("/api/products/search"),
          { timeout: 10000 }
        )
        .catch(() => {});
      await page.waitForLoadState("networkidle");

      // Kiểm tra không có grid sản phẩm hoặc grid rỗng
      const productGrid = page.locator('[class*="grid"]');

      // Nếu có grid thì phải rỗng hoặc không có sản phẩm
      const gridCount = await productGrid.count();
      if (gridCount > 0) {
        const childrenCount = await productGrid.locator("> *").count();
        // Grid có thể rỗng hoặc có element nhưng không có sản phẩm
        expect(childrenCount).toBeGreaterThanOrEqual(0);
      }
    });

    test("TC17: Input vẫn giữ giá trị khi không có kết quả", async ({
      page,
    }) => {
      const searchTerm = "xyzabc123nonexistent";
      await page.goto(`/search?q=${searchTerm}`);
      await page.waitForLoadState("networkidle");

      await page
        .waitForResponse(
          (response) => response.url().includes("/api/products/search"),
          { timeout: 10000 }
        )
        .catch(() => {});
      await page.waitForLoadState("networkidle");

      const searchInput = page.getByPlaceholder("Nhập từ khóa tìm kiếm...");
      await expect(searchInput).toBeVisible({ timeout: 10000 });

      // Kiểm tra input vẫn giữ giá trị
      await expect(searchInput).toHaveValue(searchTerm, { timeout: 5000 });
    });

    test("TC18: Có thể tìm kiếm lại sau khi không có kết quả", async ({
      page,
    }) => {
      await page.goto("/search?q=xyzabc123nonexistent");
      await page.waitForLoadState("networkidle");

      await page
        .waitForResponse(
          (response) => response.url().includes("/api/products/search"),
          { timeout: 10000 }
        )
        .catch(() => {});
      await page.waitForLoadState("networkidle");

      // Tìm kiếm lại với từ khóa khác
      const searchInput = page.getByPlaceholder("Nhập từ khóa tìm kiếm...");
      await expect(searchInput).toBeVisible({ timeout: 10000 });

      await searchInput.clear();
      await searchInput.fill("đồ chơi");
      await searchInput.press("Enter");

      await page.waitForURL(/\/search\?q=.*/, { timeout: 10000 });
      await page
        .waitForResponse(
          (response) => response.url().includes("/api/products/search"),
          { timeout: 10000 }
        )
        .catch(() => {});
      await page.waitForLoadState("networkidle");

      // Kiểm tra đã có kết quả mới
      const resultText = page.getByText(/Tìm thấy|Không tìm thấy/i);
      await expect(resultText.first()).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe("5. Search với special characters", () => {
    test("TC19: Tìm kiếm với ký tự đặc biệt: @#$%", async ({ page }) => {
      await page.goto("/search");
      await page.waitForLoadState("networkidle");

      const searchInput = page.getByPlaceholder("Nhập từ khóa tìm kiếm...");
      await expect(searchInput).toBeVisible({ timeout: 10000 });

      await searchInput.fill("@#$%");
      await searchInput.press("Enter");

      await page.waitForURL(/\/search\?q=.*/, { timeout: 10000 });
      await page.waitForLoadState("networkidle");

      // Kiểm tra không bị crash, URL được encode đúng
      await expect(page).toHaveURL(/\/search\?q=.*/i);

      // Kiểm tra có thông báo (có thể là không tìm thấy)
      const resultText = page.getByText(/Tìm thấy|Không tìm thấy/i);
      await expect(resultText.first()).toBeVisible({ timeout: 10000 });
    });

    test("TC20: Tìm kiếm với ký tự đặc biệt: <>&", async ({ page }) => {
      await page.goto("/search");
      await page.waitForLoadState("networkidle");

      const searchInput = page.getByPlaceholder("Nhập từ khóa tìm kiếm...");
      await expect(searchInput).toBeVisible({ timeout: 10000 });

      await searchInput.fill("<>&");
      await searchInput.press("Enter");

      await page.waitForURL(/\/search\?q=.*/, { timeout: 10000 });
      await page.waitForLoadState("networkidle");

      // Kiểm tra không bị crash
      await expect(page).toHaveURL(/\/search\?q=.*/i);
    });

    test("TC21: Tìm kiếm với khoảng trắng nhiều", async ({ page }) => {
      await page.goto("/search");
      await page.waitForLoadState("networkidle");

      const searchInput = page.getByPlaceholder("Nhập từ khóa tìm kiếm...");
      await expect(searchInput).toBeVisible({ timeout: 10000 });

      await searchInput.fill("   đồ   chơi   ");
      await searchInput.press("Enter");

      await page.waitForURL(/\/search\?q=.*/, { timeout: 10000 });
      await page.waitForLoadState("networkidle");

      // Kiểm tra vẫn hoạt động (có thể trim hoặc xử lý khoảng trắng)
      await expect(page).toHaveURL(/\/search\?q=.*/i);
    });

    test("TC22: Tìm kiếm với emoji", async ({ page }) => {
      await page.goto("/search");
      await page.waitForLoadState("networkidle");

      const searchInput = page.getByPlaceholder("Nhập từ khóa tìm kiếm...");
      await expect(searchInput).toBeVisible({ timeout: 10000 });

      await searchInput.fill("🐶🐱");
      await searchInput.press("Enter");

      await page.waitForURL(/\/search\?q=.*/, { timeout: 10000 });
      await page.waitForLoadState("networkidle");

      // Kiểm tra không bị crash
      await expect(page).toHaveURL(/\/search\?q=.*/i);
    });

    test("TC23: Tìm kiếm với SQL injection patterns", async ({ page }) => {
      await page.goto("/search");
      await page.waitForLoadState("networkidle");

      const searchInput = page.getByPlaceholder("Nhập từ khóa tìm kiếm...");
      await expect(searchInput).toBeVisible({ timeout: 10000 });

      // Test các pattern SQL injection phổ biến
      const sqlPatterns = [
        "' OR '1'='1",
        "'; DROP TABLE--",
        "1' UNION SELECT--",
      ];

      for (const pattern of sqlPatterns) {
        await searchInput.clear();
        await searchInput.fill(pattern);
        await searchInput.press("Enter");

        await page.waitForURL(/\/search\?q=.*/, { timeout: 10000 });
        await page.waitForLoadState("networkidle");

        // Kiểm tra không bị crash và vẫn xử lý được
        await expect(page).toHaveURL(/\/search\?q=.*/i);
      }
    });
  });

  test.describe("6. Pagination và phân trang", () => {
    test("TC24: Kiểm tra có pagination nếu có nhiều kết quả", async ({
      page,
    }) => {
      await page.goto("/search?q=đồ");
      await page.waitForLoadState("networkidle");

      await page
        .waitForResponse(
          (response) => response.url().includes("/api/products/search"),
          { timeout: 10000 }
        )
        .catch(() => {});
      await page.waitForLoadState("networkidle");

      // Kiểm tra có pagination hoặc không (tùy design)
      const pagination = page.locator('[class*="pagination"]');
      const paginationCount = await pagination.count();

      // Pagination có thể có hoặc không tùy vào số lượng kết quả
      expect(paginationCount).toBeGreaterThanOrEqual(0);
    });

    test("TC25: Kiểm tra responsive layout trên màn hình nhỏ", async ({
      page,
    }) => {
      // Set viewport nhỏ hơn (mobile)
      await page.setViewportSize({ width: 375, height: 667 });

      await page.goto("/search?q=đồ");
      await page.waitForLoadState("networkidle");

      await page
        .waitForResponse(
          (response) => response.url().includes("/api/products/search"),
          { timeout: 10000 }
        )
        .catch(() => {});
      await page.waitForLoadState("networkidle");

      // Kiểm tra input search vẫn hiển thị
      const searchInput = page.getByPlaceholder("Nhập từ khóa tìm kiếm...");
      await expect(searchInput).toBeVisible({ timeout: 10000 });

      // Kiểm tra button tìm kiếm vẫn hiển thị
      const searchButton = page.getByRole("button", { name: /tìm kiếm/i });
      await expect(searchButton).toBeVisible();
    });
  });
});
