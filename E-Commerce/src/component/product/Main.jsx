import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { Badge } from 'primereact/badge';
import { Link } from "react-router-dom";
import Product from './Product';
import Filter from './Filter';
// import { useDispatch, useSelector } from 'react-redux';
// import { removeFromCart } from '../../redux/features/cartSlice'; // Uncomment to use Redux

function Main() {
  const [open, setOpen] = useState(false);
  // const dispatch = useDispatch();
  // const { cartItems } = useSelector((state) => state.cart);

  return (
    <div className="flex flex-col min-h-screen bg-grey-100">
      {/* Sidebar (fixed size on the left) */}
      <div className="w-[150px] bg-cyan-800 fixed top-0 bottom-0">
        <Filter />
      </div>

      {/* Fixed Header */}
      <div className="fixed top-0 left-[150px] right-0 z-50 bg-white shadow-lg flex items-center justify-center p-4">
        {/* Search Box (Centered with max width of 500px) */}
        <div className="relative flex items-center mx-auto max-w-[500px] w-full">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <CiSearch size={20} className="absolute right-3 text-gray-500" />
        </div>
      </div>

      {/* Cart and Profile (Fixed position on the right) */}
      <div className="fixed top-4 right-6 z-50 flex items-center gap-6">
        <div className="relative">
          <IoCartOutline
            size={36}
            className="cursor-pointer text-gray-800"
            onClick={() => setOpen(true)}
          />
          <Badge value={6} className="absolute -top-2 -right-2" />
        </div>
        <CgProfile size={40} className="cursor-pointer" onClick={() => setOpen(false)} />
      </div>

      {/* Product Listing */}
      <div className="flex-1 p-6 ml-[150px] mt-[80px]"> {/* ml-[150px] to account for the fixed sidebar */}
        <Product />
      </div>

      {/* Cart Dropdown (Floating Box) */}
      {open && (
        <div className="fixed top-20 right-6 z-50 bg-white shadow-2xl rounded-xl p-5 w-[350px] max-h-[70vh] overflow-y-auto">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b py-2">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex flex-col ml-3 flex-1">
                  <span className="text-sm font-semibold text-gray-700">{item.category}</span>
                  <span className="text-sm text-gray-600">₹ {Math.floor(item.price)}</span>
                </div>
                <AiFillDelete
                  className="text-xl text-red-600 cursor-pointer hover:scale-110"
                  onClick={() => dispatch(removeFromCart({ id: item.id }))}
                />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">Your cart is empty</p>
          )}

          <Link to="/cart">
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition">
              Go to Cart
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Main;