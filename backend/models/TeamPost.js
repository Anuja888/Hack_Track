const mongoose = require('mongoose');

const teamPostSchema = new mongoose.Schema({
  authorRoll: { type: String, required: true },
  name: { type: String, required: true },
  event: { type: String, required: true },
  needed: { type: String, required: true }, // Skills needed
  msg: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TeamPost', teamPostSchema);
