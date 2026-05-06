const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const ApiError = require('../utils/apiError');

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  });
};

const generateRefreshToken = async (user) => {
  console.log('generateRefreshToken called for user:', user.email);
  const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  });
  console.log('Generated refresh token:', refreshToken.substring(0, 20) + '...');
  
  // Use findByIdAndUpdate instead of modifying and saving the document
  // This avoids validation issues with undefined password
  try {
    await User.findByIdAndUpdate(
      user._id,
      { $push: { refreshTokens: refreshToken } },
      { new: true }
    );
    console.log('Refresh token saved to database');
  } catch (error) {
    console.error('Error saving refresh token:', error.message);
    throw error;
  }
  return refreshToken;
};

const registerUser = async (userData) => {
  console.log('registerUser called with:', userData);
  const { name, email, password } = userData;
  console.log('Destructured:', { name, email, password: password ? '***' : undefined });

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ApiError(400, 'Email already registered');
  }
  
  try {
    console.log('Calling User.create with:', { name, email, password: password ? 'set' : 'missing' });
    const user = await User.create({ name, email, password });
    console.log('User created successfully:', { _id: user._id, email: user.email, hasPassword: !!user.password });
    return user;
  } catch (error) {
    console.error('Error in User.create:', error.message);
    console.error('Full error:', error);
    throw error;
  }
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Email or password is incorrect');
  }
  return user;
};

const refreshAuthToken = async (token) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(payload.id);
    if (!user || !user.refreshTokens.includes(token)) {
      throw new ApiError(401, 'Invalid refresh token');
    }
    const accessToken = generateToken(user);
    return { accessToken, user };
  } catch (error) {
    throw new ApiError(401, 'Refresh token expired or invalid');
  }
};

const revokeRefreshToken = async (userId, token) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  user.refreshTokens = user.refreshTokens.filter((item) => item !== token);
  await user.save();
};

module.exports = { generateToken, generateRefreshToken, registerUser, loginUser, refreshAuthToken, revokeRefreshToken };
