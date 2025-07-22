const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT : process.env.PORT || 8080,
    MISTRAL_API_KEY: process.env.MISTRAL_API_KEY
};