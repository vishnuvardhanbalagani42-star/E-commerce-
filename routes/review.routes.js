const express = require('express');
const reviewController = require('../controllers/review.controller');
const { authMiddleware, authorizeRoles } = require('../middlewares/auth.middleware');
const { addReviewValidator, updateReviewValidator } = require('../validators/review.validator');

const router = express.Router({ mergeParams: true });

router.use(authMiddleware);
router.post('/', addReviewValidator, reviewController.addReview);
router.put('/:reviewId', updateReviewValidator, reviewController.updateReview);
router.delete('/:reviewId', updateReviewValidator, reviewController.deleteReview);

module.exports = router;
