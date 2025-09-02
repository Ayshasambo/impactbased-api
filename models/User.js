const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); 
const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  api_key: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
//   created_at: { type: DataTypes.DATE, allowNull: true },
//   updated_at: { type: DataTypes.DATE, allowNull: true, defaultValue: DataTypes.NOW }
}, {
  tableName: 'users',
  timestamps: false,
});

module.exports = User;
