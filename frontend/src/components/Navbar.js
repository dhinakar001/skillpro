import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token')); // Track login state dynamically

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      localStorage.removeItem('token'); // Remove token from localStorage
      setIsLoggedIn(false); // Update login state
      navigate('/login'); // Navigate to login page after logout
    }
  };

  useEffect(() => {
    // Listen for changes in localStorage to dynamically update login state
    const updateLoginState = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', updateLoginState); // Listen for storage changes
    return () => {
      window.removeEventListener('storage', updateLoginState); // Cleanup listener
    };
  }, []);

  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/" style={styles.navLink}>
            Home
          </Link>
        </li>
        {!isLoggedIn ? (
          <>
            <li style={styles.navItem}>
              <Link to="/login" style={styles.navLink}>
                Login
              </Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/register" style={styles.navLink}>
                Register
              </Link>
            </li>
          </>
        ) : (
          <>
            <li style={styles.navItem}>
              <Link to="/profile" style={styles.navLink}>
                Profile
              </Link>
            </li>
            <li style={styles.navItem}>
              <button
                onClick={handleLogout}
                style={styles.logoutButton}
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    padding: '10px',
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid #ddd',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    padding: 0,
    margin: 0,
  },
  navItem: {
    margin: '0 10px',
  },
  navLink: {
    textDecoration: 'none',
    color: '#007bff',
    fontSize: '16px',
  },
  logoutButton: {
    background: 'none',
    border: 'none',
    color: '#007bff',
    cursor: 'pointer',
    fontSize: '16px',
    textDecoration: 'underline',
  },
};

export default Navbar;