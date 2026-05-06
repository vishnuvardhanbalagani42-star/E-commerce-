const catchAsync = require('../utils/catchAsync');
const authService = require('../services/auth.service');
const ApiError = require('../utils/apiError');

const register = catchAsync(async (req, res) => {
  console.log('Register controller - req.body:', req.body);

  const { name, email, password } = req.body;

  // ✅ Validate input (FIXES YOUR ERROR)
  if (!name || !email || !password) {
    throw new ApiError(400, 'Name, email and password are required');
  }

  const user = await authService.registerUser({ name, email, password });

  // ✅ Safety check
  if (!user) {
    throw new ApiError(500, 'User registration failed');
  }

  user.password = undefined;

  const token = authService.generateToken(user);
  const refreshToken = await authService.generateRefreshToken(user);

  res.status(201).json({
    status: 'success',
    data: { user, token, refreshToken }
  });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  // ✅ Validate input
  if (!email || !password) {
    throw new ApiError(400, 'Email and password are required');
  }

  const user = await authService.loginUser({ email, password });

  if (!user) {
    throw new ApiError(401, 'Invalid credentials');
  }

  user.password = undefined;

  const token = authService.generateToken(user);
  const refreshToken = await authService.generateRefreshToken(user);

  res.status(200).json({
    status: 'success',
    data: { user, token, refreshToken }
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.body;

  // ✅ Validate
  if (!refreshToken) {
    throw new ApiError(400, 'Refresh token is required');
  }

  const { accessToken, user } = await authService.refreshAuthToken(refreshToken);

  res.status(200).json({
    status: 'success',
    data: { user, accessToken }
  });
});

const logout = catchAsync(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new ApiError(400, 'Refresh token is required');
  }

  await authService.revokeRefreshToken(req.user._id, refreshToken);

  res.status(200).json({
    status: 'success',
    message: 'Logged out successfully'
  });
});

module.exports = { register, login, refreshToken, logout };