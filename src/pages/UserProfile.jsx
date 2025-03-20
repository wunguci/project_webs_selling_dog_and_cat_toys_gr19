import { useEffect, useState } from "react";
import {
  FaUser,
  FaShoppingBag,
  FaHistory,
  FaEdit,
  FaSignOutAlt,
  FaTrash,
  FaEye,
  FaFileDownload
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoadingOverlay from "../components/LoadingOverlay";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ScrollToTopButton from "../components/ScrollToTopButton";
import Modal from "../components/Modal";
import { generateInvoice } from "../utils/GenerateInvoice";
import { FaCartPlus } from "react-icons/fa6";
import axiosInstance from "../utils/axiosInstance";

const UserProfile = () => {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    birthDate: "",
    avatar: "",
    gender: ""
  });

  const [orders, setOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderStats, setOrderStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalSpent: 0,
  });

  // Format date to YYYY-MM-DD
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Format date to display format
  const formatDisplayDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      // hour: "2-digit",
      // minute: "2-digit",
    });
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

        const res = await axiosInstance.get(`/api/users/${user._id}`
        );

        const userData = res.data;
        userData.avatar = convertBase64ToImage(userData.avatar);
        setUser(userData);
        setLoggedIn(true);

        fetchUserOrders(user._id);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchUserData();
  }, [navigate]);

  const fetchUserOrders = async (userId) => {
    try {
      const response = await axiosInstance.post(`/api/orders`);
      const allOrders = response.data;

      // Filter orders for current user
      const userOrders = allOrders.filter(
        (order) => order.user_id._id === userId
      );

      const pending = userOrders.filter(
        (order) => order.status !== "Delivered" && order.status !== "Completed"
      ).length;
      const completed = userOrders.filter(
        (order) => order.status === "Delivered" || order.status === "Completed"
      ).length;
      const totalSpent = userOrders.reduce(
        (sum, order) => sum + order.total_price,
        0
      );

      setOrderStats({
        totalOrders: userOrders.length,
        pendingOrders: pending,
        completedOrders: completed,
        totalSpent: totalSpent,
      });

      // Separate current and completed orders
      setOrders(
        userOrders.filter(
          (order) =>
            order.status !== "Delivered" && order.status !== "Completed"
        )
      );
      setCompletedOrders(
        userOrders.filter(
          (order) =>
            order.status === "Delivered" || order.status === "Completed"
        )
      );

      setLoading(false);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load orders: " + err.message);
      setLoading(false);
    }
  };

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

          const res = await axiosInstance.put(`/api/users/${user._id}`,
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
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const res = await axiosInstance.put(`/api/users/${storedUser._id}`,
        {
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          address: user.address,
          birthDate: user.birthDate,
          gender: user.gender
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const updatedUser = res.data;
      
      if (user.avatar && user.avatar.startsWith("data:image")) {
        updatedUser.avatar = user.avatar;
      } else {
        updatedUser.avatar = convertBase64ToImage(updatedUser.avatar);
      }

      setUser(updatedUser);
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...storedUser,
          fullName: updatedUser.fullName,
          email: updatedUser.email,
          phone: updatedUser.phone,
          address: updatedUser.address,
          birthDate: updatedUser.birthDate,
          gender: updatedUser.gender,
        })
      );

      toast.success("Cập nhật thông tin thành công!");
    } catch (err) {
      console.error("Lỗi khi cập nhật thông tin:", err);
      toast.error("Cập nhật thông tin thất bại!");
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const confirmed = window.confirm(
        "Bạn có chắc chắn muốn hủy đơn hàng này?"
      );
      if (!confirmed) return;

      const response = await axiosInstance.put(`/api/orders/${orderId}`,
        { status: "Cancelled" }
      );

      if (response.status === 200) {
        toast.success("Đã hủy đơn hàng thành công");

        // Refetch orders to update the list
        const user = JSON.parse(localStorage.getItem("user"));
        fetchUserOrders(user._id);
      }
    } catch (error) {
      console.error("Lỗi khi hủy đơn hàng:", error);
      toast.error("Không thể hủy đơn hàng. Vui lòng thử lại sau!");
    }
  };

  // xử lý người dùng nhấn nút tạo hóa đơn
  const hanldeGenerateInvoice = (order) => {
    generateInvoice(order, formatDisplayDate);
  }

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-500";
      case "Processing":
        return "text-blue-500";
      case "Shipping":
        return "text-purple-500";
      case "Delivered":
      case "Completed":
        return "text-green-500";
      case "Cancelled":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getVietnameseStatus = (status) => {
    switch (status) {
      case "Pending":
        return "Chờ xử lý";
      case "Processing":
        return "Đang xử lý";
      case "Shipping":
        return "Đang giao hàng";
      case "Delivered":
        return "Đã giao hàng";
      case "Completed":
        return "Hoàn tất";
      case "Cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  if (loading) return <LoadingOverlay isVisible={true} />;
  if (error)
    return (
      <div className="container mx-auto p-4 text-red-500">Lỗi: {error}</div>
    );

  return (
    <>
      <Header />
      <LoadingOverlay isVisible={isLoggingOut} />
      <div className="container mx-auto p-4 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1 bg-white shadow-md rounded-lg p-6">
            <div className="flex flex-col items-center">
              <img
                src={user.avatar}
                alt="User Avatar"
                className="w-24 h-24 rounded-full object-cover"
              />
              <label className="mt-2 bg-gray-100 p-1 rounded-full cursor-pointer flex justify-center items-center gap-2 text-sm hover:text-blue-500">
                <FaEdit className="text-gray-500 cursor-pointer hover:text-blue-500" />
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
                  className={`text-brown-hover cursor-pointer w-full flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg ${
                    activeTab === "profile" ? "bg-blue-50 text-blue-500" : ""
                  }`}
                >
                  <FaUser className="mr-2" />
                  Thông tin cá nhân
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTabChange("orders")}
                  className={`text-brown-hover cursor-pointer w-full flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg ${
                    activeTab === "orders" ? "bg-blue-50 text-blue-500" : ""
                  }`}
                >
                  <FaShoppingBag className="mr-2" />
                  Đơn hàng của bạn
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTabChange("history")}
                  className={`text-brown-hover cursor-pointer w-full flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg ${
                    activeTab === "history" ? "bg-blue-50 text-blue-500" : ""
                  }`}
                >
                  <FaHistory className="mr-2" />
                  Lịch sử mua hàng
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-brown-hover cursor-pointer w-full flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
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
                className={`cursor-pointer py-2 px-4 ${
                  activeTab === "profile"
                    ? "border-b-2 border-brown text-brown"
                    : "text-gray-500"
                }`}
              >
                Thông tin cá nhân
              </button>
              <button
                onClick={() => handleTabChange("orders")}
                className={`cursor-pointer py-2 px-4 ${
                  activeTab === "orders"
                    ? "border-b-2 border-brown text-brown"
                    : "text-gray-500"
                }`}
              >
                Đơn hàng của bạn
              </button>
              <button
                onClick={() => handleTabChange("history")}
                className={`cursor-pointer py-2 px-4 ${
                  activeTab === "history"
                    ? "border-b-2 border-brown text-brown"
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
                      value={formatDate(user.birthDate)}
                      onChange={(e) =>
                        setUser({ ...user, birthDate: e.target.value })
                      }
                      className="flex-1 p-2 border rounded-lg"
                    />
                    <FaEdit className="ml-2 text-gray-500 cursor-pointer" />
                  </div>
                  <div className="flex items-center">
                    <label className="w-32 font-medium">Giới tính:</label>
                    <select
                      value={
                        user.gender === true
                          ? "male"
                          : user.gender === false
                          ? "female"
                          : ""
                      }
                      onChange={(e) =>
                        setUser({
                          ...user,
                          gender: e.target.value === "male" ? true : false,
                        })
                      }
                      className="flex-1 p-2 border rounded-lg"
                    >
                      <option value="">-- Chọn giới tính --</option>
                      <option value="male">Nam</option>
                      <option value="female">Nữ</option>
                    </select>
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
                    className=" cursor-pointer bg-brown text-white py-2 px-4 rounded-lg bg-brown-hover"
                  >
                    Cập nhật thông tin
                  </button>
                </div>

                {/* Order Statistics Dashboard */}
                <div className="mt-8">
                  <h2 className="text-xl font-bold mb-4">Thống kê đơn hàng</h2>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg shadow border border-blue-100">
                      <div className="text-blue-500 text-lg font-bold">
                        {orderStats.totalOrders}
                      </div>
                      <div className="text-gray-600">Tổng số đơn hàng</div>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg shadow border border-yellow-100">
                      <div className="text-yellow-500 text-lg font-bold">
                        {orderStats.pendingOrders}
                      </div>
                      <div className="text-gray-600">Đơn hàng đang xử lý</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg shadow border border-green-100">
                      <div className="text-green-500 text-lg font-bold">
                        {orderStats.completedOrders}
                      </div>
                      <div className="text-gray-600">
                        Đơn hàng đã hoàn thành
                      </div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg shadow border border-purple-100">
                      <div className="text-purple-500 text-lg font-bold">
                        {orderStats.totalSpent.toLocaleString()} VNĐ
                      </div>
                      <div className="text-gray-600">Tổng chi tiêu</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "orders" && (
              <div>
                <h1 className="text-2xl font-bold mb-4">Đơn hàng của bạn</h1>
                {orders.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>Bạn chưa có đơn hàng nào đang xử lý.</p>
                    <Link
                      to="/products"
                      className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                    >
                      Mua sắm ngay
                    </Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="py-2 px-4 border-b text-left">
                            Mã đơn hàng
                          </th>
                          <th className="py-2 px-4 border-b text-left">
                            Ngày đặt
                          </th>
                          <th className="py-2 px-4 border-b text-left">
                            Tổng tiền
                          </th>
                          <th className="py-2 px-4 border-b text-left">
                            Trạng thái
                          </th>
                          <th className="py-2 px-4 border-b text-left">
                            Thao tác
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order._id} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b">
                              {order._id
                                .substring(order._id.length - 6)
                                .toUpperCase()}
                            </td>
                            <td className="py-2 px-4 border-b">
                              {formatDisplayDate(order.order_date)}
                            </td>
                            <td className="py-2 px-4 border-b">
                              {order.total_price.toLocaleString()} VNĐ
                            </td>
                            <td className="py-2 px-4 border-b">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${getStatusClass(
                                  order.status
                                )}`}
                              >
                                {getVietnameseStatus(order.status)}
                              </span>
                            </td>
                            <td className="py-2 px-4 border-b">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleViewOrder(order)}
                                  className="p-1 text-blue-500 hover:text-blue-700"
                                  title="Xem chi tiết"
                                >
                                  <FaEye />
                                </button>
                                {order.status === "Pending" && (
                                  <button
                                    onClick={() => handleCancelOrder(order._id)}
                                    className="p-1 text-red-500 hover:text-red-700"
                                    title="Hủy đơn hàng"
                                  >
                                    <FaTrash />
                                  </button>
                                )}
                                <button
                                  onClick={() => hanldeGenerateInvoice(order)}
                                  className="p-1 text-green-500 hover:text-green-700"
                                  title="Tải hóa đơn"
                                >
                                  <FaFileDownload />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
            {activeTab === "history" && (
              <div>
                <h1 className="text-2xl font-bold mb-4">Lịch sử mua hàng</h1>
                {completedOrders.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>Bạn chưa có đơn hàng nào đã hoàn thành.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="py-2 px-4 border-b text-left">
                            Mã đơn hàng
                          </th>
                          <th className="py-2 px-4 border-b text-left">
                            Ngày đặt
                          </th>
                          <th className="py-2 px-4 border-b text-left">
                            Ngày hoàn thành
                          </th>
                          <th className="py-2 px-4 border-b text-left">
                            Tổng tiền
                          </th>
                          <th className="py-2 px-4 border-b text-left">
                            Trạng thái
                          </th>
                          <th className="py-2 px-4 border-b text-left">
                            Thao tác
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {completedOrders.map((order) => (
                          <tr key={order._id} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b">
                              {order._id
                                .substring(order._id.length - 6)
                                .toUpperCase()}
                            </td>
                            <td className="py-2 px-4 border-b">
                              {formatDisplayDate(order.order_date)}
                            </td>
                            <td className="py-2 px-4 border-b">
                              {formatDisplayDate(order.updatedAt)}
                            </td>
                            <td className="py-2 px-4 border-b">
                              {order.total_price.toLocaleString()} VNĐ
                            </td>
                            <td className="py-2 px-4 border-b">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${getStatusClass(
                                  order.status
                                )}`}
                              >
                                {getVietnameseStatus(order.status)}
                              </span>
                            </td>
                            <td className="py-2 px-4 border-b">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleViewOrder(order)}
                                  className="p-1 text-blue-500 hover:text-blue-700"
                                  title="Xem chi tiết"
                                >
                                  <FaEye />
                                </button>
                                <button
                                  onClick={() => handleGenerateInvoice(order)}
                                  className="p-1 text-green-500 hover:text-green-700"
                                  title="Tải hóa đơn"
                                >
                                  <FaFileDownload />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
            {/* Order Details Modal */}
            {showOrderModal && selectedOrder && (
              <Modal onClose={() => setShowOrderModal(false)}>
                <div className="p-6">
                  <h2 className="flex gap-5 justify-center text-2xl font-bold mb-6 text-gray-800 text-center border-b pb-4">
                    <FaCartPlus className="w-10 h-10" />
                    Chi tiết đơn hàng
                  </h2>
                  <div className="space-y-6 text-gray-700">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Mã đơn hàng:
                      </p>
                      <p className="text-lg font-semibold">
                        {selectedOrder._id}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Ngày đặt:
                      </p>
                      <p className="text-lg">
                        {formatDisplayDate(selectedOrder.order_date)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Trạng thái:
                      </p>
                      <p
                        className={`text-lg font-semibold ${getStatusClass(
                          selectedOrder.status
                        )}`}
                      >
                        {getVietnameseStatus(selectedOrder.status)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Sản phẩm:
                      </p>
                      <ul className="list-none divide-y divide-gray-200">
                        {selectedOrder.items.map((item, index) => (
                          <li
                            key={index}
                            className="py-3 flex justify-between items-center"
                          >
                            <span className="font-medium text-gray-800">
                              {item.product_id.name}
                            </span>
                            <span className="text-sm text-gray-500">
                              {item.quantity} x{" "}
                              {item.product_id.price.toLocaleString()} VNĐ
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Tổng tiền:
                      </p>
                      <p className="text-xl font-bold text-brown">
                        {selectedOrder.total_price.toLocaleString()} VNĐ
                      </p>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-center">
                    <button
                      onClick={() => setShowOrderModal(false)}
                      className="bg-gradient-to-r from-red-500 to-red-700 text-white py-3 px-6 rounded-lg hover:from-red-600 hover:to-red-800 shadow-md transition-transform transform hover:scale-105"
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              </Modal>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
      <ScrollToTopButton />
    </>
  );
};

export default UserProfile;