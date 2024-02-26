const CartItem = require('../models/CartItem');

async function getCart(req, res) {
  try {
    const cartItems = await CartItem.findAll({ where: { userId: req.user.id } });
    res.json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function addToCart(req, res) {
  try {
    const { productId, quantity } = req.body;
    const existingCartItem = await CartItem.findOne({ where: { userId: req.user.id, productId } });

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
      res.status(200).json(existingCartItem);
    } else {
      const newCartItem = await CartItem.create({ userId: req.user.id, productId, quantity });
      res.status(201).json(newCartItem);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function updateCartItem(req, res) {
  try {
    const { cartItemId } = req.params;
    const { quantity } = req.body;
    const cartItem = await CartItem.findByPk(cartItemId);

    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    cartItem.quantity = quantity;
    await cartItem.save();
    res.status(200).json(cartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function removeFromCart(req, res) {
  try {
    const { cartItemId } = req.params;
    const cartItem = await CartItem.findByPk(cartItemId);

    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    await cartItem.destroy();
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
};
