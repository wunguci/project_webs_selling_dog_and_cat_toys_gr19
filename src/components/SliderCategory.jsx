/* eslint-disable react/prop-types */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";


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
  },
  {
    image: "	https://file.hstatic.net/200000521195/collection/do_choi-01_6c51b9adb01840ee9c4667da96db1541.png",
    title: "Đồ chơi thú cưng",
    link: "do-choi-thu-cung"
  },
  {
    image: "	https://file.hstatic.net/200000521195/collection/quan_ao-01_ccb5384888f6479da97581d369f804d2.png",
    title: "Thời trang thú cưng",
    link: "thoi-trang-thu-cung"
  },
  {
    image: "https://file.hstatic.net/200000521195/collection/cat_food-01_b8365c67529245b3bb3b5dcf7f8e3af3.png",
    title: "Thức ăn cho mèo",
    link: "thuc-dan-cho-meo"
  },
  {
    image: "https://file.hstatic.net/200000521195/collection/vong_co_day_dan-01_3218c94db3b14ef29f692b9d92b9c851.png",
    title: "Vòng cổ dây dắt",
    link: "vong-co-day-dat"
  }
];

function SliderCategory() {

  const navigate = useNavigate();

  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
      <MdOutlineArrowBackIos className="absolute top-1/2 left-0 -translate-y-1/2 z-10 hover:cursor-pointer" size={30} onClick={onClick}/>
    );
  };

  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
      <MdOutlineArrowForwardIos className="absolute top-1/2 right-0 -translate-y-1/2 hover:cursor-pointer" size={30} onClick={onClick}/>
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
    prevArrow: <CustomPrevArrow />
  };

  return (
    <div className="relative bottom-20 z-20 max-w-[1350px] mx-auto bg-amber-50">
      <Slider {...settings}>
      {
        categories.map((item, index) => (
          <div key={index}>
            <div onClick={()=>navigate(`/${item.link}`)} className="h-40 flex flex-col justify-center items-center shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)] group hover:cursor-pointer">
              <img src={item.image} alt="" className="size-20 transition-transform duration-500 group-hover:rotate-y-[360deg]"/>
              <span className="group-hover:text-amber-700">{item.title}</span>
            </div>
          </div>
        ))
      }
      </Slider>
    </div>
  )
}

export default SliderCategory;