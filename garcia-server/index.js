const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const { PORT, SECRET_KEY } = require('./config/config');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: 'Garcia Lab Activity 7 API' });
});

app.use('/api/users', userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
});

const startServer = async () => {
  try {
    if (!SECRET_KEY) {
      throw new Error('SECRET_KEY is required');
    }

    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server startup failed:', error.message);
    process.exit(1);
  }
};

startServer();
