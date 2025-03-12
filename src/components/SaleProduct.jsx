import { useState } from 'react'
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos, MdOutlineRemoveRedEye } from 'react-icons/md';
import Slider from 'react-slick'
import { IoMdCart } from 'react-icons/io';
import DialogProduct from './DialogProduct';

function SaleProduct() {

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
    slidesToShow: 5,
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

  return (
    <div>
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
      <DialogProduct open={open} setOpen={setOpen}/>
    </div>
  )
}

export default SaleProduct;
