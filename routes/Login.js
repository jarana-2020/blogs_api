const express = require('express');

const router = express.Router();

const LoginController = require('../Controllers/Login');
const { checkLogin } = require('../Middlewares/validateLogin');

router
  .use(checkLogin)
  .post('/', LoginController.executeLogin);

module.exports = router;