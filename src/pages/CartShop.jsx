import { useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layout/mainLayout";
import Breadcrumb2 from "../components/Breadcrumb2";
import { FaTrash } from "react-icons/fa";
import cart1 from "../assets/images/cart1.png";
import cart2 from "../assets/images/cart2.png";

const links = [
  { label: "Trang chủ", href: "/" },
  { label: "Giỏ hàng của bạn", href: "/cart" },
];

const CartShop = () => {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Sữa tắm JOYCE & DOLLS hương trà xanh cho chó mèo",
      price: 175000,
      quantity: 1,
      image: cart1,
      slug: "sua-tam-joyce-dolls-huong-tra-xanh-cho-cho-meo"
    },
    {
      id: 2,
      name: "Yếm cổ đáng yêu cho chó mèo",
      price: 35000,
      quantity: 1,
      image: cart2,
      slug: "yem-co-dang-yeu-cho-cho-meo"
    },
  ]);

  // Cập nhật số lượng sản phẩm
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Tính tổng tiền
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <MainLayout>
      {/* Breadcrumb */}
      <Breadcrumb2 links={links} banner={null} />

      <div className="max-w-5xl mx-auto p-6">
        {/* Tiêu đề */}
        <h1 className="text-3xl font-bold mb-6 text-gray-800">🛒 Giỏ hàng của bạn</h1>

        {/* Bảng giỏ hàng */}
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
          {cart.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-300 text-gray-700 bg-gray-50">
                  <th className="p-3">Sản phẩm</th>
                  <th className="p-3">Giá</th>
                  <th className="p-3">Số lượng</th>
                  <th className="p-3">Thành tiền</th>
                  <th className="p-3">Xóa</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="p-3 flex items-center gap-4">
                      {/* Link đến trang chi tiết sản phẩm */}
                      <Link to={`/product/${item.slug}`} className="flex items-center gap-4 hover:underline">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-md shadow-sm border border-gray-200"
                        />
                        <span className="text-blue-600 hover:text-blue-800 font-semibold">
                          {item.name}
                        </span>
                      </Link>
                    </td>
                    <td className="p-3 text-gray-700 font-semibold">
                      {item.price.toLocaleString()}đ
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value))
                        }
                        className="border border-gray-300 rounded-md w-16 p-1 text-center shadow-sm"
                      />
                    </td>
                    <td className="p-3 text-green-600 font-bold">
                      {(item.price * item.quantity).toLocaleString()}đ
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-500 py-6">Giỏ hàng của bạn đang trống!</p>
          )}
        </div>

        {/* Tổng tiền */}
        <div className="flex justify-between items-center mt-6 bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">
            🏷️ Tổng số thành tiền: <span className="text-blue-600">{totalPrice.toLocaleString()}đ</span>
          </h2>
        </div>

        {/* Nút điều hướng */}
        <div className="mt-6 flex justify-between">
          <Link
            to="/"
            className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition"
          >
            ← Tiếp tục mua hàng
          </Link>
          <button
            className="bg-yellow-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-yellow-600 transition"
          >
            🛍️ Tiến hành thanh toán →
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default CartShop;
