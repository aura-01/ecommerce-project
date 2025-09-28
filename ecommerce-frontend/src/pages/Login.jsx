import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { setAuthToken } from '../services/api';
import '../styles/LoginRegister.css';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('auth/login/', form);
      const { token, role } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      setAuthToken(token);
      navigate(role === 'admin' ? '/dashboard' : '/products');
    } catch (err) {
      alert('Login failed');
      console.error(err);
    }
  };

  return (
    <div className="card">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
