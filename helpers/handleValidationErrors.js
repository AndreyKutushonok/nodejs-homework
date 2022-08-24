const handleValidationErrors = (error, data, next) => {
  const { name, code } = error;
  if (name === "ValidationError" && code === undefined) {
    error.status = 400;
  }
  next();
};

module.exports = handleValidationErrors;
