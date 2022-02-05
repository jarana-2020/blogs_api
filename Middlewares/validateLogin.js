const checkLogin = (req, res, next) => {
  const { body } = req;
  if (body.email === undefined) {
    return res.status(400).json({ message: '"email" is required' });
  }
  if (body.password === undefined) {
    return res.status(400).json({ message: '"password" is required' });
  }
  if (!body.email) {
    return res.status(400).json({ message: '"email" is not allowed to be empty' });
  }
  if (!body.password) {
    return res.status(400).json({ message: '"password" is not allowed to be empty' });
  }
  next();
};

module.exports = {
  checkLogin,
};