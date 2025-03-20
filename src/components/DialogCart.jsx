import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import cart1 from "../assets/images/cart1.png";
import cart2 from "../assets/images/cart2.png";
import { useState } from "react";

const DialogCart = ({ onClose }) => {
  const navigate = useNavigate();

  // Dữ liệu sản phẩm viết trực tiếp
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Bát ăn nghiêng chống gù cho chó mèo - Màu đen",
      price: 45000,
      image: cart1,
      quantity: 1,
    },
    {
      id: 2,
      name: "Cát vệ sinh cho mèo không bụi",
      price: 120000,
      image: cart1,
      quantity: 2,
    },
    {
      id: 3,
      name: "Thức ăn hạt cho mèo vị cá hồi",
      price: 95000,
      image: cart2,
      quantity: 1,
    },
  ]);

  // Tính tổng tiền
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // XÓA sản phẩm khỏi giỏ hàng
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <div
      className="absolute right-0 w-80 bg-white shadow-2xl rounded-xl p-5 border border-gray-300 z-50 cart-dialog-animation"
      // onMouseEnter={onClose}
      // onMouseLeave={onClose}
    >
      {cartItems.length > 0 ? (
        <>
          {/* Danh sách sản phẩm */}
          <div className="max-h-64 overflow-y-auto custom-scrollbar">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 border-b py-3 border-gray-200 transition-all duration-200 hover:bg-gray-50 rounded-lg px-2"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-md object-cover border border-gray-200 shadow-sm"
                />
                <div className="flex-1">
                  <p className="text-gray-800 text-sm font-medium line-clamp-2">
                    {item.name}
                  </p>
                  <p className="text-brown font-semibold">
                    {item.price.toLocaleString()}đ
                    <span className="text-gray-500 text-xs ml-1">
                      x {item.quantity}
                    </span>
                  </p>
                </div>
                <button
                  className="text-gray-400 hover:text-red-500 transition-all duration-200"
                  onClick={() => removeItem(item.id)}
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>

          {/* Tổng tiền */}
          <div className="mt-3 flex justify-between items-center font-bold text-gray-900">
            <span>Tổng tiền:</span>
            <span className="text-brown text-lg">
              {totalPrice.toLocaleString()}đ
            </span>
          </div>

          {/* Nút xem giỏ hàng & thanh toán */}
          <div className="mt-4 flex flex-col gap-2">
            <button
              className="w-full bg-brown text-white py-2 rounded-md shadow-md hover:bg-opacity-80 transition-all"
              onClick={() => navigate("/checkout")}
            >
              Tiến hành thanh toán
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500 py-6">Giỏ hàng trống!</p>
      )}
    </div>
  );
};

export default DialogCart;
