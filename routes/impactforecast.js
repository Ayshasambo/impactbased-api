const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const Impactforecast = require('../models/Impactforecast.js');
const Impactforecastcategory = require('../models/Impactforecastcategory.js');
const Impactforecastdocument = require('../models/Impactforecastdocument.js');

router.get("/", async (req, res) => {
    try {
        const { code} = req.query;

        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));

        let where = {
            impact_forecast_date: {
                [Op.between]: [startOfDay, endOfDay] 
            }
        };
        
        //let where = {};
        //if (name) where.name = name;
        //if (date) where.impact_forecast_date = date;

        const forecasts = await Impactforecast.findAll({
            attributes: ["id", "name", "impact_forecast_date"],
            where,
            include: [
                {
                    model: Impactforecastcategory,
                    attributes: ["id", "name", "code"],
                    ...(code ? { where: { code } } : {})
                },
                {
                    model: Impactforecastdocument,
                    as: "documents", // Ensure your model association uses this alias!
                    attributes: ["id", "description", "document_url"]
                }
            ],
            order: [["impact_forecast_date", "DESC"]],
        });

        if (forecasts.length === 0) {
            return res.status(404).json({ message: "No matching forecasts found" });
        }

        res.status(200).json({ success: true, data: forecasts });
    } catch (error) {
        console.error("Error fetching forecasts:", error);
        res.status(500).json({ success: false, message: "Server error: " + error.message });
    }
});



// router.get("/", async (req, res) => {
//     try {
//         const { code, name, date } = req.query;

//         // Base WHERE condition for Impactforecast table
//         let where = {};

//         // Filter by forecast name if provided
//         if (name) {
//             where.name = name;
//         }

//         // Filter by forecast date if provided
//         if (date) {
//             where.impact_forecast_date = date;
//         }

//         // Build the query
//         const forecasts = await Impactforecast.findAll({
//             attributes: ["id", "name", "impact_forecast_date"], // Adjust fields as needed
//             where,
//             include: [
//                 {
//                     model: Impactforecastcategory,
//                     attributes: ["id", "name", "code"],
//                     ...(code ? { where: { code } } : {}) // Only filter by code if provided
//                 },
//                 {
//                     model: Impactforecastdocument,
//                     as:'documents',
//                     attributes: ["id", "description", "document_url"], 
//                 }
//             ],
//             //order: [["date", "DESC"]], // Optional: order results by newest first
//         });

//         res.status(200).json({ success: true, data: forecasts });
//     } catch (error) {
//         console.error("Error fetching forecasts:", error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// });


// router.get("/:code", async (req, res) => {
//     try {
//       const { code } = req.params;
  
//       const forecasts = await Impactforecast.findAll({
//         attributes: ["name"], // fetch only name & description
//         include: [
//           {
//             model: Impactforecastcategory,
//             attributes: [], // we don't need category fields, just for filtering
//             where: { code } // WHERE impact_forecast_category.code = '<Caller Will Provide>'
//           },
//         //   {
//         //     model: Impactforecastdocument,
//         //     attributes: ["document_url", "description"], // we want document_url
//         //   }
//         ],
//         where: {
//           impact_forecast_date: new Date().toISOString().split("T")[0] // today's date
//           //impact_forecast_date: Sequelize.fn("DATE", Sequelize.fn("NOW"))
//         }
//       });
  
//       res.json({ success: true, data: forecasts });
//     } catch (error) {
//       console.error("Error fetching forecasts:", error);
//       res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
//   });

router.get('/', async (req, res) => {
    try {
        const impactforecast = await Impactforecast.findAll();
        res.status(200).json(impactforecast);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch clienttype', details: err.message });
    }
});
module.exports = router;