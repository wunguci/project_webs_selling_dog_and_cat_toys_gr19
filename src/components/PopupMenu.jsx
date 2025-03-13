import { useState, useRef, useEffect } from "react";
import { href } from "react-router-dom";
import { Link } from "react-router-dom";

const PopupMenu = ({ trigger, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  let timeoutId = null;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    // delay 300ms trước khi đóng menu
    timeoutId = setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={menuRef}
      className="relative"
    >
      {/* trigger element */}
      <div>{trigger}</div>

      {/* popup menu */}
      {isOpen && (
        <div
          className="absolute left-0 w-60 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-50"
          onMouseEnter={() => clearTimeout(timeoutId)} // hủy bỏ timeout khi hover vào menu
          onMouseLeave={handleMouseLeave}
        >
          <ul className="py-2">
            {options.map((option, index) => (
              <li key={index}>
                <button
                  onClick={option.onClick}
                  className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                >
                  <Link to={option.href} className="flex items-center">
                    {option.icon}
                    <span>{option.label}</span>
                  </Link>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PopupMenu;
