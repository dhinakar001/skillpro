// Import required dependencies
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const skillsRoutes = require('./routes/skillRoutes');  // Correct path

// Load environment variables from .env
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Allow Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON bodies

// API routes
app.use('/api/auth', authRoutes); // Authentication routes (login/register)


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
