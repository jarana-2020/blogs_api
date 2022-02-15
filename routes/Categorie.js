const express = require('express');

const router = express.Router();

const CategorieController = require('../Controllers/Categorie');
const { checkToken } = require('../Middlewares/validateToken');
const { validateName } = require('../Middlewares/validateCategorie');

router
  .use(checkToken)
  .get('/', CategorieController.getAllCategories)
  .use(validateName)
  .post('/', CategorieController.createCategorie);
module.exports = router;