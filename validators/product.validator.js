const { body, param, query } = require('express-validator');
const validate = require('../middlewares/validate.middleware');

const createProductValidator = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
  validate,
];

const updateProductValidator = [
  param('id').isMongoId().withMessage('Valid product id is required'),
  validate,
];

const productQueryValidator = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be an integer >= 1'),
  query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be an integer >= 1'),
  query('sortBy').optional().isString(),
  validate,
];

module.exports = { createProductValidator, updateProductValidator, productQueryValidator };
