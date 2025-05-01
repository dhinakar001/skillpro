// controllers/postController.js
const Post = require('../models/Post');

// Create Post
const createPost = async (req, res) => {
  const { title, content } = req.body;

  try {
    const newPost = new Post({
      user: req.user.id,  // User ID from JWT token
      title,
      content,
    });

    await newPost.save();
    res.status(201).json({ msg: 'Post created successfully', post: newPost });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get All Posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });  // Sort by most recent
    res.status(200).json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get Single Post by ID
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update Post
const updatePost = async (req, res) => {
  const { title, content } = req.body;

  try {
    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check if the user is authorized to update this post
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    post.title = title || post.title;
    post.content = content || post.content;

    await post.save();
    res.status(200).json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Delete Post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check if the user is authorized to delete this post
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await post.remove();
    res.status(200).json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = { createPost, getPosts, getPostById, updatePost, deletePost };
