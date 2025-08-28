const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Impactforecastcategory = require('./Impactforecastcategory');
const Impactforecastdocument = require('./Impactforecastdocument');

const Impactforecast = sequelize.define('impact_forecast', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(255), allowNull: true },
  impact_forecast_categoryID: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  impact_forecast_date: { type: DataTypes.DATE, allowNull: true },
  status: { type: DataTypes.ENUM('Approved','Pending'), defaultValue: 'Pending' },
  update_userid: { type: DataTypes.INTEGER, defaultValue: 0 },
  insert_userid: { type: DataTypes.INTEGER, defaultValue: 0 },
  created_at: { type: DataTypes.DATE, allowNull: true },
  updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
}, {
  tableName: 'impact_forecast',
  timestamps: false
});

Impactforecast.belongsTo(Impactforecastcategory, {
    foreignKey: "impact_forecast_categoryID",
    targetKey: "id"
});

Impactforecast.hasMany(Impactforecastdocument, {
    foreignKey: 'impact_forecastID',
    as: 'documents'
  });

// Impactforecast.associate = (models) => {
//     Impactforecast.hasMany(models.Impactforecastdocument, {
//       foreignKey: 'impact_forecastID',
//       as: 'documents'
//     });
//   };

// Impactforecast.hasMany(Impactforecastdocument, {
//     foreignKey: "impact_forecast_id", // <-- You must add this column to documents table!
//     sourceKey: "id"
// });

module.exports = Impactforecast;
