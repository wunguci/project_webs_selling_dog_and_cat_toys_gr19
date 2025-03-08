/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { MdOutlineRemoveRedEye } from "react-icons/md"
import { GrSettingsOption } from "react-icons/gr"
import Product from "./Product"

function ListProduct({style}) {
  
  return (
    <div className={`flex gap-4 ${style ? "flex-row-reverse" : "flex-row"}`}>
      <div className="w-1/3 flex flex-col items-center border-2 gap-5 border-[#c49a6c]">
        <div className="relative group hover:cursor-pointer">
          <img className="p-10 pb-0 hover:opacity-70" src="https://product.hstatic.net/200000521195/product/cc7ab594-27c0-41b4-b35f-dac71034e395_84ce728c1e344bd785ca78e2f686e237_large.jpeg" alt="" />
          <div className="flex gap-3 absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100">
            <div className="bg-amber-50 p-2 rounded-[5px] group hover:bg-gray-400">
              <MdOutlineRemoveRedEye className="hover:text-white" size={25}/>
            </div>
            <div className="bg-amber-50 p-2 rounded-[5px] group hover:bg-gray-400">
              <GrSettingsOption className="hover:text-white" size={25}/>
            </div>
          </div>
        </div>
        <h5 className="hover:text-[#c49a6c] hover:cursor-pointer">Bát ăn nghiêng chống gù cho chó mèo</h5>
        <span className="text-2xl text-[#c49a6c] font-bold">45,000Đ</span>
      </div>
      <div className="w-2/3">
        <div>
          <div className="border-b-2 border-[#c49a6c]">
            <div className="bg-[#c49a6c] w-44 text-center p-1 skew-x-[-15deg] ml-1">
              <h2 className="text-2xl text-white">Shop cho cún</h2>
            </div>
          </div>
          <ul className="flex gap-5 py-5">
            <li>
              <Link className="hover:text-[#c49a6c]">Thức ăn & pate</Link>
            </li>
            <li>
              <Link className="hover:text-[#c49a6c]">Thức ăn & pate</Link>
            </li>
            <li>
              <Link className="hover:text-[#c49a6c]">Thức ăn & pate</Link>
            </li>
            <li>
              <Link className="hover:text-[#c49a6c]">Thức ăn & pate</Link>
            </li>
            <li>
              <Link className="hover:text-[#c49a6c]">Thức ăn & pate</Link>
            </li>
            <li>
              <Link className="hover:text-[#c49a6c]">Thức ăn & pate</Link>
            </li>
          </ul>
        </div>
        <div className="grid grid-cols-4 gap-10">
          {
            [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
              <Product key={index}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default ListProduct