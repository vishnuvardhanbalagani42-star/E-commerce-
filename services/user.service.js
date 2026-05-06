const User = require('../models/user.model');
const ApiError = require('../utils/apiError');

const getUserById = async (id) => {
  return User.findById(id).select('-password');
};

const getUsers = async (filter = {}) => {
  return User.find(filter).select('-password');
};

const updateUser = async (id, updateBody) => {
  if (updateBody.email) {
    const existingUser = await User.findOne({ email: updateBody.email, _id: { $ne: id } });
    if (existingUser) {
      throw new ApiError(400, 'Email already in use');
    }
  }
  if (updateBody.password) {
    updateBody.password = await User.hashPassword(updateBody.password);
  }
  return User.findByIdAndUpdate(id, updateBody, { new: true, runValidators: true, context: 'query' }).select('-password');
};

const deleteUser = async (id) => {
  return User.findByIdAndDelete(id);
};

module.exports = { getUserById, getUsers, updateUser, deleteUser };
