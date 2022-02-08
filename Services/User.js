const { User } = require('../models');

const getEmail = async (email) => {
  const user = await User.findOne({
    where: { email },
  });
  return user;
};

const createUser = async (userObj) => {
  const { displayName, email, password, image } = userObj;
  const userEmail = await getEmail(userObj.email);
  if (userEmail) {
    return { error: {
      code: 'conflict', message: 'User already registered',
    } };
  }
  const user = await User.create({
    displayName,
    email,
    password,
    image });
  return user;
};

const getAllUsers = async () => {
  const users = await User.findAll();
  return users;
};

const useById = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    return { error: {
      code: 'notFound', message: 'User does not exist',
    } };
  }
  return user;
};

const deleteUser = async (id) => {
  const deletedUser = await User.destroy({
    where: { id },
  });
  return deletedUser;
};

module.exports = {
  createUser,
  getEmail,
  getAllUsers,
  useById,
  deleteUser,
};