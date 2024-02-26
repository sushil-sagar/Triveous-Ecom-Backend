// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/cart', authMiddleware, cartController.getCart);
router.post('/cart/add', authMiddleware, cartController.addToCart);
router.put('/cart/:cartItemId', authMiddleware, cartController.updateCartItem);
router.delete('/cart/:cartItemId', authMiddleware, cartController.removeFromCart);

module.exports = router;
