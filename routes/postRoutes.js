// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { createPost, getPosts, getPostById, updatePost, deletePost } = require('../controllers/postController');

// Protected Routes
router.post('/', protect, createPost);
router.get('/', getPosts);  // This can be public
router.get('/:id', getPostById);  // This can be public
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);

module.exports = router;
