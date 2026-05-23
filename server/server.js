require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5050;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jobboard')
  .then(() => console.log('[OK] MongoDB connected'))
  .catch(err => console.error('[ERR] MongoDB error:', err));

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
