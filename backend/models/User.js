const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // For students: Roll No. For Staff: Username
  name: { type: String, required: true },
  role: { type: String, enum: ['student', 'coordinator', 'hod', 'attendance'], required: true },
  password: { type: String, required: true }, // Standardized fixed password (like 'vce') hashed.
  department: { type: String, default: 'Unassigned' },
  // Students specific
  batchYear: { type: Number }, // e.g., 2025, from 1602-25...
});

module.exports = mongoose.model('User', userSchema);
