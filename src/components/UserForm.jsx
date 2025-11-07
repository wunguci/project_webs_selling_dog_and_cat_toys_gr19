import { useState, useEffect } from "react";
import FormField from "./FormField";

const UserForm = ({ userData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(
    userData || {
      fullName: "",
      birthDate: "",
      gender: "Nam",
      email: "",
      phone: "",
      address: "",
      avatar: "",
      password: "123456", // Mật khẩu mặc định cho user mới
    }
  );

  const [avatarPreview, setAvatarPreview] = useState("");

  // Hàm chuyển đổi ngày sang định dạng YYYY-MM-DD
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return ""; // Nếu không phải ngày hợp lệ
    return date.toISOString().split("T")[0]; // Trả về YYYY-MM-DD
  };

  // Cập nhật preview và formData khi userData thay đổi (chỉ khi edit)
  useEffect(() => {
    if (userData) {
      const convertedImage = convertBase64ToImage(userData.avatar);
      setAvatarPreview(convertedImage);
      setFormData({
        ...userData,
        birthDate: formatDateForInput(userData.birthDate), // Chuẩn hóa ngày
      });
    } else {
      setAvatarPreview(""); // Không hiển thị ảnh khi add user
      setFormData({
        fullName: "",
        birthDate: "",
        gender: "Nam",
        email: "",
        phone: "",
        address: "",
        avatar: "",
        password: "123456", // Mật khẩu mặc định cho user mới
      });
    }
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Hàm chuyển đổi Base64 sang định dạng ảnh
  const convertBase64ToImage = (base64) => {
    if (!base64) return "/avatar.png"; // Ảnh mặc định nếu không có Base64
    return base64.startsWith("data:image")
      ? base64
      : `data:image/jpeg;base64,${base64}`; // Giả định JPEG nếu chưa có tiền tố
  };

  // Xử lý chọn ảnh mới
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Kiểm tra kích thước file (giới hạn 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Ảnh quá lớn! Vui lòng chọn ảnh nhỏ hơn 5MB.");
        return;
      }

      // Kiểm tra loại file
      if (!file.type.startsWith("image/")) {
        alert("Vui lòng chọn file ảnh hợp lệ!");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;

        // Nếu ảnh quá lớn, nén lại
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          // Resize nếu ảnh quá lớn (max 800px)
          const maxSize = 800;
          if (width > maxSize || height > maxSize) {
            if (width > height) {
              height = (height / width) * maxSize;
              width = maxSize;
            } else {
              width = (width / height) * maxSize;
              height = maxSize;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          // Chuyển về base64 với chất lượng 0.7
          const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);

          setFormData({ ...formData, avatar: compressedBase64 });
          setAvatarPreview(compressedBase64);
        };
        img.src = base64String;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 py-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Avatar */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ảnh đại diện
          </label>
          <div className="flex items-center space-x-6">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="w-32 h-32 rounded-full object-cover" // Tăng kích thước lên 128px
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                Chưa có ảnh
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </div>

        <FormField
          label="Họ và tên"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
        />

        {/* Date Picker cho birthDate */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ngày sinh
          </label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <FormField
          label="Giới tính"
          name="gender"
          type="select"
          value={formData.gender}
          onChange={handleInputChange}
          options={[
            { value: "Nam", label: "Nam" },
            { value: "Nữ", label: "Nữ" },
            { value: "Khác", label: "Khác" },
          ]}
        />

        <FormField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
        />

        <FormField
          label="Số điện thoại"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />

        <FormField
          label="Địa chỉ"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
        />

        {/* Hiển thị trường password chỉ khi thêm user mới */}
        {!userData && (
          <div className="col-span-1 md:col-span-2">
            <FormField
              label="Mật khẩu"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Mật khẩu mặc định: 123456"
            />
            <p className="text-sm text-gray-500 mt-1">
              Mật khẩu mặc định là:{" "}
              <span className="font-semibold">123456</span>. Người dùng có thể
              đổi mật khẩu sau khi đăng nhập.
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-blue-50 font-medium transition-colors cursor-pointer"
        >
          Hủy
        </button>
        <button
          type="submit"
          className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors shadow-sm cursor-pointer"
        >
          {userData ? "Cập nhật" : "Thêm mới"}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
