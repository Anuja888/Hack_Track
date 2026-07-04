const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Feedback = require('../models/Feedback');

// @route   GET /api/feedbacks
// @desc    Get all feedbacks
router.get('/', auth, async (req, res) => {
  try {
     const feedbacks = await Feedback.find().sort({ date: -1 });
     res.json(feedbacks);
  } catch (err) {
     res.status(500).send('Server Error');
  }
});

// @route   POST /api/feedbacks
// @desc    Create a feedback (HOD only)
router.post('/', auth, async (req, res) => {
  try {
     if (req.user.role !== 'hod') {
         return res.status(401).json({ msg: 'Unauthorized' });
     }
     const newFeedback = new Feedback({
         msg: req.body.msg
     });
     const feedback = await newFeedback.save();
     res.json(feedback);
  } catch (err) {
     res.status(500).send('Server Error');
  }
});

module.exports = router;
