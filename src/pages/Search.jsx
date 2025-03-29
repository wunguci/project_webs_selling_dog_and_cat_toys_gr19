import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MainLayout from "../layout/mainLayout";
import axiosInstance from "../utils/axiosInstance";
import Product from "../components/Product";
import "./search.scss";
import { ScaleLoader } from "react-spinners";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q");

    if (query) {
      setSearchTerm(query);
      performSearch(query);
    }
  }, [location.search]);

  const performSearch = async (query) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setHasSearched(true);

    try {
      const response = await axiosInstance.get(
        `/api/products/search?q=${query}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching products:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };


  const handleSearch = () => {
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    performSearch(searchTerm);
  };

 
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.slug}`);
  };

  return (
    <MainLayout>
      <div className="container px-4 md:px-10 my-10 mx-auto">
        <div className="page_title">
          <h1 className="title_page_h1 text-2xl font-bold mb-6">
            Tìm kiếm sản phẩm
          </h1>
        </div>

        <div className="flex items-center space-x-4 w-full md:w-2/3 mt-6">
          <div className="relative flex-grow">
            <input
              className="peer z-10 px-6 py-4 rounded-xl outline-none duration-200 ring-2 ring-transparent w-full border-brown"
              placeholder="Nhập từ khóa tìm kiếm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <button
            className="cursor-pointer transition-all bg-brown text-white px-6 py-3 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] border border-slate-500"
            onClick={handleSearch}
          >
            Tìm kiếm
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center my-12">
            <ScaleLoader color="#c49a6c" />
          </div>
        ) : (
          <>
            {hasSearched && (
              <div className="mt-6">
                {searchResults.length > 0 ? (
                  <p className="text-gray-700">
                    Tìm thấy {searchResults.length} kết quả phù hợp với từ khóa
                    "{searchTerm}"
                  </p>
                ) : (
                  <p className="text-gray-700">
                    Không tìm thấy sản phẩm nào phù hợp với từ khóa "
                    {searchTerm}"
                  </p>
                )}
              </div>
            )}

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {searchResults.map((product) => (
                <div
                  key={product._id}
                  onClick={() => handleProductClick(product)}
                  className="cursor-pointer"
                >
                  <Product product={product} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default Search;
