const jwt = require('jsonwebtoken');
require('dotenv').config();
const ServiceLogin = require('../Services/Login');

const key = process.env.JWT_SECRET;

const executeLogin = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await ServiceLogin.executeLogin(req.body);
    if (user.message) return res.status(user.code).json(user.message);
    const token = jwt.sign({ user: email }, key);
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  executeLogin,
};