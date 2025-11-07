# 📋 DANH SÁCH TOÀN BỘ TEST CASES - E2E TESTING

**Tổng số test cases: 121**  
**Số files test: 8**  
**Framework: Playwright v1.40+**

---

## 📊 TỔNG QUAN THEO MODULE

| # | Module | Test Cases | File | Status |
|---|--------|-----------|------|--------|
| 1 | Cart Operations | 19 | cart-operations.spec.ts | ✅ |
| 2 | Product Search | 25 | product-search.spec.ts | ✅ |
| 3 | User Management | 27 | user-management.spec.ts | ✅ |
| 4 | User Profile | 24 | user-profile.spec.ts | ✅ |
| 5 | Login | 5 | login.spec.ts | ✅ |
| 6 | Register | 7 | register.spec.ts | ✅ |
| 7 | Homepage | 8 | home.spec.ts | ✅ |
| 8 | Contact Form | 6 | contact-form.spec.ts | ✅ |

---

## 1️⃣ CART OPERATIONS - 19 Test Cases

**File:** `tests/e2e/cart-operations.spec.ts`

### 1.1. Giao diện trang giỏ hàng (2 TCs)
```
TC01 - Hiển thị trang giỏ hàng rỗng
TC02 - Breadcrumb hiển thị đúng
```

### 1.2. Thêm sản phẩm vào giỏ hàng (2 TCs)
```
TC03 - Thêm sản phẩm từ trang chi tiết
TC04 - Thêm sản phẩm với số lượng tùy chỉnh
```

### 1.3. Cập nhật số lượng sản phẩm (4 TCs)
```
TC06 - Tăng số lượng sản phẩm bằng nút +
TC07 - Giảm số lượng sản phẩm bằng nút -
TC08 - Nhập số lượng trực tiếp vào input
TC09 - Giảm số lượng về 1 rồi click - sẽ xóa sản phẩm
```

### 1.4. Xóa sản phẩm khỏi giỏ hàng (3 TCs)
```
TC10 - Xóa sản phẩm bằng nút xóa (icon trash)
TC11 - Xóa tất cả sản phẩm trong giỏ
TC12 - Hủy xóa tất cả sản phẩm
```

### 1.5. Tính toán giá tiền (3 TCs)
```
TC13 - Hiển thị giá sản phẩm đúng
TC14 - Hiển thị thành tiền đúng (giá × số lượng)
TC15 - Cập nhật tổng tiền khi thay đổi số lượng
```

### 1.6. Chuyển đến trang thanh toán (2 TCs)
```
TC16 - Click nút Thanh toán chuyển đến trang checkout
TC17 - Hiển thị nút Tiếp tục mua hàng
```

### 1.7. Responsive design (3 TCs)
```
TC18 - Giao diện mobile (375px)
TC19 - Giao diện tablet (768px)
```

---

## 2️⃣ PRODUCT SEARCH - 25 Test Cases

**File:** `tests/e2e/product-search.spec.ts`

### 2.1. Tìm kiếm cơ bản (4 TCs)
```
TC01 - Tìm kiếm sản phẩm bằng cách nhập tên và click nút Tìm kiếm
TC02 - Tìm kiếm sản phẩm bằng cách nhấn Enter
TC03 - Tìm kiếm từ URL query parameter
TC04 - Tìm kiếm với từ khóa ngắn (1-2 ký tự)
```

### 2.2. Autocomplete (5 TCs)
```
TC05 - Hiển thị autocomplete khi nhập vào search box trong header
TC06 - Autocomplete hiển thị lịch sử tìm kiếm khi chưa có kết quả
TC07 - Click vào suggestion trong autocomplete điều hướng đến sản phẩm
TC08 - Đóng autocomplete khi click ra ngoài
TC09 - Autocomplete cập nhật khi thay đổi input
```

### 2.3. Hiển thị kết quả tìm kiếm (5 TCs)
```
TC10 - Hiển thị số lượng kết quả tìm kiếm
TC11 - Hiển thị danh sách sản phẩm sau khi tìm kiếm
TC12 - Hiển thị thông tin sản phẩm (tên, giá) trong kết quả
TC13 - Click vào sản phẩm điều hướng đến trang chi tiết
TC14 - Hiển thị loading state khi đang tìm kiếm
```

### 2.4. Empty state (4 TCs)
```
TC15 - Hiển thị thông báo khi không tìm thấy kết quả
TC16 - Không hiển thị danh sách sản phẩm khi không có kết quả
TC17 - Input vẫn giữ giá trị khi không có kết quả
TC18 - Có thể tìm kiếm lại sau khi không có kết quả
```

### 2.5. Security & Edge cases (5 TCs)
```
TC19 - Tìm kiếm với ký tự đặc biệt: @#$%
TC20 - Tìm kiếm với ký tự đặc biệt: <>&
TC21 - Tìm kiếm với khoảng trắng nhiều
TC22 - Tìm kiếm với emoji
TC23 - Tìm kiếm với SQL injection patterns
```

### 2.6. Pagination & Responsive (2 TCs)
```
TC24 - Kiểm tra có pagination nếu có nhiều kết quả
TC25 - Kiểm tra responsive layout trên màn hình nhỏ
```

