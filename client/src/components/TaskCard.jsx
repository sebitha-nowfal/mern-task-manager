import React from 'react';
import api from '../api/axios';

export default function TaskCard({ task, onUpdate, onDelete }) {
  const toggleCompleted = async () => {
    const res = await api.put(`/tasks/${task._id}`, { completed: !task.completed });
    onUpdate(res.data);
  };
  const deleteTask = async () => {
    await api.delete(`/tasks/${task._id}`);
    onDelete(task._id);
  };

  return (
    <div>
      <h3 style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</h3>
      <p>{task.description}</p>
      <button onClick={toggleCompleted}>{task.completed ? 'Mark open' : 'Complete'}</button>
      <button onClick={deleteTask}>Delete</button>
    </div>
  );
}
