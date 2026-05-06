const express = require('express');
const userController = require('../controllers/user.controller');
const { authMiddleware, authorizeRoles } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware);
router.get('/me', userController.getProfile);
router.put('/me', userController.updateProfile);

router.use(authorizeRoles('admin'));
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
