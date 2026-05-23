const express = require('express');
const router = express.Router();
const { getJobs, getJobById, createJob, updateJob, deleteJob, getCategories, seedJobs } = require('../controllers/jobController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

router.get('/',              getJobs);
router.get('/categories',    getCategories);
router.get('/seed',          seedJobs);
router.get('/:id',           getJobById);
router.post('/',             authMiddleware, createJob);
router.put('/:id',           authMiddleware, updateJob);
router.delete('/:id',        authMiddleware, deleteJob);

module.exports = router;
