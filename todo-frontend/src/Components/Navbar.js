import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Make sure to add styling

const Navbar = ({ token, handleLogout }) => {
  return (
    <nav className="navbar">
      <ul>
        {!token && (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/">Login</Link>
            </li>
          </>
        )}
        {token && (
          <>
            <li>
              <Link to="/todos">To-Do List</Link>
            </li>
            <li>
              <a href="/" onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}>Logout</a>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
