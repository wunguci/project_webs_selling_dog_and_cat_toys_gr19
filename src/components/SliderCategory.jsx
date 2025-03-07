import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";


const categories = [
  {
    image: "https://file.hstatic.net/200000521195/collection/thuoc___dinh_duong-01_b86104361469466a84bd4a47032f8b97.png",
    title: "Thuốc và dinh dưỡng"
  },
  {
    image: "https://file.hstatic.net/200000521195/collection/thuoc___dinh_duong-01_b86104361469466a84bd4a47032f8b97.png",
    title: "Sữa tắm & dụng cụ vệ sinh"
  },
  {
    image: "https://file.hstatic.net/200000521195/collection/thuoc___dinh_duong-01_b86104361469466a84bd4a47032f8b97.png",
    title: "Chuồng, nệm & túi"
  },
  {
    image: "https://file.hstatic.net/200000521195/collection/thuoc___dinh_duong-01_b86104361469466a84bd4a47032f8b97.png",
    title: "Chậu & cát vệ sinh"
  },
  {
    image: "https://file.hstatic.net/200000521195/collection/thuoc___dinh_duong-01_b86104361469466a84bd4a47032f8b97.png",
    title: "Đồ chơi thú cưng"
  },
  {
    image: "https://file.hstatic.net/200000521195/collection/thuoc___dinh_duong-01_b86104361469466a84bd4a47032f8b97.png",
    title: "Thời trang thú cưng"
  }
];

function SliderCategory() {

  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
      <MdOutlineArrowForwardIos className="absolute top-1/2 right-0 -translate-y-1/2" size={30} onClick={onClick}/>
    );
  };

  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
      <MdOutlineArrowBackIos className="absolute top-1/2 left-0 -translate-y-1/2" size={30} onClick={onClick}/>
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
    <div className="relative bg-amber-300">
      <Slider {...settings}>
      {
        categories.map((item, index) => (
          <div key={index}>
            <div className="h-40 flex flex-col justify-center items-center">
              <img src={item.image} alt="" className="size-20" />
              <span>{item.title}</span>
            </div>
          </div>
        ))
      }
      </Slider>
    </div>
  )
}

export default SliderCategory;