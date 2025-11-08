import { test, expect } from "@playwright/test";

test.describe("Homepage UI Test", () => {
  const BASE_URL = "http://localhost:5173";

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  // Load trang chủ thành công
  test("TC01: Load trang chủ thành công", async ({ page }) => {
    await expect(page).toHaveURL(/\/$/); //kiểm tra đúng url
    await expect(page).toHaveTitle(/Pet Station Shop/i); //kiểm tra nội dung trong thẻ <title>
  });

  // Header có logo và navigation
  test("TC02: Header có logo, navigation và thanh tìm kiếm (desktop & mobile)", async ({
    page,
  }) => {
    const header = page.locator("header");
    await expect(header).toBeVisible();

    // Logo
    const logo = header.locator('img[alt="Logo Pet Shop"]');
    await expect(logo).toBeVisible();

    // Ô tìm kiếm (desktop hoặc mobile)
    const searchInputs = header.locator(
      'input[placeholder="Nhập từ khóa tìm kiếm"]'
    );
    const inputCount = await searchInputs.count();
    expect(inputCount).toBeGreaterThan(0);

    let visibleInputFound = false;
    for (let i = 0; i < inputCount; i++) {
      if (await searchInputs.nth(i).isVisible()) {
        visibleInputFound = true;
        break;
      }
    }
    expect(visibleInputFound).toBe(true);

    // Nút tìm kiếm (chứa SVG)
    const searchButtons = header.locator("button:has(svg)");
    const buttonCount = await searchButtons.count();
    expect(buttonCount).toBeGreaterThan(0);

    let visibleButtonFound = false;
    for (let i = 0; i < buttonCount; i++) {
      if (await searchButtons.nth(i).isVisible()) {
        visibleButtonFound = true;
        break;
      }
    }
    expect(visibleButtonFound).toBe(true);

    // Menu navigation (tự động kiểm tra cái nào hiện — desktop hoặc mobile)
    const menuItems = [
      "SHOP CHO CÚN",
      "SHOP CHO MÈO",
      "TIN TỨC",
      "VỀ CHÚNG TÔI",
    ];

    for (const item of menuItems) {
      const locators = header.getByText(item, { exact: false });
      const count = await locators.count();
      expect(count).toBeGreaterThan(0);

      let visibleMenuFound = false;
      for (let i = 0; i < count; i++) {
        if (await locators.nth(i).isVisible()) {
          visibleMenuFound = true;
          break;
        }
      }

      expect(visibleMenuFound).toBe(true);
    }
    //  Hotline
    const hotlineTexts = ["Hotline:", "0915020903"];
    for (const text of hotlineTexts) {
      const locators = header.getByText(text, { exact: false });
      const count = await locators.count();
      expect(count).toBeGreaterThan(0);

      let visibleHotlineFound = false;
      for (let i = 0; i < count; i++) {
        if (await locators.nth(i).isVisible()) {
          visibleHotlineFound = true;
          break;
        }
      }
      expect(visibleHotlineFound).toBe(true);
    }
  });

  //  Banner hiển thị đúng
  test("TC03: Banner hiển thị đúng", async ({ page }) => {
    // Kiểm tra Swiper container hiển thị
    await page.waitForLoadState("networkidle");
    const slider = page.locator(".mySwiper"); // banner dùng thư viện import { Swiper, SwiperSlide } from 'swiper/react';
    await expect(slider).toBeVisible();

    // Kiểm tra ít nhất 1 hình trong banner hiển thị
    const slides = slider.locator("img");
    await expect(slides.first()).toBeVisible();

    const count = await slides.count();
    expect(count).toBeGreaterThan(0);
  });

  // Hiển thị danh sách sản phẩm sale
  test("TC04: Hiển thị danh sách sản phẩm sale", async ({ page }) => {
    // Kiểm tra slider xuất hiện (react-slick) import Slider from "react-slick";
    const saleSlider = page.locator(".slick-slider").nth(1);
    await expect(saleSlider.first()).toBeVisible();

    // Kiểm tra có ít nhất 1 card sản phẩm
    const saleProducts = page.locator(
      ".slick-slide .bg-white.shadow-lg.rounded-xl"
    );
    const count = await saleProducts.count();
    expect(count).toBeGreaterThan(0);

    // Kiểm tra sản phẩm đầu tiên có hình ảnh
    const firstImage = saleProducts.first().locator("img");
    await expect(firstImage).toBeVisible();

    // Kiểm tra có nút "Mua ngay"
    const buyNowButtons = saleProducts.locator('button:has-text("Mua ngay")');
    expect(await buyNowButtons.count()).toBeGreaterThan(0);
  });

  // Hiển thị sản phẩm theo categories (Shop cho chó, Shop cho mèo)
  test("TC05: Hiển thị sản phẩm theo categories (Shop cho chó, Shop cho mèo)", async ({
    page,
  }) => {
    const sections = [{ name: "Shop cho cúnffffff" }, { name: "Shop cho mèo" }];
    for (const section of sections) {
      const block = page.locator("div.p-5", { hasText: section.name });

      // Kiểm tra phần danh mục hiển thị
      await expect(block).toBeVisible();

      // Kiểm tra có ít nhất 1 sản phẩm (nút Mua ngay)
      const buyNowButton = block.locator("text=Mua ngay");
      await expect(buyNowButton.first()).toBeVisible();
    }
  });

  // Footer hiển thị thông tin
  // Footer hiển thị đầy đủ thông tin liên hệ, hỗ trợ, đăng ký
  test("TC06: Footer hiển thị đầy đủ thông tin liên hệ, hỗ trợ, đăng ký", async ({
    page,
  }) => {
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();

    // Logo và tên shop
    await expect(footer.locator("text=PET STATION SHOP").first()).toBeVisible();

    // Thông tin địa chỉ, hotline, email
    await expect(footer.locator("text=Gò Vấp")).toBeVisible();
    await expect(footer.locator("text=Hotline").first()).toBeVisible();
    await expect(footer.locator("text=petstation@gmail.com")).toBeVisible();

    // Các mục chính
    await expect(footer.locator("text=VỀ CHÚNG TÔI")).toBeVisible();
    await expect(footer.locator("text=TỔNG ĐÀI HỖ TRỢ")).toBeVisible();
    await expect(footer.locator("text=NHẬN TIN KHUYẾN MÃI")).toBeVisible();

    // Form nhập email và nút đăng ký
    await expect(
      footer.locator('input[placeholder="Nhập email..."]')
    ).toBeVisible();
    await expect(footer.locator('button:has-text("Đăng ký")')).toBeVisible();

    // Dòng bản quyền cuối trang
    await expect(footer.locator("text=Bản quyền thuộc về")).toBeVisible();
  });

  // Responsive design (desktop, tablet, mobile)
  test("TC07: Trang hiển thị đúng trên desktop, tablet và mobile", async ({
    page,
  }) => {
    // =============================
    // DESKTOP
    // =============================
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForLoadState("domcontentloaded");
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();

    // Kiểm tra một số thành phần chính xuất hiện
    await expect(
      page.getByText("PET STATION SHOP", { exact: false }).first()
    ).toBeVisible();
    // await expect(page.getByPlaceholder('Nhập từ khóa tìm kiếm')).toBeVisible();

    // =============================
    // TABLET
    // =============================
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(300); // chờ CSS cập nhật
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();

    // Kiểm tra menu tablet (có thể vẫn là dạng desktop)
    const navItems = [
      "SHOP CHO CÚN",
      "SHOP CHO MÈO",
      "TIN TỨC",
      "VỀ CHÚNG TÔI",
    ];
    for (const item of navItems) {
      const locators = page.getByText(item, { exact: false });
      const count = await locators.count();
      expect(count).toBeGreaterThan(0);

      let visibleFound = false;
      for (let i = 0; i < count; i++) {
        if (await locators.nth(i).isVisible()) {
          visibleFound = true;
          break;
        }
      }
      expect(visibleFound).toBe(true);
    }

    // =============================
    //  MOBILE
    // =============================
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(300);

    // Header, main, footer vẫn hiển thị
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();

    // Nút mở menu mobile
    const menuButton = page.locator(
      '.menu-toggle, .hamburger, button[aria-label="Menu"], button:has(svg)'
    );
    const buttonCount = await menuButton.count();
    expect(buttonCount).toBeGreaterThan(0);

    let visibleFound = false;
    for (let i = 0; i < buttonCount; i++) {
      if (await menuButton.nth(i).isVisible()) {
        visibleFound = true;
        break;
      }
    }
    expect(visibleFound).toBe(true);

    // Kiểm tra footer vẫn hiển thị text chính
    const footer = page.locator("footer");
    await expect(
      footer.getByText("Bản quyền thuộc về", { exact: false })
    ).toBeVisible();
    await expect(
      footer.getByText("Hotline", { exact: false }).first()
    ).toBeVisible();
  });

  // Scroll to top button hoạt động
  test("TC08: Scroll to top button hoạt động", async ({ page }) => {
    // Cuộn xuống cuối trang
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Lấy nút scroll-to-top
    const scrollTopBtn = page.locator('button[aria-label="Scroll to top"]');

    // Chờ nút hiển thị
    await expect(scrollTopBtn).toBeVisible();

    // Click để cuộn lên đầu
    await scrollTopBtn.click();

    // Chờ animation hoàn tất (scroll duration + buffer)
    await page.waitForFunction(() => window.scrollY < 100);

    // Kiểm tra đã cuộn lên đầu
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeLessThan(100);
  });
});
