const jwt = require('jsonwebtoken');
const ServiceUser = require('../Services/User');
require('dotenv').config();

const key = process.env.JWT_SECRET;

const checkToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const decode = jwt.verify(authorization, key);
    const user = await ServiceUser.getEmail(decode.user);
    if (!user) {
      return res.status(401)
        .json({ message: 'Erro ao procurar usuário do token.' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  checkToken,
};