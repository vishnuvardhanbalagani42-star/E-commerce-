const express = require('express');
const orderController = require('../controllers/order.controller');
const { authMiddleware, authorizeRoles } = require('../middlewares/auth.middleware');
const { placeOrderValidator, orderIdValidator, updateOrderStatusValidator  } = require('../validators/order.validator');

const router = express.Router();

router.use(authMiddleware);
router.post('/', placeOrderValidator, orderController.placeOrder);
router.get('/mine', orderController.getMyOrders);
router.get('/:id', orderIdValidator, orderController.getOrderById);
router.put('/:id/status', authorizeRoles('admin'), updateOrderStatusValidator, orderController.updateOrderStatus);
router.get('/', authorizeRoles('admin'), orderController.getAllOrders);

module.exports = router;
