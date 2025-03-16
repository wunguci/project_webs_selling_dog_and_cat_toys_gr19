import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import ProductDetail from "./pages/ProductDetail";
import Search from "./pages/Search";
import CartShop from "./pages/CartShop";
import CheckOut from "./pages/CheckOut";
import UserProfile from "./pages/UserProfile";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./stores/productSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getTotals } from "./stores/cartSlice";

function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchProducts())
    dispatch(getTotals())
  }, [dispatch])

  const product = useSelector((state) => state)
  console.log(product);
  

  return (
    <BrowserRouter>
     <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<CartShop />} />
        <Route path="/checkout/:id" element={<CheckOut />} />
        <Route path="/userProfile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
