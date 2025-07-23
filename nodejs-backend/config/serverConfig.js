const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORTS : [8080, 5000],
    PORT : process.env.PORT || 8080,
    MISTRAL_API_KEY: process.env.MISTRAL_API_KEY
};