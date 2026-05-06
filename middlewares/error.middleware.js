const ApiError = require('../utils/apiError');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  if (process.env.NODE_ENV === 'production' && !err.isOperational) {
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }

  res.status(statusCode).json({
    status: 'error',
    message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
};

const notFoundHandler = (req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
};

module.exports = errorHandler;
module.exports.notFoundHandler = notFoundHandler;
