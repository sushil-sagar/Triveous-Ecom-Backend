const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      const hashedPassword = bcrypt.hashSync(value, bcrypt.genSaltSync(10));
      this.setDataValue('password', hashedPassword);
    },
  },
});

// Verify password method
User.prototype.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = User;
