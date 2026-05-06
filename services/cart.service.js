const Cart = require('../models/cart.model');
const Product = require('../models/product.model');
const ApiError = require('../utils/apiError');

const getCartByUser = async (userId) => {
  return Cart.findOne({ user: userId }).populate('items.product');
};

const createOrUpdateCart = async (userId, productId, quantity) => {
  const product = await Product.findById(productId);
  if (!product) throw new ApiError(404, 'Product not found');
  if (product.stock < quantity) throw new ApiError(400, 'Insufficient stock');

  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = new Cart({ user: userId, items: [] });
  }

  const existingItem = cart.items.find((item) => item.product.equals(productId));
  if (existingItem) {
    existingItem.quantity = quantity;
    existingItem.price = product.price;
  } else {
    cart.items.push({ product: productId, quantity, price: product.price });
  }

  cart.calculateTotal();
  await cart.save();
  return cart.populate('items.product');
};

const removeCartItem = async (userId, productId) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw new ApiError(404, 'Cart not found');
  cart.items = cart.items.filter((item) => !item.product.equals(productId));
  cart.calculateTotal();
  await cart.save();
  return cart.populate('items.product');
};

const clearCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw new ApiError(404, 'Cart not found');
  cart.items = [];
  cart.totalPrice = 0;
  await cart.save();
  return cart;
};

module.exports = { getCartByUser, createOrUpdateCart, removeCartItem, clearCart };
