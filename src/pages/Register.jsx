import { useState } from "react";
import axios from "axios";
import Breadcrumb from "../components/Breadcrumb";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import logo from "/pet.png";
import Header from "../components/Header";
import ScrollToTopButton from "../components/ScrollToTopButton";
import { Link } from "react-router-dom";
import "./page.scss";

const Register = () => {
  const links = [{ label: "Trang chủ", link: "/" }, { label: "Đăng ký" }];
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    birthDate: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <Header />
      <Breadcrumb items={links} />
      <div className="container mx-auto px-4 md:px-8 flex flex-col items-center -mt-10">
        <div className="w-full max-w-2xl bg-white rounded-md shadow-md p-8">
          <div className="flex justify-center">
            <img src={logo} alt="Logo" className="w-30 h-30 object-contain" />
          </div>
          <h1 className="text-2xl font-semibold text-center mb-4">
            Đăng ký với
          </h1>
          {/* social login */}
          <div className="flex justify-center gap-4 mb-6">
            <button className="flex items-center gap-2 bg-gray-100 px-6 py-3 rounded-md hover:bg-gray-200 shadow-sm cursor-pointer">
              <FcGoogle className="text-4xl" />
              Google
            </button>
            <button className="flex items-center gap-2 bg-gray-100 px-6 py-3 rounded-md hover:bg-gray-200 shadow-sm cursor-pointer">
              <FaFacebook className="text-4xl text-blue-600" />
              Facebook
            </button>
          </div>
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-4 text-gray-500">hoặc</span>
            <hr className="flex-grow border-gray-300" />
          </div>
          {/* form */}
          <form>
            <div className="space-y-6">
              <div className="input-container">
                <input
                  type="text"
                  name="fullName"
                  placeholder=" "
                  className="w-full"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
                <label>Nhập họ và tên</label>
                <span className="error-message">
                  Họ và tên không được để trống.
                </span>
              </div>
              <div className="input-container">
                <input
                  type="tel"
                  name="phone"
                  placeholder=" "
                  className="w-full"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <label>Nhập số điện thoại</label>
                <span className="error-message">
                  Số điện thoại không hợp lệ.
                </span>
              </div>
              <div className="input-container">
                <input
                  type="email"
                  name="email"
                  placeholder=" "
                  className="w-full"
                  value={formData.email}
                  onChange={handleChange}
                />
                <label>Nhập email (không bắt buộc)</label>
              </div>
              <small className="text-gray-500 italic mx-2">
                Hóa đơn VAT khi mua hàng sẽ được gửi qua email này
              </small>
              <div className="input-container mt-4">
                <input
                  type="date"
                  name="birthDate"
                  placeholder=" "
                  className="w-full"
                  value={formData.birthDate}
                  onChange={handleChange}
                  required
                />
                <label>Chọn ngày sinh</label>
                <span className="error-message">
                  Ngày sinh không được để trống.
                </span>
              </div>
              <div className="input-container">
                <input
                  type="password"
                  name="password"
                  placeholder=" "
                  className="w-full"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <label>Nhập mật khẩu</label>
                <span className="error-message">
                  Mật khẩu phải tối thiểu 6 ký tự, có ít nhất 1 chữ và 1 số.
                </span>
              </div>
              <small className="text-gray-500 italic mx-2">
                (*) Mật khẩu tối thiểu 6 ký tự, có ít nhất 1 chữ và 1 số. (VD:
                12345a)
              </small>
              <div className="input-container mt-4">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder=" "
                  className="w-full"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <label>Nhập lại mật khẩu</label>
                <span className="error-message">Mật khẩu không khớp.</span>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-brown text-white py-3 rounded-md mt-6 font-semibold hover:shadow-lg cursor-pointer"
            >
              Đăng ký
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Bạn đã có tài khoản?{" "}
            <Link to="/login" className="text-brown font-semibold">
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </div>

      <ScrollToTopButton />
    </>
  );
};

export default Register;
