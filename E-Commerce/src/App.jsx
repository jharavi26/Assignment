import React from 'react'
import { BrowserRouter  ,Routes, Route } from 'react-router-dom';
import Home from './component/product/Home';
import Login from "./component/Authentication/Login";
import Signup from './component/Authentication/SignUp';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './Firebase/ProtectedRoute';
import Cart from "./component/product/Cart"
import OrderConfirmation from './component/product/OrderConfirmation';
import ProductDetails from './component/product/ProductDetails';


function App() {
  return (
        
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path ="/home" element={<Home/>}/>
        <Route path = "/OrderConfirmation" element={<OrderConfirmation/>}/>
        <Route path ="/product/:id" element = {<ProductDetails/>}/>
        
        {/* Protect Home route */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home/>
              {/* <Product />
              <Cart /> */}
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
  )
}

export default App
