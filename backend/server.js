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

const runMigration = async () => {
  try {
    const Hackathon = require('./models/Hackathon');
    const res = await Hackathon.updateMany({ status: { $exists: false } }, { $set: { status: 'active' } });
    if (res.modifiedCount > 0) {
      console.log(`🧹 DB Migration: Set status to 'active' for ${res.modifiedCount} legacy hackathons.`);
    }
  } catch (migErr) {
    console.error('⚠️ DB Migration failed:', migErr);
  }
};

mongoose.connect(MONGO_URI)
  .then(async () => {
     console.log('✅ Connected to MongoDB Atlas');
     await runMigration();
  })
  .catch(err => {
     console.error('❌ MongoDB Connection Error:', err.message || err);
     console.log('🔄 Attempting local fallback connection...');
     const fallbackUri = 'mongodb://127.0.0.1:27017/hacktrack_fallback';
     mongoose.connect(fallbackUri)
       .then(async () => {
          console.log('✅ Connected to Local MongoDB Fallback');
          await runMigration();
       })
       .catch(localErr => {
          console.error('❌ Local MongoDB Fallback also failed:', localErr.message || localErr);
          console.log('Ensure you have a MongoDB instance running locally or check your backend/.env configurations.');
       });
  });

// Setup Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/students', require('./routes/students'));
app.use('/api/hackathons', require('./routes/hackathons'));
app.use('/api/requests', require('./routes/requests'));
app.use('/api/team-posts', require('./routes/teamPosts'));
app.use('/api/feedbacks', require('./routes/feedbacks'));
app.use('/api/certificates', require('./routes/certificates'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/attendance', require('./routes/attendance'));

app.get('/', (req, res) => {
    res.send('HackTrack API Server is Running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

