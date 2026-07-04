const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Initial setup: To allow creating the very first user or logging in
// In a real app, users would be seeded or registered.
// For this app, if a user logs in and doesn't exist, we'll auto-create them 
// since it's a closed college portal simulation, but normally we'd seed them.

router.post('/login', async (req, res) => {
  try {
    let { username, password, role } = req.body;
    
    // Normalize generic password to lowercase to avoid Caps Lock issues
    if (password.toLowerCase() === 'vce') {
       password = 'vce';
    }

    // Role restrictions for HOD
    if (role === 'hod' && username !== 'Ram Mohan Rao') {
       return res.status(400).json({ msg: 'Unauthorized HOD access.' });
    }
    
    // Find user
    let user = await User.findOne({ username, role });
    
    if (!user) {
      if (password === 'vce') {
         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(password, salt);
         
         let batchYear = null;
         if (role === 'student' && username.match(/^1602-\d{2}-/)) {
             batchYear = 2000 + parseInt(username.split('-')[1]);
         }

         user = new User({
             username,
             name: role === 'student' ? `Student ${username}` : username,
             role,
             password: hashedPassword,
             batchYear
         });
         await user.save();
      } else {
         return res.status(400).json({ msg: 'Invalid Credentials' });
      }
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Generate JWT
    const payload = {
      user: {
        id: user.id,
        role: user.role,
        username: user.username,
        name: user.name
      }
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
      if (err) throw err;
      res.json({ token, user: payload.user });
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
