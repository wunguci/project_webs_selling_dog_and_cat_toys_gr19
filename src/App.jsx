import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import ProductDetail from './pages/ProductDetail'
import Search from './pages/Search'
import CartShop from './pages/CartShop'
import CheckOut from './pages/CheckOut'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/product/:id' element={<ProductDetail/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/cart' element={<CartShop/>}/>
        <Route path='/checkout/:id' element={<CheckOut/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
