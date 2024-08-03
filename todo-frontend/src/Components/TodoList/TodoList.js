import React, { useState, useEffect } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../../api';
import TodoItem from '../TodoItem/TodoItem';

const TodoList = ({ token }) => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await getTodos(token);
      setTodos(response.data);
    };
    fetchTodos();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createTodo({ title }, token);
    setTodos([...todos, response.data]);
    setTitle('');
  };

  const handleUpdate = async (id, data) => {
    const response = await updateTodo(id, data, token);
    setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
  };

  const handleDelete = async (id) => {
    await deleteTodo(id, token);
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  return (
    <div className="todo-container">
      <h2>To-Do List</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="New To-Do"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo._id} todo={todo} onUpdate={handleUpdate} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
