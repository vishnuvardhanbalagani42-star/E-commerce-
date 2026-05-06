const catchAsync = require('../utils/catchAsync');
const cartService = require('../services/cart.service');

const getCart = catchAsync(async (req, res) => {
  const cart = await cartService.getCartByUser(req.user._id);
  res.status(200).json({ status: 'success', data: cart });
});

const addToCart = catchAsync(async (req, res) => {
  const cart = await cartService.createOrUpdateCart(req.user._id, req.params.productId, Number(req.body.quantity));
  res.status(200).json({ status: 'success', data: cart });
});

const removeFromCart = catchAsync(async (req, res) => {
  const cart = await cartService.removeCartItem(req.user._id, req.params.productId);
  res.status(200).json({ status: 'success', data: cart });
});

const clearCart = catchAsync(async (req, res) => {
  const cart = await cartService.clearCart(req.user._id);
  res.status(200).json({ status: 'success', data: cart });
});

module.exports = { getCart, addToCart, removeFromCart, clearCart };
