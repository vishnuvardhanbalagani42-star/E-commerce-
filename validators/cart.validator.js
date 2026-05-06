const { body, param } = require('express-validator');
const validate = require('../middlewares/validate.middleware');

const updateCartValidator = [
  param('productId').isMongoId().withMessage('Valid product id is required'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  validate,
];

const removeCartValidator = [
  param('productId').isMongoId().withMessage('Valid product id is required'),
  validate,
];

module.exports = { updateCartValidator, removeCartValidator };
