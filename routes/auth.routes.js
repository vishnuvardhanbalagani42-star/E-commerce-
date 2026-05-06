const express = require('express');
const authController = require('../controllers/auth.controller');
const { registerValidator, loginValidator, refreshTokenValidator } = require('../validators/auth.validator');
const { authMiddleware } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/register', registerValidator, authController.register);
router.post('/login', loginValidator, authController.login);
router.post('/refresh-token', refreshTokenValidator, authController.refreshToken);
router.post('/logout', authMiddleware, authController.logout);

module.exports = router;
