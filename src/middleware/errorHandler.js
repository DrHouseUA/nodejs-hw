import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  console.error('Error Middleware:', err);

  // Якщо помилка створена через http-errors
  if (err instanceof HttpError) {
    return res.status(err.status).json({
      message: 'повідомлення про помилку',
    });
  }

  const isProd = process.env.NODE_ENV === 'production';

  // Усі інші помилки — як внутрішні
  res.status(500).json({
    message: isProd
      ? 'Something went wrong. Please try again later.'
      : 'повідомлення про помилку',
  });
};
