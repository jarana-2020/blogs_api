const express = require('express');

const router = express.Router();

const PostController = require('../Controllers/BlogPost');
const { checkToken } = require('../Middlewares/validateToken');
const { checkPost, checkEditPost } = require('../Middlewares/validatePost');

router
  .use(checkToken)
  .get('/', PostController.getAllPosts)
  .get('/search', PostController.searchPost)
  .get('/:id', PostController.getPostById)
  .delete('/:id', PostController.deletePost)
  .post('/', checkPost, PostController.createPost)
  .put('/:id', checkEditPost, PostController.editPost);

module.exports = router;