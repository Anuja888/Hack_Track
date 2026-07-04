const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  studentName: { type: String, required: true },
  rollNo: { type: String, required: true },
  year: { type: String, required: true },
  dept: { type: String, required: true },
  event: { type: String, required: true },
  team: [{ type: String }], // Array of roll numbers
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  attendance: { type: String, enum: ['Queued', 'Resolved'], default: 'Queued' },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Request', requestSchema);
