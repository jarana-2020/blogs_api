const { Op } = require('sequelize');
const { BlogPost, PostsCategorie, Categorie, User } = require('../models');

const categorieExists = (array) => {
   const result = array.reduce(async (ac, cur) => {
     const categorie = await Categorie.findByPk(cur);
     if (!categorie) {
      return { error: 
        { code: 'badRequest',
         message: '"categoryIds" not found' } };
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
  if (verifyCategory.error) return verifyCategory;
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
    return { error: 
      { code: 'notFound',
       message: 'Post does not exist' } };
  }
  return post;
};

const verifyUser = async (id, userId) => {
  const post = await BlogPost.findByPk(id);
  if (post.userId !== userId) {
    return { error: 
      { code: 'unauthorized',
       message: 'Unauthorized user' } };
  }
  return post;
};

const editPost = async (id, userId, objPost) => {
  const { title, content } = objPost;
  const checkUser = await verifyUser(id, userId);
  if (checkUser.error) return checkUser;
  
  await BlogPost.update({ title, content },
    { where: { id } });
    
  const getUpdatedPost = await BlogPost.findByPk(id, {
    include: { model: Categorie, as: 'categories' },
  });
  const { categories } = getUpdatedPost;
  return {
    title,
    content,
    userId,
    categories,
  };
};

const deletePost = async (id, userId) => {
  const getPost = await getPostById(id);
  if (getPost.error) return getPost;
  
  const checkUser = await verifyUser(id, userId);
  if (checkUser.error) return checkUser;

  const deletedPost = await BlogPost.destroy({
    where: { id },
  });
  return deletedPost;
};

const getAllPostsByQuery = async (value) => {
  const posts = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${value}%` } },
        { content: { [Op.like]: `%${value}%` } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Categorie, as: 'categories', through: { attributes: [] } },
    ],
  }); 
  return posts;
};

const searchPost = async (value) => {
  if (!value) {
    const allPosts = await getAllPosts();
    return allPosts;
  }
  const getPostSearched = await getAllPostsByQuery(value);
  return getPostSearched;
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  editPost,
  deletePost,
  searchPost,
};
