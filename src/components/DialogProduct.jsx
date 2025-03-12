import { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { Link } from "react-router-dom";

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

function DialogProduct({ open, setOpen }) {
  if (!open) return null;

  const [selectedImage, setSelectedImage] = useState(categories[0].image);
  const handleImageClick = (image) => {
    setSelectedImage(image.image);
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
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={() => setOpen(false)}></div>

      <div className="bg-amber-50 p-6 rounded-lg shadow-lg w-[900px] relative z-10">
        <IoIosCloseCircle className="size-6 absolute -top-3 -right-3 text-amber-50" onClick={()=>setOpen(false)}/>

        <div className="flex gap-5">
          <div className="w-1/2 flex flex-col justify-center items-center">
            <img src={selectedImage} alt="" className="hover:scale-110 transition-transform duration-300 shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]"/>
            <div className="flex justify-center gap-3">
              {
                categories.map((image, index) => (
                  <img key={index} className={`size-25 ${selectedImage===image.image?"border-2":""}`} src={image.image} alt="" onClick={()=>handleImageClick(image)} />
                ))
              }
            </div>
          </div>
          <div className="w-1/2 flex flex-col gap-7">
            <Link className="font-bold text-2xl text-[#333] hover:text-[#c49a6c] transition-colors duration-150">Sữa tắm JOYCE & DOLLS hương trà xanh cho chó mèo</Link>
            <span>Thương hiệu: Khác | Tình trạng: Còn hàng</span>
            <div className="bg-[#c49a6c] w-44 text-center p-1 skew-x-[-15deg] ml-1">
              <h2 className="text-2xl text-white font-bold">35,000Đ</h2>
            </div>
            <div className="flex items-center gap-5">
              <span className="text-gray-700">Số lượng: </span>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors duration-200"
                  onClick={handleDecrease}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-5 border-x-2 border-gray-300">{quantity}</span>
                <button
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors duration-200"
                  onClick={handleIncrease}
                >
                  +
                </button>
              </div>
            </div>
            <button className="w-60 border-2 text-white border-[#c49a6c] bg-[#c49a6c] hover:bg-transparent rounded-[5px] hover:border-[#c49a6c] hover:text-[#c49a6c] py-2 transition-colors duration-200">Thêm vào giỏ hàng</button>
            <button className="w-60 border-2 text-white border-[#c49a6c] bg-[#c49a6c] hover:bg-transparent rounded-[5px] hover:border-[#c49a6c] hover:text-[#c49a6c] py-2 transition-colors duration-200">Mua ngay</button>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default DialogProduct;
