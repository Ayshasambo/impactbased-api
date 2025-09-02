const crypto = require("crypto");

const generateApiKey = () => {
  return crypto.randomBytes(32).toString("hex"); // 64-char secure key
};

module.exports = generateApiKey;
