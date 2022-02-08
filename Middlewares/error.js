module.exports = (err, _req, res, _next) => {
  const errorCode = {
    badRequest: 400,
    unauthorized: 401,
    conflict: 409,
  };
  const status = errorCode[err.code] || 500;
  res.status(status).json({ message: err.message });
};