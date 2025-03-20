import { useState } from 'react'
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos, MdOutlineRemoveRedEye } from 'react-icons/md';
import Slider from 'react-slick'
import { IoMdCart } from 'react-icons/io';
import DialogProduct from './DialogProduct';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../stores/cartSlice';


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

function SaleProduct({productSale}) {

  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
      <MdOutlineArrowBackIos className="absolute top-1/2 -left-5 -translate-y-1/2 z-10 hover:cursor-pointer" size={30} onClick={onClick} />
    );
  };

  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
      <MdOutlineArrowForwardIos className="absolute top-1/2 -right-5 -translate-y-1/2 hover:cursor-pointer" size={30} onClick={onClick} />
    );
  };

  var settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
  }

  const handleViewProduct = (product) => {
    setSelectedProduct(product)
    setOpen(true)
  }

  return (
    <div>
      <Slider {...settings}>
        {
          productSale?.map((product, index) => (
            <div key={index} className="px-3">
              <div>
                <div className="flex flex-col gap-1 border-1 border-[#c49a6c] rounded-[5px] overflow-hidden bg-white">
                  <div className="relative group hover:cursor-pointer">
                    <Link to={`/product/${product.slug}`}>
                      <img className={`hover:opacity-70 w-screen`} src={product.images[0]} alt="" />
                    </Link>
                    <div className="flex gap-3 absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100">
                      <button onClick={() => handleViewProduct(product)}  className="bg-amber-50 p-2 rounded-[5px] group hover:bg-gray-400">
                        <MdOutlineRemoveRedEye className="hover:text-white" size={25}/>
                      </button>
                      <button onClick={()=> handleAddToCart(product)} className="bg-amber-50 p-2 rounded-[5px] group hover:bg-gray-400">
                        <IoMdCart className="hover:text-white" size={25}/>
                      </button>
                    </div>
                  </div>
                  <div className='p-3 flex flex-col gap-1'>
                    <Link to={"/product/2"} className="line-clamp-1 hover:text-[#c49a6c] hover:cursor-pointer">{product.name}</Link>
                    <span className="text-1xl text-[#c49a6c] text-start">
                      {product.price.toLocaleString('vi-VN') + '₫'}
                    </span>
                    <button className='bg-[#c49a6c] border-2 border-[#c49a6c] duration-200 transition-colors hover:bg-white hover:text-[#c49a6c] w-full py-2 rounded-[2px] font-medium text-white'>Mua ngay</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </Slider>
      <DialogProduct open={open} product={selectedProduct} setOpen={setOpen}/>
    </div>
  )
}

export default SaleProduct;
