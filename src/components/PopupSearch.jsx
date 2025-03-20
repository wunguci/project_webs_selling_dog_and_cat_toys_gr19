import "./component.scss";
import { FaShoppingBag, FaClock } from "react-icons/fa";

const PopupSearch = ({
  searchResults = [],
  searchHistory = [],
  onSearch,
  onHistoryItemClick,
}) => {
  console.log("searchResults:", searchResults);
  console.log("searchHistory:", searchHistory);

  const hasResults = searchResults && searchResults.length > 0;

  return (
    <div className="popup-search absolute top-full left-0 w-full mt-1 bg-white shadow-lg rounded-md z-50 border border-gray-200 max-h-80 overflow-y-auto">
      {hasResults ? (
        <div className="p-2">
          <h3 className="text-sm font-medium text-gray-500 mb-2 px-2">
            Kết quả tìm kiếm
          </h3>
          <ul className="suggestions-list">
            {searchResults.map((result, index) => (
              <li
                key={`result-${index}`}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => onSearch(result)}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center mr-3 overflow-hidden">
                    {result.images && result.images.length > 0 ? (
                      <img
                        src={result.images[0]} 
                        alt={result.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400">
                        <FaShoppingBag /> 
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-800">{result.name}</span>
                    <span className="text-xs text-gray-500">Sản phẩm</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <>
          {searchHistory && searchHistory.length > 0 && (
            <div className="p-2">
              <h3 className="text-sm font-medium text-gray-500 mb-2 px-2">
                Lịch sử tìm kiếm
              </h3>
              <ul className="history-list">
                {searchHistory.map((item, index) => (
                  <li
                    key={`history-${index}`}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                    onClick={() => onHistoryItemClick(item)}
                  >
                    <FaClock className="text-gray-400 mr-2" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="border-b border-gray-200 my-2"></div>
            </div>
          )}

          <div className="no-results p-4 text-center text-gray-500 -mt-10">
            {searchResults === null
              ? "Đang tìm kiếm..."
              : "Không tìm thấy kết quả nào"}
          </div>
        </>
      )}
    </div>
  );
};

export default PopupSearch;
