const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register User
// Register User
// Register User
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get User Profile Data
exports.getUserData = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from auth middleware
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      offeredSkills: user.offeredSkills,
      requestedSkills: user.requestedSkills,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching user data' });
  }
};

// Update User Skills (Offered and Requested)
exports.updateSkills = async (req, res) => {
  try {
    const userId = req.user.id; // From authMiddleware
    const { offeredSkills, requestedSkills } = req.body;

    if (!Array.isArray(offeredSkills) || !Array.isArray(requestedSkills)) {
      return res.status(400).json({ message: 'Skills must be arrays' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { offeredSkills, requestedSkills },
      { new: true }
    );

    res.status(200).json({ message: 'Skills updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while updating skills' });
  }
};
