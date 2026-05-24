require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Job = require('./models/Job');
const { sampleJobs } = require('./controllers/jobController');

const app = express();
const PORT = process.env.PORT || 5050;
const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/jobboard';

mongoose.set('strictQuery', false);

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000,
})
  .then(async () => {
    console.log('[OK] MongoDB connected');
    const count = await Job.countDocuments();
    if (count === 0) {
      await Job.insertMany(sampleJobs);
      console.log('[OK] Seeded sample jobs');
    }
  })
  .catch(err => console.error('[ERR] MongoDB error:', err));

mongoose.connection.on('connected', () => console.log('[OK] Mongoose connection established'));
mongoose.connection.on('error', err => console.error('[ERR] Mongoose connection error:', err));

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176', 'http://localhost:5177'],
  credentials: true
}));
app.use(express.json());

app.use('/api/users',        require('./routes/users'));
app.use('/api/jobs',         require('./routes/jobs'));
app.use('/api/applications', require('./routes/applications'));

app.get('/', (_req, res) => res.json({ message: 'JobBoard API running' }));

app.listen(PORT, () => console.log(`[OK] Server running on http://localhost:${PORT}`));
