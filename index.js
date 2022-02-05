const express = require('express');
const UserController = require('./Controllers/User');
const LoginController = require('./Controllers/Login');

const {
  checkFieldExists,
  validateFields,
} = require('./Middlewares/validateUser');

const { checkLogin } = require('./Middlewares/validateLogin');
const { checkToken } = require('./Middlewares/validateToken');

const app = express();
app.use(express.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
app.post('/user', checkFieldExists, validateFields, UserController.createUser);
app.post('/login', checkLogin, LoginController.executeLogin);
app.get('/user', checkToken, UserController.getAllUsers);