import { Link } from "react-router-dom"
import MainLayout from "../layout/mainLayout"
import { TiTick } from "react-icons/ti"
import { FaShippingFast } from "react-icons/fa"
import { RiRefund2Line } from "react-icons/ri"
import { MdAssignmentReturn, MdOutlineArrowBackIos, MdOutlineArrowForwardIos, MdOutlineRemoveRedEye, MdOutlineStar } from "react-icons/md"
import image1 from '../assets/images/image1.jpg'
import Slider from "react-slick"
import { useState } from "react"
import { IoIosArrowForward, IoMdCart } from "react-icons/io"
import pet from '../assets/images/pet.png'


const categories = [
  {
    image: "https://file.hstatic.net/200000521195/collection/thuoc___dinh_duong-01_b86104361469466a84bd4a47032f8b97.png",
    title: "Thuốc và dinh dưỡng",
    link: "thuoc-va-dinh-duong"
  },
  {
    image: "https://file.hstatic.net/200000521195/collection/sua_tam-01_2e492eb398844bf49c676a64678c0cdc.png",
    title: "Sữa tắm & dụng cụ vệ sinh",
    link: "sua-tam-va-dung-cu-ve-sinh"
  },
  {
    image: "https://file.hstatic.net/200000521195/collection/chuong_nem_tui_van_chuyen-01_8c478a611c05450283dda864d916af07.png",
    title: "Chuồng, nệm & túi",
    link: "chuong-nem-tui"
  },
  {
    image: "https://file.hstatic.net/200000521195/collection/chau_cat-01_094e50e82c09499498134d589f23df53.png",
    title: "Chậu & cát vệ sinh",
    link: "chau-cat-ve-sinh"
  }
];

