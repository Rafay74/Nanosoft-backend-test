import { ErrorRequestHandler } from 'express';
import HTTPException from '../utils/http-exception';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof HTTPException) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return
  }
  console.error(err);
  res.status(500).json({
    success: false,
    message: 'An unexpected error occurred.',
  });
  return
};

export default errorHandler;