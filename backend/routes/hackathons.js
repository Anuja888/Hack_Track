const express = require('express');
const router = express.Router();
const Hackathon = require('../models/Hackathon');
const auth = require('../middleware/auth');

// @route   GET /api/hackathons
// @desc    Get all hackathons (Public, for Flash News)
router.get('/', async (req, res) => {
  try {
    const hackathons = await Hackathon.find().sort({ createdAt: -1 });
    res.json(hackathons);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/hackathons
// @desc    Add a new hackathon
// @access  Private (Coordinator/HOD only)
router.post('/', auth, async (req, res) => {
  if (req.user.role === 'student') {
    return res.status(403).json({ msg: 'Access denied' });
  }

  try {
    const { title, domain, prize, deadline, desc } = req.body;

    const newHackathon = new Hackathon({
      title,
      domain,
      prize,
      deadline,
      desc,
      createdBy: req.user.id
    });

    const hackathon = await newHackathon.save();
    res.json(hackathon);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
