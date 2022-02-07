const ServiceBlogPost = require('../Services/BlogPost');

const createPost = async (req, res) => {
  try {
    const { id } = req.user;
    const post = await ServiceBlogPost.createPost(req.body, id);
    if (post.message) {
      return res.status(post.code).json(post.message);
    }
    return res.status(201).json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllPosts = async (_req, res) => {
 try {
  const posts = await ServiceBlogPost.getAllPosts();
  return res.status(200).json(posts);
 } catch (error) {
  return res.status(500).json({ message: error.message });
 }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await ServiceBlogPost.getPostById(id);
    if (post.message) {
      return res.status(post.code).json(post.message); 
    }
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const editPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const { id: userId } = req.user;
    const postEdited = await ServiceBlogPost.editPost(id, userId, body);
    if (postEdited.message) {
      return res.status(postEdited.code).json(postEdited.message); 
    }
    return res.status(200).json(postEdited);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.user;
    const postDeleted = await ServiceBlogPost.deletePost(id, userId);
    if (postDeleted.message) {
      return res.status(postDeleted.code).json(postDeleted.message); 
    }
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  editPost,
  deletePost,
};