const express = require('express');
const productController = require('../controllers/product.controller');
const { authMiddleware, authorizeRoles } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');
const { createProductValidator, updateProductValidator, productQueryValidator } = require('../validators/product.validator');

const router = express.Router();

router.route('/')
  .get(productQueryValidator, productController.getProducts)
  .post(authMiddleware, authorizeRoles('admin'), upload.array('images', 5), createProductValidator, productController.createProduct);

router.route('/:id')
  .get(productController.getProduct)
  .put(authMiddleware, authorizeRoles('admin'), upload.array('images', 5), updateProductValidator, productController.updateProduct)
  .delete(authMiddleware, authorizeRoles('admin'), updateProductValidator, productController.deleteProduct);

module.exports = router;
