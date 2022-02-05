const ServiceCategorie = require('../Services/Categorie');

const createCategorie = async (req, res) => {
  try {
    const { name } = req.body;
    const categorie = await ServiceCategorie.createCategorie(name);
    return res.status(201).json(categorie);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await ServiceCategorie.getAllCategories();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCategorie,
  getAllCategories,
};