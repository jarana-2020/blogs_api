const { Categorie } = require('../models');

const createCategorie = async (name) => {
  const categorie = await Categorie.create({
    name,
  });
  return categorie;
};

const getAllCategories = async () => {
  const categories = await Categorie.findAll();
  return categories;
};
module.exports = {
  createCategorie,
  getAllCategories,
};