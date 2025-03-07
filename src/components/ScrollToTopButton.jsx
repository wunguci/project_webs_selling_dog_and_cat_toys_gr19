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
    const duration = 800; // thời gian cuộn
    const start = window.scrollY || document.documentElement.scrollTop;
    const startTime = performance.now();

    const easeInOutQuad = (t) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    const animateScroll = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1); // giới hạn trong khoảng [0, 1]
      const easeProgress = easeInOutQuad(progress);

      window.scrollTo(0, start * (1 - easeProgress));

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };
    requestAnimationFrame(animateScroll);
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
