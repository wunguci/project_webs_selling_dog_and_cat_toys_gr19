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
      slug: "sua-tam-joyce-dolls-huong-tra-xanh-cho-cho-meo",
    },
    {
      id: 2,
      name: "Yếm cổ đáng yêu cho chó mèo",
      price: 35000,
      quantity: 1,
      image: cart2,
      slug: "yem-co-dang-yeu-cho-cho-meo",
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
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Giỏ hàng của bạn
        </h1>

        {/* Khung chứa cả danh sách sản phẩm & tổng tiền */}
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
          {cart.length > 0 ? (
            <>
              {/* Danh sách sản phẩm */}
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-300 text-gray-700">
                    <th className="p-3">Sản phẩm</th>
                    <th className="p-3">Giá</th>
                    <th className="p-3">Số lượng</th>
                    <th className="p-3">Thành tiền</th>
                    <th className="p-3">Xóa</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-200 transition-all duration-300 min-h-[80px]"
                    >
                      <td className="p-5 flex items-center gap-6">
                        {/* Link đến trang chi tiết sản phẩm */}
                        <Link
                          to={`/product/${item.slug}`}
                          className="flex items-center gap-6"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 rounded-md shadow-sm border border-gray-200"
                          />
                          <span className="text-brown-hover transition-all duration-300">
                            {item.name}
                          </span>
                        </Link>
                      </td>

                      <td className="p-5 text-gray-700 w-32">
                        {item.price.toLocaleString()}đ
                      </td>

                      <td className="p-5 w-32 text-center">
                        <div className="flex items-center justify-center border border-gray-300 rounded-lg w-28 shadow-sm">
                          {/* Nút Giảm */}
                          <button
                            onClick={() => {
                              if (item.quantity === 1) {
                                removeItem(item.id);
                              } else {
                                updateQuantity(item.id, item.quantity - 1);
                              }
                            }}
                            className="px-3 py-2 text-gray-700 rounded-l-lg cursor-pointer"
                          >
                            -
                          </button>

                          {/* Số Lượng (Cho phép nhập + Ẩn nút tăng giảm mặc định) */}
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value === "") {
                                updateQuantity(item.id, ""); // Nếu rỗng thì chờ nhập số
                              } else {
                                const newQuantity = parseInt(value, 10);
                                if (!isNaN(newQuantity) && newQuantity >= 1) {
                                  updateQuantity(item.id, newQuantity);
                                }
                              }
                            }}
                            onBlur={(e) => {
                              if (
                                !e.target.value ||
                                parseInt(e.target.value, 10) < 1
                              ) {
                                updateQuantity(item.id, 1);
                              }
                            }}
                            className="w-10 text-center border-x border-gray-300 bg-white text-gray-800 appearance-none custom-number-input"
                          />

                          {/* Nút Tăng */}
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-10 h-10 text-gray-700 rounded-r-lg cursor-pointer flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      <td className="p-5 w-32 text-center">
                        {(item.price * item.quantity).toLocaleString()}đ
                      </td>

                      <td className="p-5 w-16 text-center">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 transition text-lg"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Tổng tiền - Được đặt trong cùng khung với bảng sản phẩm */}
              <div className="flex justify-end items-center mt-6 p-4">
                <h2 className="text-xl font-bold text-gray-800">
                  Tổng số thành tiền:{" "}
                  <span className="text-brown">
                    {totalPrice.toLocaleString()}đ
                  </span>
                </h2>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500 py-6">
              Giỏ hàng của bạn đang trống!
            </p>
          )}
        </div>

        {/* Nút điều hướng */}
        <div className="mt-6 flex justify-between">
          <Link
            to="/"
            className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition"
          >
            ← Tiếp tục mua hàng
          </Link>
          <button className="bg-brown text-white py-2 px-4 rounded-lg shadow-md border-brown-hover transition">
            Tiến hành thanh toán →
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default CartShop;
