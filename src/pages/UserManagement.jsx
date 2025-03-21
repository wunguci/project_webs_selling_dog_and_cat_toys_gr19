import { useState, useEffect } from "react";
import {Trash2, UserPlus} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchAndFilter from "../components/SearchAndFilter";
import EmptyState from "../components/EmptyState";
import UserTable from "../components/UserTable";
import UserDetailView from "../components/UserDetailView";
import Modal2 from "../components/Modal2";
import UserForm from "../components/UserForm";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentView, setCurrentView] = useState("list");

  useEffect(() => {
    const fetchUsersData = async () => {
        try {
            const response = await axiosInstance.get(`api/users`);
            setUsers(response.data)
        } catch (err) {
            console.error("API Error:", err.response?.data || err.message);
        }
    }
    fetchUsersData();
  }, []);



  const handleFormSubmit = (formData) => {
    if (selectedUser) {
      // Update existing user
      const updatedUsers = users.map((user) =>
        user.id === selectedUser.id ? { ...user, ...formData } : user
      );
      setUsers(updatedUsers);
    } else {
      // Add new user
      const newUser = {
        id: Date.now().toString(),
        ...formData,
        avatar:
          "https://i.pravatar.cc/300?img=" + Math.floor(Math.random() * 70),
        role: "user",
      };
      setUsers([...users, newUser]);
    }

    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setUsers(users.filter((user) => user.id !== selectedUser.id));
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
  );

  const viewUserDetails = (user) => {
    setSelectedUser(user);
    setCurrentView("detail");
  };

  const addNewUser = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex-grow p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <header className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Quản lý người dùng
              </h1>
              <p className="text-gray-600 mt-1">
                Quản lý thông tin và quyền của người dùng trong hệ thống
              </p>
            </div>

            <div className="mt-4 md:mt-0">
              <button
                onClick={addNewUser}
                className="bg-[#e17100] text-white px-4 py-2.5 rounded-lg hover:bg-[#d06a03] flex items-center shadow-sm transition-colors cursor-pointer"
              >
                <UserPlus size={18} className="mr-2" />
                Thêm người dùng
              </button>
            </div>
          </header>

          <SearchAndFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {currentView === "list" ? (
              <>
                <div className="flex justify-between items-center p-4 border-b">
                  <div className="text-lg font-medium text-gray-800">
                    Danh sách người dùng
                  </div>
                  <div className="text-sm text-gray-500">
                    Hiển thị {filteredUsers.length} người dùng
                  </div>
                </div>

                {users.length === 0 ? (
                  <EmptyState onAddUser={addNewUser} />
                ) : (
                  <UserTable
                    users={filteredUsers}
                    onView={viewUserDetails}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                )}
              </>
            ) : (
              <UserDetailView
                user={selectedUser}
                onBack={() => setCurrentView("list")}
                onEdit={handleEdit}
              />
            )}
          </div>
        </div>

        {/* User Form Modal */}
        <Modal2
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={selectedUser ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}
        >
          <UserForm
            userData={selectedUser}
            onSubmit={handleFormSubmit}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal2>

        {/* Delete Confirmation Modal */}
        <Modal2
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="Xác nhận xóa"
        >
          <div className="space-y-6">
            <div className="flex items-center p-4 bg-red-50 rounded-lg">
              <div className="mr-4 bg-red-100 p-2 rounded-full">
                <Trash2 size={20} className="text-red-600" />
              </div>
              <div>
                <h3 className="font-medium text-red-800">
                  Xác nhận xóa người dùng
                </h3>
                <p className="text-red-600 mt-1">
                  Bạn có chắc chắn muốn xóa người dùng{" "}
                  <strong>{selectedUser?.fullName}</strong>? Hành động này không
                  thể hoàn tác.
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
              >
                Hủy
              </button>
              <button
                onClick={confirmDelete}
                className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
              >
                Xác nhận xóa
              </button>
            </div>
          </div>
        </Modal2>
      </div>
      <Footer />
    </div>
  );
};

export default UserManagement;

