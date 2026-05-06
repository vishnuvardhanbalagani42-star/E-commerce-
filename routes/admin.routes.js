const express = require('express');
const adminController = require('../controllers/admin.controller');
const { authMiddleware, authorizeRoles } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware);
router.use(authorizeRoles('admin'));
router.get('/users', adminController.getUsers);
router.get('/users/:id', adminController.getUser);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);
router.get('/analytics', adminController.analytics);

module.exports = router;
