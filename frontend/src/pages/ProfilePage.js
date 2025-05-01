import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
 // Make sure this is your axios setup for API requests

const ProfilePage = () => {
  const [offeredSkills, setOfferedSkills] = useState([]);
  const [requestedSkills, setRequestedSkills] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      // Assuming you have an endpoint to get the user data (with offered/requested skills)
      const response = await axiosInstance.get('/api/user/me');
      const { offeredSkills, requestedSkills } = response.data;
      setOfferedSkills(offeredSkills || []);
      setRequestedSkills(requestedSkills || []);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setMessage('Error fetching user data');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.put('/api/skills', {
        offeredSkills,
        requestedSkills
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error updating skills:', error);
      setMessage('Error updating skills');
    }
  };

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Offered Skills (Skills you can teach):</label>
          <input
            type="text"
            value={offeredSkills}
            onChange={(e) => setOfferedSkills(e.target.value.split(','))}
            placeholder="Enter skills separated by commas"
          />
        </div>

        <div>
          <label>Requested Skills (Skills you want to learn):</label>
          <input
            type="text"
            value={requestedSkills}
            onChange={(e) => setRequestedSkills(e.target.value.split(','))}
            placeholder="Enter skills separated by commas"
          />
        </div>

        <button type="submit">Update Skills</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ProfilePage;
