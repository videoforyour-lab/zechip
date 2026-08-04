const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

// Import routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const vendorRoutes = require('./routes/vendors');
const subscriptionRoutes = require('./routes/subscriptions');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'MenuBoxGh API is running!',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

app.get('/', (req, res) => {
  res.send('🍽️ MenuBoxGh API');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 MenuBoxGh API running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
});
