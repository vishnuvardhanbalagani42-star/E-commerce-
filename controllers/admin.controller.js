const catchAsync = require('../utils/catchAsync');
const userService = require('../services/user.service');
const orderService = require('../services/order.service');

const getUsers = catchAsync(async (req, res) => {
  const users = await userService.getUsers();
  res.status(200).json({ status: 'success', results: users.length, data: users });
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.status(200).json({ status: 'success', data: user });
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  res.status(200).json({ status: 'success', data: user });
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUser(req.params.id);
  res.status(204).json({ status: 'success', data: null });
});

const analytics = catchAsync(async (req, res) => {
  const stats = await orderService.getAnalytics();
  res.status(200).json({ status: 'success', data: stats });
});

module.exports = { getUsers, getUser, updateUser, deleteUser, analytics };
