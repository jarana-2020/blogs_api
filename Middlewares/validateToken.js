const jwt = require('jsonwebtoken');
require('dotenv').config();

const key = process.env.JWT_SECRET;

const checkToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    jwt.verify(authorization, key);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  checkToken,
};