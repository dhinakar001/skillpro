import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); // Navigate to login page after logout
  };

  return (
    <nav style={{ padding: '10px', backgroundColor: '#eee' }}>
      <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
      {!isLoggedIn ? (
        <>
          <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          <Link to="/profile" style={{ marginRight: '10px' }}>Profile</Link>
          <button 
            onClick={handleLogout} 
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'blue', 
              cursor: 'pointer', 
              textDecoration: 'underline' 
            }}
          >
            Logout
          </button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
