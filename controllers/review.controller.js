const catchAsync = require('../utils/catchAsync');
const reviewService = require('../services/review.service');

const addReview = catchAsync(async (req, res) => {
  const review = await reviewService.addReview(req.params.productId, req.user, req.body);
  res.status(201).json({ status: 'success', data: review });
});

const updateReview = catchAsync(async (req, res) => {
  const review = await reviewService.updateReview(req.params.productId, req.params.reviewId, req.user._id, req.body);
  res.status(200).json({ status: 'success', data: review });
});

const deleteReview = catchAsync(async (req, res) => {
  const review = await reviewService.deleteReview(req.params.productId, req.params.reviewId, req.user._id, req.user.role === 'admin');
  res.status(200).json({ status: 'success', data: review });
});

module.exports = { addReview, updateReview, deleteReview };
