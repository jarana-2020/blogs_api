const rescue = require('express-rescue');
const ServiceCategorie = require('../Services/Categorie');

const createCategorie = rescue(async (req, res) => {
  const { name } = req.body;
  const categorie = await ServiceCategorie.createCategorie(name);
  return res.status(201).json(categorie);
}); 

const getAllCategories = rescue(async (_req, res) => {
  const categories = await ServiceCategorie.getAllCategories();
  return res.status(200).json(categories);
}); 

module.exports = {
  createCategorie,
  getAllCategories,
};