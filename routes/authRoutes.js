const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/authcontroller');
const auth = require('../middleware/auth'); // Middleware for authentication

// User registration route
router.post('/register', registerUser);

// User login route
router.post('/login', loginUser);

// User profile route (Protected)
router.get('/profile', auth, getUserProfile);

module.exports = router;