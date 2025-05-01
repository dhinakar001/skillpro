// // routes/authRoutes.js
// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');  // Assuming you have a User model
// const router = express.Router();

// // REGISTER user route
// router.post('/register', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if the user already exists
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ msg: 'User already exists' });
//     }

//     // Hash the password before saving it
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create a new user
//     user = new User({
//       email,
//       password: hashedPassword,
//     });

//     await user.save();
//     res.status(201).json({ msg: 'User registered successfully' });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ msg: 'Server error' });
//   }
// });

// // LOGIN route
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ msg: 'User not found' });
//     }

//     // Compare password with the hashed password in the database
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: 'Invalid Credentials' });
//     }

//     // Generate JWT token
//     const payload = { userId: user._id };
//     const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.status(200).json({
//       msg: 'Login successful',
//       token,
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ msg: 'Server error' });
//   }
// });

// module.exports = router;
// const express = require('express');
// const router = express.Router();
// const { registerUser, loginUser } = require('../controllers/authController');

// // POST: /api/auth/register
// router.post('/register', registerUser);

// // POST: /api/auth/login
// router.post('/login', loginUser);

// module.exports = router;
const jwt = require('jsonwebtoken');

// Middleware to protect routes
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// POST: /api/auth/register
router.post('/register', registerUser);

// POST: /api/auth/login
router.post('/login', loginUser);

module.exports = router;

