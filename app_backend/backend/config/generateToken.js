const jwt = require('jsonwebtoken');

const generatewebtoken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d' // You can set the expiration time according to your requirements
    });
};

module.exports = generatewebtoken;
