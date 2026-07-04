const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  studentName: { type: String, required: true },
  rollNo: { type: String, required: true },
  event: { type: String, required: true }, // Hackathon title/name
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hackathon', required: true },
  attendance_status: {
    type: String,
    enum: ['registered', 'checked-in', 'present', 'certificate-issued'],
    default: 'registered'
  },
  certificate_url: { type: String },
  certificate_sent_at: { type: Date }
});

module.exports = mongoose.model('Participant', participantSchema);
