/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { MdOutlineRemoveRedEye } from "react-icons/md"
import { GrSettingsOption } from "react-icons/gr"
import Product from "./Product"

function ListProduct({style, title}) {

  const collections = [
    {
      name: 'Thức ăn & pate',
      link: 'thuc-an-pate'
    },
    {
      name: 'Bát ăn',
      link: 'bat-an'
    },
    {
      name: 'Vòng cổ da dắt',
      link: 'vong-co-day-dat'
    },
    {
      name: 'Thuốc và dinh dưỡng',
      link: 'thuoc-va-dinh-duong'
    },
    {
      name: 'Sửa tắm & dụng cụ vệ sinh',
      link: 'sua-tam-dung-cu-ve-sinh'
    },
    {
      name: 'Xem tất cả',
      link1: 'shop-cho-cun',
      link2: 'shop-cho-meo'
    }
  ]
  
  return (
    <div className={`flex flex-col gap-4 ${style ? "md:flex-row-reverse" : "md:flex-row"}`}>
      <div className="hidden lg:w-1/3 lg:flex flex-col items-center border-2 gap-5 border-[#c49a6c]">
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
      <div className="w-full lg:w-2/3">
        <div>
          <div className="border-b-2 border-[#c49a6c] mb-5 md:0">
            <div className="bg-[#c49a6c] w-44 text-center p-1 skew-x-[-15deg] ml-1">
              <h2 className="text-2xl text-white">{title}</h2>
            </div>
          </div>
          <ul className="hidden md:flex gap-3 pb-5">
            {
              collections.map((collection, index) => (
                <li key={index}>
                  <Link 
                    to={
                    title === "Shop cho cún"
                      ? `/collections/${collection.link || collection.link1}`
                      : `/collections/${collection.link || collection.link2}`} 
                    className="hover:text-[#c49a6c]">{collection.name}
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
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