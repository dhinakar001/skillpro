import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';  // Fixed to match file name
import SkillDetailsPage from './pages/SkillDetailsPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Define all routes here */}
        <Route path="/" element={<HomePage />} />         {/* HomePage route */}
        <Route path="/register" element={<RegisterPage />} /> 
        
 
        <Route path="/login" element={<LoginPage />} />         {/* Login page route */}
        <Route path="/profile" element={<ProfilePage />} />    {/* Profile page route */}
      </Routes>
    </Router>
  );
}

export default App;
