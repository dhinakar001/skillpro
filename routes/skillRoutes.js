// routes/skillsRoutes.js
const express = require('express');
const router = express.Router();

// Sample skills data
const skills = [
  { _id: '1', name: 'JavaScript', description: 'Learn JavaScript from basics to advanced' },
  { _id: '2', name: 'Python', description: 'Learn Python for data science' }
];

// Get all skills
router.get('/', (req, res) => {
  res.json(skills);
});

module.exports = router;
