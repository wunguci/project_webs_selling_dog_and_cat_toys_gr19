import { useEffect } from "react";
import { IoClose } from "react-icons/io5";

const Modal = ({ children, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-6 z-10">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 text-brown-hover cursor-pointer"
        >
          <IoClose className="w-7 h-7" />
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
