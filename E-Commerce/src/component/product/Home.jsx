import React, { useState, useEffect } from 'react';
import { FiShoppingCart } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart , addToCart } from '../../Redux/Feature/cartSlice';
import { MdDelete } from "react-icons/md";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("");
  const [priceOrder, setPriceOrder] = useState("");
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const {items : cartItems} = useSelector((state)=>state.cart);

  console.log(cartItems);
 
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://dummyjson.com/products?limit=50");
      const data = await res.json();
      setProducts(data.products);
    }
    fetchData();
  }, []);

  const filtered = products
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => (filter === "All" ? true : p.category === filter))
    .sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (priceOrder === "lowToHigh") return a.price - b.price;
      if (priceOrder === "highToLow") return b.price - a.price;
      return 0;
    });

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Fixed Filter Sidebar */}
      <div className="w-64 fixed top-0 left-0 h-screen bg-white shadow-lg p-4 overflow-y-auto z-40">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setSearch(e.target.value)}
        />
        <label className="block font-semibold mb-1">Category</label>
        <select
          className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All</option>
          <option>beauty</option>
          <option>fragrances</option>
          <option>furniture</option>
          <option>groceries</option>
        </select>
        <label className="block font-semibold mb-1">Sort By</label>
        <select
          className="w-full p-2 border rounded"
          onChange={(e) => setSort(e.target.value)}
        >
          <option>Sort</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>
        <div className="mb-4 mt-4">
          <label className="block font-semibold mb-2">Price Order</label>
          <div className="flex items-center gap-4">
            <label>
              <input
                type="radio"
                value="lowToHigh"
                checked={priceOrder === "lowToHigh"}
                onChange={() => setPriceOrder("lowToHigh")}
                className="mr-2"
              />
              Low to High
            </label>
            <label>
              <input
                type="radio"
                value="highToLow"
                checked={priceOrder === "highToLow"}
                onChange={() => setPriceOrder("highToLow")}
                className="mr-2"
              />
              High to Low
            </label>
          </div>
        </div>
      </div>

      {/* Top-right fixed cart/profile icons */}
      <div className="fixed top-4 right-6 z-50 flex items-center gap-6">
        <div className="relative cursor-pointer" onClick={() => setOpen(true)}>
          <FiShoppingCart size={32} className="text-gray-700 hover:text-black transition-colors duration-200" />
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {cartItems.length}
          </div>
        </div>
        <div className="cursor-pointer">
          <CgProfile size={32} className="text-gray-700 hover:text-black transition-colors duration-200" />
        </div>
      </div>

      {/* Main Content shifted right to accommodate fixed sidebar */}
      <div className="ml-64 w-full p-6">
  <h1 className="text-2xl font-bold mb-6">All Products</h1>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {filtered.map((product) => (
      <div key={product.id} className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-40 w-full object-contain mb-4"
        />
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-semibold text-center">{product.title}</h2>
          <p className="text-gray-600 text-center">Price: ₹{product.price}</p>
          <p className="text-yellow-500 text-center">Rating: {product.rating}</p>
          <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" 
            onClick={() => dispatch(addToCart(product))}>
            Add to Cart
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

{open && (
  <div className="absolute top-16 right-6 w-80 bg-white shadow-lg border rounded-lg p-4 z-50">
    <h2 className="text-lg font-semibold mb-4 text-gray-700">Cart Items</h2>
    
    {cartItems.length > 0 ? (
      cartItems.map((item) => (
        <div key={item.id} className="flex items-center gap-4 mb-4 border-b pb-3">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-14 h-14 object-cover rounded"
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-800">{item.category}</p>
            <p className="text-sm text-gray-600">₹{Math.floor(item.price)}</p>
          </div>

<MdDelete
  className="text-xl text-red-500 hover:text-red-700 cursor-pointer"
  onClick={() => {dispatch(removeFromCart(item.id)); 
  }}
/>
        </div>
      ))
    ) : (
      <p className="text-gray-500 text-sm text-center">Your cart is empty</p>
    )}

    <Link to="/cart">
      <button className="w-full mt-4 bg-blue-600 text-white text-sm font-semibold py-2 rounded hover:bg-blue-700 transition">
        Go to Cart
      </button>
    </Link>
  </div>
)}


    </div>
  );
}

export default Home;
