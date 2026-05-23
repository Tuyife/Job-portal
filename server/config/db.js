// Add this at the very top of your server.js file
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

// The rest of your code follows...
const express = require('express');
// ... your other imports and app configuration
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;