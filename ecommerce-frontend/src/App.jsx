import React from 'react';
import Nav from './components/Nav';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProductList from './pages/ProductList';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <Router>
      <Nav />
      <div className="container">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Homepage Redirect */}
          <Route path="/" element={<Navigate replace to="/dashboard" />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/products" element={<PrivateRoute><ProductList /></PrivateRoute>} />
          <Route path="/products/add" element={<PrivateRoute><AddProduct /></PrivateRoute>} />
          <Route path="/products/edit/:id" element={<PrivateRoute><EditProduct /></PrivateRoute>} />
          <Route path="/products/:id" element={<PrivateRoute><ProductDetails /></PrivateRoute>} />
          <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
          <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />

        </Routes>
      </div>
    </Router>
  );
}