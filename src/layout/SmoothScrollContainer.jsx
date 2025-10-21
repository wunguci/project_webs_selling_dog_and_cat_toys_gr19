import { motion, useScroll, useSpring } from "framer-motion";
import PropTypes from "prop-types";
import { useEffect } from "react";

const SmoothScrollContainer = ({ children }) => {
  const { scrollYProgress } = useScroll();

  // Sử dụng spring nhẹ hơn để tránh làm giật scroll
  const springScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo({ top: 0, behavior: 'instant' }); // Dùng instant để tránh conflict
    };
    
    window.addEventListener("popstate", handleRouteChange);
    
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  return (
    <>
      {/* Progress bar - chỉ hiển thị, không ảnh hưởng đến scroll */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
          transformOrigin: "0%",
          scaleX: springScroll,
          zIndex: 9999,
        }}
      />
      {children}
    </>
  );
};

SmoothScrollContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SmoothScrollContainer;
