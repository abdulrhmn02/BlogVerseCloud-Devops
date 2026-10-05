const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const testRoute = require('./routes/testRoute');
const blogRoutes = require("./routes/blogRoutes");

dotenv.config();

const app = express();

// ✅ Allow both local and deployed frontend origins
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://learningfullstackdevelopment.onrender.com',
  'http://blog-app-frontend-site-2026.s3-website.ap-south-2.amazonaws.com',
  'http://blog-app-frontend-site-2026.s3-website.ap-south-2.amazonaws.com/'
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  })
);

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', testRoute);
app.use("/api/blogs", blogRoutes);

// Base Route
app.get('/', (req, res) => {
  res.send('API is running...');
});
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', message: 'Server is healthy' });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB Error:', err));

// Server Listen
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
