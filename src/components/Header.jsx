import logo from "/pet.png";
import { useState, useEffect } from "react";
import "./component.scss";
import { FaCaretDown, FaPhone } from "react-icons/fa6";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { IoMdMenu, IoIosClose } from "react-icons/io";
import { RiMenu3Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({
    name: "",
    avatar: "/avatar.png",
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    console.log(userData);

    if (userData) {
      setLoggedIn(true);
      const user = JSON.parse(userData);
      setUser({
        name: user.fullName,
        avatar: user.avatar,
      });
    }
  }, []);

  // const handleLogout = () => {
  //   localStorage.removeItem("authToken");
  //   localStorage.removeItem("user");
  //   setLoggedIn(false);
  //   setUser({
  //     name: "",
  //     avatar: "/avatar.png",
  //   });
  // };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-evenly py-2 px-4 md:px-8 lg:px-16">
        {/* logo */}
        <div className="flex items-center space-x-3">
          <Link to="/">
            <img
              src={logo}
              alt="Logo Pet Shop"
              className="h-17 w-17 object-cover"
            />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              PET STATION SHOP
            </h1>
            <p className="text-sm text-brown mx-4">The happy store for pet</p>
          </div>
        </div>

        {/* mobile menu button & cart*/}
        <div className="flex items-center space-x-4 md:hidden ml-auto">
          {/* cart */}
          <div className="relative mx-5 mt-1">
            <button className="text-brown cursor-pointer focus:outline-none relative">
              <FaShoppingCart className="text-2xl" />
              <span className="absolute -top-1 -right-2 bg-green-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </button>
          </div>

          {/* nút menu ẩn*/}
          <button
            className="md:hidden text-gray-700 focus:outline-none ml-auto cursor-pointer focus:outline-none relative"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <RiMenu3Fill className="text-2xl" />
          </button>
        </div>

        {/* search bar & links */}
        {!isMobile && (
          <>
            <div className="flex items-center w-full max-w-md lg:max-w-lg">
              <input
                type="text"
                placeholder="Nhập từ khóa tìm kiếm"
                className="w-full px-4 py-2 border-brown rounded-l-full focus:outline-none"
              />
              <button className="bg-brown px-4 py-2 text-white rounded-full focus:outline-none w-14 h-13 relative -left-4 flex items-center justify-center cursor-pointer">
                <FaSearch className="text-lg" />
              </button>
            </div>

            {/* user */}
            <div className="flex items-center space-x-4 cursor-pointer">
              {loggedIn ? (
                <div className="flex items-center space-x-2 cursor-pointer">
                  <img
                    src={user.avatar}
                    alt="User avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="text-gray-700 text-sm font-medium text-brown-hover text-xl">
                    {user.name}
                  </span>
                </div>
              ) : (
                <>
                  {/* đăng ký, đăng nhập  */}
                  <Link
                    to="/register"
                    className="text-gray-700 text-sm text-brown-hover"
                  >
                    ĐĂNG KÝ
                  </Link>
                  <span className="text-brown mb-1">|</span>
                  <Link
                    to="/login"
                    className="text-gray-700 text-sm text-brown-hover"
                  >
                    ĐĂNG NHẬP
                  </Link>
                </>
              )}
              {/* cart */}
              <div className="relative mx-5 mt-1">
                <button className="text-brown cursor-pointer focus:outline-none relative">
                  <FaShoppingCart className="text-2xl" />
                  <span className="absolute -top-1 -right-2 bg-green-400 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    0
                  </span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* overlay */}
      {menuOpen && (
        <div className="overlay" onClick={() => setMenuOpen(false)} />
      )}

      {/* mobile hidden menu */}
      <div className={`hidden-menu ${menuOpen ? "open" : ""}`}>
        <div className="flex justify-end mt-2">
          <button
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 text-xl focus:outline-none cursor-pointer"
          >
            <IoIosClose className="text-4xl" />
          </button>
        </div>
        <ul>
          <li>
            <input
              type="text"
              placeholder="Nhập từ khóa tìm kiếm"
              className="w-full px-4 py-2 border-brown rounded-full focus:outline-none"
            />
          </li>
          {loggedIn ? (
            <li>
              <div className="flex items-center space-x-2 cursor-pointer">
                <img
                  src={user.avatar}
                  alt="User avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="text-gray-700 text-sm font-medium text-brown-hover text-xl">
                  {user.name}
                </span>
              </div>
            </li>
          ) : (
            <>
              <li>
                <Link
                  to="/register"
                  className="block text-gray-700 text-sm text-brown-hover"
                >
                  ĐĂNG KÝ
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="block text-gray-700 text-sm text-brown-hover"
                >
                  ĐĂNG NHẬP
                </Link>
              </li>
            </>
          )}

          <li>
            <a
              href="#"
              className="text-gray-700 flex items-center text-brown-hover"
            >
              SHOP CHO CÚN
              <FaCaretDown className="ml-2 text-lg" />
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-700 flex items-center text-brown-hover"
            >
              SHOP CHO MÈO
              <FaCaretDown className="ml-2 text-lg" />
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block text-gray-700 text-sm text-brown-hover"
            >
              KHUYẾN MÃI
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block text-gray-700 text-sm text-brown-hover"
            >
              TIN TỨC
            </a>
          </li>
        </ul>
      </div>

      {/* Navigation Bar */}
      <nav className={`border-none ${isMobile ? "hidden" : ""}`}>
        <div className="container mx-auto flex flex-wrap items-center justify-evenly px-4 py-2 lg:px-16">
          {/* Danh mục sản phẩm */}
          <div className="relative group">
            <button className="flex items-center space-x-3 bg-brown w-65 h-12 text-white px-5 rounded-lg focus:outline-none cursor-pointer">
              <IoMdMenu className="text-2xl" />
              <span className="font-semibold text-2sm">DANH MỤC SẢN PHẨM</span>
            </button>
            <div className="absolute hidden group-hover:block bg-white text-gray-700 shadow-md mt-2 rounded-md w-48">
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-gray-100">Thức ăn cho cún</li>
                <li className="px-4 py-2 hover:bg-gray-100">Thức ăn cho mèo</li>
                <li className="px-4 py-2 hover:bg-gray-100">Bát ăn thú cưng</li>
              </ul>
            </div>
          </div>

          {/* Links */}
          <div className="hidden lg:flex space-x-8">
            <a
              href="#"
              className="text-gray-700 flex items-center text-brown-hover"
            >
              SHOP CHO CÚN
              <FaCaretDown className="ml-2 text-lg " />
            </a>
            <a
              href="#"
              className="text-gray-700 flex items-center text-brown-hover"
            >
              SHOP CHO MÈO
              <FaCaretDown className="ml-2 text-lg " />
            </a>
            <a href="#" className="text-gray-700 text-brown-hover">
              KHUYẾN MÃI
            </a>
            <a href="#" className="text-gray-700 text-brown-hover">
              TIN TỨC
            </a>
          </div>

          {/* Hotline */}
          <div className="flex items-center space-x-2 mt-4 lg:mt-0">
            <FaPhone className="text-lg text-brown" />
            <span className="font-medium">
              Hotline:
              <span className="text-red text-brown-hover cursor-pointer">
                {" "}
                0915020903
              </span>
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
