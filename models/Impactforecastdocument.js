const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Impactforecast = require('./Impactforecast');

const Impactforecastdocument = sequelize.define('impact_forecast_documents', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  description: { type: DataTypes.STRING(255), allowNull: true },
  document_url: { type: DataTypes.STRING(255), allowNull: true },
  impact_forecastID: { type: DataTypes.INTEGER, allowNull: true,  },
  insert_userid: { type: DataTypes.INTEGER, defaultValue: 0 },
  created_at: { type: DataTypes.DATE, allowNull: true },
  updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
}, {
  tableName: 'impact_forecast_documents',
  timestamps: false
});

// Impactforecast.belongsTo(Impactforecastdocument, {
//     foreignKey: "impact_forecastID",
//     targetKey: "id"
// });

Impactforecastdocument.associate = (models) => {
    Impactforecastdocument.belongsTo(models.Impactforecast, {
      foreignKey: 'impact_forecastID',
      as: 'impactforecast'
    });
  };

module.exports = Impactforecastdocument;
