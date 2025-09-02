const express = require('express');
const { Sequelize } = require('sequelize');
const sequelize = require('./config/database');
//const sequelizeOriginal = require('./config/orig-database');
const app = express();
const { application } = require('express');
require('dotenv/config'); 
const PORT = 3000;

const impactforecastRoute = require('./routes/impactforecast.js');
const impactforecastcategoryRoute = require('./routes/impactforecastcategory.js');
const impactforecastdocumentRoute = require('./routes/impactforecastdocument.js');
const authRoute = require('./routes/auth.js');

app.use(express.json());
app.use('/api/impactforecast', impactforecastRoute); 
app.use('/api/impactforecastcategory', impactforecastcategoryRoute); 
app.use('/api/impactforecastdocument', impactforecastdocumentRoute); 
app.use('/api/auth', authRoute); 

// app.get("/test", (req, res) => {
//     res.send("Server is running 🚀");
//  });

 app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
 });
    