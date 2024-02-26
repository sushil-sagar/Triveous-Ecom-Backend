const express = require('express');
const app = express();
const dotenv = require('dotenv');
const sequelize = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to the database
sequelize.authenticate()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Middleware
app.use(express.json());

// Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/cart', require('./routes/cartRoutes'));
app.use('/category', require('./routes/categoryRoutes'));
app.use('/order', require('./routes/orderRoutes'));
app.use('/product', require('./routes/productRoutes'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
