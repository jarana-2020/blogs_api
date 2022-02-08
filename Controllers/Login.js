const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
require('dotenv').config();
const ServiceLogin = require('../Services/Login');

const key = process.env.JWT_SECRET;

const executeLogin = rescue(async (req, res, next) => {
  const { email } = req.body;
  const user = await ServiceLogin.executeLogin(req.body);
  if (user.error) return next(user.error);
  const token = jwt.sign({ user: email }, key);
  return res.status(200).json({ token });
});

module.exports = {
  executeLogin,
};