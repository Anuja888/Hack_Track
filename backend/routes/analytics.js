const express = require('express');
const router = express.Router();
const Hackathon = require('../models/Hackathon');
const Participant = require('../models/Participant');
const Request = require('../models/Request');
const auth = require('../middleware/auth');

// @route   GET /api/analytics/dashboard
// @desc    Get dashboard analytics metrics (HOD only)
// @access  Private (HOD/Admin only)
router.get('/dashboard', auth, async (req, res) => {
  if (req.user.role !== 'hod') {
    return res.status(403).json({ msg: 'Access denied. HOD role required.' });
  }

  try {
    const now = new Date();

    // 1. Registered vs Attended
    const registered = await Participant.countDocuments({});
    const attended = await Participant.countDocuments({
      attendance_status: { $in: ['present', 'certificate-issued'] }
    });

    // 2. Events by status (upcoming/ongoing/completed)
    const upcoming = await Hackathon.countDocuments({ status: 'active', deadline: { $gt: now } });
    const ongoing = await Hackathon.countDocuments({ status: 'active', deadline: { $lte: now } });
    const completed = await Hackathon.countDocuments({ status: 'completed' });

    // 3. Registration trend over last 7 days
    const trend = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      d.setHours(0,0,0,0);
      const end = new Date(d);
      end.setHours(23,59,59,999);

      const count = await Request.countDocuments({
        date: { $gte: d, $lte: end }
      });

      trend.push({
        date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        count
      });
    }

    // 4. Top 3 most attended events
    const topEventsAggregate = await Participant.aggregate([
      { $match: { attendance_status: { $in: ['present', 'certificate-issued'] } } },
      { $group: { _id: '$event', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 3 }
    ]);
    const topEvents = topEventsAggregate.map(item => ({
      event: item._id,
      count: item.count
    }));

    // 5. Certificate delivery rate (sent/total)
    const sentCertificates = await Participant.countDocuments({ attendance_status: 'certificate-issued' });
    const totalParticipantsForCert = await Participant.countDocuments({});

    // 6. Average participants per event
    const activeOrCompletedEvents = await Hackathon.countDocuments({ status: { $in: ['active', 'completed'] } });
    const averageParticipants = activeOrCompletedEvents > 0 ? parseFloat((registered / activeOrCompletedEvents).toFixed(2)) : 0;

    res.json({
      registeredVsAttended: {
        registered,
        attended
      },
      eventsByStatus: {
        upcoming,
        ongoing,
        completed
      },
      registrationTrend: trend,
      topEvents,
      certificateDelivery: {
        sent: sentCertificates,
        total: totalParticipantsForCert
      },
      averageParticipants
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
