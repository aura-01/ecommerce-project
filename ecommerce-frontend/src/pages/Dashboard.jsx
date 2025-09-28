import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const [data, setData] = useState({ products: 0, customers: 0, orders: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get('dashboard/');
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="dashboard-cards">
        <div className="card">
          <div>Products</div>
          <div>{data.products}</div>
        </div>
        <div className="card">
          <div>Customers</div>
          <div>{data.customers}</div>
        </div>
        <div className="card">
          <div>Orders</div>
          <div>{data.orders}</div>
        </div>
      </div>
    </div>
  );
}
