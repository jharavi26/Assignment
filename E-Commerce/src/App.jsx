import React from 'react'
import { BrowserRouter  ,Routes, Route } from 'react-router-dom';
import Home from './component/product/Home';
import Login from "./component/Authentication/Login";
import Signup from './component/Authentication/SignUp';
import Cart from "./component/product/Cart"
import OrderConfirmation from './component/product/OrderConfirmation';
import ProductDetails from './component/product/ProductDetails';
import ProtectedRoute from './Firebase/ProtectedRoute';



function App() {
  return (    
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route path="/home" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      <Route path="/cart" element={
        <ProtectedRoute>
          <Cart />
        </ProtectedRoute>
      } />
      <Route path="/product/:id" element={
        <ProtectedRoute>
          <ProductDetails />
        </ProtectedRoute>
      } />
      <Route path="/orderconfirmation" element={
        <ProtectedRoute>
          <OrderConfirmation />
        </ProtectedRoute>
      } />
    </Routes>
        </BrowserRouter>
        
      )
}

export default App
