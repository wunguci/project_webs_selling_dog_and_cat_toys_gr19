import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/register";
import ProductDetail from "./pages/ProductDetail"; // Import ProductDetail
import Search from "./pages/Search";
import CartShop from "./pages/CartShop";
import CheckOut from "./pages/CheckOut";
import UserProfile from "./pages/UserProfile";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import NotFoundPage from "./pages/NotFoundPage";
import UserManagement from "./pages/UserManagement";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { featchProductSale, fetchProductsByCategory } from "./stores/productSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsByCategory("shop-cho-cun"));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProductsByCategory("shop-cho-meo"));
  }, [dispatch]);

  useEffect(() => {
    dispatch(featchProductSale());
  }, [dispatch])

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<CartShop />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/blogs/news" element={<News />} />
        <Route path="/blogs/news/:slug" element={<NewsDetail />} />
        <Route path="/user-management" element={<UserManagement/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
