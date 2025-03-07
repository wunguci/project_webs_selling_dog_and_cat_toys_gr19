import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa6";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`fixed bottom-6 right-6 p-3 rounded-full bg-brown text-white shadow-lg transition-opacity duration-300 cursor-pointer
            ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      aria-label="Scroll to top"
      onClick={() => scrollToTop()}
    >
      <FaArrowUp className="w-6 h-6" />
    </button>
  );
};

export default ScrollToTopButton;
