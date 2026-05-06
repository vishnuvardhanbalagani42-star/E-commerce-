const { validationResult } = require('express-validator');
const ApiError = require('../utils/apiError');

const validate = (req, res, next) => {
  console.log('Validation middleware running for:', req.path);
  console.log('Request body:', req.body);
  const errors = validationResult(req);
  console.log('Validation errors:', errors.array());

  if (!errors.isEmpty()) {
    const message = errors.array().map((error) => `${error.param}: ${error.msg}`).join(', ');
    return next(new ApiError(400, message));
  }

  console.log('Validation passed');
  next();
};

module.exports = validate;
