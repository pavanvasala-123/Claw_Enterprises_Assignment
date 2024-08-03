import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import TodoList from './Components/TodoList/TodoList';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import './App.css';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleSetToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar token={token} handleLogout={handleLogout} />
        <div className="main-content">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Login setToken={handleSetToken} />} />
            <Route path="/todos" element={token ? <TodoList token={token} /> : <Navigate to="/login" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;