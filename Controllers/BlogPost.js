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

module.exports = {
  createPost,
};