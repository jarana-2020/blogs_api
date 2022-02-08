const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
require('dotenv').config();

const key = process.env.JWT_SECRET;
const ServiceUser = require('../Services/User');

const createUser = rescue(async (req, res, next) => {
  const { displayName, email } = req.body;
  const user = await ServiceUser.createUser(req.body);

  if (user.error) return next(user.error);
  const token = jwt.sign({ userName: displayName, email }, key);

  return res.status(201).json({ token });
}); 

const getAllUsers = rescue(async (_req, res) => {
  const users = await ServiceUser.getAllUsers();
  return res.status(200).json(users);
}); 

const userById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const user = await ServiceUser.useById(id);
  if (user.error) return next(user.error);
  return res.status(200).json(user);
}); 
    
const deleteUser = rescue(async (req, res) => {
  const { id } = req.user;
  await ServiceUser.deleteUser(id);
  return res.status(204).end();
}); 

module.exports = {
  createUser,
  getAllUsers,
  userById,
  deleteUser,
};