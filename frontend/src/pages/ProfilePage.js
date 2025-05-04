import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Make sure axios is imported

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

function ProfilePage() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axiosInstance
      .get('/profile') // Adjust the API endpoint as necessary
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.error('Error fetching profile:', error);
      });
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      {profile ? (
        <div>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProfilePage;
