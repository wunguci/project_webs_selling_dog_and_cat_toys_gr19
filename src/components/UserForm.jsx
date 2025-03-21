import FormField from "./FormField";
import { useState } from "react";

const UserForm = ({ userData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(
    userData || {
      fullName: "",
      birthDate: "",
      gender: "Nam",
      email: "",
      phone: "",
      address: "",
    }
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Họ và tên"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
        />

        <FormField
          label="Ngày sinh"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleInputChange}
          placeholder="MM/DD/YYYY"
        />

        <FormField
          label="Giới tính"
          name="gender"
          type="select"
          value={formData.gender}
          onChange={handleInputChange}
          options={[
            { value: "Nam", label: "Nam" },
            { value: "Nữ", label: "Nữ" },
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