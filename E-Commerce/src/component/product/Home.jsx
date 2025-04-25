import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import Product from "./Product";
import CartDropdown from "./cartDropDown";
import { FiShoppingCart } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("");
  const [priceOrder, setPriceOrder] = useState("");
  const [open, setOpen] = useState(false);

  const { items: cartItems } = useSelector((state) => state.cart);

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
      <Filter
        setSearch={setSearch}
        setFilter={setFilter}
        setSort={setSort}
        priceOrder={priceOrder}
        setPriceOrder={setPriceOrder}
      />

      {/* Cart/Profile Icons */}
      <div className="fixed top-4 right-6 z-50 flex items-center gap-6">
        <div className="relative cursor-pointer" onClick={() => setOpen(true)}>
          <FiShoppingCart size={32} />
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {cartItems.length}
          </div>
        </div>
        <CgProfile size={32} />
      </div>

      {/* Product Listing */}
      <div className="ml-64 w-full p-6">
        <h1 className="text-2xl font-bold mb-6">All Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>

      <CartDropdown open={open} />
    </div>
  );
};

export default Home;
