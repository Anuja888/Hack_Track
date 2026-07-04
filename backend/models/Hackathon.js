const mongoose = require('mongoose');

const hackathonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  domain: { type: String, required: true },
  prize: { type: String },
  deadline: { type: Date, required: true },
  desc: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // The coordinator who added it
  status: { type: String, enum: ['pending', 'active', 'rejected', 'completed'], default: 'pending' },
  approval_reason: { type: String },
  certificates_sent: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Hackathon', hackathonSchema);
