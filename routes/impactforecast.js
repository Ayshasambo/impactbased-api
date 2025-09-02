const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const authenticateApiKey = require("../middleware/authMiddleware");
const Impactforecast = require('../models/Impactforecast.js');
const Impactforecastcategory = require('../models/Impactforecastcategory.js');
const Impactforecastdocument = require('../models/Impactforecastdocument.js');


router.get("/", authenticateApiKey, async (req, res) => {
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
                    as: "documents", 
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

router.get('/:id', async (req, res) => {
    try {
        const impactforecast = await Impactforecast.findByPk(req.params.id);
        if (impactforecast) {
            res.status(200).json(impactforecast);
        } else {
            res.status(404).json({ error: 'forecast not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch forecast', details: err.message });
    }
});


// router.get('/', async (req, res) => {
//     try {
//         const impactforecast = await Impactforecast.findAll();
//         res.status(200).json(impactforecast);
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to fetch clienttype', details: err.message });
//     }
// });



module.exports = router;