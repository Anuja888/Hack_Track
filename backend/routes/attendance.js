const express = require('express');
const router = express.Router();
const Participant = require('../models/Participant');
const auth = require('../middleware/auth');

// @route   GET /api/attendance/event/:eventId
// @desc    Get all participants for a specific event
// @access  Private (Coordinator/HOD only)
router.get('/event/:eventId', auth, async (req, res) => {
  if (req.user.role !== 'coordinator' && req.user.role !== 'hod') {
    return res.status(403).json({ msg: 'Access denied. Organizer or Admin role required.' });
  }

  try {
    const participants = await Participant.find({ eventId: req.params.eventId });
    res.json(participants);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/attendance/my
// @desc    Get all participant records for the logged in student
// @access  Private (Student only)
router.get('/my', auth, async (req, res) => {
  try {
    const participants = await Participant.find({
      $or: [
        { studentId: req.user.id },
        { rollNo: req.user.username }
      ]
    });
    res.json(participants);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PATCH /api/attendance/:participantId/advance
// @desc    Advance attendance status sequentially: registered -> checked-in -> present -> certificate-issued
// @access  Private (Coordinator/HOD only)
router.patch('/:participantId/advance', auth, async (req, res) => {
  if (req.user.role !== 'coordinator' && req.user.role !== 'hod') {
    return res.status(403).json({ msg: 'Access denied. Organizer or Admin role required.' });
  }

  try {
    const participant = await Participant.findById(req.params.participantId);
    if (!participant) {
      return res.status(404).json({ msg: 'Participant not found' });
    }

    const stages = ['registered', 'checked-in', 'present', 'certificate-issued'];
    const currentStatus = participant.attendance_status || 'registered';
    const currentIndex = stages.indexOf(currentStatus);

    if (currentIndex === -1) {
      return res.status(400).json({ msg: 'Invalid participant status' });
    }

    if (currentIndex === stages.length - 1) {
      return res.status(400).json({ msg: 'Participant has already reached the final attendance stage' });
    }

    // Move to next stage
    participant.attendance_status = stages[currentIndex + 1];
    await participant.save();

    res.json(participant);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
