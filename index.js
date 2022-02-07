const express = require('express');
const UserController = require('./Controllers/User');
const LoginController = require('./Controllers/Login');
const CategorieController = require('./Controllers/Categorie');
const PostController = require('./Controllers/BlogPost');

const {
  checkFieldExists,
  validateFields,
} = require('./Middlewares/validateUser');

const { checkLogin } = require('./Middlewares/validateLogin');
const { checkToken } = require('./Middlewares/validateToken');
const { validateName } = require('./Middlewares/validateCategorie');
const { checkPost, checkEditPost } = require('./Middlewares/validatePost');

const app = express();
app.use(express.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
app.post('/user', checkFieldExists, validateFields, UserController.createUser);
app.post('/categories', checkToken, validateName, CategorieController.createCategorie);
app.post('/login', checkLogin, LoginController.executeLogin);
app.get('/post/search', checkToken, PostController.searchPost);
app.post('/post', checkToken, checkPost, PostController.createPost);
app.get('/user', checkToken, UserController.getAllUsers);
app.get('/categories', checkToken, CategorieController.getAllCategories);
app.get('/post', checkToken, PostController.getAllPosts);
app.delete('/user/me', checkToken, UserController.deleteUser);
app.put('/post/:id', checkToken, checkEditPost, PostController.editPost);
app.get('/user/:id', checkToken, UserController.userById);
app.get('/post/:id', checkToken, PostController.getPostById);
app.delete('/post/:id', checkToken, PostController.deletePost);
