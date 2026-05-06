const { body, param } = require('express-validator');
const validate = require('../middlewares/validate.middleware');

const addReviewValidator = [
  param('productId').isMongoId().withMessage('Valid product id is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').optional().isString(),
  validate,
];

const updateReviewValidator = [
  param('productId').isMongoId().withMessage('Valid product id is required'),
  param('reviewId').isMongoId().withMessage('Valid review id is required'),
  body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').optional().isString(),
  validate,
];

module.exports = { addReviewValidator, updateReviewValidator };
