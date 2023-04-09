export default class AppError extends Error {
  status;

  isOperational;

  statusCode;

  constructor(message, statusCode = 500) {
    super(message);
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
