import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setAuthToken } from '../services/api';
import '../styles/Nav.css';

export default function Nav() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setAuthToken(null);
    navigate('/login');
  };

  return (
    <nav className="nav-bar">
      <div className="nav-container">
        <div className="nav-left">
          <Link to="/" className="logo">MyStore</Link>
          {token && <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/products">Products</Link>
            {role === 'user' && <Link to="/cart">Cart</Link>}
            {role === 'admin' && <Link to="/orders">Orders</Link>}
          </>}
        </div>
        <div className="nav-right">
          {token ? <button onClick={logout} className="logout-btn">Logout</button>
          : <Link to="/login">Login</Link>}
        </div>
      </div>
    </nav>
  );
}
