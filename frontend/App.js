import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage'; // Corrected import
import LoginPage from './pages/LoginPage'; // Corrected import
import ProfilePage from './pages/ProfilePage';
import LogoutPage from './pages/LogoutPage'; // Add LogoutPage import

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/logout" element={<LogoutPage />} /> {/* Add Logout route */}
      </Routes>
    </Router>
  );
};

export default App;
