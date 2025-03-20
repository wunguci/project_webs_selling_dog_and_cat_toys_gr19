import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../stores/productSlice";
import MainLayout from "../layout/mainLayout";
import "./search.scss";
import Product from "../components/Product";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSearch = () => {
    setHasSearched(true);
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  };

  return (
    <MainLayout>
      <div className="container px-10 my-10">
        <div className="page_title">
          <h1 className="title_page_h1">Trang tìm kiếm</h1>
        </div>
        <div className="flex items-center space-x-4 w-2/3 mt-6">
          <div className="relative flex-grow">
            <input
              className="peer z-10 px-6 py-4 rounded-xl outline-none duration-200 ring-2 ring-transparent w-full border-brown"
              placeholder="Nhập từ khóa tìm kiếm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            className="cursor-pointer transition-all bg-brown text-white px-6 py-3 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] border border-slate-500"
            onClick={handleSearch}
          >
            Tìm kiếm
          </button>
        </div>
        {hasSearched && filteredProducts.length > 0 && (
          <p className="mt-4">
            Có {filteredProducts.length} kết quả tìm kiếm phù hợp
          </p>
        )}
        <div className="mt-10 grid grid-cols-4 gap-4">
          {hasSearched && filteredProducts.length === 0 ? (
            <p>Không tìm thấy sản phẩm nào.</p>
          ) : (
            filteredProducts.map((product) => (
              <Product key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Search;
