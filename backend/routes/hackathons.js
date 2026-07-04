const express = require('express');
const router = express.Router();
const Hackathon = require('../models/Hackathon');
const User = require('../models/User');
const auth = require('../middleware/auth');
const sendEmail = require('../utils/email');

// @route   GET /api/hackathons
// @desc    Get all active/completed hackathons (Public, for Flash News)
router.get('/', async (req, res) => {
  try {
    // Only return active or completed hackathons
    const hackathons = await Hackathon.find({ 
      status: { $in: ['active', 'completed'] } 
    }).sort({ createdAt: -1 });
    res.json(hackathons);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/hackathons
// @desc    Add a new hackathon (Organizer creates, default status = pending)
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
      createdBy: req.user.id,
      status: 'pending' // default status is pending
    });

    const hackathon = await newHackathon.save();
    res.json(hackathon);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/hackathons/pending
// @desc    Get all pending hackathons
// @access  Private (HOD/Admin only)
router.get('/pending', auth, async (req, res) => {
  if (req.user.role !== 'hod') {
    return res.status(403).json({ msg: 'Access denied. HOD role required.' });
  }

  try {
    const pendingEvents = await Hackathon.find({ status: 'pending' }).sort({ createdAt: -1 });
    res.json(pendingEvents);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PATCH /api/hackathons/:id/approve
// @desc    Approve a pending hackathon event
// @access  Private (HOD/Admin only)
router.patch('/:id/approve', auth, async (req, res) => {
  if (req.user.role !== 'hod') {
    return res.status(403).json({ msg: 'Access denied. HOD role required.' });
  }

  try {
    const hackathon = await Hackathon.findById(req.params.id);
    if (!hackathon) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    hackathon.status = 'active';
    await hackathon.save();

    // Send email notification to the creator (Coordinator)
    const organizer = await User.findById(hackathon.createdBy);
    if (organizer) {
      const email = organizer.email || `${organizer.username.toLowerCase().replace(/[^a-z0-9]/g, '')}@gmail.com`;
      try {
        await sendEmail({
          to: email,
          subject: `✅ Hackathon Approved: ${hackathon.title}`,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
              <h2 style="color: #2ea043;">Your Event has been Approved!</h2>
              <p>Hi ${organizer.name},</p>
              <p>Great news! The Head of Department has approved your proposed event: <strong>${hackathon.title}</strong>.</p>
              <p>It is now live on the platform and open for student registrations.</p>
              <p style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px; font-size: 0.8rem; color: #999;">HackTrack Portal &bull; Vasavi College of Engineering</p>
            </div>
          `
        });
      } catch (mailErr) {
        console.error('Failed to send approval email:', mailErr);
      }
    }

    res.json(hackathon);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PATCH /api/hackathons/:id/reject
// @desc    Reject a pending hackathon event with reason
// @access  Private (HOD/Admin only)
router.patch('/:id/reject', auth, async (req, res) => {
  if (req.user.role !== 'hod') {
    return res.status(403).json({ msg: 'Access denied. HOD role required.' });
  }

  try {
    const { reason } = req.body;
    if (!reason) {
      return res.status(400).json({ msg: 'Rejection reason is required' });
    }

    const hackathon = await Hackathon.findById(req.params.id);
    if (!hackathon) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    hackathon.status = 'rejected';
    hackathon.approval_reason = reason;
    await hackathon.save();

    // Send email notification to the creator (Coordinator)
    const organizer = await User.findById(hackathon.createdBy);
    if (organizer) {
      const email = organizer.email || `${organizer.username.toLowerCase().replace(/[^a-z0-9]/g, '')}@gmail.com`;
      try {
        await sendEmail({
          to: email,
          subject: `❌ Hackathon Request Rejected: ${hackathon.title}`,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
              <h2 style="color: #f85149;">Event Request Rejected</h2>
              <p>Hi ${organizer.name},</p>
              <p>Your proposed event <strong>${hackathon.title}</strong> has been rejected by the Head of Department.</p>
              <p><strong>Reason for rejection:</strong></p>
              <blockquote style="background: #fdf2f2; border-left: 5px solid #f85149; padding: 10px 20px; margin: 15px 0;">
                ${reason}
              </blockquote>
              <p>You can make the necessary changes and try submitting again if needed.</p>
              <p style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px; font-size: 0.8rem; color: #999;">HackTrack Portal &bull; Vasavi College of Engineering</p>
            </div>
          `
        });
      } catch (mailErr) {
        console.error('Failed to send rejection email:', mailErr);
      }
    }

    res.json(hackathon);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

