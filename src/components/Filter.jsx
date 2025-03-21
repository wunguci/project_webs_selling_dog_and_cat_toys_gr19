import { useState } from "react";
import { FaSortDown, FaSortUp } from "react-icons/fa6";

const categories = [
  { name: "SHOP CHO CÚN", subCategories: [] },
  { name: "SHOP CHO MÈO", subCategories: [] },
  { name: "KHUYẾN MÃI", subCategories: [] },
  { name: "TIN TỨC", subCategories: [] },
];

const brands = ["ROYAL CANIN", "Khác"];
const priceRanges = [
  "Giá dưới 100.000đ",
  "100.000đ - 200.000đ",
  "200.000đ - 300.000đ",
  "300.000đ - 500.000đ",
  "500.000đ - 1.000.000đ",
  "Giá trên 1.000.000đ",
];

const Filter = () => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);

  // Xử lý checkbox khoảng giá
  const handlePriceChange = (price) => {
    setSelectedPrices((prev) =>
      prev.includes(price)
        ? prev.filter((p) => p !== price) // Bỏ chọn nếu đã chọn trước đó
        : [...prev, price] // Thêm vào danh sách nếu chưa chọn
    );
  };

  return (
    <div className="w-64 bg-white shadow-md p-4">
      {/* Danh mục */}
      <div className="mb-4">
        <h2 className="bg-[#C49A6C] text-white px-3 py-2 font-semibold">DANH MỤC</h2>
        <div className="bg-white border rounded p-2">
          {categories.map((cat, index) => (
            <div key={index} className="flex justify-between items-center py-2">
              <span>{cat.name}</span>
              {cat.subCategories.length > 0 && (
                <button onClick={() => setOpenCategory(openCategory === index ? null : index)}>
                  {openCategory === index ? <FaSortUp size={16} /> : <FaSortDown size={16} />}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Thương hiệu */}
      <div className="mb-4">
        <h2 className="bg-[#C49A6C] text-white px-3 py-2 font-semibold">THƯƠNG HIỆU</h2>
        <div className="bg-white border rounded p-2">
          {brands.map((brand, index) => (
            <label key={index} className="flex items-center space-x-2 py-1">
              <input
                type="radio"
                name="brand"
                value={brand}
                checked={selectedBrand === brand}
                onChange={() => setSelectedBrand(brand)}
                className="accent-[#C49A6C]"
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Khoảng giá (Checkbox) */}
      <div>
        <h2 className="bg-[#C49A6C] text-white px-3 py-2 font-semibold">KHOẢNG GIÁ</h2>
        <div className="bg-white border rounded p-2">
          {priceRanges.map((price, index) => (
            <label key={index} className="flex items-center space-x-2 py-1">
              <input
                type="checkbox"
                value={price}
                checked={selectedPrices.includes(price)}
                onChange={() => handlePriceChange(price)}
                className="accent-[#C49A6C]"
              />
              <span>{price}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;