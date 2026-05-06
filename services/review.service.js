const Product = require('../models/product.model');
const ApiError = require('../utils/apiError');

const addReview = async (productId, user, { rating, comment }) => {
  const product = await Product.findById(productId);
  if (!product) throw new ApiError(404, 'Product not found');

  const existingReview = product.reviews.find((review) => review.user.equals(user._id));
  if (existingReview) {
    throw new ApiError(400, 'Review already exists for this product');
  }

  product.reviews.push({ user: user._id, name: user.name, rating, comment });
  product.numReviews = product.reviews.length;
  product.rating = product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.numReviews;
  await product.save();
  return product;
};

const updateReview = async (productId, reviewId, userId, { rating, comment }) => {
  const product = await Product.findById(productId);
  if (!product) throw new ApiError(404, 'Product not found');

  const review = product.reviews.id(reviewId);
  if (!review) throw new ApiError(404, 'Review not found');
  if (!review.user.equals(userId)) throw new ApiError(403, 'Access denied');

  review.rating = rating || review.rating;
  review.comment = comment || review.comment;

  product.numReviews = product.reviews.length;
  product.rating = product.reviews.reduce((sum, rev) => sum + rev.rating, 0) / product.numReviews;
  await product.save();
  return product;
};

const deleteReview = async (productId, reviewId, userId, isAdmin) => {
  const product = await Product.findById(productId);
  if (!product) throw new ApiError(404, 'Product not found');

  const review = product.reviews.id(reviewId);
  if (!review) throw new ApiError(404, 'Review not found');
  if (!isAdmin && !review.user.equals(userId)) {
    throw new ApiError(403, 'Access denied');
  }

  review.remove();
  product.numReviews = product.reviews.length;
  product.rating = product.numReviews > 0 ? product.reviews.reduce((sum, rev) => sum + rev.rating, 0) / product.numReviews : 0;
  await product.save();
  return product;
};

module.exports = { addReview, updateReview, deleteReview };
