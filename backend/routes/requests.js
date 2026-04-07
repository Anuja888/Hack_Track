const express = require('express');
const router = express.Router();
const Request = require('../models/Request');
const auth = require('../middleware/auth');

// @route   POST /api/requests
// @desc    Submit a hackathon request
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'student') return res.status(403).json({ msg: 'Only students can apply' });
  
  try {
    const newRequest = new Request({
      ...req.body,
      studentId: req.user.id,
      studentName: req.user.name,
      rollNo: req.user.username,
      status: 'Pending',
      attendance: 'Queued'
    });
    const request = await newRequest.save();
    res.json(request);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/requests
// @desc    Get requests (Coordinators get all, Students get theirs)
router.get('/', auth, async (req, res) => {
  try {
     if (req.user.role === 'student') {
        const requests = await Request.find({
            $or: [{ studentId: req.user.id }, { team: req.user.username }]
        }).sort({ date: -1 });
        res.json(requests);
     } else {
        const requests = await Request.find().sort({ date: -1 });
        res.json(requests);
     }
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/requests/:id
// @desc    Update request status or attendance
router.put('/:id', auth, async (req, res) => {
  try {
     const request = await Request.findByIdAndUpdate(req.params.id, req.body, { new: true });
     res.json(request);
  } catch (err) {
     res.status(500).send('Server Error');
  }
});

module.exports = router;
