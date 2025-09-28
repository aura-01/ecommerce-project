import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/LoginRegister.css';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'user' });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post('auth/register/', form);
      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      alert('Registration failed');
      console.error(err);
    }
  };

  return (
    <div className="card">
      <h2>Register</h2>
      <form onSubmit={submit}>
        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
