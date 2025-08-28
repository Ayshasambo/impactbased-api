const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Impactforecastcategory = sequelize.define('impact_forecast_category', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(255), allowNull: true },
  code: { type: DataTypes.STRING(55), allowNull: true },
  dedicated_for: { type: DataTypes.STRING(155), allowNull: true },
  status: { type: DataTypes.ENUM('Approved','Pending'), defaultValue: 'Pending' },
  update_userid: { type: DataTypes.INTEGER, defaultValue: 0 },
  insert_userid: { type: DataTypes.INTEGER, defaultValue: 0 },
  created_at: { type: DataTypes.DATE, allowNull: true },
  updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
}, {
  tableName: 'impact_forecast_category',
  timestamps: false
});

module.exports = Impactforecastcategory;
