// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./component/Authentication/Login";
<<<<<<< HEAD
import Signup from './component/Authentication/SignUp';
import Cart from "./component/product/Cart"
import OrderConfirmation from './component/product/OrderConfirmation';
import ProductDetails from './component/product/ProductDetails';
import ProtectedRoute from './Firebase/ProtectedRoute';
=======
import Signup from "./component/Authentication/SignUp";
import Cart from "./component/product/Cart";
import Home from "./component/product/Home";
import OrderConfirmation from "./component/product/OrderConfirmation";
import ProductDetails from "./component/product/ProductDetails";
import ProtectedRoute from "./component/Authentication/ProtectedRoute";
>>>>>>> 44b5c809669df2c5afe4ef4724278c13d33c15b1



function App() {
<<<<<<< HEAD
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
=======
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/OrderConfirmation"
            element={
              <ProtectedRoute>
                <OrderConfirmation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProtectedRoute>
                <ProductDetails />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
>>>>>>> 44b5c809669df2c5afe4ef4724278c13d33c15b1
}

export default App;