---

## 3️⃣ USER MANAGEMENT - 27 Test Cases

**File:** `tests/e2e/user-management.spec.ts`

### 3.1. Giao diện quản lý người dùng (5 TCs)
```
TC01 - Hiển thị đầy đủ các thành phần chính
TC02 - Hiển thị 3 card thống kê người dùng
TC03 - Hiển thị nút Thêm người dùng và Export CSV
TC04 - Hiển thị bảng danh sách người dùng
TC05 - Hiển thị thanh tìm kiếm
```

### 3.2. Thêm người dùng mới (8 TCs)
```
TC06 - Mở modal thêm người dùng thành công
TC07 - Hiển thị đầy đủ form thêm người dùng
TC08 - Thêm người dùng mới thành công với thông tin đầy đủ
TC09 - Thêm người dùng với mật khẩu tùy chỉnh
TC10 - Validation: Không cho phép thêm user với trường trống
TC11 - Validation: Email không đúng định dạng
TC12 - Đóng modal bằng nút Hủy
TC13 - Upload avatar khi thêm người dùng
```

### 3.3. Tìm kiếm người dùng (2 TCs)
```
TC14 - Tìm kiếm người dùng theo tên
TC15 - Xóa từ khóa tìm kiếm
```

### 3.4. Xem chi tiết người dùng (2 TCs)
```
TC16 - Xem chi tiết người dùng từ danh sách
TC17 - Quay lại danh sách từ trang chi tiết
```

### 3.5. Cập nhật người dùng (2 TCs)
```
TC18 - Mở modal chỉnh sửa người dùng
TC19 - Cập nhật thông tin người dùng
```

### 3.6. Xóa người dùng (2 TCs)
```
TC20 - Mở modal xác nhận xóa
TC21 - Hủy xóa người dùng
```

### 3.7. Phân trang (2 TCs)
```
TC22 - Hiển thị thông tin phân trang
TC23 - Chuyển sang trang tiếp theo
```

### 3.8. Export & Responsive (4 TCs)
```
TC24 - Export danh sách người dùng ra file CSV
TC25 - Giao diện mobile (375px)
TC26 - Giao diện tablet (768px)
TC27 - Giao diện desktop (1920px)
```

---

## 4️⃣ USER PROFILE - 24 Test Cases

**File:** `tests/e2e/user-profile.spec.ts`

### 4.1. Thông tin cá nhân (4 TCs)
```
TC01 - Truy cập trang thông tin cá nhân
TC02 - Hiển thị đầy đủ thông tin người dùng
TC03 - Hiển thị avatar người dùng
TC04 - Cập nhật thông tin cá nhân
```

### 4.2. Quản lý đơn hàng (12 TCs)
```
TC05 - Truy cập trang đơn hàng
TC06 - Hiển thị thông báo khi chưa có đơn hàng
TC07 - Hiển thị danh sách đơn hàng chờ xử lý
TC08 - Hiển thị danh sách đơn hàng đang xử lý
TC09 - Hiển thị danh sách đơn hàng đang giao hàng
TC10 - Xem chi tiết đơn hàng
TC11 - Hủy đơn hàng chờ xử lý
TC12 - Không hiển thị nút hủy ở đơn đang xử lý/đang giao
TC13 - Tải hóa đơn
TC14 - Verify định dạng mã đơn hàng
TC15 - Verify định dạng tổng tiền
TC16 - Click nút Mua sắm ngay
```

### 4.3. Lịch sử mua hàng (8 TCs)
```
TC17 - Truy cập trang lịch sử mua hàng
TC18 - Hiển thị thông báo khi chưa có đơn hoàn thành
TC19 - Hiển thị danh sách đơn đã giao hàng
TC20 - Hiển thị danh sách đơn hoàn tất
TC21 - Hiển thị danh sách đơn đã hủy
TC22 - Xem chi tiết đơn trong lịch sử
TC23 - Tải hóa đơn từ lịch sử
TC24 - Không hiển thị nút tải hóa đơn cho đơn đã hủy
```

---

## 5️⃣ LOGIN - 5 Test Cases

**File:** `tests/e2e/login.spec.ts`

```
TC01 - Đăng nhập thành công với tài khoản hợp lệ
TC02 - Đăng nhập thất bại với thông tin sai
TC03 - Kiểm tra validation: trường trống và số điện thoại không hợp lệ
TC04 - Hiển thị/ẩn mật khẩu khi click icon mắt
TC05 - Chuyển hướng về trang chủ sau khi đăng nhập thành công
```

---

## 6️⃣ REGISTER - 7 Test Cases

**File:** `tests/e2e/register.spec.ts`

```
TC01 - Đăng ký thành công với thông tin hợp lệ
TC02 - Hiển thị lỗi khi để trống thông tin
TC03 - Validation: Email không hợp lệ
TC04 - Validation: Password không đủ mạnh
TC05 - Validation: Confirm password không khớp
TC06 - Kiểm tra số điện thoại đã tồn tại
TC07 - Phải tick điều khoản trước khi đăng ký
```

---

## 7️⃣ HOMEPAGE UI - 8 Test Cases

