import { useState } from "react";
import { IoMdCart } from "react-icons/io";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import DialogProduct from "./DialogProduct";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../stores/cartSlice";

function Product({ product }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div>
      <div className="flex flex-col gap-1 border-1 border-[#c49a6c] rounded-[5px] overflow-hidden">
        <div className="relative group hover:cursor-pointer">
          <Link to={`/product/${product._id}`}>
            <img
              className="hover:opacity-70 w-screen"
              src={product.images[0]}
              alt={product.name}
            />
          </Link>
          <div className="flex gap-3 absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100">
            <button
              onClick={() => setOpen(true)}
              className="bg-amber-50 p-2 rounded-[5px] group hover:bg-gray-400"
            >
              <MdOutlineRemoveRedEye className="hover:text-white" size={25} />
            </button>
            <button
              onClick={() => handleAddToCart(product)}
              className="bg-amber-50 p-2 rounded-[5px] group hover:bg-gray-400"
            >
              <IoMdCart className="hover:text-white" size={25} />
            </button>
          </div>
        </div>
        <div className='p-3 flex flex-col gap-1 justify-between h-full'>
          <Link to={"/product/2"} className="line-clamp-1 hover:text-[#c49a6c] hover:cursor-pointer">{product.name}</Link>
          <span className="text-1xl text-[#c49a6c] text-start">
            {product.price.toLocaleString('vi-VN') + '₫'}
          </span>
          <button className='bg-[#c49a6c] border-2 border-[#c49a6c] duration-200 transition-colors hover:bg-white hover:text-[#c49a6c] w-full py-2 rounded-[2px] font-medium text-white'>Mua ngay</button>
        </div>
      </div>

      <DialogProduct open={open} setOpen={setOpen} />
    </div>
  );
}

export default Product;
