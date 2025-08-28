const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('impact_db', 'root', null, {
    host: 'localhost',
    //username : "srp-database",// Your MySQL username
    //password : "seasonalclimateprediction",
    dialect: 'mysql',
    logging: false,
});

sequelize.authenticate()
    .then(() => {
        console.log('Database connected...');
        return sequelize.sync({ force: false }); 
    })
    .then(() => console.log('Database and tables created!'))
    .catch(err => console.error('Error connecting to the database or syncing tables:', err));

module.exports = sequelize;