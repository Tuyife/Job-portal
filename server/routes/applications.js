const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Application Schema (if model doesn't exist)
const applicationSchema = new mongoose.Schema({
  jobId: String,
  jobTitle: String,
  company: String,
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  coverLetter: String,
  status: { type: String, default: 'pending' },
  appliedDate: { type: Date, default: Date.now }
});

// Use existing model or create new one
const Application = mongoose.models.Application || mongoose.model('Application', applicationSchema);

// POST - Submit application
router.post('/', async (req, res) => {
  try {
    console.log('📝 Application received:', req.body);
    
    const application = new Application({
      jobId: req.body.jobId,
      jobTitle: req.body.jobTitle,
      company: req.body.company,
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      coverLetter: req.body.coverLetter || '',
      status: 'pending'
    });
    
    const savedApp = await application.save();
    console.log('✅ Application saved to MongoDB! ID:', savedApp._id);
    
    res.status(201).json({ 
      success: true, 
      message: 'Application submitted successfully!',
      application: savedApp
    });
  } catch (error) {
    console.error('❌ Error saving application:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET - All applications
router.get('/', async (req, res) => {
  try {
    const applications = await Application.find().sort({ appliedDate: -1 });
    console.log(`📋 Found ${applications.length} applications`);
    res.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: error.message });
  }
});

// DELETE - Clear all applications (for testing)
router.delete('/all', async (req, res) => {
  try {
    await Application.deleteMany({});
    res.json({ message: 'All applications deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;