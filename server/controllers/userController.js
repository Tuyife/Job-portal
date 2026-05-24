const User = require('../models/User');
const jwt = require('jsonwebtoken');

const signToken = (user) => jwt.sign(
  { userId: user._id, email: user.email, role: user.role },
  process.env.JWT_SECRET || 'jobboard_super_secret_key_2024',
  { expiresIn: '7d' }
);

const sendDbError = (res, error) => {
  const isDbTimeout = error?.message?.includes('buffering timed out');
  return res.status(isDbTimeout ? 503 : 500).json({
    message: isDbTimeout
      ? 'Database connection failed. Check MongoDB and restart the server.'
      : error.message
  });
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const user = await User.create({ name, email, password });
    const token = signToken(user);

    res.status(201).json({
      message: 'Account created successfully',
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    return sendDbError(res, error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = signToken(user);

    res.json({
      message: 'Login successful',
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    return sendDbError(res, error);
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    return sendDbError(res, error);
  }
};

const toggleBookmark = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const jobId = req.params.jobId;
    const index = user.bookmarkedJobs.indexOf(jobId);

    if (index === -1) {
      user.bookmarkedJobs.push(jobId);
    } else {
      user.bookmarkedJobs.splice(index, 1);
    }

    await user.save();
    res.json({ bookmarkedJobs: user.bookmarkedJobs });
  } catch (error) {
    return sendDbError(res, error);
  }
};

const getBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('bookmarkedJobs');
    res.json(user.bookmarkedJobs);
  } catch (error) {
    return sendDbError(res, error);
  }
};

module.exports = { register, login, getProfile, toggleBookmark, getBookmarks };
