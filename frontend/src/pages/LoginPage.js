import React, { useState } from 'react';
import axios from 'axios';
import LoginForm from '../components/loginform';
  // Import LoginForm component if needed for structure

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();

    // Check if email and password are provided
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      console.log('Login successful:', response.data);
      localStorage.setItem('token', response.data.token);
      window.location.href = '/home';  // Redirect after successful login
    } catch (error) {
      console.error('Error during login:', error);
      setError(error.response ? error.response.data.msg : 'An error occurred');
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display error if any */}

      <form onSubmit={loginUser}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
