const catchAsync = require('../utils/catchAsync');
const orderService = require('../services/order.service');

const placeOrder = catchAsync(async (req, res) => {
  const order = await orderService.placeOrder(req.user._id, req.body);
  res.status(201).json({ status: 'success', data: order });
});

const getMyOrders = catchAsync(async (req, res) => {
  const orders = await orderService.getOrders(req.user._id, false);
  res.status(200).json({ status: 'success', results: orders.length, data: orders });
});

const getOrderById = catchAsync(async (req, res) => {
  const order = await orderService.getOrderById(req.params.id, req.user._id, req.user.role === 'admin');
  res.status(200).json({ status: 'success', data: order });
});

const updateOrderStatus = catchAsync(async (req, res) => {
  const order = await orderService.updateOrderStatus(req.params.id, req.body.status);
  res.status(200).json({ status: 'success', data: order });
});

const getAllOrders = catchAsync(async (req, res) => {
  const orders = await orderService.getOrders(null, true);
  res.status(200).json({ status: 'success', results: orders.length, data: orders });
});

module.exports = { placeOrder, getMyOrders, getOrderById, updateOrderStatus, getAllOrders };
