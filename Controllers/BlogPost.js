const rescue = require('express-rescue');
const ServiceBlogPost = require('../Services/BlogPost');

const createPost = rescue(async (req, res, next) => {
  const { id } = req.user;
  const post = await ServiceBlogPost.createPost(req.body, id);
  if (post.error) return next(post.error);
  return res.status(201).json(post);
}); 

const getAllPosts = rescue(async (_req, res) => {
  const posts = await ServiceBlogPost.getAllPosts();
  return res.status(200).json(posts);
}); 

const getPostById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const post = await ServiceBlogPost.getPostById(id);
  if (post.error) return next(post.error);
  return res.status(200).json(post);
}); 

const editPost = rescue(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  const { id: userId } = req.user;
  const postEdited = await ServiceBlogPost.editPost(id, userId, body);

  if (postEdited.error) return next(postEdited.error);
 
  return res.status(200).json(postEdited);
}); 

const deletePost = rescue(async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const postDeleted = await ServiceBlogPost.deletePost(id, userId);

  if (postDeleted.error) return next(postDeleted.error);

  return res.status(204).end();
}); 

const searchPost = rescue(async (req, res) => {
  const { q } = req.query;
  const posts = await ServiceBlogPost.searchPost(q);
  return res.status(200).json(posts);
}); 

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  editPost,
  deletePost,
  searchPost,
};