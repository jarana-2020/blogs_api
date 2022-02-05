const { Categorie } = require('../models');

const createCategorie = async (name) => {
  const categorie = await Categorie.create({
    name,
  });
  return categorie;
};

module.exports = {
  createCategorie,
};