import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // To handle redirection to login

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(''); // For error messages
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      // Redirect to login if no token is found
      navigate('/login');
      return;
    }

    // Set Authorization header dynamically
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    axiosInstance
      .get('/profile') // Adjust the API endpoint as necessary
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.error('Error fetching profile:', error);
        if (error.response && error.response.status === 401) {
          // If unauthorized, redirect to login
          navigate('/login');
        } else {
          setError('Failed to load profile. Please try again later.');
        }
      });
  }, [navigate]);

  return (
    <div>
      <h1>Profile</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {profile ? (
        <div>
          <p>Name: {profile.username}</p>
          <p>Email: {profile.email}</p>
          {/* Add additional profile fields here */}
        </div>
      ) : (
        !error && <p>Loading...</p>
      )}
    </div>
  );
}

export default ProfilePage;