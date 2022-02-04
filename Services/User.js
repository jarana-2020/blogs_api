const { User } = require('../models');

const createUser = async (userObj) => {
  const { displayName, email, password, image } = userObj;
  const user = await User.create({
    displayName,
    email,
    password,
    image,
  });
  return user;
};

module.exports = {
  createUser,
};