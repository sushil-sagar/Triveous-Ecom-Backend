const Category = require('../models/Category');

async function getCategories(req, res) {
  try {
    // Example logic to get a list of categories
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getCategories,
};
