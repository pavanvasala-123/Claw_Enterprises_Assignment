import React, { useState } from 'react';
import { register } from '../../api';

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ name , email, password });
      console.log({ name , email, password })
      setMessage('User registered successfully');
    } catch (error) {
      setMessage(error.response.data.error);
      console.log(error)
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
      <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
