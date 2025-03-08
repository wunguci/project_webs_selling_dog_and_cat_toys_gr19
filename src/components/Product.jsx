import { useState } from 'react';
import { IoMdCart } from 'react-icons/io'
import { MdOutlineRemoveRedEye } from 'react-icons/md'

function Product() {

  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <div className="relative group hover:cursor-pointer">
          <img className="hover:opacity-70" src="https://product.hstatic.net/200000521195/product/cc7ab594-27c0-41b4-b35f-dac71034e395_84ce728c1e344bd785ca78e2f686e237_large.jpeg" alt="" />
          <div className="flex gap-3 absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100">
            <div className="bg-amber-50 p-2 rounded-[5px] group hover:bg-gray-400">
              <MdOutlineRemoveRedEye onClick={() => setOpen(true)} className="hover:text-white" size={25}/>
            </div>
            <div className="bg-amber-50 p-2 rounded-[5px] group hover:bg-gray-400">
              <IoMdCart className="hover:text-white" size={25}/>
            </div>
          </div>
        </div>
        <h5 className="line-clamp-1 hover:text-[#c49a6c] hover:cursor-pointer">Bát ăn nghiêng chống gù cho chó mèo</h5>
        <span className="text-1xl text-[#c49a6c]">45,000Đ</span>
      </div>

      {/* <DialogProduct open={open} setOpen={setOpen} /> */}
    </div>
  )
}

export default Product