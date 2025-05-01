// models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // Link to User
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }  // Automatically adds createdAt and updatedAt
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
