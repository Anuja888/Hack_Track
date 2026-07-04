const express = require('express');
const router = express.Router();
const TeamPost = require('../models/TeamPost');
const auth = require('../middleware/auth');

// @route   GET /api/team-posts
// @desc    Get all team recruitment posts
router.get('/', async (req, res) => {
  try {
    const posts = await TeamPost.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/team-posts
// @desc    Create a team post
router.post('/', auth, async (req, res) => {
  try {
    const newPost = new TeamPost({
      ...req.body,
      authorRoll: req.user.username,
      name: req.user.name
    });
    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