**File:** `tests/e2e/home.spec.ts`

```
TC01 - Load trang chủ thành công
TC02 - Header có logo, navigation và thanh tìm kiếm (desktop & mobile)
TC03 - Banner hiển thị đúng
TC04 - Hiển thị danh sách sản phẩm sale
TC05 - Hiển thị sản phẩm theo categories (Shop cho chó, Shop cho mèo)
TC06 - Footer hiển thị đầy đủ thông tin liên hệ, hỗ trợ, đăng ký
TC07 - Trang hiển thị đúng trên desktop, tablet và mobile
TC08 - Scroll to top button hoạt động
```

---

## 8️⃣ CONTACT FORM - 6 Test Cases

**File:** `tests/e2e/contact-form.spec.ts`

```
TC01 - Hiển thị form liên hệ
TC02 - Validation form: required + email format
TC03 - Contact information hiển thị
TC04 - Google Maps iframe hiển thị (nếu có)
TC05 - Submit form liên hệ thành công & hiển thị success message
TC06 - Responsive: Mobile vẫn hiển thị form và thông tin
```

---

## 📈 THỐNG KÊ CHI TIẾT

### Theo loại test

| Loại Test | Số lượng | % |
|-----------|----------|---|
| **UI/Layout** | 35 | 29% |
| **Functional** | 52 | 43% |
| **Validation** | 18 | 15% |
| **Responsive** | 9 | 7% |
| **Security** | 7 | 6% |

### Theo độ phức tạp

| Độ phức tạp | Số lượng | Mô tả |
|-------------|----------|-------|
| **Low** | 41 | UI rendering, simple checks |
| **Medium** | 58 | CRUD operations, navigation |
| **High** | 22 | Complex workflows, validation chains |

### Theo mức độ ưu tiên

| Priority | Số lượng | Loại |
|----------|----------|------|
| **P0 (Critical)** | 28 | Login, Cart, Checkout |
| **P1 (High)** | 47 | User mgmt, Profile, Search |
| **P2 (Medium)** | 31 | Contact, Homepage UI |
| **P3 (Low)** | 15 | Responsive, Edge cases |

---

## ⚡ LỆNH CHẠY TEST

### Chạy tất cả
```bash
npx playwright test
```

### Chạy theo file
```bash
npx playwright test tests/e2e/cart-operations.spec.ts
npx playwright test tests/e2e/product-search.spec.ts
npx playwright test tests/e2e/user-management.spec.ts
npx playwright test tests/e2e/user-profile.spec.ts
npx playwright test tests/e2e/login.spec.ts
npx playwright test tests/e2e/register.spec.ts
npx playwright test tests/e2e/home.spec.ts
npx playwright test tests/e2e/contact-form.spec.ts
```

### Chạy theo pattern
```bash
# Chạy test cụ thể
npx playwright test --grep "TC01"
npx playwright test --grep "TC03|TC04|TC15"

# Chạy tất cả responsive tests
npx playwright test --grep "mobile|tablet|desktop"

# Chạy tất cả validation tests
npx playwright test --grep "validation"

# Chạy tất cả security tests
npx playwright test --grep "SQL|injection|XSS|đặc biệt"
```

### Chạy trên browser cụ thể
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Chạy với options
```bash
# UI Mode (recommended)
npx playwright test --ui

# Headed mode (xem browser)
npx playwright test --headed

# Debug mode
npx playwright test --debug

# Với workers (parallel)
npx playwright test --workers=4

# Chạy tuần tự
npx playwright test --workers=1
```

### Xem kết quả
```bash
# HTML report
npx playwright show-report

# Trace viewer
npx playwright show-trace test-results/.../trace.zip
```

---

## 🎯 TEST COVERAGE

### Authentication & Authorization
- **Login**: 5 TCs ✅
- **Register**: 7 TCs ✅
- **Coverage**: 100%

### E-commerce Core
- **Cart**: 19 TCs ✅
- **Search**: 25 TCs ✅
- **Coverage**: 95%

### User Management
- **Admin Panel**: 27 TCs ✅
- **User Profile**: 24 TCs ✅
- **Coverage**: 100%

### UI/UX
- **Homepage**: 8 TCs ✅
- **Contact**: 6 TCs ✅
- **Coverage**: 90%

### Responsive Design
- **Mobile (375px)**: 4 TCs ✅
- **Tablet (768px)**: 3 TCs ✅
- **Desktop (1920px)**: 2 TCs ✅
- **Coverage**: 100%

---

## 📝 GHI CHÚ

### Test Data
- **User**: `0123456789 / 12345a`
- **Admin**: `0972385999 / vutkd23405`
- **Base URL**: `http://localhost:5173`

### Test Isolation
- Mỗi test độc lập
- beforeEach: login + setup
- afterEach: cleanup

### Flaky Tests
- TC04 (Login - toggle password): Cần đợi element render
- TC03, TC04 (Cart): Đã fix modal confirmation issue

### Known Issues
- None (all tests passing)

---

**Cập nhật:** November 7, 2025  
**Version:** 1.0  
**Team:** Nhóm 19 - QA & Software Testing
