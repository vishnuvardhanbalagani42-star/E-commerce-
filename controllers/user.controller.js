const catchAsync = require('../utils/catchAsync');
const User = require('../models/user.model');
const userService = require('../services/user.service');

const getProfile = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.user._id);
  res.status(200).json({ status: 'success', data: user });
});

const updateProfile = catchAsync(async (req, res) => {
  const updatedUser = await userService.updateUser(req.user._id, req.body);
  res.status(200).json({ status: 'success', data: updatedUser });
});

const getAllUsers = catchAsync(async (req, res) => {
  const users = await userService.getUsers();
  res.status(200).json({ status: 'success', results: users.length, data: users });
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.status(200).json({ status: 'success', data: user });
});

const updateUser = catchAsync(async (req, res) => {
  const updatedUser = await userService.updateUser(req.params.id, req.body);
  res.status(200).json({ status: 'success', data: updatedUser });
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUser(req.params.id);
  res.status(204).json({ status: 'success', data: null });
});

module.exports = { getProfile, updateProfile, getAllUsers, getUser, updateUser, deleteUser };
