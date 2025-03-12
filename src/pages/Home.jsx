import Banner from "../components/Banner"
import SliderCategory from "../components/SliderCategory"
import MainLayout from "../layout/mainLayout"
import ListProduct from "../components/ListProduct"
import Marquee from "react-fast-marquee"
import SaleProduct from "../components/SaleProduct"
import { useEffect, useState } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = targetDate - new Date();
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-4 justify-center items-center">
      {Object.entries(timeLeft).map(([label, value], index) => (
        <div key={index} className="bg-white flex flex-col justify-center items-center p-2 rounded-[5px]">
          <span >{value.toString().padStart(2, "0")}</span>
          <span className="text-[12px]">{label === "days" ? "Ngày" : label === "hours" ? "Giờ" : label === "minutes" ? "Phút" : "Giây"}</span>
        </div>
      ))}
    </div>
  );
};

const images = [
  "https://bizweb.dktcdn.net/100/426/888/themes/902732/assets/section_home_banner1.jpg?1728468327659",
  "https://bizweb.dktcdn.net/100/426/888/themes/902732/assets/section_home_banner2.jpg?1728468327659",
  "https://bizweb.dktcdn.net/100/426/888/themes/902732/assets/section_home_banner2.jpg?1728468327659"
]

const Home = () => {

  const targetDate = new Date();
  targetDate.setHours(targetDate.getHours() + 12);

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true
  };

  return (
    <MainLayout>
      <div className="relative mt-10 px-5">
          <Banner/>
          <SliderCategory/>
      </div>
      <div className="max-w-[1200px] mx-auto flex flex-col gap-10 px-5">
        <ListProduct title = {'Shop cho cún'}/>

          <div className="bg-red-400 p-5 rounded-[10px]">
            <div className="flex flex-col md:flex-row gap-3 md:gap-7 mb-5">
              <div className="flex justify-center items-center gap-3">
                <img className="h-4" src="https://file.hstatic.net/200000713019/file/flashsale-hot_6f59fac9870c4452bbed862ad7020f15.webp" alt="" />
                <h1 className="text-1xl text-white font-bold">CHỈ CÓ TẠI PETMALL ONLINE 8:30 - 20:59 MỖI NGÀY</h1>
              </div>
              <Marquee speed={50} gradient={false} className="text-[14px] text-white">
                <span className="mx-4">GIAO HÀNG NHANH TRONG 30 PHÚT TẠI HỒ CHÍ MINH</span>
                <span className="mx-4">SẢN PHẨM CHÍNH HÃNG GIÁ TỐT NHẤT THỊ TRƯỜNG</span>
              </Marquee>
              <CountdownTimer targetDate={targetDate} />
            </div>
            <SaleProduct/>
          </div>

        <ListProduct title={'Shop cho mèo'} style/>
      </div>
    </MainLayout>
  )
}

export default Home