const ProductDetail = () => {

  const services = [
    {
      icon: <TiTick />,
      title: "100% hàng thật"
    },
    {
      icon: <FaShippingFast />,
      title: "Freeship mọi nơi"
    },
    {
      icon: <RiRefund2Line />,
      title: 'Hoàn 200% nếu hàng giả'
    },
    {
      icon: <MdAssignmentReturn />,
      title: "30 ngày đổi trả"
    }
  ]

  const [image, setImage] = useState(categories[0].image);

  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
      <MdOutlineArrowBackIos className="absolute top-1/2 -left-2 bg-amber-50 rounded-full p-2 -translate-y-1/2 z-10 hover:cursor-pointer" size={30} onClick={onClick} />
    );
  };
  
  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
      <MdOutlineArrowForwardIos className="absolute top-1/2 -right-2 bg-amber-50 rounded-full p-2 -translate-y-1/2 hover:cursor-pointer" size={30} onClick={onClick} />
    );
  };

  var settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    rows: 2,
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

  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    }
  };

  return (
    
    <MainLayout>
      <ul className="flex gap-10 border-b-[1px] justify-center border-[#c49a6c] items-center">
        <Link className="font-bold text-blue-900">Cam kết</Link>
        {
          services.map((service, index)=>(
            <li key={index} className="py-3">
              <Link className="flex gap-2 justify-center items-center">
                <span className="text-blue-600">{service.icon}</span>
                <span className="text-black text-[15px]">{service.title}</span>
              </Link>
            </li>
          ))
        }
      </ul>
      <div className="relative">
        <img src={image1} alt="" />
        <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2  text-[20px] text-white font-bold text-center">
          <h1 className="mb-4 text-2xl">Bát ăn nghiêng chống gù cho chó mèo</h1>
          <div>
            <Link to="/" className="hover:text-[#c49a6c]">Trang chủ</Link> 
            <span> &gt; </span>
            <Link to="/shop-meo" className="hover:text-[#c49a6c]">Shop cho mèo</Link>
            <span> &gt; </span>
            <span className="text-[#C49A6C] font-semibold">Bát ăn nghiêng chống gù cho chó mèo</span>
          </div>
        </div>
      </div>
      <div className="max-w-[1350px] mx-auto">
        <div className="flex gap-5 mt-10">
          <div className="w-2/7 sticky bg-amber-100 shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] rounded-[5px]">
            <div className="m-3 flex gap-3 flex-col">
              <div className="border-2 border-amber-200 text-center rounded-[5px]">
                <img src={image} alt="" />
              </div>
              <div>
                <ul className="flex gap-2">
                  {
                    categories.map((item, index)=>(
                      <li key={index} onClick={()=>setImage(item.image)} className={`${image===item.image?'border-2':""} border-blue-600 rounded-[3px]`}>
                        <img src={item.image} alt="" />
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </div>
          <div className="w-3/7 overflow-y-auto bg-amber-50 flex flex-col gap-2">
            <div className="p-3 flex flex-col gap-3 bg-amber-300 rounded-[5px]">
              <h1 className="text-[22px] font-semibold">Bát ăn nghiêng chống gù cho chó mèo</h1>
              <span className="opacity-50">Đã bán: 10</span>
              <div className="flex items-center gap-5">
                <h5 className="font-bold text-[25px] text-red-600">100.000đ</h5>
                <span>-10%</span>
                <span className="line-through opacity-50">90.000đ</span>
              </div>
            </div>
            <div className="p-3 bg-amber-300 rounded-[5px]">
              <div className="flex gap-3 flex-col">
                <h5 className="font-medium text-[18px]">Thông tin vận chuyển</h5>
                <div className="flex justify-between">
                  <span>Giao đến: 12 Nguyễn Văn Bảo, P.1, Q.Gò Vấp, TPHCM</span>
                  <span className="text-blue-700 cursor-pointer">Đổi</span>
                </div>
                <hr />
                <div className="flex flex-col gap-1">
                  <div className="flex gap-2 items-center">
                    <FaShippingFast size={20} className="opacity-60"/>
                    <span className="font-medium">Thời gian giao hàng</span>
                  </div>
                  <span>
                    Trước 19h, {new Date(new Date().setDate(new Date().getDate() + 3)).toLocaleDateString("vi-VN")}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-3 bg-amber-300 rounded-[5px] flex flex-col gap-2">
              <h3 className="font-medium">Ưu đãi khác</h3>
              <div className="flex justify-between items-center">
                <span>4 Mã Giảm Giá</span>
                <IoIosArrowForward className="cursor-pointer"/>
              </div>
            </div>
            <div className="p-3 bg-amber-300 rounded-[5px] flex flex-col gap-2">
              <h3 className="font-medium">Sản phẩm tương tự</h3>
              <Slider {...settings}>
                {
                  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
                    <div key={index} className="px-3">
                      <div className='bg-amber-50 p-3 rounded-[10px] overflow-hidden'>
                        <div>
                          <div className="flex flex-col gap-2 justify-center items-center">
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
                        </div>
                      </div>
                    </div>
                  ))
                }
              </Slider>
            </div>
            <div className="p-3 bg-amber-300 rounded-[5px] flex flex-col gap-2">
              <h3 className="font-medium">Mô tả sản phẩm</h3>
              <span>- Tên sản phẩm: Bát ăn có đế nghiêng chống gù cho chó mèo.</span>
              <p>
                Đối với các bé trưởng thành, bát thức ăn bệt gây tác hại mỏi xương cổ, ảnh hương xương sống. 
                Quá trình nhai nuốt cũng không hiệu quả do phải cúi thấp. Bát thức ăn nâng cao và điều chỉnh được 
                độ nghiêng 15 độ là giải pháp an toàn cho vật nuôi. Tư thế thoải mái, dễ chịu khi nhai nuốt sẽ làm 
                vật nuôi dễ dàng hấp thụ thức ăn. Tránh tác động xấu về lâu dài lên hệ cơ xương và tiêu hóa.
              </p>
              <span>- Chất liệu: Nhựa PP an toàn cho sức khỏe và thân thiện với môi trường. Chịu nhiệt tốt. Dễ dàng lau chùi.</span>
              <span>- Kích thước: dài, rộng 13 cm, cao 14.5 cm.</span>
            </div>
          </div>
          <div className="w-2/7 sticky bg-amber-50 rounded-[5px]">
            <div className="p-3 flex flex-col gap-3">
              <div className="flex gap-5 items-center">
                <div className="rounded-full bg-amber-800">
                  <img src={pet} alt="" className="size-15 p-1" />
                </div>
                <div className="flex flex-col">
                  <h1 className="font-medium">Pet shope</h1>
                  <div className="flex items-center gap-2">
                    <span>4.8</span>
                    <MdOutlineStar className="text-yellow-300"/>
                    <span>(100+ đánh giá)</span>
                  </div>
                </div>
              </div>
              <hr />
              <div className="flex flex-col gap-4">
                <h1 className="font-semibold text-lg text-gray-800">Số lượng</h1>
                <div className="flex items-center w-fit bg-white border border-gray-300 rounded-full shadow-sm">
                  <button
                    className="size-10 text-lg font-bold bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleDecrease}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-6 text-lg font-medium">{quantity}</span>
                  <button
                    className="size-10 text-lg font-bold bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition rounded-full"
                    onClick={handleIncrease}
                  >
                    +
                  </button>
                </div>
                <h1 className="font-semibold text-lg text-gray-800">Tổng tiền</h1>
                <span className="font-semibold text-3xl text-gray-800">91.800đ</span>

                <button className="bg-amber-600 text-white w-full py-2 text-[20px] rounded-[10px]">Mua ngay</button>
                <button className="border-2 border-amber-600 w-full py-2 text-[20px] rounded-[10px]">Thêm vào giỏ hàng</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default ProductDetail