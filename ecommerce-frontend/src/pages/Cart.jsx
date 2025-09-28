import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../styles/Cart.css';

export default function Cart() {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCart() {
      try {
        const res = await api.get('cart/');
        setCart(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadCart();
  }, []);

  const updateQuantity = async (itemId, delta) => {
    const item = cart.items.find(i => i.id === itemId);
    if (!item) return;
    const newQty = item.quantity + delta;
    if (newQty < 1) return;

    try {
      await api.put(`cart/${itemId}/`, { quantity: newQty });
      setCart(prev => ({
        ...prev,
        items: prev.items.map(i => i.id === itemId ? { ...i, quantity: newQty } : i),
        total: prev.items.reduce((acc, i) => acc + i.price * i.quantity, 0)
      }));
    } catch (err) {
      alert('Update failed');
    }
  };

  const checkout = async () => {
    if (!window.confirm('Proceed to pay?')) return;
    try {
      await api.post('orders/');
      alert('Payment successful!');
      setCart({ items: [], total: 0 });
    } catch (err) {
      alert('Payment failed');
    }
  };

  if (loading) return <div>Loading...</div>;

 return (
  <div className="card">
    <h2>My Cart</h2>
    {/* This is the new, safer check. It handles cases where 'cart' or 'cart.items' might not exist.
    */}
    {!cart || !cart.items || cart.items.length === 0 ? (
      <p>Your cart is empty.</p>
    ) : (
      <>
        <table className="cart-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cart.items.map(i => (
              <tr key={i.id}>
                <td>{i.product.name}</td>
                <td>${i.product.price.toFixed(2)}</td>
                <td>
                  <button onClick={() => updateQuantity(i.id, -1)}>-</button>
                  {i.quantity}
                  <button onClick={() => updateQuantity(i.id, 1)}>+</button>
                </td>
                <td>${(i.product.price * i.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total-section">
          <h3>Total: ${cart.items.reduce((acc, i) => acc + i.product.price * i.quantity, 0).toFixed(2)}</h3>
          <button onClick={checkout}>Pay Now</button>
        </div>
      </>
    )}
  </div>
);
}