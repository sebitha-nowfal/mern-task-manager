import React, { useState } from 'react';
import api from '../api/axios';

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const onSubmit = async e => {
    e.preventDefault();
    if (!title) return;
    const res = await api.post('/tasks', { title });
    onAdd(res.data);
    setTitle('');
  };

  return (
    <form onSubmit={onSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="New task" />
      <button type="submit">Add</button>
    </form>
  );
}
