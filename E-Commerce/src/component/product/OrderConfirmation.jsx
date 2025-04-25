import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../Redux/Feature/cartSlice';
import { useDispatch } from 'react-redux';


const mockOrder = {
  orderId: 'ORD123456789',
  items: [
    { id: 1, name: 'T-shirt - Blue', quantity: 2, price: 499 },
    { id: 2, name: 'Sneakers - White', quantity: 1, price: 1499 },
  ],
};


const OrderConfirmation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
   
    // ✅ Clear the cart since session_id is present (meaning payment succeeded)
    dispatch(clearCart());

    // You could also fetch session details from Stripe if needed here
  }, [dispatch]);

  const totalAmount = mockOrder.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-green-600 mb-4 text-center">
          Payment Successful!
        </h2>

        <p className="text-sm text-gray-500 text-center mb-6">
          Thank you for your purchase. Below are your order details.
        </p>

        <div className="mb-4">
          <span className="font-semibold">Order ID:</span> {mockOrder.orderId}
        </div>

        <div className="border rounded-lg overflow-hidden">
          {mockOrder.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center px-4 py-3 border-b last:border-b-0"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="font-semibold">₹{item.price * item.quantity}</p>
            </div>
          ))}
        </div>

        <div className="text-right mt-4">
          <span className="text-lg font-bold">Total: ₹{totalAmount}</span>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
