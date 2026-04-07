const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Helper to calculate dynamic year
function calculateYear(batchYear) {
   if (!batchYear) return 'Unknown';
   
   const currentMonth = new Date().getMonth();
   const currentYear = new Date().getFullYear();
   
   // Typical academic year starts around July (6 in 0-indexed JS dates)
   // e.g. Batch 2025: in June 2026, they have finished 1st year (still 1st yr or going to 2nd).
   // Let's say if we are past June, increment year of study.
   let academicYearStart = currentMonth >= 6 ? currentYear : currentYear - 1;
   
   let yearDiff = academicYearStart - batchYear;
   // In India, 1st year has yearDiff = 0 initially (joined in 2025, in academic year 2025-26, yearDiff = 0 -> 1st Year)
   
   if (yearDiff === 0) return '1st Year';
   if (yearDiff === 1) return '2nd Year';
   if (yearDiff === 2) return '3rd Year';
   if (yearDiff >= 3) return '4th Year';
   return 'Alumni';
}

// @route   GET /api/students
// @desc    Get all students sorted by year
router.get('/', async (req, res) => {
  try {
    const students = await User.find({ role: 'student' });
    
    // Process dynamic year and sort
    const processedStudents = students.map(student => {
       const userObj = student.toObject();
       userObj.dynamicYear = calculateYear(student.batchYear);
       userObj.yearValue = student.batchYear || 9999; // Sort helper
       return userObj;
    });

    // Sort by batch year descending (newest batch first = 1st year first)
    processedStudents.sort((a, b) => b.yearValue - a.yearValue);
    
    res.json(processedStudents);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/students/:rollNo
router.get('/:rollNo', async (req, res) => {
  try {
     const student = await User.findOne({ username: req.params.rollNo, role: 'student' });
     if (!student) return res.status(404).json({ msg: 'Student not found' });
     
     const userObj = student.toObject();
     userObj.dynamicYear = calculateYear(student.batchYear);
     res.json(userObj);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
