import {Search,Filter,RefreshCw} from "lucide-react";

const SearchAndFilter = ({ searchTerm, onSearchChange }) => (
  <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
    <div className="flex flex-col md:flex-row md:items-center gap-4">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Tìm kiếm theo tên, email hoặc số điện thoại..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex space-x-2">
        <button className="flex items-center px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">
          <Filter size={16} className="mr-2" />
          Lọc
        </button>
        <button className="flex items-center px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">
          <RefreshCw size={16} className="mr-2" />
          Làm mới
        </button>
      </div>
    </div>
  </div>
);

export default SearchAndFilter;
