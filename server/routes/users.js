const express = require('express');
const router = express.Router();
const { register, login, getProfile, toggleBookmark, getBookmarks } = require('../controllers/userController');
const { authMiddleware } = require('../middleware/auth');

router.post('/register',              register);
router.post('/login',                 login);
router.get('/profile',  authMiddleware, getProfile);
router.get('/bookmarks', authMiddleware, getBookmarks);
router.post('/bookmarks/:jobId', authMiddleware, toggleBookmark);

module.exports = router;
