const checkFieldExists = (req, res, next) => {
  const { body } = req;
  if (!body.email) {
    return res.status(400).json({ message: '"email" is required' });
  }
  if (!body.password) {
    return res.status(400).json({ message: '"password" is required' });
  }
  next();
};

const validateFields = (req, res, next) => {
  const { displayName, email, password } = req.body;
  const emailRegEx = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const result = emailRegEx.test(email);

  if (displayName.length < 8) {
    return res.status(400)
    .json({ message: '"displayName" length must be at least 8 characters long' });
  }

  if (!result) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }

  if (password.length < 6 || password.length > 6) {
    return res.status(400)
    .json({ message: '"password" length must be 6 characters long' });
  }
  next();
};

module.exports = {
  validateFields,
  checkFieldExists,
};