import React, { useEffect, useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity, removeFromCart, addToCart, clearCart } from '../../Redux/Feature/cartSlice';

const Cart = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const dispatch = useDispatch();
  const {items :  cartItems } = useSelector((state) => state.cart);

  console.log(cartItems);


  // Increment item quantity
  const handleIncrement = (item) => {
    dispatch(addToCart(item));
  };

  // Decrement item quantity
  const handleDecrement = (id) => {
    // dispatch(removeSingleItem(id));
  };

  // Empty the cart
  const handleEmptyCart = () => {
    dispatch(clearCart());
  };

  // Calculate total price
  useEffect(() => {
    const total = cartItems.reduce((acc, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 0;
      return acc + price * quantity;
    }, 0);
    setTotalPrice(total);
  }, [cartItems]);
  
  
  useEffect(() => {
    const quantity = cartItems.reduce((acc, item) => {
      const qty = item.qty || 0; // Fallback to 0
      return acc + qty;
    }, 0);
    setTotalQuantity(quantity);
  }, [cartItems]);

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Cart Calculation ({cartItems.length})</h1>
          <button 
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={handleEmptyCart}
          >
            Empty Cart
          </button>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center text-center py-16">
              <i className="fa fa-shopping-cart text-6xl text-gray-400 mb-4"></i>
              <p className="text-gray-500 text-lg">Your Cart Is Empty</p>
            </div>
          ) : (
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-4">Action</th>
                  <th className="p-4">Product</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Qty</th>
                  <th className="p-4 text-right">Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-4">
                      <button 
                        className="text-red-500 hover:text-red-600"
                        onClick={() => handleDecrement(item.id)}
                      >
                        <MdDeleteForever size={24} />
                      </button>
                    </td>
                    <td className="p-4">
                      <div className="w-16 h-16">
                        <img src={item.thumbnail} alt={item.dish} className="object-cover w-full h-full rounded" />
                      </div>
                    </td>
                    <td className="p-4">
                      <p>{item.category}</p>
                    </td>
                    <td className="p-4">
                      <p>₹{Math.floor(item.price)}</p>
                    </td>
                    <td className="p-4">
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          dispatch(updateQuantity({ id: item.id, quantity: Number(e.target.value) }))
                        }
                        className="border rounded px-2 py-1"
                      >
                        {[...Array(10).keys()].map((num) => (
                          <option key={num + 1} value={num + 1}>
                            {num + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <p>₹{Math.floor(item.price * item.quantity)}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-100 border-t">
                  <th className="p-4" colSpan={4}>Items In Cart: {cartItems.length}</th>
                  <th className="p-4">{totalQuantity}</th>
                  <th className="p-4 text-right">Total Price: ₹{Math.floor(totalPrice)}</th>
                </tr>
              </tfoot>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;