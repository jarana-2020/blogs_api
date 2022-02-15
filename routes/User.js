const express = require('express');

const router = express.Router();

const UserController = require('../Controllers/User');

const { checkToken } = require('../Middlewares/validateToken');
const { checkFieldExists, validateFields } = require('../Middlewares/validateUser');

router
  .post('/', checkFieldExists, validateFields, UserController.createUser)
  .use(checkToken)
  .get('/', UserController.getAllUsers)
  .delete('/me', UserController.deleteUser)
  .get('/:id', UserController.userById);

  module.exports = router;