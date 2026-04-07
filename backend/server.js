const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hacktrack_fallback';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => {
     console.error('❌ MongoDB Connection Error:', err);
     console.log('Ensure you have added your Atlas URI to backend/.env properly!');
  });

// Setup Routes (to be implemented)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/students', require('./routes/students'));
app.use('/api/hackathons', require('./routes/hackathons'));
app.use('/api/requests', require('./routes/requests'));
app.use('/api/team-posts', require('./routes/teamPosts'));
app.use('/api/feedbacks', require('./routes/feedbacks'));

app.get('/', (req, res) => {
    res.send('HackTrack API Server is Running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
