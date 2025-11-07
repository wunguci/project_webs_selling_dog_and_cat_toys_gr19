import { test, expect } from "@playwright/test";

const CONTACT_PATH = "/contactus"; // Đổi nếu route khác
const API_CONTACT = "/api/contactus"; // Đổi nếu bạn dùng endpoint khác

test.describe("Contact Page - Features & UI", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(CONTACT_PATH);
    await page.waitForLoadState("networkidle");
  });

  // 1) Hiển thị form liên hệ
  test("TC01: Hiển thị form liên hệ", async ({ page }) => {
    // Heading form
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: /gửi tin nhắn cho chúng tôi/i,
      })
    ).toBeVisible();

    // Các field chính
    await expect(page.getByLabel(/Họ và tên/i)).toBeVisible();
    await expect(page.getByLabel(/^Email\b/i)).toBeVisible();
    await expect(page.getByLabel(/Số điện thoại/i)).toBeVisible();
    await expect(page.getByLabel(/Nội dung/i)).toBeVisible();

    // Nút submit
    await expect(
      page.getByRole("button", { name: /gửi tin nhắn/i })
    ).toBeVisible();
  });

  // 2) Validation form (required + email format)
  test("TC02: Validation form - required + email format", async ({ page }) => {
    const name = page.getByLabel(/Họ và tên/i);
    const email = page.getByLabel(/^Email\b/i);
    const phone = page.getByLabel(/Số điện thoại/i);
    const message = page.getByLabel(/Nội dung/i);
    const submit = page.getByRole("button", { name: /gửi tin nhắn/i });

    // Chưa nhập gì → invalid 4 trường required
    await submit.click();
    await expect(page.locator("form :invalid")).toHaveCount(4);

    // Email sai định dạng
    await name.fill("Nguyễn Văn A");
    await email.fill("sai-format");
    await phone.fill("0915020903");
    await message.fill("Xin chào, mình muốn hỏi về sản phẩm…");
    await submit.click();

    // Chỉ còn input email invalid
    await expect(page.locator("form :invalid")).toHaveCount(1);

    // Sửa email đúng
    await email.fill("user@example.com");
    await submit.click();

    // Không còn invalid
    await expect(page.locator("form :invalid")).toHaveCount(0);
  });

  // 3) Contact information hiển thị (địa chỉ, phone, email, giờ)
  test("TC03: Contact information hiển thị", async ({ page }) => {
    await expect(
      page.getByRole("heading", { level: 2, name: /thông tin liên hệ/i })
    ).toBeVisible();

    await expect(page.getByText(/Địa chỉ cửa hàng/i)).toBeVisible();
    await expect(
      page.getByText(/Nguyễn Văn Linh|Quận 7|TP\.? Hồ Chí Minh/i)
    ).toBeVisible();

    const phoneLink = page.locator('a[href^="tel:"]');
    await expect(phoneLink).toBeVisible();
    await expect(phoneLink).toHaveAttribute("href", /tel:\d+/);

    const mailLink = page.locator('a[href^="mailto:"]');
    await expect(mailLink).toBeVisible();
    await expect(mailLink).toHaveAttribute(
      "href",
      /mailto:info@petstationshop\.com/i
    );

    await expect(
      page.getByText(/Thứ Hai - Chủ Nhật.*8:00.*21:00/i)
    ).toBeVisible();
  });

  // 4) Google Maps integration (nếu có)
  test("TC04: Google Maps iframe hiển thị (nếu có)", async ({ page }) => {
    const mapFrame = page.locator('iframe[src*="google.com/maps"]');
    // Nếu không có map, test này sẽ skip mềm để không fail pipeline
    if (await mapFrame.count()) {
      await expect(mapFrame).toBeVisible();
      await expect(mapFrame).toHaveAttribute("loading", /lazy/);
      await expect(mapFrame).toHaveJSProperty("allowFullscreen", true);
    } else {
      test
        .info()
        .annotations.push({
          type: "note",
          description: "Không thấy Google Maps iframe – bỏ qua.",
        });
    }
  });

  // 5) Submit form liên hệ thành công (mock API) + 6) Success message
  test("TC05: Submit form liên hệ thành công & hiển thị success message", async ({
    page,
  }) => {
    await page.route(API_CONTACT, async (route) => {
      // Trả về 200 OK giả lập
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true, message: "Gửi thành công" }),
      });
    });

    const name = page.getByLabel(/Họ và tên/i);
    const email = page.getByLabel(/^Email\b/i);
    const phone = page.getByLabel(/Số điện thoại/i);
    const subject = page.getByLabel(/Tiêu đề/i);
    const message = page.getByLabel(/Nội dung/i);
    const submit = page.getByRole("button", { name: /gửi tin nhắn/i });

    await name.fill("Nguyễn Văn A");
    await email.fill("user@example.com");
    await phone.fill("0915020903");
    await subject.fill("Hỏi thông tin");
    await message.fill("Mình muốn hỏi về dịch vụ grooming cho chó.");

    // Đợi response thành công (nếu app có gọi API)
    const maybeResponse = page
      .waitForResponse(
        (res) => res.url().includes(API_CONTACT) && res.status() === 200
      )
      .catch(() => null);

    await submit.click();
    await maybeResponse;

    // Kiểm tra hiện success message (ưu tiên data-testid, fallback role)
    const success = page.locator(
      '[data-testid="contact-success"], [role="alert"], [role="status"]'
    );
    await expect(success.first()).toBeVisible();

    // Optional: check text
    await expect(success.first()).toContainText(
      /(gửi thành công|cảm ơn|đã nhận)/i
    );
  });

  // 7) Responsive mobile – form & info vẫn hiển thị
  test("TC06: Responsive - Mobile vẫn hiển thị form và thông tin", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    await expect(page.getByLabel(/Họ và tên/i)).toBeVisible();
    await expect(page.getByText(/Địa chỉ cửa hàng/i)).toBeVisible();
  });
});
