const express = require('express');
const cartController = require('../controllers/cart.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { updateCartValidator, removeCartValidator } = require('../validators/cart.validator');

const router = express.Router();

router.use(authMiddleware);
router.get('/', cartController.getCart);
router.post('/:productId', updateCartValidator, cartController.addToCart);
router.delete('/:productId', removeCartValidator, cartController.removeFromCart);
router.delete('/', cartController.clearCart);

module.exports = router;
