// src/pages/SkillDetailsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './SkillDetailsPage.css'; // Optional: Add some styles if needed.

const SkillDetailsPage = () => {
  const { id } = useParams(); // Get the skill ID from the URL
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the skill details using the ID from the URL
    axios
      .get(`http://localhost:5000/api/skills/${id}`)  // Ensure this endpoint exists on your backend
      .then((response) => {
        setSkill(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching skill details:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!skill) {
    return <p>Skill not found</p>;
  }

  return (
    <div className="skill-details-page">
      <h1>Skill Details</h1>
      <div className="skill-detail">
        <h2>{skill.name}</h2>
        <p>{skill.description}</p>
        <p><strong>Level: </strong>{skill.level}</p> {/* Example of an additional field */}
        <p><strong>Category: </strong>{skill.category}</p> {/* Example of an additional field */}
        
        <Link to="/" className="btn">Back to Home</Link>
      </div>
    </div>
  );
};

export default SkillDetailsPage;
