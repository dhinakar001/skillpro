import React, { useState } from 'react';
import axios from 'axios';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    if (!token) {
      alert('You must be logged in to interact with us');
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/api/skills',  // Update to your appropriate endpoint for skill registration
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Your interaction request has been sent successfully');
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error sending interaction request:', error);
      alert('Error occurred while sending the request');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <h2>Interact With Us</h2>
      <p>Enter the skill you want to teach or learn. Let's connect!</p>
      
      <div>
        <input
          type="text"
          placeholder="Skill Title (e.g., 'JavaScript Basics')"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: '300px', padding: '8px', marginBottom: '10px' }}
        />
      </div>
      <div>
        <textarea
          placeholder="Description (Why should someone learn it from you?)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          style={{ width: '300px', height: '100px', padding: '8px' }}
        />
      </div>
      <button type="submit" style={{ marginTop: '10px' }}>Send Request</button>
    </form>
  );
};

export default PostForm;
