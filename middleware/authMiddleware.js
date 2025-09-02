const User = require("../models/User");

const authenticateApiKey = async (req, res, next) => {
  try {
    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
      return res.status(401).json({ message: "API key is missing" });
    }

    const user = await User.findOne({ where: { api_key: apiKey } });

    if (!user) {
      return res.status(403).json({ message: "Invalid API key" });
    }

    req.user = user; // attach user data to the request
    next();
  } catch (error) {
    console.error("API Key Authentication Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = authenticateApiKey;
