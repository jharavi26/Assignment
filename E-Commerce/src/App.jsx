import React from 'react'
import { BrowserRouter  ,Routes, Route } from 'react-router-dom';
import Home from './component/product/Home';
import Login from "./component/Authentication/Login";
import Signup from './component/Authentication/SignUp';
import Cart from "./component/product/Cart"
import OrderConfirmation from './component/product/OrderConfirmation';
import ProductDetails from './component/product/ProductDetails';


function App() {
  return (
        
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path ="/home" element={<Home/>}/>
        <Route path = "/OrderConfirmation" element={<OrderConfirmation/>}/>
        <Route path ="/product/:id" element = {<ProductDetails/>}/>
        </Routes>
        </BrowserRouter>
        
      )
}

export default App
