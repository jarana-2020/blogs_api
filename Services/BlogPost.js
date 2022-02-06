const { BlogPost, PostsCategorie, Categorie, User } = require('../models');

const categorieExists = (array) => {
   const result = array.reduce(async (ac, cur) => {
     const categorie = await Categorie.findByPk(cur);
     if (!categorie) {
      return { code: 400, 
        message: { message: '"categoryIds" not found' } };
     }
     return ac;
   }, false);
   return result;
};

const insertPost = async (title, content, userId) => {
  const post = await BlogPost.create({
    title,
    content,
    userId,
  });
  return post;
};

const insertPostCategorie = (arrayCategories, postId) => {
  Promise.all(arrayCategories.map(async (id) => {
    await PostsCategorie.create({
          postId,
          categoryId: id,
        });
  }));
};

const createPost = async (objPost, userId) => {
  const { title, content, categoryIds } = objPost;
  const verifyCategory = await categorieExists(categoryIds);
  if (verifyCategory.message) return verifyCategory;
  const post = await insertPost(title, content, userId);
  insertPostCategorie(categoryIds, post.id);
  return {
    id: post.id,
    userId,
    title,
    content,
  };
};

const getAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user' },
      { model: Categorie, as: 'categories' },
    ], 
  });
  return posts;
};

const getPostById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user' },
      { model: Categorie, as: 'categories' },
    ],
  });
  if (!post) {
    return { code: 404, 
      message: { message: 'Post does not exist' } };
  }
  return post;
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
};
