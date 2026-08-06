const mongoose = require('mongoose');
const { MONGO_DB_URL } = require('./config');

const connectDB = async () => {
  if (!MONGO_DB_URL) {
    throw new Error('MONGO_DB_URL is required');
  }

  try {
    await mongoose.connect(MONGO_DB_URL);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
