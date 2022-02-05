const ServiceUser = require('./User');

const executeLogin = async (objLogin) => {
  const { email, password } = objLogin;
  const user = await ServiceUser.getEmail(email);
  if (!user || user.password !== password) {
    return { code: 400, 
      message: { message: 'Invalid fields' } };
  }
  return user;
};

module.exports = {
  executeLogin,
};