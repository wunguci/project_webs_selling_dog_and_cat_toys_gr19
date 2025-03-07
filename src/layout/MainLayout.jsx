/* eslint-disable react/prop-types */
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTopButton from "../components/ScrollToTopButton";

const MainLayout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default MainLayout;
