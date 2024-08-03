import React from 'react';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const handleToggle = () => {
    onUpdate(todo._id, { status: !todo.status });
  };

  const handleDelete = () => {
    onDelete(todo._id);
  };

  return (
    <li className={`todo-item ${todo.status ? 'status' : ''}`}>
      <span onClick={handleToggle}>{todo.title}</span>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default TodoItem;
