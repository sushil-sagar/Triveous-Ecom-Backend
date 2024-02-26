const Order = require('../models/Order');

async function placeOrder(req, res) {
  try {
    const { userId, totalAmount } = req.body;
    const order = await Order.create({ userId, totalAmount });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getOrderHistory(req, res) {
  try {
    const { userId } = req.params;
    const orders = await Order.findAll({ where: { userId } });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getOrderDetails(req, res) {
  try {
    const { orderId } = req.params;
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  placeOrder,
  getOrderHistory,
  getOrderDetails,
};
