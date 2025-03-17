/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { MdOutlineRemoveRedEye } from "react-icons/md"
import { GrSettingsOption } from "react-icons/gr"
import Product from "./Product"


const products =  [
    {
    "_id": 1,
    "name": "Bát ăn nghiêng chống gù cho chó mèo",
    "description": "Đối với các bé trưởng thành, bát thức ăn bệt gây tác hại mỏi xương cổ, ảnh hương xương sống. Quá trình nhai nuốt cũng không hiệu quả do phải cúi thấp. Bát thức ăn nâng cao và điều chỉnh được độ nghiêng 15 độ là giải pháp an toàn cho vật nuôi. Tư thế thoải mái, dễ chịu khi nhai nuốt sẽ làm vật nuôi dễ dàng hấp thụ thức ăn. Tránh tác động xấu về lâu dài lên hệ cơ xương và tiêu hóa",
    "price": 45000,
    "category": {
      "name": "Shop cho chó",
      "description": "Bát ăn"
    },
    "stock": 20,
    "sold": 10,
    "images": [
      "https://product.hstatic.net/200000521195/product/cc7ab594-27c0-41b4-b35f-dac71034e395_84ce728c1e344bd785ca78e2f686e237_small.jpeg",
      "https://product.hstatic.net/200000521195/product/d06520e7-5981-4317-bf4d-8083ba5680b9_6f3d0e13c40e4f3393001bb2d20c997e_small.jpeg",
      "https://product.hstatic.net/200000521195/product/cc3a9b0c-02fb-4d77-9d94-38043e3cf497_8bb7b957c5be4b38bf9c26de21eae461_small.jpeg",
      "https://product.hstatic.net/200000521195/product/ef0ba1ee-5367-4413-9254-9d4fb013e4ef_6bb710948d0144488e9a245d5f19209d_small.jpeg"
    ],
    "__v": 0
  },
  {
    "_id": 2,
    "name": "Bát ăn nghiêng chống gù cho chó mèo",
    "description": "Đối với các bé trưởng thành, bát thức ăn bệt gây tác hại mỏi xương cổ, ảnh hương xương sống. Quá trình nhai nuốt cũng không hiệu quả do phải cúi thấp. Bát thức ăn nâng cao và điều chỉnh được độ nghiêng 15 độ là giải pháp an toàn cho vật nuôi. Tư thế thoải mái, dễ chịu khi nhai nuốt sẽ làm vật nuôi dễ dàng hấp thụ thức ăn. Tránh tác động xấu về lâu dài lên hệ cơ xương và tiêu hóa",
    "price": 45000,
    "category": {
      "name": "Shop cho chó",
      "description": "Bát ăn"
    },
    "stock": 20,
    "sold": 10,
    "images": [
      "https://product.hstatic.net/200000521195/product/cc7ab594-27c0-41b4-b35f-dac71034e395_84ce728c1e344bd785ca78e2f686e237_small.jpeg",
      "https://product.hstatic.net/200000521195/product/d06520e7-5981-4317-bf4d-8083ba5680b9_6f3d0e13c40e4f3393001bb2d20c997e_small.jpeg",
      "https://product.hstatic.net/200000521195/product/c…cf497_8bb7b957c5be4b38bf9c26de21eae461_small.jpeg",
      "https://product.hstatic.net/200000521195/product/e…3e4ef_6bb710948d0144488e9a245d5f19209d_small.jpeg"
    ],
    "__v": 0
  },
  {
    "_id": 3,
    "name": "Bát ăn nghiêng chống gù cho chó mèo",
    "description": "Đối với các bé trưởng thành, bát thức ăn bệt gây tác hại mỏi xương cổ, ảnh hương xương sống. Quá trình nhai nuốt cũng không hiệu quả do phải cúi thấp. Bát thức ăn nâng cao và điều chỉnh được độ nghiêng 15 độ là giải pháp an toàn cho vật nuôi. Tư thế thoải mái, dễ chịu khi nhai nuốt sẽ làm vật nuôi dễ dàng hấp thụ thức ăn. Tránh tác động xấu về lâu dài lên hệ cơ xương và tiêu hóa",
    "price": 45000,
    "category": {
      "name": "Shop cho chó",
      "description": "Bát ăn"
    },
    "stock": 20,
    "sold": 10,
    "images": [
      "https://product.hstatic.net/200000521195/product/cc7ab594-27c0-41b4-b35f-dac71034e395_84ce728c1e344bd785ca78e2f686e237_small.jpeg",
      "https://product.hstatic.net/200000521195/product/d06520e7-5981-4317-bf4d-8083ba5680b9_6f3d0e13c40e4f3393001bb2d20c997e_small.jpeg",
      "https://product.hstatic.net/200000521195/product/c…cf497_8bb7b957c5be4b38bf9c26de21eae461_small.jpeg",
      "https://product.hstatic.net/200000521195/product/e…3e4ef_6bb710948d0144488e9a245d5f19209d_small.jpeg"
    ],
    "__v": 0
  },
  {
    "_id": 4,
    "name": "Bát ăn nghiêng chống gù cho chó mèo",
    "description": "Đối với các bé trưởng thành, bát thức ăn bệt gây tác hại mỏi xương cổ, ảnh hương xương sống. Quá trình nhai nuốt cũng không hiệu quả do phải cúi thấp. Bát thức ăn nâng cao và điều chỉnh được độ nghiêng 15 độ là giải pháp an toàn cho vật nuôi. Tư thế thoải mái, dễ chịu khi nhai nuốt sẽ làm vật nuôi dễ dàng hấp thụ thức ăn. Tránh tác động xấu về lâu dài lên hệ cơ xương và tiêu hóa",
    "price": 45000,
    "category": {
      "name": "Shop cho chó",
      "description": "Bát ăn"
    },
    "stock": 20,
    "sold": 10,
    "images": [
      "https://product.hstatic.net/200000521195/product/cc7ab594-27c0-41b4-b35f-dac71034e395_84ce728c1e344bd785ca78e2f686e237_small.jpeg",
      "https://product.hstatic.net/200000521195/product/d06520e7-5981-4317-bf4d-8083ba5680b9_6f3d0e13c40e4f3393001bb2d20c997e_small.jpeg",
      "https://product.hstatic.net/200000521195/product/c…cf497_8bb7b957c5be4b38bf9c26de21eae461_small.jpeg",
      "https://product.hstatic.net/200000521195/product/e…3e4ef_6bb710948d0144488e9a245d5f19209d_small.jpeg"
    ],
    "__v": 0
  },
  {
    "_id": 5,
    "name": "Bát ăn nghiêng chống gù cho chó mèo",
    "description": "Đối với các bé trưởng thành, bát thức ăn bệt gây tác hại mỏi xương cổ, ảnh hương xương sống. Quá trình nhai nuốt cũng không hiệu quả do phải cúi thấp. Bát thức ăn nâng cao và điều chỉnh được độ nghiêng 15 độ là giải pháp an toàn cho vật nuôi. Tư thế thoải mái, dễ chịu khi nhai nuốt sẽ làm vật nuôi dễ dàng hấp thụ thức ăn. Tránh tác động xấu về lâu dài lên hệ cơ xương và tiêu hóa",
    "price": 45000,
    "category": {
      "name": "Shop cho chó",
      "description": "Bát ăn"
    },
    "stock": 20,
    "sold": 10,
    "images": [
      "https://product.hstatic.net/200000521195/product/cc7ab594-27c0-41b4-b35f-dac71034e395_84ce728c1e344bd785ca78e2f686e237_small.jpeg",
      "https://product.hstatic.net/200000521195/product/d06520e7-5981-4317-bf4d-8083ba5680b9_6f3d0e13c40e4f3393001bb2d20c997e_small.jpeg",
      "https://product.hstatic.net/200000521195/product/c…cf497_8bb7b957c5be4b38bf9c26de21eae461_small.jpeg",
      "https://product.hstatic.net/200000521195/product/e…3e4ef_6bb710948d0144488e9a245d5f19209d_small.jpeg"
    ],
    "__v": 0
  },
  {
    "_id": 6,
    "name": "Bát ăn nghiêng chống gù cho chó mèo",
    "description": "Đối với các bé trưởng thành, bát thức ăn bệt gây tác hại mỏi xương cổ, ảnh hương xương sống. Quá trình nhai nuốt cũng không hiệu quả do phải cúi thấp. Bát thức ăn nâng cao và điều chỉnh được độ nghiêng 15 độ là giải pháp an toàn cho vật nuôi. Tư thế thoải mái, dễ chịu khi nhai nuốt sẽ làm vật nuôi dễ dàng hấp thụ thức ăn. Tránh tác động xấu về lâu dài lên hệ cơ xương và tiêu hóa",
    "price": 45000,
    "category": {
      "name": "Shop cho chó",
      "description": "Bát ăn"
    },
    "stock": 20,
    "sold": 10,
    "images": [
      "https://product.hstatic.net/200000521195/product/cc7ab594-27c0-41b4-b35f-dac71034e395_84ce728c1e344bd785ca78e2f686e237_small.jpeg",
      "https://product.hstatic.net/200000521195/product/d06520e7-5981-4317-bf4d-8083ba5680b9_6f3d0e13c40e4f3393001bb2d20c997e_small.jpeg",
      "https://product.hstatic.net/200000521195/product/c…cf497_8bb7b957c5be4b38bf9c26de21eae461_small.jpeg",
      "https://product.hstatic.net/200000521195/product/e…3e4ef_6bb710948d0144488e9a245d5f19209d_small.jpeg"
    ],
    "__v": 0
  },
  {
    "_id": 7,
    "name": "Bát ăn nghiêng chống gù cho chó mèo",
    "description": "Đối với các bé trưởng thành, bát thức ăn bệt gây tác hại mỏi xương cổ, ảnh hương xương sống. Quá trình nhai nuốt cũng không hiệu quả do phải cúi thấp. Bát thức ăn nâng cao và điều chỉnh được độ nghiêng 15 độ là giải pháp an toàn cho vật nuôi. Tư thế thoải mái, dễ chịu khi nhai nuốt sẽ làm vật nuôi dễ dàng hấp thụ thức ăn. Tránh tác động xấu về lâu dài lên hệ cơ xương và tiêu hóa",
    "price": 45000,
    "category": {
      "name": "Shop cho chó",
      "description": "Bát ăn"
    },
    "stock": 20,
    "sold": 10,
    "images": [
      "https://product.hstatic.net/200000521195/product/cc7ab594-27c0-41b4-b35f-dac71034e395_84ce728c1e344bd785ca78e2f686e237_small.jpeg",
      "https://product.hstatic.net/200000521195/product/d06520e7-5981-4317-bf4d-8083ba5680b9_6f3d0e13c40e4f3393001bb2d20c997e_small.jpeg",
      "https://product.hstatic.net/200000521195/product/c…cf497_8bb7b957c5be4b38bf9c26de21eae461_small.jpeg",
      "https://product.hstatic.net/200000521195/product/e…3e4ef_6bb710948d0144488e9a245d5f19209d_small.jpeg"
    ],
    "__v": 0
  }
]

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
    // <div className={`flex flex-col gap-4 ${style ? "md:flex-row-reverse" : "md:flex-row"}`}>
    //   <div className="hidden lg:w-1/3 lg:flex flex-col items-center border-2 gap-5 border-[#c49a6c]">
    //     <Product product={products[0]} primary/>
    //   </div>
    //   <div className="w-full lg:w-2/3">
    //     <div>
    //       <div className="border-b-2 border-[#c49a6c] mb-5 md:0">
    //         <div className="bg-[#c49a6c] w-44 text-center p-1 skew-x-[-15deg] ml-1">
    //           <h2 className="text-2xl text-white">{title}</h2>
    //         </div>
    //       </div>
    //       <ul className="hidden md:flex gap-3 pb-5">
    //         {
    //           collections.map((collection, index) => (
    //             <li key={index}>
    //               <Link 
    //                 to={
    //                 title === "Shop cho cún"
    //                   ? `/collections/${collection.link || collection.link1}`
    //                   : `/collections/${collection.link || collection.link2}`} 
    //                 className="hover:text-[#c49a6c]">{collection.name}
    //               </Link>
    //             </li>
    //           ))
    //         }
    //       </ul>
    //     </div>
    //     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    //       {
    //         products.map((product, index) => (
    //           <Product key={index} product={product}/>
    //         ))
    //       }
    //     </div>
    //   </div>
    // </div>
    <div className="border-1 border-gray-400 p-5">
      <div className="flex flex-row justify-between border-b-2 border-[#c49a6c]">
        <div>
          <div className="bg-[#c49a6c] w-44 text-center p-1 skew-x-[-15deg] ml-1">
            <h2 className="text-2xl text-white">{title}</h2>
          </div>
        </div>
        <ul className="hidden md:flex gap-5 pb-5">
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-5">
        {
          products.map((product, index) => (
            <Product key={index} product={product}/>
          ))
        }
      </div>
    </div>
  )
}

export default ListProduct