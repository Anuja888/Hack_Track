const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Request = require('../models/Request');
const Hackathon = require('../models/Hackathon');
const Participant = require('../models/Participant');
const User = require('../models/User');
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
     
     // If request status is approved, create Participant records
     if (req.body.status === 'Approved') {
        const event = await Hackathon.findOne({ title: request.event });
        const eventId = event ? event._id : new mongoose.Types.ObjectId();

        // Check if participant already exists for leader
        const existingLeader = await Participant.findOne({
          rollNo: request.rollNo,
          eventId: eventId
        });

        if (!existingLeader) {
          await Participant.create({
            studentId: request.studentId,
            studentName: request.studentName,
            rollNo: request.rollNo,
            event: request.event,
            eventId: eventId,
            attendance_status: 'registered'
          });
        }

        // Create participants for team members
        for (const memberRoll of request.team) {
          const existingMember = await Participant.findOne({
            rollNo: memberRoll,
            eventId: eventId
          });

          if (!existingMember) {
            // Find user in DB
            let user = await User.findOne({ username: memberRoll, role: 'student' });
            if (!user) {
              // Auto-create user if not found, as per system design
              const bcrypt = require('bcryptjs');
              const salt = await bcrypt.genSalt(10);
              const hashedPassword = await bcrypt.hash('vce', salt);
              user = new User({
                username: memberRoll,
                name: `Student ${memberRoll}`,
                role: 'student',
                password: hashedPassword,
                batchYear: 2000 + parseInt(memberRoll.split('-')[1]) || 2025,
                department: 'IT'
              });
              await user.save();
            }

            await Participant.create({
              studentId: user._id,
              studentName: user.name,
              rollNo: memberRoll,
              event: request.event,
              eventId: eventId,
              attendance_status: 'registered'
            });
          }
        }
     }
     
     res.json(request);
  } catch (err) {
     console.error(err);
     res.status(500).send('Server Error');
  }
});

module.exports = router;
