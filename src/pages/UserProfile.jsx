import { useEffect, useState } from "react";
import {
  FaUser,
  FaShoppingBag,
  FaHistory,
  FaEdit,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoadingOverlay from "../components/LoadingOverlay";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ScrollToTopButton from "../components/ScrollToTopButton";

const UserProfile = () => {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    birthDate: "",
    avatar: "",
  });

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");

  // Hàm chuyển đổi định dạng ngày
  const formatDate = (dateString) => {
    if (!dateString) return ""; // Trả về chuỗi rỗng nếu dateString không tồn tại
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const convertBase64ToImage = (base64) => {
    return `data:image/jpeg;base64,${base64}`;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
          navigate("/login");
          return;
        }

        const res = await axios.get(
          `http://localhost:5000/api/users/${user._id}`
        );

        const userData = res.data;
        userData.avatar = convertBase64ToImage(userData.avatar);
        setUser(userData);
        setLoggedIn(true);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    setIsLoggingOut(true);
    localStorage.removeItem("user");
    setTimeout(() => {
      navigate("/");
      setLoggedIn(false);
      setIsLoggingOut(false);
    }, 2000);
  };

  const handleAvatarChange = async (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const user = JSON.parse(localStorage.getItem("user"));
          const avatarBinary = reader.result;

          const updateUser = {
            ...user,
            avatar: avatarBinary.split(",")[1],
          };

          const res = await axios.put(
            `http://localhost:5000/api/users/${user.id}`,
            updateUser,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const updatedUser = res.data;
          updatedUser.avatar = convertBase64ToImage(updatedUser.avatar);
          setUser(updatedUser);

          localStorage.setItem(
            "user",
            JSON.stringify({ ...user, avatar: updatedUser.avatar })
          );

          toast.success("Cập nhật ảnh đại diện thành công!");
          setSelectedFile(null);

          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } catch (err) {
          console.error("Lỗi khi cập nhật avatar:", err);
          toast.error("Cập nhật ảnh đại diện thất bại!");
        }
      };

      reader.onerror = () => {
        toast.error("Đọc file thất bại!");
      };

      reader.readAsDataURL(file);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleUpdateProfile = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.put(
        `http://localhost:5000/api/users/${user.id}`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const updatedUser = res.data;
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success("Cập nhật thông tin thành công!");
    } catch (err) {
      console.error("Lỗi khi cập nhật thông tin:", err);
      toast.error("Cập nhật thông tin thất bại!");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Header />
      <LoadingOverlay isVisible={isLoggingOut} />
      <div className="container mx-auto p-4 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* sidebar */}
          <div className="md:col-span-1 bg-white shadow-md rounded-lg p-6">
            <div className="flex flex-col items-center ">
              <img
                src={user.avatar}
                alt="User Avatar"
                className="w-24 h-24 rounded-full"
              />
              <label className="bg-blue p-1 rounded-full cursor-pointer flex justify-center items-center gap-2 text-sm hover:text-blue-500">
                <FaEdit className="ml-2 text-gray-500 cursor-pointer hover:text-blue-500" />
                Cập nhật ảnh
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
                {selectedFile && (
                  <button
                    className="w-10 h-6 bg-blue-500 text-white rounded-sm hover:bg-blue-600 cursor-pointer"
                    onClick={() => handleAvatarChange(selectedFile)}
                  >
                    Lưu
                  </button>
                )}
              </label>
              <h2 className="text-xl font-bold mt-2">{user.fullName}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <ul className="mt-6 space-y-2">
              <li>
                <button
                  onClick={() => handleTabChange("profile")}
                  className="w-full flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <FaUser className="mr-2" />
                  Thông tin cá nhân
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTabChange("orders")}
                  className="w-full flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <FaShoppingBag className="mr-2" />
                  Đơn hàng của bạn
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTabChange("history")}
                  className="w-full flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <FaHistory className="mr-2" />
                  Lịch sử mua hàng
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <FaSignOutAlt className="mr-2" />
                  Đăng xuất
                </button>
              </li>
            </ul>
          </div>

          {/* Main Content */}
          <div className="md:col-span-4 bg-white shadow-md rounded-lg p-6">
            {/* Tab Navigation */}
            <div className="flex space-x-4 border-b mb-6">
              <button
                onClick={() => handleTabChange("profile")}
                className={`py-2 px-4 ${
                  activeTab === "profile"
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-500"
                }`}
              >
                Thông tin cá nhân
              </button>
              <button
                onClick={() => handleTabChange("orders")}
                className={`py-2 px-4 ${
                  activeTab === "orders"
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-500"
                }`}
              >
                Đơn hàng của bạn
              </button>
              <button
                onClick={() => handleTabChange("history")}
                className={`py-2 px-4 ${
                  activeTab === "history"
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-500"
                }`}
              >
                Lịch sử mua hàng
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "profile" && (
              <div>
                <h1 className="text-2xl font-bold mb-4">Thông tin cá nhân</h1>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <label className="w-32 font-medium">Họ và tên:</label>
                    <input
                      type="text"
                      value={user.fullName}
                      onChange={(e) =>
                        setUser({ ...user, fullName: e.target.value })
                      }
                      className="flex-1 p-2 border rounded-lg"
                    />
                    <FaEdit className="ml-2 text-gray-500 cursor-pointer" />
                  </div>
                  <div className="flex items-center">
                    <label className="w-32 font-medium">Ngày sinh:</label>
                    <input
                      type="date"
                      value={formatDate(user.birthDate)} // Sử dụng hàm formatDate
                      onChange={(e) =>
                        setUser({ ...user, birthDate: e.target.value })
                      }
                      className="flex-1 p-2 border rounded-lg"
                    />
                    <FaEdit className="ml-2 text-gray-500 cursor-pointer" />
                  </div>
                  <div className="flex items-center">
                    <label className="w-32 font-medium">Email:</label>
                    <input
                      type="email"
                      value={user.email}
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                      className="flex-1 p-2 border rounded-lg"
                    />
                    <FaEdit className="ml-2 text-gray-500 cursor-pointer" />
                  </div>
                  <div className="flex items-center">
                    <label className="w-32 font-medium">Số điện thoại:</label>
                    <input
                      type="text"
                      value={user.phone}
                      onChange={(e) =>
                        setUser({ ...user, phone: e.target.value })
                      }
                      className="flex-1 p-2 border rounded-lg"
                    />
                    <FaEdit className="ml-2 text-gray-500 cursor-pointer" />
                  </div>
                  <div className="flex items-center">
                    <label className="w-32 font-medium">Địa chỉ:</label>
                    <input
                      type="text"
                      value={user.address}
                      onChange={(e) =>
                        setUser({ ...user, address: e.target.value })
                      }
                      className="flex-1 p-2 border rounded-lg"
                    />
                    <FaEdit className="ml-2 text-gray-500 cursor-pointer" />
                  </div>
                  <button
                    onClick={handleUpdateProfile}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                  >
                    Cập nhật thông tin
                  </button>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div>
                <h1 className="text-2xl font-bold mb-4">Đơn hàng của bạn</h1>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between">
                        <span className="font-medium">
                          Đơn hàng #{order.id}
                        </span>
                        <span className="text-gray-600">{order.date}</span>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span>
                          Tổng tiền: {order.total.toLocaleString()} VNĐ
                        </span>
                        <span
                          className={`${
                            order.status === "Đã giao"
                              ? "text-green-500"
                              : "text-yellow-500"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "history" && (
              <div>
                <h1 className="text-2xl font-bold mb-4">Lịch sử mua hàng</h1>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between">
                        <span className="font-medium">
                          Đơn hàng #{order.id}
                        </span>
                        <span className="text-gray-600">{order.date}</span>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span>
                          Tổng tiền: {order.total.toLocaleString()} VNĐ
                        </span>
                        <span
                          className={`${
                            order.status === "Đã giao"
                              ? "text-green-500"
                              : "text-yellow-500"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ScrollToTopButton />
    </>
  );
};

export default UserProfile;
