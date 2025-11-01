import React, { useEffect, useState } from "react";
import api from "../api/axios";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]); // store all tasks
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(""); // error message

  // 🔹 Fetch tasks from backend when page loads
  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load tasks");
      setLoading(false);
    }
  };

  // 🔹 useEffect = runs only once when the page is opened
  useEffect(() => {
    fetchTasks();
  }, []);

  // 🔹 Add new task to the list
  const addTask = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  // 🔹 Update an existing task
  const updateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((t) => (t._id === updatedTask._id ? updatedTask : t))
    );
  };

  // 🔹 Delete a task
  const removeTask = (id) => {
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <div style={styles.container}>
      <h2>Your Tasks</h2>

      {/* Show error if failed */}
      {error && <p style={styles.error}>{error}</p>}

      {/* Add new task form */}
      <TaskForm onAdd={addTask} />

      {/* Loading indicator */}
      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks yet. Add your first one!</p>
      ) : (
        <div style={styles.taskList}>
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onUpdate={updateTask}
              onDelete={removeTask}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "#fafafa",
  },
  taskList: {
    marginTop: "20px",
  },
  error: {
    color: "red",
  },
};
