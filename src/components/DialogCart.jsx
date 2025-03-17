import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

function DialogCart() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems)
  console.log("item: ", cartItems);
  

  return (
    <div className='absolute w-80 max-h-[400px] bg-white border border-gray-200 rounded-md shadow-lg z-50 top-7 -right-10 p-5'>
      <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto custom-scrollbar-hidden">
        {cartItems.map((cart, index) => (
          <div key={index}>
            <div className="h-20 w-full flex gap-2">
              <img
                className="w-20 h-full"
                src={cart.images[0]}
                alt=""
              />
              <div>
                <span className="line-clamp-2">{cart.name}</span>
                <span className="text-[#c49a6c] block">{cart.price} đ</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='flex justify-center mt-3'>
        <button onClick={() => navigate("/cart")} className='bg-amber-600 px-5 py-2 rounded-[15px] text-white font-medium cursor-pointer'>Xem giỏ hàng</button>
      </div>
    </div>
  )
}

export default DialogCart