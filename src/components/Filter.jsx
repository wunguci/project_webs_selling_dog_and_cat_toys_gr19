import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategory } from "../stores/catetorySlice";
import { Link } from "react-router-dom";

const priceRanges = [
  "Giá dưới 100.000đ",
  "100.000đ - 200.000đ",
  "200.000đ - 300.000đ",
  "300.000đ - 500.000đ",
  "500.000đ - 1.000.000đ",
  "Giá trên 1.000.000đ",
];

const Filter = () => {
  const [selectedPrices, setSelectedPrices] = useState([]);
  const dispatch = useDispatch();
  const { allCategory } = useSelector(state => state.categories)

  const handlePriceChange = (price) => {
    setSelectedPrices((prev) =>
      prev.includes(price)
        ? prev.filter((p) => p !== price)
        : [...prev, price]
    );
  };

  useEffect(() => {
    dispatch(fetchAllCategory())
  }, [dispatch])

  return (
    <div className=" bg-white shadow-md">
      <div className="mb-4">
        <h2 className="bg-brown text-white px-3 py-2 font-semibold">DANH MỤC</h2>
        <div className="bg-white border rounded p-2 flex flex-col gap-2">
          {allCategory?.map((category, index) => (
            <div key={index} className="hover:text-[#e17100]">
              <Link to={`/categories/${category.slug}`}>{category.name}</Link>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="bg-brown text-white px-3 py-2 font-semibold">KHOẢNG GIÁ</h2>
        <div className="bg-white border rounded p-2">
          {priceRanges.map((price, index) => (
            <label key={index} className="flex items-center space-x-2 py-1">
              <input
                type="checkbox"
                value={price}
                checked={selectedPrices.includes(price)}
                onChange={() => handlePriceChange(price)}
                className="accent-[#e17100]"
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