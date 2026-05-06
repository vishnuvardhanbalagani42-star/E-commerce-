const { body, param } = require('express-validator');
const validate = require('../middlewares/validate.middleware');

const placeOrderValidator = [
  body('shippingAddress.address').optional().isString().withMessage('Address must be a string'),
  body('shippingAddress.city').optional().isString().withMessage('City must be a string'),
  body('shippingAddress.country').optional().isString().withMessage('Country must be a string'),
  body('shippingAddress.postalCode').optional().isString().withMessage('Postal code must be a string'),
  validate,
];

const orderIdValidator = [
  param('id').isMongoId().withMessage('Valid order id is required'),
  validate,
];

const updateOrderStatusValidator = [
  param('id').isMongoId().withMessage('Valid order id is required'),
  body('status').isIn(['pending', 'shipped', 'delivered']).withMessage('Status must be pending, shipped, or delivered'),
  validate,
];

module.exports = { placeOrderValidator, orderIdValidator, updateOrderStatusValidator };
