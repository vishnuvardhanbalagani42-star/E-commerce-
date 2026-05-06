const Order = require('../models/order.model');
const Cart = require('../models/cart.model');
const Product = require('../models/product.model');
const User = require('../models/user.model');
const ApiError = require('../utils/apiError');

const placeOrder = async (userId, orderData) => {
  const cart = await Cart.findOne({ user: userId }).populate('items.product');
  if (!cart || cart.items.length === 0) {
    throw new ApiError(400, 'Cart is empty');
  }

  const orderItems = cart.items.map((item) => ({
    product: item.product._id,
    name: item.product.name,
    price: item.price,
    quantity: item.quantity,
    image: item.product.images[0] || '',
  }));

  const order = await Order.create({
    user: userId,
    orderItems,
    shippingAddress: orderData.shippingAddress || {},
    totalPrice: cart.totalPrice,
    paymentStatus: 'paid',
    paymentResult: {
      provider: 'mock',
      transactionId: `txn_${Date.now()}`,
      status: 'success',
    },
  });

  for (const item of cart.items) {
    item.product.stock = Math.max(0, item.product.stock - item.quantity);
    await item.product.save();
  }

  cart.items = [];
  cart.totalPrice = 0;
  await cart.save();

  return order;
};

const getOrderById = async (orderId, userId, isAdmin = false) => {
  const order = await Order.findById(orderId).populate('user', 'name email');
  if (!order) throw new ApiError(404, 'Order not found');
  if (!isAdmin && !order.user._id.equals(userId)) {
    throw new ApiError(403, 'Access denied');
  }
  return order;
};

const getOrders = async (userId, isAdmin = false) => {
  const filter = isAdmin ? {} : { user: userId };
  return Order.find(filter).sort({ createdAt: -1 }).populate('user', 'name email');
};

const updateOrderStatus = async (orderId, status) => {
  const order = await Order.findById(orderId);
  if (!order) throw new ApiError(404, 'Order not found');
  order.status = status;
  await order.save();
  return order;
};

const getAnalytics = async () => {
  const totalSales = await Order.aggregate([
    { $match: { paymentStatus: 'paid' } },
    { $group: { _id: null, total: { $sum: '$totalPrice' }, count: { $sum: 1 } } },
  ]);
  const totalOrders = totalSales[0]?.count || 0;
  const salesAmount = totalSales[0]?.total || 0;
  const totalUsers = await User.countDocuments();
  const totalProducts = await Product.countDocuments();
  return { totalOrders, salesAmount, totalUsers, totalProducts };
};

module.exports = { placeOrder, getOrderById, getOrders, updateOrderStatus, getAnalytics };
