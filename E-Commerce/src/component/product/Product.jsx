import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { addToCart, removeFromCart } from '../../redux/features/cartSlice';

function Product() {
  const [products, setProducts] = useState([]);
  // const dispatch = useDispatch();

  // const send = (product) => {
  //   dispatch(addToCart(product));
  // };

  const FetchData = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=50");
    const data = await res.json();
    setProducts(data.products);
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-2 px-2">
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
          >
            <div className="w-full h-48 mb-4">
              <img
                src={item.thumbnail}
                alt={item.description}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">{item.title.slice(0, 10)}</h3>
            <p className="text-sm text-gray-600 mb-1">Category: {item.category}</p>
            <p className="text-sm text-gray-600 mb-1">Price: {Math.floor(item.price)}</p>
            <p className="text-sm text-gray-600 mb-4">Rating: {Math.floor(item.rating)}</p>
            <div className="flex gap-2">
              <button
                onClick={() => dispatch(removeFromCart({ id: item.id }))}
                className="flex-1 bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 text-sm"
              >
                Remove
              </button>
              <button
                onClick={() => send(item)}
                className="flex-1 bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600 text-sm"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;