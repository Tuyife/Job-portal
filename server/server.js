require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { ensureSampleJobs } = require('./controllers/jobController');

const app = express();
const PORT = process.env.PORT || 5050;
const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/jobboard';

mongoose.set('strictQuery', false);

const fallbackDB_URI = 'mongodb://localhost:27017/jobboard';

const connectDatabase = async () => {
  const candidates = process.env.MONGODB_URI ? [process.env.MONGODB_URI, fallbackDB_URI] : [fallbackDB_URI];
  let lastError;

  for (const uri of candidates) {
    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 10000,
      });

      console.log(`[OK] MongoDB connected to ${uri === fallbackDB_URI ? 'local fallback' : 'primary URI'}`);
      await ensureSampleJobs();
      return;
    } catch (error) {
      lastError = error;
      console.error(`[WARN] MongoDB connection failed for ${uri}:`, error.message);
    }
  }

  throw lastError;
};

connectDatabase().catch(err => console.error('[ERR] MongoDB error:', err));

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
