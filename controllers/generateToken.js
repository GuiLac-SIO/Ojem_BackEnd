const jwt = require('jsonwebtoken');

module.exports.generateToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET_KEY || 'default-secret-key', {
      expiresIn: '1h'
    });
  };
  