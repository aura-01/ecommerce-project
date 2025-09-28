import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../styles/Orders.css';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      try {
        const res = await api.get('orders/');
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="card">
      <h2>Orders</h2>
      {orders.length === 0 ? <p>No orders yet.</p> : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.user.username}</td>
                <td>${o.total.toFixed(2)}</td>
                <td className={o.status === 'completed' ? 'status-completed' : 'status-pending'}>{o.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
