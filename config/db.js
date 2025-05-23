const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);  // No need for options now
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('Error: ', err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
