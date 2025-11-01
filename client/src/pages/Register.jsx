import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await register(form.name, form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input name="name" value={form.name} onChange={onChange} placeholder="Name" required />
      <input name="email" value={form.email} onChange={onChange} placeholder="Email" required />
      <input name="password" type="password" value={form.password} onChange={onChange} placeholder="Password" required />
      <button type="submit">Register</button>
      {error && <p>{error}</p>}
    </form>
  );
}
